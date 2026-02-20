import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import Modal from "../components/Modal";
import TaskForm from "../components/projects/TaskForm";
import TaskList from "../components/projects/TaskList";
import { calculateProjectProgress, calculateProjectStatus, findProjectById, formatDeadline } from "../components/projects/projectUtils";
import type { ProjectTask, TaskInput } from "../components/projects/types";
import { useProjects } from "../hooks/useProjects";

const ProjectDetails: React.FC = () => {
  const navigate = useNavigate();
  const { projectId = "" } = useParams();
  const { projects, addTask, updateTask, deleteTask, updateTaskStatus } = useProjects();

  const project = useMemo(() => findProjectById(projects, projectId), [projects, projectId]);

  const [editingTask, setEditingTask] = useState<ProjectTask | null>(null);
  const [deletingTask, setDeletingTask] = useState<ProjectTask | null>(null);

  if (!project) {
    return (
      <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
          <p className="text-gray-600 mt-2">The requested project does not exist or was deleted.</p>
          <Link to="/projects" className="inline-flex mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const progress = calculateProjectProgress(project.tasks);
  const projectStatus = calculateProjectStatus(project.tasks);

  const completedTasks = project.tasks.filter((task) => task.status === "Completed").length;

  const handleAddTask = (values: TaskInput) => {
    addTask(project.id, values);
  };

  const handleUpdateTask = (values: TaskInput) => {
    if (!editingTask) {
      return;
    }

    updateTask(project.id, editingTask.id, values);
    setEditingTask(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
              onClick={() => navigate("/projects")}
            >
              Back to Projects
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">{project.name}</h1>
            <p className="text-gray-600 mt-1">{project.description}</p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className="text-sm text-gray-500">Deadline</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{formatDeadline(project.deadline)}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className="text-sm text-gray-500">Project Status</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{projectStatus}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className="text-sm text-gray-500">Tasks Completed</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              {completedTasks} / {project.tasks.length}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className="text-sm text-gray-500">Team Members</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{project.teamMembers.length}</p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700 font-medium">Progress (based on completed tasks)</span>
            <span className="font-semibold text-gray-900">{progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Add Task</h2>
          <p className="text-sm text-gray-600 mt-1 mb-4">Create tasks and assign them to project members.</p>
          <TaskForm mode="create" teamMembers={project.teamMembers} onSubmit={handleAddTask} />
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Task List</h2>
          <TaskList
            tasks={project.tasks}
            onEdit={setEditingTask}
            onDelete={setDeletingTask}
            onStatusChange={(taskId, nextStatus) => updateTaskStatus(project.id, taskId, nextStatus)}
          />
        </section>
      </div>

      <Modal isOpen={Boolean(editingTask)} onClose={() => setEditingTask(null)} panelClassName="max-w-2xl border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Edit Task</h2>
        </div>
        <div className="p-6">
          {editingTask ? (
            <TaskForm
              mode="edit"
              teamMembers={project.teamMembers}
              initialTask={editingTask}
              onSubmit={handleUpdateTask}
              onCancel={() => setEditingTask(null)}
            />
          ) : null}
        </div>
      </Modal>

      <ConfirmModal
        isOpen={Boolean(deletingTask)}
        title="Delete Task"
        description={`Are you sure you want to delete "${deletingTask?.title ?? ""}"?`}
        confirmLabel="Delete"
        onClose={() => setDeletingTask(null)}
        onConfirm={() => {
          if (!deletingTask) {
            return;
          }

          deleteTask(project.id, deletingTask.id);
          setDeletingTask(null);
        }}
      />
    </main>
  );
};

export default ProjectDetails;

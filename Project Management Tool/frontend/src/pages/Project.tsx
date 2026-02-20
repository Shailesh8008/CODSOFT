import React, { useMemo, useState } from "react";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectFormModal from "../components/projects/ProjectFormModal";
import type { Project, ProjectInput, ProjectStatus } from "../components/projects/types";

const initialProjects: Project[] = [
  {
    id: "p-1",
    name: "Website Revamp",
    description: "Refresh landing pages and improve performance for mobile users.",
    deadline: "2026-03-10",
    progress: 65,
    teamMembers: ["Aarav", "Mia", "Noah"],
    status: "In Progress",
  },
  {
    id: "p-2",
    name: "Client Onboarding Flow",
    description: "Design and implement guided onboarding with progress tracking.",
    deadline: "2026-02-28",
    progress: 40,
    teamMembers: ["Ethan", "Sophia"],
    status: "In Progress",
  },
  {
    id: "p-3",
    name: "Internal Knowledge Base",
    description: "Set up documentation structure and publish core engineering guides.",
    deadline: "2026-04-05",
    progress: 15,
    teamMembers: ["Liam", "Zoe", "Aiden", "Riya"],
    status: "Not Started",
  },
];

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ProjectStatus>("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !normalizedSearch ||
        project.name.toLowerCase().includes(normalizedSearch) ||
        project.description.toLowerCase().includes(normalizedSearch);

      const matchesStatus = statusFilter === "All" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  const openCreateModal = () => {
    setFormMode("create");
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const openEditModal = (project: Project) => {
    setFormMode("edit");
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleSubmitProject = (values: ProjectInput) => {
    if (formMode === "create") {
      const newProject: Project = {
        id: `p-${Date.now()}`,
        ...values,
      };

      setProjects((previous) => [newProject, ...previous]);
      setSelectedProject(newProject);
      setIsFormOpen(false);
      return;
    }

    if (!editingProject) {
      return;
    }

    const updatedProject: Project = {
      id: editingProject.id,
      ...values,
    };

    setProjects((previous) =>
      previous.map((project) => (project.id === editingProject.id ? updatedProject : project)),
    );
    setSelectedProject((previous) => (previous?.id === editingProject.id ? updatedProject : previous));
    setIsFormOpen(false);
  };

  const handleDeleteProject = (projectId: string) => {
    const targetProject = projects.find((project) => project.id === projectId);
    if (!targetProject) {
      return;
    }

    if (!window.confirm(`Delete project "${targetProject.name}"?`)) {
      return;
    }

    setProjects((previous) => previous.filter((project) => project.id !== projectId));
    setSelectedProject((previous) => (previous?.id === projectId ? null : previous));
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">Manage all projects, deadlines, and team assignments.</p>
          </div>
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
            onClick={openCreateModal}
          >
            Create New Project
          </button>
        </section>

        <ProjectFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
        />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {filteredProjects.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-600">
                No projects match your current search/filter.
              </div>
            ) : (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onView={setSelectedProject}
                  onEdit={openEditModal}
                  onDelete={handleDeleteProject}
                />
              ))
            )}
          </div>

          <aside className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Project Details</h2>
            {selectedProject ? (
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-gray-900">{selectedProject.name}</span>
                </p>
                <p>{selectedProject.description}</p>
                <p>
                  <span className="font-medium">Deadline:</span> {selectedProject.deadline}
                </p>
                <p>
                  <span className="font-medium">Progress:</span> {selectedProject.progress}%
                </p>
                <p>
                  <span className="font-medium">Status:</span> {selectedProject.status}
                </p>
                <p>
                  <span className="font-medium">Team Members:</span>{" "}
                  {selectedProject.teamMembers.join(", ") || "No members"}
                </p>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">Click "View Details" on any project card.</p>
            )}
          </aside>
        </section>
      </div>

      <ProjectFormModal
        isOpen={isFormOpen}
        mode={formMode}
        initialProject={editingProject}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitProject}
      />
    </main>
  );
};

export default ProjectPage;

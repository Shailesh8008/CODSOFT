import React from "react";
import { calculateProjectProgress, calculateProjectStatus, formatDeadline } from "./projectUtils";
import type { Project } from "./types";

interface ProjectCardProps {
  project: Project;
  onView: (projectId: string) => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

const statusStyles: Record<"Not Started" | "In Progress" | "Completed", string> = {
  "Not Started": "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onView, onEdit, onDelete }) => {
  const progress = calculateProjectProgress(project.tasks);
  const status = calculateProjectStatus(project.tasks);

  return (
    <article className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[status]}`}>{status}</span>
      </div>

      <p className="text-sm text-gray-600 mt-3 line-clamp-2">{project.description}</p>

      <div className="mt-4 space-y-2 text-sm">
        <p className="text-gray-700">
          <span className="font-medium">Deadline:</span> {formatDeadline(project.deadline)}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Team:</span> {project.teamMembers.join(", ") || "No members"}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Tasks:</span> {project.tasks.length}
        </p>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-700">Progress</span>
          <span className="font-medium text-gray-800">{progress}%</span>
        </div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
          onClick={() => onView(project.id)}
        >
          View Details
        </button>
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          onClick={() => onEdit(project)}
        >
          Edit
        </button>
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          onClick={() => onDelete(project)}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;

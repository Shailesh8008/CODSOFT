import React from "react";
import type { Project } from "./types";

interface ProjectCardProps {
  project: Project;
  onView: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

const statusStyles: Record<Project["status"], string> = {
  "Not Started": "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onView, onEdit, onDelete }) => {
  return (
    <article className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[project.status]}`}>
          {project.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-3 line-clamp-2">{project.description}</p>

      <div className="mt-4 space-y-2 text-sm">
        <p className="text-gray-700">
          <span className="font-medium">Deadline:</span> {project.deadline}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Team:</span> {project.teamMembers.join(", ") || "No members"}
        </p>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-700">Progress</span>
          <span className="font-medium text-gray-800">{project.progress}%</span>
        </div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
          onClick={() => onView(project)}
        >
          View Details
        </button>
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => onEdit(project)}
        >
          Edit
        </button>
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700"
          onClick={() => onDelete(project.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;

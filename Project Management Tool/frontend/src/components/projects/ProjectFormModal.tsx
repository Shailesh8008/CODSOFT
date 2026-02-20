import React, { useEffect, useState } from "react";
import type { Project, ProjectInput, ProjectStatus } from "./types";

interface ProjectFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  initialProject: Project | null;
  onClose: () => void;
  onSubmit: (values: ProjectInput) => void;
}

const emptyState: ProjectInput = {
  name: "",
  description: "",
  deadline: "",
  progress: 0,
  teamMembers: [],
  status: "Not Started",
};

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  mode,
  initialProject,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<ProjectInput>(emptyState);
  const [teamMemberText, setTeamMemberText] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (mode === "edit" && initialProject) {
      setForm({
        name: initialProject.name,
        description: initialProject.description,
        deadline: initialProject.deadline,
        progress: initialProject.progress,
        teamMembers: initialProject.teamMembers,
        status: initialProject.status,
      });
      setTeamMemberText(initialProject.teamMembers.join(", "));
      return;
    }

    setForm(emptyState);
    setTeamMemberText("");
  }, [isOpen, mode, initialProject]);

  if (!isOpen) {
    return null;
  }

  const updateField = <K extends keyof ProjectInput>(field: K, value: ProjectInput[K]) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const teamMembers = teamMemberText
      .split(",")
      .map((member) => member.trim())
      .filter(Boolean);

    onSubmit({ ...form, teamMembers });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === "create" ? "Create New Project" : "Edit Project"}
          </h2>
          <button type="button" className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            Close
          </button>
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
              <input
                type="date"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.deadline}
                onChange={(event) => updateField("deadline", event.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.status}
                onChange={(event) => updateField("status", event.target.value as ProjectStatus)}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Progress ({form.progress}%)
            </label>
            <input
              type="range"
              min={0}
              max={100}
              className="w-full"
              value={form.progress}
              onChange={(event) => updateField("progress", Number(event.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team Members (comma separated)
            </label>
            <input
              type="text"
              placeholder="Alex, Priya, Jamal"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={teamMemberText}
              onChange={(event) => setTeamMemberText(event.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              {mode === "create" ? "Create Project" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;

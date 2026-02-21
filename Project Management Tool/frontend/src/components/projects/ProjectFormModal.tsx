import React, { useState } from "react";
import Modal from "../Modal";
import type { Project, ProjectInput } from "./types";

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
  teamMembers: [],
};

const buildInitialForm = (
  mode: "create" | "edit",
  initialProject: Project | null,
): ProjectInput => {
  if (mode === "edit" && initialProject) {
    return {
      name: initialProject.name,
      description: initialProject.description,
      deadline: initialProject.deadline,
      teamMembers: initialProject.teamMembers,
    };
  }

  return emptyState;
};

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  mode,
  initialProject,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<ProjectInput>(() => buildInitialForm(mode, initialProject));
  const [teamMemberText, setTeamMemberText] = useState(() =>
    mode === "edit" && initialProject ? initialProject.teamMembers.join(", ") : "",
  );

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
    <Modal isOpen={isOpen} onClose={onClose} panelClassName="max-w-xl border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">
          {mode === "create" ? "Create New Project" : "Edit Project"}
        </h2>
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
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            {mode === "create" ? "Create Project" : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectFormModal;

import React from "react";
import CustomSelect from "../CustomSelect";
import type { ProjectStatus } from "./types";

interface ProjectFiltersProps {
  searchTerm: string;
  statusFilter: "All" | ProjectStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: "All" | ProjectStatus) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}) => {
  return (
    <section className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Search by project name or description"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />

        <CustomSelect
          value={statusFilter}
          onChange={(value) => onStatusChange(value as "All" | ProjectStatus)}
          options={[
            { value: "All", label: "All Statuses" },
            { value: "Not Started", label: "Not Started" },
            { value: "In Progress", label: "In Progress" },
            { value: "Completed", label: "Completed" },
          ]}
        />
      </div>
    </section>
  );
};

export default ProjectFilters;

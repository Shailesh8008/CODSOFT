export type ProjectStatus = "Not Started" | "In Progress" | "Completed";

export interface Project {
  id: string;
  name: string;
  description: string;
  deadline: string;
  progress: number;
  teamMembers: string[];
  status: ProjectStatus;
}

export interface ProjectInput {
  name: string;
  description: string;
  deadline: string;
  progress: number;
  teamMembers: string[];
  status: ProjectStatus;
}

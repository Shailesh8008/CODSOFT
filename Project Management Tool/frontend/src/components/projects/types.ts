export type ProjectStatus = "Not Started" | "In Progress" | "Completed";

export type TaskStatus = "Todo" | "In Progress" | "Completed";

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: TaskStatus;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  deadline: string;
  teamMembers: string[];
  tasks: ProjectTask[];
}

export interface ProjectInput {
  name: string;
  description: string;
  deadline: string;
  teamMembers: string[];
}

export interface TaskInput {
  title: string;
  description: string;
  assignee: string;
  status: TaskStatus;
}

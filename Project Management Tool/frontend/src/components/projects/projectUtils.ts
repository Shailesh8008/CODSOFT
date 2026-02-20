import type { Project, ProjectStatus, ProjectTask } from "./types";

export const calculateProjectProgress = (tasks: ProjectTask[]): number => {
  if (tasks.length === 0) {
    return 0;
  }

  const completedCount = tasks.filter((task) => task.status === "Completed").length;
  return Math.round((completedCount / tasks.length) * 100);
};

export const calculateProjectStatus = (tasks: ProjectTask[]): ProjectStatus => {
  if (tasks.length === 0) {
    return "Not Started";
  }

  const completedCount = tasks.filter((task) => task.status === "Completed").length;
  if (completedCount === tasks.length) {
    return "Completed";
  }

  if (completedCount > 0 || tasks.some((task) => task.status === "In Progress")) {
    return "In Progress";
  }

  return "Not Started";
};

export const formatDeadline = (deadline: string): string => {
  const parsedDate = new Date(deadline);
  if (Number.isNaN(parsedDate.getTime())) {
    return deadline;
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const findProjectById = (projects: Project[], projectId: string) =>
  projects.find((project) => project.id === projectId);

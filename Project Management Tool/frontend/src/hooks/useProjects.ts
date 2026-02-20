import { useEffect, useMemo, useState } from "react";
import type { Project, ProjectInput, ProjectTask, TaskInput } from "../components/projects/types";
import { initialProjects } from "../data/initialProjects";

const STORAGE_KEY = "tasky-projects-v1";

const readProjectsFromStorage = (): Project[] => {
  if (typeof window === "undefined") {
    return initialProjects;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return initialProjects;
  }

  try {
    const parsed = JSON.parse(raw) as Project[];
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // Keep defaults if parsing fails.
  }

  return initialProjects;
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(() => readProjectsFromStorage());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const api = useMemo(
    () => ({
      projects,
      createProject: (values: ProjectInput) => {
        const nextProject: Project = {
          id: `p-${Date.now()}`,
          ...values,
          tasks: [],
        };

        setProjects((previous) => [nextProject, ...previous]);
        return nextProject;
      },
      updateProject: (projectId: string, values: ProjectInput) => {
        setProjects((previous) =>
          previous.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  ...values,
                }
              : project,
          ),
        );
      },
      deleteProject: (projectId: string) => {
        setProjects((previous) => previous.filter((project) => project.id !== projectId));
      },
      addTask: (projectId: string, values: TaskInput) => {
        const nextTask: ProjectTask = {
          id: `t-${Date.now()}`,
          ...values,
        };

        setProjects((previous) =>
          previous.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  tasks: [nextTask, ...project.tasks],
                }
              : project,
          ),
        );

        return nextTask;
      },
      updateTask: (projectId: string, taskId: string, values: TaskInput) => {
        setProjects((previous) =>
          previous.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  tasks: project.tasks.map((task) => (task.id === taskId ? { id: taskId, ...values } : task)),
                }
              : project,
          ),
        );
      },
      deleteTask: (projectId: string, taskId: string) => {
        setProjects((previous) =>
          previous.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  tasks: project.tasks.filter((task) => task.id !== taskId),
                }
              : project,
          ),
        );
      },
      updateTaskStatus: (projectId: string, taskId: string, nextStatus: ProjectTask["status"]) => {
        setProjects((previous) =>
          previous.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  tasks: project.tasks.map((task) =>
                    task.id === taskId
                      ? {
                          ...task,
                          status: nextStatus,
                        }
                      : task,
                  ),
                }
              : project,
          ),
        );
      },
    }),
    [projects],
  );

  return api;
};

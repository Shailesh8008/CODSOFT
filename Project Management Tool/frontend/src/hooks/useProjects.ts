import { useEffect, useMemo, useState } from "react";
import type { Project, ProjectInput, ProjectTask, TaskInput } from "../components/projects/types";

const backendUrl = import.meta.env.VITE_BACKEND_URL ?? "";

type RawProject = Partial<Project> & {
  _id?: string;
  id?: string;
  name?: string;
  description?: string;
  deadline?: string;
  members?: unknown;
  teamMembers?: unknown;
  tasks?: unknown;
  _count?: { tasks?: unknown };
};

const getEntityId = (value: unknown): string | null => {
  if (typeof value === "string") {
    return value;
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as { id?: unknown; _id?: unknown };
  if (typeof candidate.id === "string") {
    return candidate.id;
  }
  if (typeof candidate._id === "string") {
    return candidate._id;
  }

  return null;
};

const normalizeProject = (input: RawProject): Project | null => {
  const projectId = typeof input.id === "string" ? input.id : typeof input._id === "string" ? input._id : "";
  const name = typeof input.name === "string" ? input.name : "";
  const description = typeof input.description === "string" ? input.description : "";
  const deadline = typeof input.deadline === "string" ? input.deadline : "";

  if (!projectId || !name || !description || !deadline) {
    return null;
  }

  const membersFromMembersField = Array.isArray(input.members)
    ? input.members.map(getEntityId).filter((memberId): memberId is string => Boolean(memberId))
    : [];

  const membersFromTeamMembersField = Array.isArray(input.teamMembers)
    ? input.teamMembers.map(getEntityId).filter((memberId): memberId is string => Boolean(memberId))
    : [];

  const teamMembers = Array.from(new Set([...membersFromMembersField, ...membersFromTeamMembersField]));

  const tasks = Array.isArray(input.tasks)
    ? input.tasks
        .map((task): ProjectTask | null => {
          const nextTask = task as Partial<ProjectTask> & { _id?: string };
          const taskId =
            typeof nextTask.id === "string" ? nextTask.id : typeof nextTask._id === "string" ? nextTask._id : "";
          const title = typeof nextTask.title === "string" ? nextTask.title : "";
          const taskDescription = typeof nextTask.description === "string" ? nextTask.description : "";
          const assignee = typeof nextTask.assignee === "string" ? nextTask.assignee : "";
          const taskDeadline = typeof nextTask.deadline === "string" ? nextTask.deadline : "";
          const status = nextTask.status;

          if (!taskId || !title || !taskDescription || !assignee) {
            return null;
          }

          if (status !== "Todo" && status !== "In Progress" && status !== "Completed") {
            return null;
          }

          return {
            id: taskId,
            title,
            description: taskDescription,
            assignee,
            deadline: taskDeadline,
            status,
          };
        })
        .filter((task): task is ProjectTask => Boolean(task))
    : [];
  const countedTasks = typeof input._count?.tasks === "number" ? input._count.tasks : null;

  return {
    id: projectId,
    name,
    description,
    deadline,
    teamMembers,
    tasks,
    taskCount: countedTasks ?? tasks.length,
  };
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/my-projects`, {
          method: "GET",
          credentials: "include",
        });

        const payload = (await response.json().catch(() => null)) as
          | RawProject[]
          | { projects?: RawProject[]; data?: RawProject[] }
          | null;

        if (!response.ok) {
          setProjects([]);
          return;
        }
        const rawProjects = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.projects)
            ? payload.projects
            : Array.isArray(payload?.data)
              ? payload.data
              : [];
        setProjects(rawProjects.map(normalizeProject).filter((project): project is Project => Boolean(project)));
      } catch {
        setProjects([]);
      }
    };

    void fetchProjects();
  }, []);

  const api = useMemo(
    () => ({
      projects,
      createProject: (values: ProjectInput) => {
        const nextProject: Project = {
          id: `p-${Date.now()}`,
          ...values,
          tasks: [],
          taskCount: 0,
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
                  taskCount: (project.taskCount ?? project.tasks.length) + 1,
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
                  taskCount: Math.max(0, (project.taskCount ?? project.tasks.length) - 1),
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

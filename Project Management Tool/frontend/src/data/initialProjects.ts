import type { Project } from "../components/projects/types";

export const initialProjects: Project[] = [
  {
    id: "p-1",
    name: "Website Revamp",
    description: "Refresh landing pages and improve performance for mobile users.",
    deadline: "2026-03-10",
    teamMembers: ["Aarav", "Mia", "Noah"],
    tasks: [
      {
        id: "t-1",
        title: "Build responsive hero section",
        description: "Implement desktop and mobile variants for the new homepage hero.",
        assignee: "Aarav",
        status: "Completed",
      },
      {
        id: "t-2",
        title: "Optimize image pipeline",
        description: "Convert existing assets and lazy-load non-critical images.",
        assignee: "Mia",
        status: "In Progress",
      },
      {
        id: "t-3",
        title: "Run Lighthouse audit",
        description: "Validate performance budgets and accessibility checks.",
        assignee: "Noah",
        status: "Todo",
      },
    ],
  },
  {
    id: "p-2",
    name: "Client Onboarding Flow",
    description: "Design and implement guided onboarding with progress tracking.",
    deadline: "2026-02-28",
    teamMembers: ["Ethan", "Sophia"],
    tasks: [
      {
        id: "t-4",
        title: "Wireframe onboarding steps",
        description: "Produce low-fidelity wireframes for first-time user setup.",
        assignee: "Sophia",
        status: "Completed",
      },
      {
        id: "t-5",
        title: "Implement progress tracker",
        description: "Show step completion and remaining setup tasks.",
        assignee: "Ethan",
        status: "In Progress",
      },
    ],
  },
  {
    id: "p-3",
    name: "Internal Knowledge Base",
    description: "Set up documentation structure and publish core engineering guides.",
    deadline: "2026-04-05",
    teamMembers: ["Liam", "Zoe", "Aiden", "Riya"],
    tasks: [
      {
        id: "t-6",
        title: "Create docs templates",
        description: "Define shared templates for architecture and runbooks.",
        assignee: "Liam",
        status: "Todo",
      },
    ],
  },
];

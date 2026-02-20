import React from "react";

type ProgressItem = {
  label: string;
  value: number;
  color: string;
};

type DeadlineItem = {
  title: string;
  date: string;
  daysLeft: number;
};

type ActivityItem = {
  message: string;
  time: string;
};

const Dashboard: React.FC = () => {
  const stats = {
    totalProjects: 8,
    totalTasks: 42,
    overdueTasks: 5,
  };

  const upcomingDeadlines: DeadlineItem[] = [
    { title: "Website Redesign", date: "Feb 23, 2026", daysLeft: 3 },
    { title: "Mobile App QA", date: "Feb 26, 2026", daysLeft: 6 },
    { title: "Marketing Campaign", date: "Mar 01, 2026", daysLeft: 10 },
  ];

  const progressSummary: ProgressItem[] = [
    { label: "Project Completion", value: 68, color: "bg-blue-500" },
    { label: "Tasks Completed", value: 74, color: "bg-emerald-500" },
    { label: "Team Productivity", value: 81, color: "bg-amber-500" },
  ];

  const recentActivity: ActivityItem[] = [
    { message: "You marked \"Fix login bug\" as completed.", time: "2 hours ago" },
    { message: "New task \"Prepare sprint demo\" added to Project Alpha.", time: "5 hours ago" },
    { message: "Deadline updated for \"Website Redesign\".", time: "Yesterday" },
    { message: "You created a new project: \"Client Portal\".", time: "2 days ago" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <section>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your projects, tasks, and activity.</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Projects</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProjects}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalTasks}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Overdue Tasks</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{stats.overdueTasks}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Upcoming Deadlines</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{upcomingDeadlines.length}</p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress Summary</h2>
            <div className="space-y-5">
              {progressSummary.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{item.label}</span>
                    <span className="font-medium text-gray-800">{item.value}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
            <ul className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <li
                  key={deadline.title}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <div>
                    <p className="font-medium text-gray-900">{deadline.title}</p>
                    <p className="text-sm text-gray-500">Due {deadline.date}</p>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">{deadline.daysLeft} days left</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {recentActivity.map((activity) => (
              <li key={`${activity.message}-${activity.time}`} className="flex items-start justify-between gap-3">
                <p className="text-gray-700">{activity.message}</p>
                <span className="text-sm text-gray-500 whitespace-nowrap">{activity.time}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;

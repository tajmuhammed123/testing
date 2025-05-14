"use client";

import { Priority, Status, type Task } from "~/types";
import { api } from "~/trpc/react";
import TaskModal from "./TaskModal";
import { useState } from "react";
import Image from "next/image";

export default function TaskManager({
  initialTasks = [],
}: {
  initialTasks?: Task[];
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState<
    "all" | "todo" | "in-progress" | "done"
  >("all");

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true;
    return (
      task.status === Status[activeTab.toUpperCase().replace("-", "_") as keyof typeof Status]
    );
  });

  const handleCreateTask = () => {
    setCurrentTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsTaskModalOpen(true);
  };

const createTask = api.task.create.useMutation({
  onSuccess: (newTask) => {
    console.log('New task created:', newTask);
    setTasks([...tasks, newTask]);
  },
});

  const updateTask = api.task.update.useMutation({
    onSuccess: (updatedTask) => {
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    },
  });

  const deleteTask = api.task.delete.useMutation({
    onSuccess: (_, variables) => {
      setTasks(tasks.filter((task) => task.id !== variables.id));
    },
  });

  const handleSaveTask = (task: Task) => {
    if (task.id) {
      updateTask.mutate({
        id: task.id,
        data: {
          title: task.title,
          description: task.description,
          assigned_to: task.assignee.id,
          deadline: new Date(task.deadline),
          priority: task.priority,
          status: task.status,
          tags: task.tags,
        },
      });
    } else {
      createTask.mutate({
        title: task.title,
        description: task.description,
        assigned_to: task.assignee.id,
        deadline: new Date(task.deadline),
        priority: task.priority,
        status: task.status,
        tags: task.tags,
      });
    }
    setIsTaskModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
          <button
            onClick={handleCreateTask}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            + New Task
          </button>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {(["all", "todo", "in-progress", "done"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {tab
                    .split("-")
                    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                    .join(" ")}{" "}
                  (
                  {tab === "all"
                    ? tasks.length
                    : tasks.filter((t) => 
                        t.status === Status[tab.toUpperCase().replace("-", "_") as keyof typeof Status]
                      ).length}
                  )
                </button>
              ))}
            </nav>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Task
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Assignee
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Deadline
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Priority
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {task.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {task.description?.substring(0, 50)}...
                          </div>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {task.tags?.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <Image
                          width={32}
                          height={32}
                          className="rounded-full"
                          src={task.assignee.avatar}
                          alt={task.assignee.name}
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {task.assignee.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {new Date(task.deadline).toLocaleDateString()}
                      </div>
                      <div
                        className={`text-xs ${
                          new Date(task.deadline) < new Date()
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {new Date(task.deadline) < new Date()
                          ? "Overdue"
                          : "Due"}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          task.priority === Priority.HIGH
                            ? "bg-red-100 text-red-800"
                            : task.priority === Priority.MEDIUM
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          task.status === Status.TODO
                            ? "bg-gray-100 text-gray-800"
                            : task.status === Status.IN_PROGRESS
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {task.status
                          .split("_")
                          .map(
                            (s) =>
                              s.charAt(0).toUpperCase() +
                              s.slice(1).toLowerCase()
                          )
                          .join(" ")}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="mr-3 text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask.mutate({ id: task.id })}
                        className="text-red-600 hover:text-red-900"
                        disabled={deleteTask.isPending}
                      >
                        {deleteTask.isPending ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isTaskModalOpen && (
        <TaskModal
          task={currentTask}
          onClose={() => setIsTaskModalOpen(false)}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}
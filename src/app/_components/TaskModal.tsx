import { useState } from "react";
import { Priority, Status, type Task, type User } from "~/types";

const teamMembers: User[] = [
  { id: "user1", name: "Alex Johnson", avatar: "/avatars/alex.jpg" },
  { id: "user2", name: "Sam Wilson", avatar: "/avatars/sam.jpg" },
  { id: "user3", name: "Taylor Smith", avatar: "/avatars/taylor.jpg" },
  { id: "user4", name: "Jordan Lee", avatar: "/avatars/jordan.jpg" },
];

const TaskModal = ({
  task,
  onClose,
  onSave,
}: {
  task: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
}) => {
  const [formData, setFormData] = useState<Task>(
    task ?? {
      id: "",
      title: "",
      description: "",
      assignee: teamMembers[0]!,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]!,
      priority: Priority.MEDIUM,
      status: Status.TODO,
      tags: [],
      createdAt: new Date(),
    },
  );
  const [newTag, setNewTag] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = teamMembers.find((m) => m.id === e.target.value);
    if (selected) setFormData((prev) => ({ ...prev, assignee: selected }));
  };

  const handleAddTag = () => {
    const tag = newTag.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="relative max-h-full w-full max-w-2xl p-4">
        <div className="relative rounded-lg bg-white shadow-lg dark:bg-white dark:text-black">
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {task ? "Edit Task" : "Create New Task"}
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900">
                Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900"
                placeholder="Task title"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900"
                placeholder="Write task description"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-900">
                  Assignee
                </label>
                <select
                  name="assignee"
                  value={formData.assignee.id}
                  onChange={handleAssigneeChange}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900"
                >
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-900">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-900">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900"
                >
                  {Object.values(Priority).map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-900">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900"
                >
                  {Object.values(Status).map((s) => (
                    <option key={s} value={s}>
                      {s
                        .replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900">
                Tags
              </label>
              <div className="mb-2 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-blue-500 hover:text-blue-700"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="New tag"
                  className="flex-1 rounded-l-lg border border-gray-300 p-2 text-sm text-gray-900"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="rounded-r-lg border border-l-0 border-gray-300 bg-gray-100 px-4 text-sm hover:bg-gray-200"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                {task ? "Update Task" : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

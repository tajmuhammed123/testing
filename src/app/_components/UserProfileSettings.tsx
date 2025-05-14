import Image from "next/image";
import { useState } from "react";

const UserProfileSettings = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "project">("profile");

  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/avatars/alex.jpg",
    bio: "Frontend developer with 5 years of experience",
    position: "Senior Developer",
  });

  const [projectData, setProjectData] = useState({
    title: "Task Management App",
    description: "A modern task management application for teams",
    teamMembers: [
      {
        id: "user1",
        name: "Alex Johnson",
        avatar: "/avatars/alex.jpg",
        role: "Admin",
      },
      {
        id: "user2",
        name: "Sam Wilson",
        avatar: "/avatars/sam.jpg",
        role: "Developer",
      },
      {
        id: "user3",
        name: "Taylor Smith",
        avatar: "/avatars/taylor.jpg",
        role: "Designer",
      },
    ],
  });

  const [newMemberEmail, setNewMemberEmail] = useState("");

  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleProjectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserData({
            ...userData,
            avatar: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddMember = () => {
    if (newMemberEmail.trim()) {
      alert(`Invitation sent to ${newMemberEmail}`);
      setNewMemberEmail("");
    }
  };

  const handleRemoveMember = (id: string) => {
    setProjectData({
      ...projectData,
      teamMembers: projectData.teamMembers.filter((member) => member.id !== id),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "profile"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Profile Settings
              </button>
              <button
                onClick={() => setActiveTab("project")}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "project"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Project Settings
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "profile" ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Personal Information
                </h2>

                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex-shrink-0">
                    <Image
                      src={userData.avatar}
                      alt={userData.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <label className="mt-2 block">
                      <span className="sr-only">Choose profile photo</span>
                      <input
                        type="file"
                        onChange={handleAvatarChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </label>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleUserChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleUserChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Position
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={userData.position}
                    onChange={handleUserChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={userData.bio}
                    onChange={handleUserChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="flex justify-end">
                  <button className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Project Information
                </h2>

                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={projectData.title}
                    onChange={handleProjectChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={projectData.description}
                    onChange={handleProjectChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-800">
                      Team Members
                    </h3>
                    <div className="flex">
                      <input
                        type="email"
                        value={newMemberEmail}
                        onChange={(e) => setNewMemberEmail(e.target.value)}
                        placeholder="Enter email to invite"
                        className="block w-full rounded-l-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleAddMember}
                        className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 hover:bg-gray-100"
                      >
                        Invite
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {projectData.teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                      >
                        <div className="flex items-center">
                          <Image
                            src={member.avatar}
                            alt={member.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {member.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {member.role}
                            </div>
                          </div>
                        </div>
                        {member.role !== "Admin" && (
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-sm font-medium text-red-600 hover:text-red-900"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                    Save Project Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;

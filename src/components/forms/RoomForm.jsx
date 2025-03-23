import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function RoomForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    topic: "",
    host: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    topic: "",
    host: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      description: "",
      topic: "",
      host: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Room name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.topic.trim()) {
      newErrors.topic = "Topic is required";
    }
    if (!formData.host.trim()) {
      newErrors.host = "Host name is required";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newRoom = {
      id: Date.now().toString(),
      ...formData,
      participants: 0,
    };

    // Here you would typically send the newRoom data to your backend
    // For now, we'll just navigate back to the rooms list
    router.push("/rooms");
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Room Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
            rows={3}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={(e) =>
              setFormData({ ...formData, topic: e.target.value })
            }
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
          />
          {errors.topic && (
            <p className="text-red-500 text-sm">{errors.topic}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="host"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Host Name
          </label>
          <input
            type="text"
            id="host"
            name="host"
            value={formData.host}
            onChange={(e) => setFormData({ ...formData, host: e.target.value })}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
          />
          {errors.host && <p className="text-red-500 text-sm">{errors.host}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors duration-200"
        >
          Create Room
        </button>
      </form>
    </div>
  );
}

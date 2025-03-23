"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  IconPlus,
  IconX,
  IconCheck,
  IconTrophy,
  IconBulb,
  IconArrowRight,
  IconBook,
  IconUsers,
} from "@tabler/icons-react";
import { rooms } from "@/data/rooms";
import { RoomCard } from "@/components/ui/RoomCard";

// Mock data - API data to be implemented later
const initialUserData = {
  fullName: "Jane Doe",
  role: "Student",
  school: "Riverside High School",
  completedCourses: 7,
  streak: 15,
  points: 2450,
  level: "Intermediate",
  avatarUrl: "/avatars/mantaka.jpg",
};

const initialAchievements = [
  {
    id: 1,
    title: "First Room Joined",
    description: "Joined your first study room",
    date: "2023-10-15",
    icon: "🎓",
  },
  {
    id: 2,
    title: "Streak Master",
    description: "Maintained a 7-day learning streak",
    date: "2023-10-22",
    icon: "🔥",
  },
  {
    id: 3,
    title: "Question Solver",
    description: "Answered 10 questions in study rooms",
    date: "2023-11-05",
    icon: "💡",
  },
  {
    id: 4,
    title: "AI Explorer",
    description: "Used the AI assistant 20 times",
    date: "2023-11-18",
    icon: "🤖",
  },
];

const initialTasks = [
  { id: 1, text: "Complete React fundamentals quiz", completed: false },
  { id: 2, text: "Join Advanced JavaScript room tonight", completed: false },
  { id: 3, text: "Submit project proposal", completed: true },
  { id: 4, text: "Review feedback on coding assignment", completed: true },
  {
    id: 5,
    text: "Prepare questions for tomorrow's Python session",
    completed: false,
  },
];

// Mock data for joined rooms - in a real app, this would come from user's profile or API
const initialJoinedRooms = [
  {
    id: "2",
    name: "Advanced JavaScript",
    description: "Dive deep into advanced JavaScript concepts.",
    topic: "JavaScript",
    host: "jane_smith",
    participants: 18,
  },
  {
    id: "5",
    name: "Python Data Science",
    description: "Explore data science with Python and Pandas.",
    topic: "Python",
    host: "data_guru",
    participants: 40,
  },
  {
    id: "1",
    name: "Introduction to React",
    description: "Learn the basics of React and build your first app.",
    topic: "React",
    host: "john_doe",
    participants: 25,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState(initialUserData);
  const [achievements, setAchievements] = useState(initialAchievements);
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [joinedRooms, setJoinedRooms] = useState(initialJoinedRooms);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Get recommended rooms based on user profile
  const recommendedRooms = rooms.slice(0, 3);

  return (
    <div className="container max-w-full mx-auto px-4 py-8 overflow-scroll">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Dashboard
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Welcome back, {userData.fullName}! Here's your learning progress.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Quick View */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={userData.avatarUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{userData.fullName}</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {userData.role} at {userData.school}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 rounded-full">
                  {userData.level}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-md">
              <p className="font-bold text-xl text-orange-600">
                {userData.completedCourses}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Courses
              </p>
            </div>
            <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-md">
              <p className="font-bold text-xl text-orange-600">
                {userData.streak}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Day Streak
              </p>
            </div>
            <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-md">
              <p className="font-bold text-xl text-orange-600">
                {userData.points}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Points
              </p>
            </div>
          </div>

          <Button
            onClick={() => router.push("/profile")}
            variant="outline"
            className="w-full mt-2"
          >
            View Full Profile
          </Button>
        </div>

        {/* To-Do List */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6 border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>Your Learning Tasks</span>
          </h2>

          <div className="mb-4 flex">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-grow px-3 py-2 border border-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
              onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
            />
            <Button
              onClick={handleAddTask}
              className="rounded-l-none bg-orange-500 h-11 hover:bg-orange-600"
            >
              <IconPlus size={16} />
            </Button>
          </div>

          <div className="space-y-2 max-h-[320px] overflow-y-auto">
            {tasks.length === 0 ? (
              <p className="text-center py-4 text-neutral-500 dark:text-neutral-400 text-sm">
                No tasks yet. Add some to track your learning!
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-md"
                >
                  <div className="flex items-center gap-2 flex-grow">
                    <button
                      onClick={() => toggleTaskComplete(task.id)}
                      className={`h-5 w-5 rounded-full flex items-center justify-center border ${
                        task.completed
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "border-neutral-400 dark:border-neutral-600"
                      }`}
                    >
                      {task.completed && <IconCheck size={12} />}
                    </button>
                    <span
                      className={`${
                        task.completed
                          ? "line-through text-neutral-400 dark:text-neutral-500"
                          : ""
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="h-6 w-6 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center"
                  >
                    <IconX size={14} className="text-neutral-500" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6 border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <IconTrophy size={20} className="text-orange-500" />
            <span>Your Achievements</span>
          </h2>

          <div className="space-y-3 max-h-[320px] overflow-y-auto">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {achievement.description}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      Unlocked:{" "}
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="mt-8 bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6 border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-lg font-bold mb-4">Your Learning Progress</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-orange-600">
                  React Fundamentals
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-orange-600">
                  75%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-neutral-200 dark:bg-neutral-700">
              <div
                style={{ width: "75%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
              ></div>
            </div>
          </div>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-orange-600">
                  JavaScript Advanced
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-orange-600">
                  45%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-neutral-200 dark:bg-neutral-700">
              <div
                style={{ width: "45%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
              ></div>
            </div>
          </div>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-orange-600">
                  Python Data Science
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-orange-600">
                  30%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-neutral-200 dark:bg-neutral-700">
              <div
                style={{ width: "30%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
              ></div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => router.push("/rooms")}
          variant="outline"
          className="w-full"
        >
          Continue Learning
        </Button>
      </div>

      {/* Your Joined Rooms Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <IconUsers size={20} className="text-orange-500" />
            <span>Your Joined Rooms</span>
          </h2>
          <Button
            variant="ghost"
            onClick={() => router.push("/create-room")}
            className="text-orange-500 hover:text-orange-600"
          >
            Create New Room
            <IconPlus size={16} className="ml-1" />
          </Button>
        </div>

        {joinedRooms.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-8 border border-neutral-200 dark:border-neutral-700 text-center">
            <IconBook size={48} className="mx-auto text-neutral-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Rooms Joined Yet</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Join study rooms to connect with peers and enhance your learning
              experience.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Browse Available Rooms
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {joinedRooms.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </div>
        )}
      </div>

      {/* Recommended Rooms */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <IconBulb size={20} className="text-orange-500" />
            <span>Recommended for You</span>
          </h2>
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-orange-500 hover:text-orange-600"
          >
            View All Rooms
            <IconArrowRight size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedRooms.map((room) => (
            <div
              key={room.id}
              className="py-3 px-4 rounded-xl border border-neutral-700 overflow-hidden transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
              onClick={() => router.push(`/room/${room.id}`)}
            >
              <div className="flex justify-between items-center">
                <p className="mb-5 text-subtle-white text-xl transition-all duration-300 hover:text-orange-400">
                  {room.name}
                </p>
                <p className="mb-3 text-xs font-medium text-subtle-white">
                  {room.participants} Joined
                </p>
              </div>
              <p className="mb-3 text-xs text-subtle-white">
                {room.description}
              </p>
              <hr className="border-t-[1px] border-subtle-purple" />

              <div className="flex justify-between mt-3">
                <div className="flex-none">
                  <p className="text-orange-400 text-xs hover:underline">
                    {room.host}
                  </p>
                </div>

                <div className="flex-none px-3 py-1 rounded-xl bg-orange-500">
                  <p className="text-xs font-semibold text-white">
                    {room.topic}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

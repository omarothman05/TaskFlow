"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load tasks");
          setLoading(false);
          return;
        }

        setTasks(data);
        setLoading(false);

      } catch (err) {
        console.log(err);
        setError("Server error");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);


  const toggleTask = async (id, currentStatus) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        completed: !currentStatus,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to update task");
      return;
    }

    setTasks((prev) =>
      prev.map((task) =>
        task._id === id
          ? { ...task, completed: !currentStatus }
          : task
      )
    );

  } catch (err) {
    console.log(err);
    alert("Server error");
  }
};

  const addTask = async () => {
    const token = localStorage.getItem("token");

    if (!title.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add task");
        return;
      }

      setTasks((prev) => [...prev, data]);
      setTitle("");

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  if (loading) return <div className="min-h-screen bg-white" />;

  const deleteTask = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to delete task");
      return;
    }

    setTasks((prev) => prev.filter((task) => task._id !== id));

  } catch (err) {
    console.log(err);
    alert("Server error");
  }
};

  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1 p-10">

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl mb-5">
          Dashboard
        </h1>
          <p className="text-sm text-gray-500 mb-5">
              💡 Tip: Click on a task to mark it as completed
          </p>
        </div>

        {error && (
          <p className="text-red-500 mb-3">
            {error}
          </p>
        )}

        <div className="mb-5 flex gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task..."
            className="border p-2 rounded w-full"
          />

          <button
            onClick={addTask}
            className="bg-slate-800 hover:bg-slate-900 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        <div className="space-y-3 mt-5">
          {tasks.length === 0 ? (
            <p>No tasks yet</p>
          ) : (
              tasks.map((task) => (
  <div
    key={task._id}
    className="p-3 border rounded flex justify-between items-center"
  >
    {/* Task title clickable */}
    <span
      onClick={() => toggleTask(task._id, task.completed)}
      className="cursor-pointer"
    >
      {task.title}
    </span>

    <div className="flex gap-3 items-center">

      <span className={task.completed ? "text-green-600" : "text-gray-500"}>
        {task.completed ? "✔ Done" : "⏳"}
      </span>

      <button
        onClick={() => deleteTask(task._id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>

    </div>
  </div>
))
          )}
        </div>

      </main>

      <Footer />

    </div>
  );
}
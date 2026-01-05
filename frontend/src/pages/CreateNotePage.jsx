import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";

import toast from "react-hot-toast";
import api from "../lib/axios";

function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      await api.post("/notes", { title, content });
      toast.success("Note Created");
      navigate("/");
    } catch (error) {
      console.log("Error Creating Note", error);
      if (error?.response?.status === 429) {
        toast.error("Slow Down! You are creating notes too fast");
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xl text-zinc-400 hover:text-white transition rounded-full hover:bg-white/10 px-4 py-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to notes
        </Link>
      </div>

      {/* Form Card */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/10 p-6 shadow-lg">
          <h1 className="text-xl font-semibold mb-6">Create Note</h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label className="block text-lg text-zinc-400 mb-1">Title*</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title"
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-2 text-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-lg text-zinc-400 mb-1">
                Content*
              </label>
              <textarea
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note..."
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-2 text-lg text-white placeholder-zinc-500 resize-none focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-green-400/80 text-black px-5 py-2 text-lg font-medium transition hover:bg-green-400/50 cursor-pointer"
              >
                {loading ? "Creating Note..." : "Create Note"}
                {/* Create Note */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNotePage;

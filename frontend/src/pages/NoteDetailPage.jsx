import { ArrowLeft, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Loader from "../component/Loader";

function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        console.log("In try");
        const res = await api.get(`/notes/${id}`);
        if (!res) toast.error("Failed to get data");
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note details", error);
        toast.error("Failed to get note details");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure do you want to delete this note?"))
      return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note Deleted Successfully");
      navigate("/");
    } catch (error) {
      console.log("Error in deleting node", error);
      toast.error("Failed to Delete Node");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title or Content field must not be empty");
      return;
    }
    setSaving(true)
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note Updated Successfully");
      navigate("/");
    } catch (error) {
      console.log("Error in updating note", error);
      toast.error("Failed to update note");
    } finally{
      setSaving(false)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white flex-col gap-2">
        <Loader />
        <h1 className="text-lg">Fetching Note Details...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 pt-5 flex items-center justify-between">
        <Link
          to={"/"}
          className="inline-flex items-center gap-2 text-xl text-zinc-400 hover:text-white transition rounded-full hover:bg-white/10 px-4 py-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back To Notes
        </Link>
        <button
          className="flex gap-2 items-center justify-center rounded-full bg-red-400/30 px-4 py-1 cursor-pointer transition-colors duration-200 text-xl hover:bg-red-500/50"
          onClick={handleDelete}
        >
          <Trash2 />
          Delete Note
        </button>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/10 p-6 shadow-lg">
          <h1 className="text-xl font-semibold mb-6">Note Details</h1>

          <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
            {/* Title */}
            <div>
              <label className="block text-lg text-zinc-400 mb-1">Title*</label>
              <input
                type="text"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
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
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
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
                {saving ? "Saving Note..." : "Save Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NoteDetailPage;

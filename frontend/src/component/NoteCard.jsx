import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";

import api from "../lib/axios";
import { formatDate } from "../lib/utils";

function NoteCard({ note, setNotes }) {
  const { _id, title, content, createdAt } = note;

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) return;

    try {
      await api.delete(`/notes/${_id}`);

      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== _id));

      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link to={`/note/${_id}`}>
      <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/10 p-5 transition-all duration-300 hover:bg-white/15 hover:shadow-lg">
        {/* Title */}
        <h4 className="text-lg font-semibold text-white mb-2 line-clamp-1">
          {title}
        </h4>

        {/* Content */}
        <p className="text-sm text-zinc-300 mb-4 line-clamp-4">{content}</p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>{formatDate(createdAt)}</span>

          {/* Actions */}

          <Trash2
            className="cursor-pointer text-red-500 transition-colors hover:text-red-600 rounded-full hover:bg-red-400/20 px-2 py-2"
            size={50}
            onClick={handleDelete}
          />
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;

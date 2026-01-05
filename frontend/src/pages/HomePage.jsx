import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import RateLimited from "../component/RateLimited";
import toast from "react-hot-toast";
import NoteCard from "../component/NoteCard";
import Loader from "../component/Loader";
import api from "../lib/axios";
import { Link } from "react-router";

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        setNotes(response.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error in fetching notes", error);
        if (error?.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isRateLimited && (
          <div className="mb-6">
            <RateLimited />
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        )}

        {!loading && !isRateLimited && notes.length === 0 && (
          <div className="text-center py-20 text-white">
            <h2 className="text-3xl font-semibold mb-2">No notes yet</h2>
            <p className="text-lg text-zinc-400 mb-2">
              Create your first note to get started ✨
            </p>
            <Link to={"/create"}>
              <button className="bg-green-400/30 p-2 rounded-full  font-medium text-xl hover:bg-green-500/50 cursor-pointer transition-colors duration-200">
                Create Note
              </button>
            </Link>
          </div>
        )}

        {!loading && !isRateLimited && notes.length > 0 && (
          <>
            <h1 className="text-2xl font-bold mb-6 tracking-tight">
              Your Notes
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default HomePage;

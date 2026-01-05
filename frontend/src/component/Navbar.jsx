import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

function Navbar() {
  return (
    <nav className="w-full bg-white/10 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-10 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h2 className="text-2xl md:text-3xl font-mono font-semibold text-green-400 tracking-wide">
          Thinkboard
        </h2>

        {/* Add Note Button */}
        <Link
          to="/create"
          className="
            inline-flex items-center gap-2
            rounded-full
            bg-green-400/90
            px-5 py-2
            text-black
            font-mono font-medium
            transition-all duration-200
            hover:bg-green-300
            focus:outline-none
            focus:ring-2 focus:ring-green-400/40
            shadow-md shadow-green-400/30
          "
        >
          <PlusIcon className="size-5" />
          <span>Add Note</span>
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;

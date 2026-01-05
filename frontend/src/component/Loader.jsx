import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center bg-black">
      <div className="h-12 w-12 rounded-full border-4 border-white/20 border-t-white animate-spin" />
    </div>
  );
}

export default Loader;

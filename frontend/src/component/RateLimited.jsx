import { Zap } from "lucide-react";
import React from "react";

function RateLimited() {
  return (
    <div className="w-full flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-lg flex items-start gap-4 rounded-xl border border-green-400/30 bg-white/10 backdrop-blur-sm p-5 shadow-md shadow-green-400/10">
        
        {/* Icon */}
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-400/20">
          <Zap className="size-5 text-green-400" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-mono font-semibold text-green-400">
            Rate Limit Reached
          </h1>

          <p className="text-sm text-gray-300 leading-snug">
            You have made too many requests in a short period of time.
          </p>

          <span className="text-xs text-gray-400">
            Please wait a few seconds and try again.
          </span>
        </div>
      </div>
    </div>
  );
}

export default RateLimited;

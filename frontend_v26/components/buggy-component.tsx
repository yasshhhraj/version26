"use client";

import { useState } from "react";

export default function BuggyComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("I crashed!");
  }

  return (
    <div className="p-4 border border-dashed border-gray-600 rounded-lg text-center">
      <p className="mb-4 text-gray-400">This component is working normally.</p>
      <button
        onClick={() => setShouldThrow(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Trigger Crash
      </button>
    </div>
  );
}

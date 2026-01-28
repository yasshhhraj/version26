"use client";

import ErrorBoundary from "@/components/error-boundary";
import BuggyComponent from "@/components/buggy-component";

export default function TestErrorPage() {
  return (
    <div className="min-h-screen bg-black text-white p-12 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error Boundary Test</h1>
          <p className="text-gray-400">
            Below is a component wrapped in an Error Boundary. Click the button to see how the boundary catches the error.
          </p>
        </div>

        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>

        <div className="pt-8 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-2">How to test?</h2>
          <ol className="list-decimal list-inside text-gray-400 space-y-2 text-sm">
            <li>Open the browser console (F12).</li>
            <li>Click "Trigger Crash".</li>
            <li>Observe that the UI updates to show the error message.</li>
            <li>Notice the error log in the console (captured by <code>componentDidCatch</code>).</li>
            <li>Click "Try again" to reset the boundary state.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

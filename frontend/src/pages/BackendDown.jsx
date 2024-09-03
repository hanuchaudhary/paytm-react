import React from 'react';

const BackendDown = () => {
  return (
    <div className="h-screen text-white flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-9xl font-bold mb-4">Error 404</h1>
        <h2 className="text-3xl mb-2">Oops! Something went wrong.</h2>
        <p className="text-xl mb-8">
          It looks like the server is down. We're working to resolve the issue as soon as possible.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md text-lg font-semibold"
          >
            Retry
          </button>
          <a
            href="/"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-lg font-semibold"
          >
            Go Home
          </a>
        </div>
        <p className="mt-12 text-zinc-400 text-sm">
          If the issue persists, please contact our support team at{" "}
          <a href="mailto:support@example.com" className="underline">
            support@example.com
          </a>.
        </p>
      </div>
    </div>
  );
};

export default BackendDown;

"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold">Ooops! Property not found!!</h2>
        <button
          onClick={() => reset()}
          className="rounded-md border border-gray-400 bg-gray-300 px-6 py-2 font-bold"
        >
          Try again
        </button>

        <p>Error: {JSON.stringify(error)}</p>
      </div>
    </div>
  );
}

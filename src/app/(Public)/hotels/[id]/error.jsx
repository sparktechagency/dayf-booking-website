"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong! Inside Dynamic Hotel Error Boundary</h2>
      <button onClick={() => reset()}>Try again</button>

      <p>Error: {JSON.stringify(error)}</p>
    </div>
  );
}

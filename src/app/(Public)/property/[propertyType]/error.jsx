"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Ooops! Property not found!!</h2>
      <button onClick={() => reset()}>Try again</button>

      <p>Error: {JSON.stringify(error)}</p>
    </div>
  );
}

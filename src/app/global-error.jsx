"use client";

export default function GlobalError({ error, reset }) {
  console.error("coming from global error===>", error);

  return (
    <html>
      <body>
        <h2>Something went wrong! {JSON.stringify(error)}</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}

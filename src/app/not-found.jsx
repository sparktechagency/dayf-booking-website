import { headers } from "next/headers";
import Link from "next/link";

export default async function NotFound() {
  const pathname = (await headers()).get("x-pathname");
  return (
    <div>
      <h2>404 | Not Found</h2>
      <p>Could not find requested resource {JSON.stringify(pathname)}</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}

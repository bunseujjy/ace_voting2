// app/actions.js
export async function getVoting() {
  const res = await fetch("http://localhost:3000/api/voting", {
    method: "GET",
    cache: "no-store", // optional: useful in server components to prevent caching
  });

  if (!res.ok) {
    throw new Error("Failed to fetch voting data");
  }

  return await res.json();
}

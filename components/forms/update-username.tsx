"use client";
// @ts-ignore
import { useState } from "react";
import type { UpdateUsername } from "@/app/types";
import type { User } from "@prisma/client";

export default function UpdateUsername({ user }: { user: User }) {
  const [slug, setSlug] = useState(user?.slug);

  const submit = async () => {
    const body = Object.assign(user, { slug });

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result: UpdateUsername = await res.json();
    console.log({ result });
  };

  return (
    <form action={submit}>
      <input
        id="username"
        name="username"
        placeholder="Enter a username"
        onChange={(e) => setSlug(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}

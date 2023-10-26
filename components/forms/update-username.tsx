"use client";
// @ts-ignore
import { useState } from "react";
import { useRouter } from "next/navigation";
import { post } from "@/lib/utils";
import Button from "@/components/shared/button";
import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";
import type { UpdateUsernameResp } from "@/app/types";
import type { User } from "@prisma/client";
import Input from "../shared/input";

export default function UpdateUsername({ user }: { user: User }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState(user?.slug);
  const router = useRouter();

  const submit = async () => {
    setLoading(true);
    const data: User = Object.assign(user, { slug });
    const res = await post("/api/user", data);

    const result: UpdateUsernameResp = await res.json();

    if (result?.user.slug === slug) {
      router.refresh();
    } else {
      console.error("Failed to update username!", { result });
      setError("Failed to update username!");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <p className="my-2">Add a username to continue...</p>
      {error && <Error message={error} />}
      <form action={submit} className="flex flex-col space-y-4">
        <Input
          id="username"
          placeholder="Enter a username"
          onChange={(e) => setSlug(e.target.value)}
        />

        <Button isSubmit disabled={loading}>
          Add
        </Button>
      </form>
    </div>
  );
}

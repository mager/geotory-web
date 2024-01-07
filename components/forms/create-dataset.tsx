"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { CreateDatasetResp } from "@/app/types";
import Button from "@/components/shared/button";
import Error from "@/components/shared/error";
import Input from "@/components/shared/input";
import Loading from "@/components/shared/loading";
import { getDatasetSource, post } from "@/lib/utils";
import { User } from "@prisma/client";

type Props = {
  user: User;
};

const CreateDataset = ({ user }: Props) => {
  const router = useRouter();

  // State
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState(name);
  const [source, setSource] = useState("");

  const setNameAndSlug = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setSlug(slug);
    setName(name);
  };

  const submit = async () => {
    setLoading(true);
    const data = {
      name,
      description,
      source: getDatasetSource(source),
      slug,
    };

    const res = await post("/api/datasets", data);
    const result: CreateDatasetResp = await res.json();
    setLoading(false);

    if (result.dataset) {
      router.push(`/${user.slug}/${slug}`);
    } else {
      console.error("Failed to create dataset!", { result });
      setError("Failed to create dataset!");
    }
  };

  if (loading) {
    return <Loading message="Doing some geometry..." />;
  }

  return (
    <div className="py-4">
      {error && <Error message={error} />}
      <form action={submit} className="mb-2 flex flex-col">
        <Input
          label="Name"
          id="name"
          placeholder="Enter a name"
          onChange={(e) => setNameAndSlug(e.target.value)}
        />
        <Input
          label="Slug"
          id="slug"
          value={slug}
          placeholder="This will get updated automatically"
          onChange={(e) => setSlug(e.target.value)}
        />
        <Input
          label="Description"
          id="description"
          value={description}
          placeholder="Describe your dataset"
          onChange={(e) => setDescription(e.target.value)}
          multiline
        />
        <Input
          label="Source"
          id="source"
          placeholder="Enter a source (ex: https://github.com/mager/maps/tree/main/illinois)"
          onChange={(e) => setSource(e.target.value)}
        />

        <Button isSubmit disabled={loading}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateDataset;

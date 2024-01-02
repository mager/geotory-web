"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { del } from "@/lib/utils";
import ModalV2 from "@/components/shared/modal-v2";
import Button from "@/components/shared/button";
import Error from "../shared/error";

type Props = {
  slug: string;
  username: string;
};

const DeleteDataset = ({ slug, username }: Props) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    const res = await del(`/api/datasets/${username}/${slug}`);

    if (res.ok) {
      router.push("/dashboard");
      setShowModal(false);
    } else {
      console.error("Failed to delete dataset!", { res });
      setError("Failed to delete dataset!");
    }
  };

  return (
    <div>
      <Button danger onClick={() => setShowModal(true)}>
        Delete dataset
      </Button>
      <ModalV2
        setShowModal={setShowModal}
        showModal={showModal}
        submit={submit}
      />
      {error && <Error message={error} />}
    </div>
  );
};

export default DeleteDataset;

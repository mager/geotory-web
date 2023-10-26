"use client";
import { useCreateDatasetModal } from "../datasets/create-dataset-modal";
import Button from "@/components/shared/button";
import Text from "@/components/shared/text";

export default function DashboardWelcome() {
  const { CreateDatasetModal, setShowModal } = useCreateDatasetModal();
  return (
    <div className="my-4">
      <Text>You don&lsquo;t have any datasets.</Text>
      <CreateDatasetModal />
      <Button onClick={() => setShowModal(true)}>Create a dataset</Button>
    </div>
  );
}

"use client";
import { useCreateDatasetModal } from "../datasets/create-dataset-modal";
import Button from "../shared/button";

export default function DashboardWelcome() {
  const { CreateDatasetModal, setShowModal } = useCreateDatasetModal();
  return (
    <div className="my-4">
      <p>You don&lsquo;t have any datasets.</p>
      <CreateDatasetModal />
      <Button onClick={() => setShowModal(true)}>Create a dataset</Button>
    </div>
  );
}

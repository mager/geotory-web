import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import CreateDataset from "../forms/create-dataset";

const CreateDatasetModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className="w-full overflow-hidden pb-8 shadow-xl md:max-w-md md:rounded-2xl">
        <div className="flex flex-col items-center justify-center bg-white px-4 py-4 text-center md:px-16">
          <h3 className="font-serif text-2xl font-bold">Create a Dataset</h3>
        </div>
        <CreateDataset setShowModal={setShowModal} />
      </div>
    </Modal>
  );
};

export default CreateDatasetModal;

export function useCreateDatasetModal() {
  const [showModal, setShowModal] = useState(false);

  const CreateDatasetModalCallback = useCallback(() => {
    return (
      <CreateDatasetModal showModal={showModal} setShowModal={setShowModal} />
    );
  }, [showModal, setShowModal]);

  return useMemo(
    () => ({ setShowModal, CreateDatasetModal: CreateDatasetModalCallback }),
    [setShowModal, CreateDatasetModalCallback],
  );
}

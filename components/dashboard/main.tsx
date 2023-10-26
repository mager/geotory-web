"use client";
import { useCreateDatasetModal } from "../datasets/create-dataset-modal";
import Button from "@/components/shared/button";
import Text from "@/components/shared/text";
import { getDatasetLink } from "@/lib/utils";
import { Dataset, User } from "@prisma/client";
import Link from "next/link";

export default function DashboardMain({
  datasets,
  user,
}: {
  datasets?: Dataset[];
  user: User;
}) {
  const { CreateDatasetModal, setShowModal } = useCreateDatasetModal();

  return (
    <div className="my-4">
      {!datasets ||
        (datasets.length === 0 && (
          <div>
            <Text>You don&lsquo;t have any datasets.</Text>
            <CreateDatasetModal />
            <Button onClick={() => setShowModal(true)}>Create a dataset</Button>
          </div>
        ))}
      {datasets && datasets.length > 0 && (
        <div>
          <Text>You have {datasets.length} datasets.</Text>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {datasets.map((dataset) => (
              <div key={dataset.id} className="rounded-lg bg-gray-200 p-4">
                <Text>
                  <Link href={getDatasetLink(user.slug, dataset.slug)}>
                    {dataset.name}
                  </Link>
                </Text>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

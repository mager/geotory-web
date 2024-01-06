import Link from "next/link";
import { DatasetT } from "@/app/types";
import Text from "@/components/shared/text";
import { getDatasetLink } from "@/lib/utils";
import { Dataset, User } from "@prisma/client";

const renderDataset = (user: User, dataset: Dataset) => (
  <div
    key={dataset.id}
    className="rounded-md border-2 border-gray-200 px-2 py-4"
  >
    <Text className="mb-0">
      <Link href={getDatasetLink(user.slug, dataset.slug)}>{dataset.name}</Link>
    </Text>
  </div>
);

export { renderDataset };

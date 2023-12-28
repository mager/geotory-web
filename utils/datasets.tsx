import Link from "next/link";
import { DatasetT } from "@/app/types";
import Text from "@/components/shared/text";
import { getDatasetLink } from "@/lib/utils";
import { Dataset, User } from "@prisma/client";

const renderDataset = (user: User, dataset: Dataset) => (
  <div key={dataset.id} className="rounded-lg bg-gray-200 p-4">
    <Text>
      <Link href={getDatasetLink(user.slug, dataset.slug)}>{dataset.name}</Link>
    </Text>
  </div>
);

export { renderDataset };

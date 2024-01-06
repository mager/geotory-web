import Link from "next/link";
import { DatasetT } from "@/app/types";
import Text from "@/components/shared/text";
import { getDatasetLink } from "@/lib/utils";
import { Dataset, User } from "@prisma/client";

const renderDataset = (user: User, dataset: Dataset) => (
  <a
    href={getDatasetLink(user.slug, dataset.slug)}
    key={dataset.id}
    className="flex transform flex-col overflow-hidden rounded-md border border-gray-300 from-blue-200 to-blue-300 transition-transform hover:scale-105 hover:bg-gradient-to-r hover:shadow-lg"
  >
    <div className="flex-grow p-4">
      <Text className="mb-2 text-lg font-semibold">{dataset.name}</Text>
      {/* Add more information or details about the dataset if needed */}
    </div>
    <div className="bg-gray-200 p-2 text-center">
      <Text className="text-sm">{dataset.description}</Text>
    </div>
  </a>
);

export { renderDataset };

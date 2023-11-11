import { DatasetT, DatasetType } from "@/app/types";
import Avatar from "@/components/shared/avatar";
import Text from "@/components/shared/text";
import { getHost, getUser, getImageURL, getDownloadZipURL } from "@/lib/utils";
import { Dataset } from "@prisma/client";
import Image from "next/image";
import { FolderArchive } from "lucide-react";

async function getDataset(
  username: string,
  slug: string,
): Promise<DatasetT | null> {
  const url = `${getHost()}/datasets/${username}/${slug}`;
  const resp = await fetch(url);

  if (resp.status >= 400) {
    return null;
  }

  const data = await resp.json();
  return data;
}

const notFound = <div>Dataset not found</div>;

export default async function Dataset({
  params: { username, slug },
}: {
  params: { username: string; slug: string };
}) {
  const dataset = await getDataset(username, slug);

  if (!dataset) {
    return notFound;
  }

  return (
    <div className="flex w-full flex-col justify-between px-5">
      <div>
        <div>
          <h1 className="mb-1 text-4xl">{dataset.name}</h1>
          <div className="mb-2 flex space-x-2">
            {dataset.user.image && (
              <Avatar src={dataset.user.image} width={24} height={24} />
            )}
            <Text>{username}</Text>
          </div>
          <div className="mb-4">
            <p className="text-md italic text-gray-500">
              {dataset.description}
            </p>
          </div>
          {dataset.types && dataset.types.length > 0 && (
            <div className="mb-4">
              {dataset.types.map((type, i) => (
                <span
                  key={i}
                  className="mr-1 inline-block rounded bg-emerald-200 px-2 py-1 text-xs font-semibold uppercase text-emerald-600 last:mr-0"
                >
                  {type.name}
                </span>
              ))}
            </div>
          )}
          {dataset.image && (
            <div className="my-8">
              <Image
                src={getImageURL(dataset)}
                alt="Dataset image"
                width="0"
                height="0"
                sizes="100vw"
                className="h-auto w-full"
              />
            </div>
          )}
          <div className="mb-4">
            <button
              disabled
              className="inline-block rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-300"
            >
              <FolderArchive className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

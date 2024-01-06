import cx from "classnames";
import Image from "next/image";
import Link from "next/link";

import { nunitoSans, nunitoSansHeavy } from "@/app/fonts";
import { DatasetT } from "@/app/types";
import { Downloads } from "@/components/datasets/downloads";
import Map from "@/components/map";
import DeleteDataset from "@/components/datasets/delete-dataset";
import { getHost, getImageURL } from "@/lib/utils";
import { Dataset } from "@prisma/client";

async function getDataset(
  username: string,
  slug: string,
): Promise<DatasetT | null> {
  const url = `${getHost()}/datasets/${username}/${slug}`;
  const resp = await fetch(url, {
    next: { revalidate: 10 },
  });

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
    <div className="flex w-full flex-col justify-between px-5 md:flex-row">
      <div className="debug-3 md:w-1/3 lg:w-1/4">
        <h1
          className={cx(
            `mb-1 text-3xl tracking-tight`,
            nunitoSansHeavy.className,
          )}
        >
          {dataset.name}
        </h1>
        <div className="mb-2 flex items-center space-x-2">
          {dataset.user.image && (
            <Link href={`/${username}`}>
              <div className="h-6 w-6">
                <Image
                  src={dataset.user.image}
                  width={24}
                  height={24}
                  alt="Avatar"
                />
              </div>
            </Link>
          )}
          <Link href={`/${username}`}>
            <h3
              className={cx(
                `mb-0 text-lg tracking-tight`,
                nunitoSans.className,
              )}
            >
              {username}
            </h3>
          </Link>
        </div>
        <div className="mb-2">
          <p className="text-xs italic text-gray-500">
            {/* TODO: Get locale */}
            {`Created ${dataset.createdAt}`}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-md italic text-gray-500">{dataset.description}</p>
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
        <h2>TODO: Properties</h2>
        <Downloads slug={slug} dataset={dataset} username={username} />
        <DeleteDataset slug={slug} username={username} />
      </div>
      <div className="debug-2 w-full md:w-2/3 lg:w-3/4">
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
        {dataset.geojson && (
          <div className="relative mb-8 h-96 w-full">
            <Map
              centroid={dataset.centroid}
              geojsonData={dataset.geojson}
              zoom={5}
            />
          </div>
        )}
      </div>
    </div>
  );
}

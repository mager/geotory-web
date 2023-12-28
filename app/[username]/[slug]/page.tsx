import cx from "classnames";
import type { Feature, GeoJSON } from "geojson";
import Image from "next/image";
import Link from "next/link";

import { nunitoSansHeavy } from "@/app/fonts";
import { DatasetT } from "@/app/types";
import { Downloads } from "@/components/datasets/downloads";
// import Map from "@/components/map";
import Avatar from "@/components/shared/avatar";
import Text from "@/components/shared/text";
import { getHost, getImageURL } from "@/lib/utils";
import { Dataset } from "@prisma/client";
import Map from "@/components/map";

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
    <div className="flex w-full flex-col justify-between px-5">
      <div>
        <div>
          <h1
            className={cx(
              `mb-1 text-5xl tracking-tight`,
              nunitoSansHeavy.className,
            )}
          >
            {dataset.name}
          </h1>
          <div className="mb-2 flex space-x-2">
            {dataset.user.image && (
              <Link href={`/${username}`}>
                <Avatar src={dataset.user.image} width={24} height={24} />
              </Link>
            )}
            <Link href={`/${username}`}>
              <Text className="mb-0">{username}</Text>
            </Link>
          </div>
          <div className="mb-2">
            <p className="text-sm italic text-gray-500">
              {/* TODO: Get locale */}
              {`Created ${dataset.createdAt}`}
            </p>
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
          {dataset.geojson && (
            <div className="relative mb-8 h-64 w-full">
              <Map
                centroid={dataset.centroid}
                geojsonData={dataset.geojson}
                zoom={5}
              />
            </div>
          )}
          <Downloads username={username} slug={slug} dataset={dataset} />
        </div>
      </div>
    </div>
  );
}

import cx from "classnames";
import Image from "next/image";
import Link from "next/link";

import { nunitoSans } from "@/app/fonts";
import { Downloads } from "@/components/datasets/downloads";
import Map from "@/components/map";
// import DeleteDataset from "@/components/datasets/delete-dataset";
import H1 from "@/components/shared/h1";
import H3 from "@/components/shared/h3";
import { getDataset, getImageURL } from "@/lib/utils";
import GeoJSONTable from "@/components/datasets/geojson-table";

type Props = {
  params: {
    username: string;
    slug: string;
  };
};

const notFound = <div>Dataset not found</div>;

const Dataset = async ({ params: { username, slug } }: Props) => {
  const dataset = await getDataset(username, slug);

  if (!dataset) {
    return notFound;
  }

  return (
    <div
      className={cx(
        // "debug md:debug-1 lg:debug-2 xl:debug-3",
        "grid w-full grid-cols-1 gap-4 overflow-hidden px-5",
        "lg:grid-cols-2",
        "xl:grid-cols-3",
      )}
    >
      <div className="title order-1">
        <H1>{dataset.name}</H1>
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
        <Downloads slug={slug} dataset={dataset} username={username} />
      </div>
      <div className="map order-2 h-64 w-full lg:h-96 xl:col-span-2">
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
          <div className="relative mb-8 h-full w-full">
            <Map
              centroid={dataset.centroid}
              geojsonData={dataset.geojson}
              zoom={dataset.zoom}
            />
          </div>
        )}
      </div>
      <div className="properties order-3 overflow-scroll lg:col-span-2 xl:col-span-3">
        <H3>Properties</H3>
        <GeoJSONTable features={dataset.geojson.features} />
      </div>
      {/* <div>
        <H3>Actions</H3>
        <DeleteDataset slug={slug} username={username} />
      </div> */}
    </div>
  );
};

export default Dataset;

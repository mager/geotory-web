import Image from "next/image";
import cx from "classnames";

import H1 from "@/components/shared/h1";
import { getUser } from "@/lib/utils";
import { getDatasets } from "@/lib/prisma";
import { renderDataset } from "utils/datasets";

const notFound = <div>Dataset not found</div>;

export default async function Dataset({
  params: { username },
}: {
  params: { username: string; slug: string };
}) {
  const user = await getUser(username);

  if (!user) {
    return notFound;
  }

  const datasets = await getDatasets(user);

  return (
    <div className="flex w-full flex-col justify-between px-5">
      <div>
        <div>
          <div className="mb-8 flex space-x-2">
            {user.image && (
              <div className="h-9 w-9">
                <Image src={user.image} width={36} height={36} alt="Avatar" />
              </div>
            )}
            <H1>{user.slug}</H1>
          </div>
          <div>
            {datasets && datasets.length > 0 && (
              <div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {datasets.map((dataset) => renderDataset(user, dataset))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import Avatar from "@/components/shared/avatar";
import Text from "@/components/shared/text";
import { getHost, getUser } from "@/lib/utils";
import Link from "next/link";

async function getDataset(username: string, slug: string) {
  const resp = await fetch(`${getHost()}/datasets/${username}/${slug}`);
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
        </div>
        <p className="text-md italic text-gray-500">{dataset.description}</p>
      </div>
    </div>
  );
}

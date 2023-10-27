import Avatar from "@/components/shared/avatar";
import Text from "@/components/shared/text";
import { getUser } from "@/lib/utils";
import Link from "next/link";

async function getDataset(userID: string, slug: string) {
  const response = await prisma?.dataset.findFirst({
    where: {
      userId: userID,
      slug: slug,
    },
  });
  return response;
}

const notFound = <div>Dataset not found</div>;

export default async function Dataset({
  params: { username, slug },
}: {
  params: { username: string; slug: string };
}) {
  const user = await getUser(username);

  if (!user) {
    return notFound;
  }

  const dataset = await getDataset(user.id, slug);

  if (!dataset) {
    return notFound;
  }

  return (
    <div className="flex w-full flex-col justify-between px-5">
      <div>
        <div className="debug-3 text-sm">
          Datasets / <Link href={`/${user.slug}`}>{user.slug}</Link>
        </div>
        <div>
          <h1 className="text-3xl">{dataset.name}</h1>
          <div className="mb-2 flex space-x-2">
            {user.image && <Avatar src={user.image} width={24} height={24} />}
            <Text>{user.slug}</Text>
          </div>
        </div>
        <p className="text-md italic text-gray-500">{dataset.description}</p>
      </div>
    </div>
  );
}

import Avatar from "@/components/shared/avatar";
import { getCurrentUser, getUser } from "@/lib/utils";

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
        <div>
          {user.image && <Avatar src={user.image} />}
          <h1 className="text-2xl">{dataset.name}</h1>
        </div>
        <p className="text-lg italic text-gray-500">{dataset.description}</p>
      </div>
    </div>
  );
}

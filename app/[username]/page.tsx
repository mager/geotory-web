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
  params: { username },
}: {
  params: { username: string; slug: string };
}) {
  const user = await getUser(username);

  if (!user) {
    return notFound;
  }

  return (
    <div className="flex w-full flex-col justify-between px-5">
      <div>
        <div>
          <div className="mb-2 flex space-x-2">
            {user.image && <Avatar src={user.image} width={24} height={24} />}
            <Text>{user.slug}</Text>
          </div>
        </div>
      </div>
    </div>
  );
}

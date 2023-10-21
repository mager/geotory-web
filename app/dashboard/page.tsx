import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return <h1>Not logged in</h1>;
  }

  const { user } = session;

  return (
    <div>
      <div className="flex">
        <h1>Hello, {user.name}!</h1>
      </div>
    </div>
  );
}

import { getUser } from "@/lib/utils";
import UpdateUsername from "@/components/forms/update-username";

export default async function Page() {
  const user = await getUser();

  return (
    <div className="flex w-full flex-col justify-between px-5">
      <div>
        <h1>Welcome, {user?.name}!</h1>
      </div>
      {user && !user.slug ? (
        <div>
          <p>Add a username to continue:</p>
          <UpdateUsername user={user} />
        </div>
      ) : (
        <div>
          <p>Create a dataset</p>
        </div>
      )}
    </div>
  );
}

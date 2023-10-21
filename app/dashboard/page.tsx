import { getUser } from "@/lib/utils";
export default async function Page() {
  const user = await getUser();

  return (
    <div className="flex w-full flex-col justify-between px-5">
      <div className="debug">
        <h1>Welcome, {user?.name}!</h1>
      </div>
      {user && !user.slug ? (
        <div className="debug-2">
          <p>Add a username to continue</p>
        </div>
      ) : (
        <div>
          <p>Create a dataset</p>
        </div>
      )}
    </div>
  );
}

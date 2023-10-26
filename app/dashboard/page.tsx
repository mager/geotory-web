// import useSWR from "swr";
import { getUser } from "@/lib/utils";
import UpdateUsername from "@/components/forms/update-username";
import DashboardWelcome from "@/components/dashboard/dashboard-welcome";

export default async function Page() {
  const user = await getUser();

  return (
    <div className="flex w-full flex-col justify-between px-5">
      <div>
        <h1 className="text-2xl">Welcome, {user?.name}!</h1>
      </div>
      {user && !user.slug ? (
        <UpdateUsername user={user} />
      ) : (
        <DashboardWelcome user={user} />
      )}
    </div>
  );
}

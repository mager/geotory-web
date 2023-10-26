import { getUser } from "@/lib/utils";
import UpdateUsername from "@/components/forms/update-username";
import DashboardWelcome from "@/components/dashboard/dashboard-welcome";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();

  if (!user) {
    // Redirect the user to the homepage
    redirect("/");
    return null;
  }

  return (
    <div className="flex w-full flex-col justify-between px-5">
      <div>
        <h1 className="text-2xl">Welcome, {user?.name}!</h1>
      </div>
      {user && !user.slug ? (
        <UpdateUsername user={user} />
      ) : (
        <DashboardWelcome />
      )}
    </div>
  );
}

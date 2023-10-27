import { getCurrentUser } from "@/lib/utils";
import UpdateUsername from "@/components/forms/update-username";
import DashboardMain from "@/components/dashboard/main";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

async function getDatasets(user: User) {
  const response = await prisma?.dataset.findMany({
    where: {
      userId: user.id,
    },
  });
  return response;
}

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    // Redirect the user to the homepage
    redirect("/");
  }
  const datasets = await getDatasets(user);

  return (
    <div className="flex w-full flex-col justify-between px-5">
      <div>
        <h1 className="text-2xl">Welcome, {user?.name}!</h1>
      </div>
      {user && !user.slug ? (
        <UpdateUsername user={user} />
      ) : (
        <DashboardMain user={user} datasets={datasets} />
      )}
    </div>
  );
}

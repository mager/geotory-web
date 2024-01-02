import { getCurrentUser } from "@/lib/utils";
import { redirect } from "next/navigation";
import CreateDatasetV2 from "@/components/forms/create-dataset-v2";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    // Redirect the user to the homepage
    redirect("/");
  }

  return (
    <div className="flex w-full flex-col justify-between px-5">
      <div>
        <h1 className="text-2xl">Create a Dataset</h1>
        <CreateDatasetV2 user={user} />
      </div>
    </div>
  );
}

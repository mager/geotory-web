import { getCurrentUser } from "@/lib/utils";
import { redirect } from "next/navigation";

import CreateDataset from "@/components/forms/create-dataset";
import H1 from "@/components/shared/h1";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex w-full flex-col justify-between px-5">
      <div>
        <H1>Create a Dataset</H1>
        <CreateDataset user={user} />
      </div>
    </div>
  );
}

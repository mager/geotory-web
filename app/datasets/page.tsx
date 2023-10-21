import prisma from "@/lib/prisma";

async function getDatasets() {
  const response = await prisma?.dataset.findMany({});
  return response;
}

export default async function Page() {
  const ds = await getDatasets();
  console.log(ds);

  return (
    <div>
      <h1 className="text-2xl text-black">
        Let&lsquo;s explore some datasets!
      </h1>
    </div>
  );
}

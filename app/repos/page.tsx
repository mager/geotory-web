async function getRepos() {
  const response = await prisma?.repo.findMany({});
  return response;
}

export default async function Page() {
  const repos = await getRepos();
  console.log({ repos });

  return (
    <div>
      <h1 className="text-2xl text-black">Hello, Repo!</h1>
    </div>
  );
}

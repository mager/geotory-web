async function getUser(userID: string) {
  const response = await prisma?.account.findFirst({
    where: { providerAccountId: userID },
  });
  return response;
}

export default async function Home({ someProp }: { someProp: any }) {
  console.log({ someProp });

  const user = await getUser("17733");

  return (
    <>
      <div className="w-full px-5 xl:px-0">
        <h2 className="font-serif text-2xl">Welcome to Geotory!</h2>
        <p className="font-sansSerif">
          Geotory is an open, social repository of shapes, layers, maps, and
          other geo data.
        </p>
        <div className="mb-4 flex justify-center text-6xl">🗺️</div>
        <p className="font-sansSerif">
          Visit your profile, add some friends, or explore some data.
        </p>
      </div>
    </>
  );
}

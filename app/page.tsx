import Image from "next/image";
import Text from "@/components/shared/text";
import prisma from "@/lib/prisma";

async function getUser(userID: string) {
  const response = await prisma?.account.findFirst({
    where: { providerAccountId: userID },
  });
  return response;
}

export default async function Home() {
  return (
    <div className="w-full px-5 text-center">
      <h2 className="mb-4 font-serif text-2xl sm:text-3xl lg:text-5xl">
        Welcome to Geotory!
      </h2>
      <div className="mb-8">
        <Text>
          Geotory is an open, social repository of shapes, layers, maps, and
          other geodata.
        </Text>
      </div>
      <div className="mb-4 flex justify-center">
        <Image
          src="/map-400x400.png"
          width={400}
          height={400}
          className="w-48 md:w-64"
          alt="Geotory Logo"
        />
      </div>
    </div>
  );
}

import Text from "@/components/shared/text";
import prisma from "@/lib/prisma";
import { MapPin } from "lucide-react";

async function getUser(userID: string) {
  const response = await prisma?.account.findFirst({
    where: { providerAccountId: userID },
  });
  return response;
}

export default async function Home() {
  return (
    <>
      <div className="w-full px-5 text-center">
        <h2 className="mb-4 font-serif text-2xl lg:text-4xl">
          Welcome to Geotory!
        </h2>
        <Text>
          Geotory is an open, social repository of shapes, layers, maps, and
          other geo data.
        </Text>
        <div className="mb-4 flex justify-center">
          <MapPin size={64} strokeWidth={1.5} />
        </div>
      </div>
    </>
  );
}

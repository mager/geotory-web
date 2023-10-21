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
        <p className="mb-4 font-sansSerif">
          Geotory is an open, social repository of shapes, layers, maps, and
          other geo data.
        </p>
        <div className="mb-4 flex justify-center">
          <MapPin size={64} strokeWidth={1.5} />
        </div>
        <p className="font-sansSerif">
          Visit your profile, add some friends, or explore some data.
        </p>
      </div>
    </>
  );
}

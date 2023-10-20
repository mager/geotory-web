import postgres from "postgres";
import { GeotoryLanding } from "@/components/shared/icons";

async function getUser() {
  const db = process.env.DATABASE_URL;
  if (!db) {
    throw new Error("DATABASE_URL is not defined");
  }
  const sql = await postgres(db!, { ssl: "require" });

  const response = await sql`SELECT  FROM playing_with_neon;`;
  return response;
}

export default async function Home() {
  const user = await getUser();
  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h2 className="font-serif text-2xl">Welcome to Geotory!</h2>
        <p className="font-sansSerif">
          Geotory is an open, social repository of shapes, layers, maps, and
          other geo data.
        </p>
        <div className="flex justify-center">
          <GeotoryLanding />
        </div>
        <p className="font-sansSerif">
          Visit your profile, add some friends, or explore some data.
        </p>
      </div>
    </>
  );
}

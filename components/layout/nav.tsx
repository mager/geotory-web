import Navbar from "./navbar";
import { Session } from "next-auth";

export default async function Nav({ session }: { session: Session | null }) {
  return <Navbar session={session} />;
}

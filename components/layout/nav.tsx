import { Session } from "next-auth";
import { User } from "@prisma/client";
import Navbar from "./navbar";

const Nav = async ({
  session,
  user,
}: {
  session: Session | null;
  user: User | null;
}) => <Navbar session={session} user={user} />;

export default Nav;

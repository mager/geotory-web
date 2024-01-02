import { getCurrentUser, getHost } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.next();
}

export async function POST() {
  return NextResponse.next();
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();

  const url = new URL(request.url);
  const slug = url.pathname.split("/")[4];

  if (!user) {
    return NextResponse.next();
  }

  await fetch(`${getHost()}/datasets/${user.slug}/${slug}`, {
    method: "DELETE",
  });

  return NextResponse.redirect("/dashboard");
}

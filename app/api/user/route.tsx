import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ hello: "world" });
}

export async function POST(request: Request) {
  const body = await request.json();

  const response = await prisma.user.update({
    where: { id: body.id },
    data: {
      // Currently only updating the slug is possible
      slug: body.slug,
    },
  });

  return NextResponse.json({ user: response });
}

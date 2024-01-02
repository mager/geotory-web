import prisma from "@/lib/prisma";
import { getCurrentUser, getHost } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.next();
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  const body = await request.json();

  if (!user) {
    return NextResponse.next();
  }

  const response = await prisma.dataset.create({
    data: {
      name: body.name,
      description: body.description,
      source: body.source,
      userId: user.id,
      slug: body.slug,
    },
  });

  // Sync dataset
  await fetch(`${getHost()}/datasets/${user.slug}/${body.slug}`, {
    method: "PUT",
    next: { revalidate: 10 },
  });

  return NextResponse.json({ dataset: response });
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  const body = await request.json();

  if (!user) {
    return NextResponse.next();
  }

  await fetch(`${getHost()}/datasets/${user.slug}/${body.slug}`, {
    method: "DELETE",
    next: { revalidate: 10 },
  });
}

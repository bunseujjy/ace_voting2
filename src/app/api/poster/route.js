import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId, posterId } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
    }
    await prisma.poster.create({
      data: {
        userId,
        posterId,
      },
    });

    return NextResponse.json(
      { message: "Poster successfully created" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Failed to create poster", { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { userId, id, posterId } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
    }
    await prisma.$transaction([
      prisma.voting.deleteMany({ where: { posterId: posterId } }),
      prisma.votingTally.deleteMany({ where: { posterId: posterId } }),
      prisma.poster.delete({ where: { id } }),
    ]);

    return NextResponse.json(
      { message: "Poster successfully deleted" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete poster", { status: 500 });
  }
}

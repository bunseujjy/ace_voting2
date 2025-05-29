import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const cookieStore = cookies();
    let deviceId = await cookieStore.get("deviceId")?.value;

    // If no deviceId cookie exists, create one
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      cookieStore.set("deviceId", deviceId, {
        path: "/",
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }

    const { choice, posterId } = await request.json();

    // Check if this device already voted for this poster
    const alreadyVoted = await prisma.voting.findFirst({
      where: {
        deviceId,
        posterId,
      },
    });

    if (alreadyVoted) {
      return NextResponse.json(
        { message: "This device has already voted for this poster." },
        { status: 400 }
      );
    }

    // Record new vote
    await prisma.voting.create({
      data: {
        deviceId,
        posterId,
        choice,
      },
    });

    // Update or create tally
    const tally = await prisma.votingTally.findFirst({
      where: { posterId, choice },
    });

    if (tally) {
      await prisma.votingTally.update({
        where: { id: tally.id },
        data: { number: tally.number + 1 },
      });
    } else {
      await prisma.votingTally.create({
        data: {
          posterId,
          choice,
          number: 1,
        },
      });
    }

    return NextResponse.json(
      { message: "Vote recorded successfully." },
      {
        status: 201,
        headers: {
          "Set-Cookie": `deviceId=${deviceId}; Path=/; Max-Age=${
            60 * 60 * 24 * 365
          }`,
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response("Failed to create vote", { status: 500 });
  }
}

export async function GET() {
  try {
    const allVotes = await prisma.voting.findMany({});
    return NextResponse.json(allVotes);
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch votes", { status: 500 });
  }
}

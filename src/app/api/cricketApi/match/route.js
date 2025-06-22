import { connectDB } from "@/lib/mongodb";
import MatchDetailModel from "@/model/cricket/match";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const match = new MatchDetailModel({
  battingTeam: body.battingTeam,
  bowlingTeam: body.bowlingTeam,
  totalOvers: body.totalOvers,
  innings: 1,
  status: "playing",
  firstInnings: {
    totalRuns: 0,
    wickets: 0,
    allOvers: [],
    currentOver: []
  },
  secondInnings: {
    totalRuns: 0,
    wickets: 0,
    allOvers: [],
    currentOver: []
  }
});

    await match.save();

    return NextResponse.json(match, { status: 201 }); // ✅ Return full match object
  } catch (err) {
    return NextResponse.json(
      { error: "Error saving match details", message: err.message },
      { status: 500 }
    );
  }
}

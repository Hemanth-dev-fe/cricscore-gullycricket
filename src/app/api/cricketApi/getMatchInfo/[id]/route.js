import { connectDB } from "@/lib/mongodb";
import MatchDetailModel from "@/model/cricket/match";
import { NextResponse } from "next/server";

export async function GET(req,{params})
{
    try{

        connectDB()
        const {id}=params
        const match= await MatchDetailModel.findById(id)
        if (!match) return new Response("Match not found", { status: 404 });

  return Response.json(match);
    }
    catch(err)
    {
        return NextResponse.json({message:"getting error while getting matchinfo"||err.message})
    }
}
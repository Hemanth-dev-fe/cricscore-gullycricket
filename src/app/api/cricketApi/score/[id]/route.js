import { connectDB } from "@/lib/mongodb";
import MatchDetailModel from "@/model/cricket/match";
import { NextResponse } from "next/server";

export async function PATCH(req,{params})
{
    
    try{

        await connectDB()
        const {id}=params;
        const { innings, status, result, target, firstInnings, secondInnings } = await req.json();

const updated = await MatchDetailModel.findByIdAndUpdate(
  id,
  {
    innings,
    status,
    result,
    target,
    firstInnings,
    secondInnings
  },
  { new: true }
);


  return NextResponse.json(updated);
        
    }
    catch (err) {
        return NextResponse.json(
          { error: "Error saving match details", message: err.message },
          { status: 500 }
        );
      }
}
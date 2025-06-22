'use client'
import { getByIdMatchInfoThunk } from "@/reduxtoolkit/reducer/matchStartSlice"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function MatchInfoCard({matchId}) {
  const { matchInfo, totalRuns, wickets, innings,firstInnings,secondInnings,target,status,currentOver } = useSelector((state) => state.match)
  const current= innings===1?firstInnings:secondInnings
const dispatch=useDispatch()
  const batting = matchInfo?.battingTeam || ""
  const bowling = matchInfo?.bowlingTeam || ""
  const verticalFlex = batting.length > 10 || bowling.length > 10
  const [showDetails, setShowDetails] = useState(true)

const legalBalls = (Array.isArray(current.allOvers) ? current.allOvers.length : 0) * 6 +
(Array.isArray(current.currentOver) ? current.currentOver.filter(ball => ball !== "WD" && ball !== "NB").length : 0);

const over = Math.floor(legalBalls / 6);
const ball = legalBalls % 6;
   useEffect(() => {
    if (matchId) {
      dispatch(getByIdMatchInfoThunk(matchId));
    }
  }, [matchId]);

  return (
    <div className="flex items-center justify-center bg-gray-50 w-full max-w-3xl">
      <div className="bg-blue-100 p-4 rounded shadow mb-4 sm:w-1/2 w-full flex flex-col">
<button onClick={() => setShowDetails(!showDetails)} className="ml-auto w-fit">
            {showDetails ? <ChevronUp size={24} /> : <ChevronDown size={24}/>}
          </button>
        {/* Top Row with centered teams and right-aligned button */}
        <div className="flex items-center justify-between w-full mb-2">

          {/* Team names */}
          <div className={`w-full flex-1 flex justify-center ${verticalFlex ? "flex-col items-center" : "flex-row items-center"} gap-2`}>
            <span className={`bg-orange-400 px-4 py-2 rounded-full font-semibold shadow text-center break-words ${verticalFlex?"w-[150px]":"w-32"}`}>
              {batting}
            </span>
            <span className="font-bold text-lg px-2">vs</span>
            <span className={`bg-orange-400 px-4 py-2 rounded-full font-semibold shadow text-center break-words ${verticalFlex?"w-[150px]":"w-32"}`}>
              {bowling}
            </span>
          </div>

          {/* Toggle Arrow Button */}
          
        </div>

        {/* Match details */}
        {showDetails && (
  <div className="mt-4 font-bold text-lg text-center space-y-2">
    <p>Overs: {over}.{ball} /{matchInfo?.totalOvers}</p>
   

    {/* Show First Innings only */}
    {innings === 1 && (
       <>
       <p>Innings: {innings}</p>
      <p>Runs: {firstInnings.totalRuns}/{firstInnings.wickets}</p>
       </>
    )}

    {/* Show Target + Second Innings during 2nd innings */}
    {innings === 2 && status !== "Match Completed" && (
      <>
       <p>Innings: {innings}</p>
        <p>Target: {target}</p>
        <p>Runs: {secondInnings.totalRuns}/{secondInnings.wickets}</p>
      </>
    )}

    {/* Show Both after Match is Completed */}
    {status === "Match Completed" && (
      <>
        <p>First Innings: {firstInnings.totalRuns}/{firstInnings.wickets}</p>
        <p>Second Innings: {secondInnings.totalRuns}/{secondInnings.wickets}</p>
      </>
    )}
  </div>
)}

      </div>
    </div>
  )
}

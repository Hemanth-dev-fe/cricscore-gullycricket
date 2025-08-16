import { ballPlayed, cancelLastBall, resetMatch, updateScoreThunk ,startSecondInnings} from "@/reduxtoolkit/reducer/matchStartSlice";
import { useDispatch, useSelector } from "react-redux";
import store from "@/reduxtoolkit/store/store";
import ScoreDisplay from "./ScoreDisplay";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AllHistoryOversInfo from "./allHistoryOversInfo";
export default function ScoreButtons({matchId1}) {
  const buttons = ["0", "1", "2", "3", "4", "6", "WD", "NB", "W"];
  const [historyOvers,setHistoryOvers]=useState(false)
  const [allHistoryOvers,setAllHistoryOvers]=useState(false)
  const router=useRouter()
  const dispatch = useDispatch();
 
  // ✅ Get match ID from global state
  const matchId = useSelector((state) => state.match.matchInfo?._id);
  console.log("matchid:", matchId)
  const { totalRuns, allOvers, currentOver, wickets, innings,target } = useSelector(
    (state) => state.match
  );
const tofggleHistory=()=>{
  setHistoryOvers(true)

}
useEffect(() => {
    if(historyOvers)
    {
      router.push(`/matchHistory/${matchId1}`)
    }
  }, [historyOvers,matchId1,router]);
const {status,result}=useSelector((state)=>state.match)
const handleRun = (val) => {
  dispatch(ballPlayed(val));

  setTimeout(() => {
    const state = store.getState().match;

    const {
      innings,
      status,
      result,
      target,
      firstInnings,
      secondInnings,
      matchInfo,
    } = state;

 /*    const matchId = matchInfo?._id;
    if (!matchId) {
      console.warn("❌ matchId is missing.");
      return;
    }
 */
    const updateData = {
      innings,
      status,
      result,
      target,
    };

    if (innings === 1) {
      updateData.firstInnings = { ...firstInnings };
    } else {
      updateData.secondInnings = { ...secondInnings };
    }

    dispatch(updateScoreThunk({ matchId:matchId1, update: updateData }));
  }, 0);
};


  const handleCancel = () => {
  dispatch(cancelLastBall());

  setTimeout(() => {
    const state = store.getState().match;
    const update = {
      totalRuns: state.totalRuns,
      wickets: state.wickets,
      allOvers: state.allOvers,
      currentOver: state.currentOver,
      innings: state.innings,
    };
    dispatch(updateScoreThunk({ matchId: state.matchInfo._id, update }));
  }, 0);
};

const handleReset=()=>{
  dispatch(resetMatch())
              router.push("/hemanth/gully-cricket")
}

 /* const handleReset = () => {
  dispatch(resetMatch());

  setTimeout(() => {
    const state = store.getState().match;

    const updateData = {
      innings: state.innings,
      status: state.status,
      result: state.result,
      target: state.target,
      firstInnings: {
        totalRuns: 0,
        wickets: 0,
        allOvers: [],
        currentOver: [],
      },
      secondInnings: {
        totalRuns: 0,
        wickets: 0,
        allOvers: [],
        currentOver: [],
      }
    };

    dispatch(updateScoreThunk({ matchId: matchId1, update: updateData }));
  }, 0);
}; */



  return (
    <>
     {
      status ==="1st innings completed" && innings===1 ?(
<>
<h1 className="text-sm font-bold mb-3">Target: {target}</h1>
<button
        onClick={()=>dispatch(startSecondInnings())}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Start Second Innings
      </button>

</>
      ):status==="Match Completed"?
      (<>
      
        
        
       <h1 className="text-lg font-bold text-center">{result}</h1>
        <div>
          <button onClick={()=>setAllHistoryOvers((prev)=>!prev)}
            className="bg-green-600 text-white px-4 py-2 rounded"
            >
            {allHistoryOvers ? "Hide History" : "Show Match History"}
          </button>
          
        </div>
        {
          !allHistoryOvers &&(
            <div>
          <button 
            className="bg-red-600 text-white px-4 py-2 rounded mt-2"
            onClick={handleReset}
            >
              Reset Match
          </button>
          
        </div>
          )
        }
      {
        allHistoryOvers && (
          <>
          <AllHistoryOversInfo/>
          </>
        )
      }
      
      </>)
      : /* historyOvers ? (
        <>
       {router.push(`/matchHistory/${matchId}`)}
        </>
      ): */
      (
        <>
        <ScoreDisplay/>
      <div className="w-full max-w-md px-2 mx-auto">
  <div className="grid grid-cols-3 gap-2 mb-4">
    {buttons.map((val, i) => {
      let bgcolor = "bg-green-400";
      let width = "w-full"; // 👈 Change here
      if (val === "W") bgcolor = "bg-red-400";
      else if (val === "WD") bgcolor = "bg-blue-400";
      else if (val === "NB") bgcolor = "bg-pink-400";

      return (
        <button
          className={`${bgcolor} ${width} text-white p-2 rounded`}
          key={i}
          onClick={() => handleRun(val)}
        >
          {val}
        </button>
      );
    })}
  </div>
</div>

      <div className="flex justify-center gap-4">
        <button
          className="bg-gray-500 text-white px-6 py-2 rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="bg-yellow-500 text-white px-6 py-2 rounded"
         onClick={tofggleHistory}
        >
          {historyOvers ?"Hide History" :"Show History"}
        </button>
      </div>
        </>
      )
     }
   
    </>
  );
  
}

  'use client'

import { getByIdMatchInfoThunk } from "@/reduxtoolkit/reducer/matchStartSlice"
  import { useRouter } from "next/navigation" 
import { useEffect } from "react"
  import { useDispatch, useSelector } from "react-redux"

  export default function HistoryOvers({matchId})
  {
    const dispatch=useDispatch()
      const router=useRouter()
      const hideHistory=()=>{
  router.back()
      }
      useEffect(()=>{
if(matchId)
{
  dispatch(getByIdMatchInfoThunk(matchId))
  
}
      },[matchId,dispatch])
      const {innings,firstInnings,secondInnings}=useSelector((state)=>state.match)
      console.log("innings:",innings,"firstinnings:",firstInnings,"secondInnings:",secondInnings)
      const matcher=innings===1 ?firstInnings :secondInnings
      console.log("current innings:",matcher)
      return(
          <>
        <div className="p-4">
          <div className="flex mt-3 ">
              <h1>Scoreboard History...</h1>
          <button onClick={hideHistory} className="border bg-blue-500 rounded p-3 ml-auto mr-3 ">Hide History</button>
          </div>

  <div className="space-y-3">
      {firstInnings.allOvers.length > 0 ? (
        <div>
          <h1 className="font-bold text-xl mb-2">First Innings Score:</h1>
          {firstInnings.allOvers.map((over, index) => (
            <div key={index}>
              <p className="font-semibold text-lg">Over {index + 1}:</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {over.map((ball, i) => {
                  let bgColor = "bg-blue-500";
                  if (ball === "W") bgColor = "bg-red-500";
                  if (ball === "WD") bgColor = "bg-yellow-400";
                  if (ball === "NB") bgColor = "bg-pink-500";

                  return (
                    <div
                      key={i}
                      className={`${bgColor} text-white rounded w-8 h-8 flex items-center justify-center`}
                    >
                      {ball}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-orange-300 font-semibold">Loading first innings score...</h1>
      )}

      {/* Second Innings */}
      {secondInnings.allOvers.length > 0 ? (
        <div>
          <h1 className="font-bold text-xl mb-2">Second Innings Score:</h1>
          {secondInnings.allOvers.map((over, index) => (
            <div key={index}>
              <p className="font-semibold text-lg">Over {index + 1}:</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {over.map((ball, i) => {
                  let bgColor = "bg-blue-500";
                  if (ball === "W") bgColor = "bg-red-500";
                  if (ball === "WD") bgColor = "bg-yellow-400";
                  if (ball === "NB") bgColor = "bg-pink-500";

                  return (
                    <div
                      key={i}
                      className={`${bgColor} text-white rounded w-8 h-8 flex items-center justify-center`}
                    >
                      {ball}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-orange-300 font-semibold">Loading second innings score...</h1>
      )}
  </div>

  {/* current over */}


      {matcher?.currentOver?.length > 0 ? (
        
  <>

  <p className="font-bold text-2xl mt-5 text-green-700">Current Over:</p>
  <div className="flex gap-2 mt-2 mb-2">
            {matcher.currentOver.map((ball, index) => {

              let bgColor = "bg-blue-500";
                  if (ball === "W") bgColor = "bg-red-500";
                  if (ball === "WD") bgColor = "bg-yellow-400";
                  if (ball === "NB") bgColor = "bg-pink-500";
              
                
              return(
                <div
                key={index}
                className={`${bgColor} text-white font-semibold rounded w-10 h-10 flex items-center justify-center`}
              >
                
                {ball}
              </div>
              )
              
              
          })} 
        </div> 
  </>


        ) : (
          <p className="text-gray-500">Waiting for the first ball of the over.</p>
        )}

  
        </div>
          </>
      )
  }
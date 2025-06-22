'use client'
import { createMatchThunk, startMatchInfo } from "@/reduxtoolkit/reducer/matchStartSlice"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"

function MatchSetUpForm({ setShowForm }) {
  const [battingTeam, setBattinTeam] = useState("")
  const [bowlingTeam, setBowlingTeam] = useState("")
  const [totalOvers, setTotalOvers] = useState("")
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()

  const handleStart = async () => {
    if (!battingTeam || !bowlingTeam || !totalOvers) {
      alert("All details are required.")
      return
    }

    try {
      setLoading(true)
      const res = await dispatch(createMatchThunk({
        battingTeam,
        bowlingTeam,
        totalOvers: Number(totalOvers)
      }))

      dispatch(startMatchInfo(res.payload))

      const matchData = res.payload
      router.push(`/match/${matchData._id}`)
    } catch (err) {
      alert("Something went wrong while starting the match.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-blue-600 font-semibold text-lg">Starting match...</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md mt-4">
          <input
            type="text"
            placeholder="Batting Team"
            className="w-full mb-2 p-2 border-b-2 rounded focus:outline-none focus:border-blue-800"
            value={battingTeam}
            onChange={(e) => setBattinTeam(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bowling Team"
            className="w-full mb-2 p-2 border-b-2 rounded focus:outline-none focus:border-blue-800"
            value={bowlingTeam}
            onChange={(e) => setBowlingTeam(e.target.value)}
          />
          <input
            type="number"
            placeholder="Total overs"
            className="w-full mb-2 p-2 border-0 rounded appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none 
              [&::-webkit-outer-spin-button]:appearance-none 
              border-b-2 focus:outline-none focus:border-blue-800"
            value={totalOvers}
            onChange={(e) => setTotalOvers(e.target.value)}
          />
          <div className="flex gap-8 justify-end">
            <button
              className="text-blue-500 font-bold text-2xl"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              className="text-blue-500 font-bold text-2xl"
              onClick={handleStart}
            >
              Start
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default MatchSetUpForm

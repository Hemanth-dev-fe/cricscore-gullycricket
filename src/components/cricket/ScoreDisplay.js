import { useSelector } from "react-redux";

export default function ScoreDisplay() {
  const { matchInfo, innings, firstInnings, secondInnings } = useSelector(
    (state) => state.match
  );

  const current = innings === 1 ? firstInnings : secondInnings;

  return (
    <>
      <div className="bg-gray-100 p-4 rounded shadow w-full max-w-xl mx-auto mt-6 mb-6">
        <h3 className="text-xl font-bold mb-8 text-center text-amber-300">
          ScoreBoard
        </h3>

        {current.currentOver?.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-6 w-full">
            <span className="font-semibold w-full">Current Over:</span>
            {current.currentOver.map((ball, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded text-white text-sm font-medium ${
                  ball === "W"
                    ? "bg-red-500"
                    : ball === "WD"
                    ? "bg-pink-400"
                    : ball === "NB"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              >
                {ball}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between text-lg font-bold px-1">
          <p>Total Overs: {matchInfo?.totalOvers}</p>
          <p>Current Balls: {
  current.currentOver.filter(ball => ball !== "WD" && ball !== "NB").length || 0
} </p>
        </div>
      </div>
    </>
  );
}

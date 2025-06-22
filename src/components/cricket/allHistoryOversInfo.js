import { useSelector } from "react-redux";

export default function AllHistoryOversInfo() {
  const { firstInnings, secondInnings } = useSelector((state) => state.match);

  return (
    <div className="p-4 space-y-6">
      {/* First Innings */}
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
  );
}

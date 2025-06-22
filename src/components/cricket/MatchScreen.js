'use client';
import Header from "./Header";
import MatchInfoCard from "./MatchInfoCard";
import ScoreButtons from "./ScoreButtons";

export default function MatchScreen({ matchId }) {
  console.log("📦 MatchScreen received matchId:", matchId);

  if (!matchId) return <p>Loading match...</p>; // Defensive UI

  return (
    <div className="p-4 flex items-center flex-col">
      <Header />
      <MatchInfoCard matchId={matchId} />
      <ScoreButtons matchId1={matchId} />
    </div>
  );
}

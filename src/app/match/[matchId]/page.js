import MatchScreen from "@/components/cricket/MatchScreen"; // ✅ must be a Client Component

export default function MatchPage({ params }) {
  const { matchId } = params; // ✅ read from server props

  return <MatchScreen matchId={matchId} />;
}

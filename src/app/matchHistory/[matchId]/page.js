import { use } from 'react';
import HistoryOvers from '@/components/cricket/history';

export default function MatchPage({ params }) {
  const { id: matchId } = use(params); // ✅ unwrap params properly

  return <HistoryOvers matchId={matchId} />;
}

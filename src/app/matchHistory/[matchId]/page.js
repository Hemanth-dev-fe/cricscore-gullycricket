/* import { use } from 'react';
import HistoryOvers from '@/components/cricket/history';

export default function MatchPage({ params }) {
  const { id: matchId } = use(params); // ✅ unwrap params properly

  return <HistoryOvers matchId={matchId} />;
}
 */





import HistoryOvers from '@/components/cricket/history';

export default function MatchPage({ params }) {
  const { matchId } = params; // ✅ params is provided directly in server components

  return <HistoryOvers matchId={matchId} />;
}


/* In development, Next.js hydrates pages on the client side more leniently.

If you accidentally use useParams() or use() in a file that's technically a server component, it might still "work" during development — because:

Next.js sends all code to the browser.

Components render fully on the client.

SSR and static optimization rules are relaxed. */
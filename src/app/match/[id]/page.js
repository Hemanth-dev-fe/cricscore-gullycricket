'use client'
import { use } from "react";
import MatchScreen from "@/components/cricket/MatchScreen"; // make sure this is a client component
import { useParams } from "next/navigation";

export default function MatchPage({params}) {
  const { id: matchId } = useParams(); // ✅ unwraps the params

  return <MatchScreen matchId={matchId} />;
}

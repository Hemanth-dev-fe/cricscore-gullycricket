'use client'
import MatchSetUpForm from "@/components/cricket/matchSetUpForm"
import { useState } from "react"

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [askPassword, setAskPassword] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState("");

  const correctPassword = "Hemanth#3"; // ✅ Change this to your actual password

  const handlePasswordSubmit = () => {
    if (enteredPassword === correctPassword) {
      setShowForm(true);
      setAskPassword(false);
      setEnteredPassword("");
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <main className="p-6 flex items-center justify-center flex-col w-full max-h-screen">
      <h1 className="text-2xl font-bold mb-4">CricScore</h1>

      {/* Show match form if authenticated */}
      {showForm ? (
        <MatchSetUpForm setShowForm={setShowForm} />
      ) : askPassword ? (
        <div className="bg-gray-100 p-4 rounded shadow-md w-full max-w-xs">
          <input
            type="password"
            placeholder="Enter password"
            className="w-full mb-2 p-2 border rounded focus:outline-none focus:border-blue-500"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <div className="flex justify-between">
            <button
              className="bg-gray-300 px-4 py-1 rounded"
              onClick={() => {
                setAskPassword(false);
                setEnteredPassword("");
                setError("");
              }}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded"
              onClick={handlePasswordSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-600 text-white rounded px-4 py-2"
          onClick={() => setAskPassword(true)}
        >
          Start Game
        </button>
      )}
    </main>
  );
}

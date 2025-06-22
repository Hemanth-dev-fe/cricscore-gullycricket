import mongoose from "mongoose"; // Import Mongoose to define the schema and model

const matchSchema = new mongoose.Schema({
  battingTeam: { type: String, required: true },
  bowlingTeam: { type: String, required: true },
  totalOvers: { type: Number, required: true },

  innings: { type: Number, default: 1 }, // current inning
  status: { type: String, default: "In Progress" },
  result: { type: String, default: null },
  target: { type: Number, default: 0 },

  firstInnings: {
    totalRuns: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    allOvers: { type: [[String]], default: [] },
    currentOver: { type: [String], default: [] }
  },

  secondInnings: {
    totalRuns: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    allOvers: { type: [[String]], default: [] },
    currentOver: { type: [String], default: [] }
  }
}, {
  timestamps: true
});


// Create the Mongoose model, or reuse existing one if already compiled
const MatchDetailModel = mongoose.models.Match || mongoose.model("Match", matchSchema);

// Export the model to use in API routes and elsewhere


export default MatchDetailModel
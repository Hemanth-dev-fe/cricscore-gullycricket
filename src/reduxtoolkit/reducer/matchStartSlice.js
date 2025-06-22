'use client'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createMatchThunk=createAsyncThunk(
    "match/createMatch",async(FormData,thunkAPI)=>{
        const res=await fetch("/api/cricketApi/match",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(FormData)
        });
       return await res.json();

    }
)

export const updateScoreThunk = createAsyncThunk(
  "match/updateScore",
  async ({ matchId, update }, thunkAPI) => {
    console.log("🛠️ updateScoreThunk received:", { matchId, update });

    if (!matchId || !update) {
      throw new Error("Missing matchId or update data");
    }

    const res = await fetch(`/api/cricketApi/score/${matchId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update)
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to update score");
    }

    return await res.json();
  }
);


export const getByIdMatchInfoThunk=createAsyncThunk(
  "match/getByIdMatchInfo",async(matchId,thunkAPI)=>{
    const res=await fetch(`/api/cricketApi/getMatchInfo/${matchId}`)
    if(!res.ok) throw new Error(  " failed to get match info")
      return await res.json()
  }
)

const MatchSlice=createSlice(
    {
        name:"match",
        initialState: {
  matchInfo: null,
  innings: 1,
  status: "playing",
  result: null,
  target: 0,
  firstInnings: {
    totalRuns: 0,
    wickets: 0,
    allOvers: [],
    currentOver: [],
  },
  secondInnings: {
    totalRuns: 0,
    wickets: 0,
    allOvers: [],
    currentOver: [],
  }
},

        reducers:{
            startMatchInfo:(state,action)=>{
                state.matchInfo=action.payload
            },
           ballPlayed: (state, action) => {
  const val = action.payload;
  const inningKey = state.innings === 1 ? "firstInnings" : "secondInnings";

  if (val === "W") {
    state[inningKey].wickets++;
    state[inningKey].currentOver.push("W");
  } else if (val === "WD" || val === "NB") {
    
    state[inningKey].currentOver.push(val);
  } else {
    state[inningKey].totalRuns += parseInt(val);
    state[inningKey].currentOver.push(val);
  }

  const balls = state[inningKey].currentOver.filter(ball => ball !== "WD" && ball !== "NB").length;
  if (balls === 6) {
    state[inningKey].allOvers.push([...state[inningKey].currentOver]);
    state[inningKey].currentOver = [];
  }



  // End of 1st innings
  if (
    state.innings === 1 &&
    (state[inningKey].allOvers.length >= state.matchInfo?.totalOvers || state[inningKey].wickets >= 10)
  ) {

    if(state[inningKey].currentOver.length>0)
    {
       state[inningKey].allOvers.push([...state[inningKey].currentOver]);
    state[inningKey].currentOver = [];
    }
    state.status = "1st innings completed";
    state.target = state.firstInnings.totalRuns + 1;
  }

  if (state.innings === 2) {
    
  const { totalRuns: runs, wickets, allOvers } = state[inningKey];
 
  const overs = allOvers.length;
  const target = state.target;
const isOverEnd=overs>state.matchInfo.totalOvers
const wicketsCompleted=wickets>=10
const isTargetCompleted=runs>=target // why we are using = meanins in target we increased so here we used like
const isEnd=isOverEnd || wicketsCompleted || isTargetCompleted
if(isEnd && state[inningKey].currentOver.length>0)
{
   state[inningKey].allOvers.push([...state[inningKey].currentOver]);

    state[inningKey].currentOver = [];
}
  if (runs >=target) {
    state.result = `${state.matchInfo.bowlingTeam} team Won`; // Team 2 wins
    state.status = "Match Completed";
  } else if ((overs >= state.matchInfo.totalOvers || wickets >= 10) && runs < (target-1)) {
    state.result = `${state.matchInfo.battingTeam} team Won`; // Team 1 wins
    state.status = "Match Completed";
  } else if ((overs >= state.matchInfo.totalOvers || wickets >= 10) && runs === (target-1)) {
    state.result = "Match Tied";
    state.status = "Match Completed";
  }
}

},

            cancelLastBall: (state) => {
  const inningKey = state.innings === 1 ? "firstInnings" : "secondInnings";
  const lastBall = state[inningKey].currentOver.pop();
  if (!lastBall) return;

  if (lastBall === "W") {
    state[inningKey].wickets = Math.max(0, state[inningKey].wickets - 1);
  } else if (lastBall === "WD" || lastBall === "NB") {
    state[inningKey].totalRuns = Math.max(0, state[inningKey].totalRuns - 1);
  } else {
    state[inningKey].totalRuns = Math.max(0, state[inningKey].totalRuns - parseInt(lastBall));
  }
},


  // ✅ New Reset Match reducer
 resetMatch: (state) => {
  state.matchInfo = null;
  state.status = "playing";
  state.result = null;
  state.innings = 1;
  state.target = 0;
  state.firstInnings = { totalRuns: 0, wickets: 0, currentOver: [], allOvers: [] };
  state.secondInnings = { totalRuns: 0, wickets: 0, currentOver: [], allOvers: [] };
},

startSecondInnings: (state) => {
  state.innings = 2;
  state.status = "playing";
  state.secondInnings = {
    totalRuns: 0,
    wickets: 0,
    currentOver: [],
    allOvers: []
  };
}


},
        
        extraReducers:(builder)=>{
            builder
            // .addCase(createMatch.pending,(state)=>{
            //     state.status="loading"
            // })
            .addCase(createMatchThunk.fulfilled,(state,action)=>{
                state.matchInfo=action.payload
            })
            // .addCase(createMatch.rejected,(state)=>{
            //     state.status="failed"
            // })
       .addCase(getByIdMatchInfoThunk.fulfilled, (state, action) => {
  const match = action.payload;
  state.matchInfo = match;
  state.innings = match.innings;
  state.status = match.status;
  state.result = match.result;
  state.target = match.target;

  // ✅ Restore innings data used by UI
  state.firstInnings = {
    totalRuns: match.firstInnings.totalRuns,
    wickets: match.firstInnings.wickets,
    allOvers: match.firstInnings.allOvers,
    currentOver: match.firstInnings.currentOver
  };

  state.secondInnings = {
    totalRuns: match.secondInnings.totalRuns,
    wickets: match.secondInnings.wickets,
    allOvers: match.secondInnings.allOvers,
    currentOver: match.secondInnings.currentOver
  };

  // ✅ Optional: Also restore top-level current innings values for ballPlayed logic
  /* if (match.innings === 1) {
    state.totalRuns = match.firstInnings.totalRuns;
    state.wickets = match.firstInnings.wickets;
    state.allOvers = match.firstInnings.allOvers;
    state.currentOver = match.firstInnings.currentOver;
  } else {
    state.totalRuns = match.secondInnings.totalRuns;
    state.wickets = match.secondInnings.wickets;
    state.allOvers = match.secondInnings.allOvers;
    state.currentOver = match.secondInnings.currentOver;
  } */
});


        }
    }
)
export const { startMatchInfo, ballPlayed,cancelLastBall,resetMatch,startSecondInnings } = MatchSlice.actions;
export default MatchSlice.reducer
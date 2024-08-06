import { RoadMapInterface } from "@/interfaces/roadmap.interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IRoadMapState {
  roadmaps: RoadMapInterface[];
}

const initialState: IRoadMapState = {
  roadmaps: [],
};

export const roadmap = createSlice({
  name: "roadmaps",
  initialState,
  reducers: {
    getRoadmapsState: (state, action: PayloadAction<RoadMapInterface[]>) => {
      state.roadmaps = action.payload;
    },
    deleteRoadMapState: (state, action: PayloadAction<string>) => {
      state.roadmaps = state.roadmaps.filter(
        (roadmap) => roadmap.slug !== action.payload
      );
    },
  },
});

export const { getRoadmapsState } = roadmap.actions;
export const roadmapReducer = roadmap.reducer;

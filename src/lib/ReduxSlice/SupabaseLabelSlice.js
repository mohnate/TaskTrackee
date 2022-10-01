import { createSlice } from "@reduxjs/toolkit";

export const supabaseLabelSlice = createSlice({
  name: "labelData",
  initialState: { value: null },
  reducers: {
    setLabel: (state, action) => {
      state.value = action.payload;
      state.value.sort((a, b) => a.id - b.id);
    },
    updLabel: (state, action) => {
      const labels = state.value.filter((task) => task.id != action.payload.id);
      const newLabels = [...labels, action.payload];
      newTodos.sort((a, b) => a.id - b.id);
      state.value = newLabels;
    },
  },
});
export const { setLabel, updLabel } = supabaseLabelSlice.actions;

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
      const labels = state.value.filter(
        (label) => label.id != action.payload.id
      );
      const newLabels = [...labels, action.payload];
      newLabels.sort((a, b) => a.id - b.id);
      state.value = newLabels;
    },
    deleteLabel: (state, action) => {
      const labels = state.value.filter(
        (label) => label.id != action.payload.id
      );
      state.value = labels;
    },
  },
});
export const { setLabel, updLabel, deleteLabel } = supabaseLabelSlice.actions;

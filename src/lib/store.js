import { configureStore } from "@reduxjs/toolkit";
import { supabaseTaskSlice } from "./ReduxSlice/SupabaseTaskSlice";
import { supabaseLabelSlice } from "./ReduxSlice/SupabaseLabelSlice";

export default configureStore({
  reducer: {
    taskData: supabaseTaskSlice.reducer,
    labelData: supabaseLabelSlice.reducer,
  },
});

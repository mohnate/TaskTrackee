import { configureStore } from "@reduxjs/toolkit";
import { supabaseTaskSlice } from "./ReduxSlice/SupabaseTaskSlice";

export default configureStore({
  reducer: { taskData: supabaseTaskSlice.reducer },
});

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true
}
export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    Startloading: (state) => {
      console.log("startin loading");
      state.loading = true
    },
    Endloading: (state) => {
      console.log("ending loading");
      state.loading = false
    }
  }
})
export const { Startloading, Endloading } = loadingSlice.actions
export default loadingSlice.reducer


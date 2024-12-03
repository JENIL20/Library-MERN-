import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: []
}
export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addbook: (state, action) => {
      // console.log(action.payload);
      state.books = action.payload;
    },
    deletebook: (state) => {
      // console.log("here");
      state.books = []
    }
  }
})
export const { addbook, deletebook } = bookSlice.actions
export default bookSlice.reducer


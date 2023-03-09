import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const notesAdapter = createEntityAdapter();

const initialState = notesAdapter.getInitialState();

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: notesAdapter.addOne,
    addNotes: notesAdapter.setAll,
    deleteNote: (state, { payload }) => {
      notesAdapter.removeOne(state, payload);
    },
    changeNote: notesAdapter.updateOne,
    reset: (state) => {
      state = undefined;
      console.log(state);
    },
  },
});

export const { addNote, addNotes, deleteNote, changeNote, reset } =
  notesSlice.actions;
export const notesSelector = notesAdapter.getSelectors((state) => state.notes);
export default notesSlice.reducer;

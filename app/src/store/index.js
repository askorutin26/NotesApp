import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./notes.js";
import modalsSlice from "./modals.js";
import imagesSlice from "./images.js";

export default configureStore({
  reducer: {
    notes: notesSlice,
    modals: modalsSlice,
    images: imagesSlice,
  },
});

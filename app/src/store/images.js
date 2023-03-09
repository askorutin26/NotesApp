import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const imagesAdapter = createEntityAdapter();

const initialState = imagesAdapter.getInitialState();

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImage: imagesAdapter.addOne,
    addImages: imagesAdapter.setAll,
    deleteImage: (state, { payload }) => {
      imagesAdapter.removeOne(state, payload);
    },
    changeImage: imagesAdapter.updateOne,
    reset: (state) => {
      state = undefined;
      console.log(state);
    },
  },
});

export const { addImage, addImages, deleteImage, changeImage, reset } =
  imagesSlice.actions;
export const imagesSelector = imagesAdapter.getSelectors(
  (state) => state.images
);
export default imagesSlice.reducer;

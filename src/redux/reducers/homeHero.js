import { createSlice } from "@reduxjs/toolkit";

const homeHero = createSlice({
  name: "homeHero",
  initialState: {
    heading: "",
    subheading: "",
    descripiton: "",
    backgroundColor: "",
    image: "",
  },
  reducers: {
    updateHomeHero: (state, action) => {
      const { heading, subheading, description, backgroundColor, image } =
        action.payload;
      console.log("Home section data", action.payload);
      state.heading = heading;
      state.subheading = subheading;
      state.description = description;
      state.backgroundColor = backgroundColor;
      state.image = image;
    },
  },
});

export const { updateHomeHero } = homeHero.actions;

export default homeHero.reducer;

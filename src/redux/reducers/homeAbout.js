import { createSlice } from "@reduxjs/toolkit";

const homeAbout = createSlice({
  name: "homeAbout",
  initialState: {
    heading: "",
    description: "",
    backgroundImage: "",
    color: "",
  },
  reducers: {
    updateHomeAbout: (state, action) => {
      const { heading, description, backgroundImage, color } = action.payload;
      console.log("About reducer console", action.payload);
      state.heading = heading;
      state.description = description;
      state.backgroundImage = backgroundImage;
      state.color = color;
    },
  },
});

export const { updateHomeAbout } = homeAbout.actions;

export default homeAbout.reducer;

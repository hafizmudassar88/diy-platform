import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heading: "",
  description: "",
  number: "",
  email: "",
  address: "",
  color: "#000000",
  backgroundImage: null,
};

const homeContactSlice = createSlice({
  name: "homeAbout",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    updateAllFields: (state, action) => {
      console.log(action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const { updateField, updateAllFields } = homeContactSlice.actions;
export default homeContactSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleSidebar: (state, action) => {
      console.log(action?.payload);
      console.log("toggleSidebar");
      state.isOpen = !state.isOpen;
    },
  },
});

// Export the action, not the reducer
export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;

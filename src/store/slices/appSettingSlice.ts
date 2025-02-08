import { createSlice } from "@reduxjs/toolkit";

interface AppSettingState {
  onlineMode: boolean;
  darkMode: boolean;
}

const initialState: AppSettingState = {
  onlineMode: true,
  darkMode: false,
};

export const appSettingSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setOnlineMode: (state, action) => {
      state.onlineMode = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setOnlineMode, setDarkMode } = appSettingSlice.actions;

export default appSettingSlice.reducer;

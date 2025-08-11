import { configureStore, createSlice } from '@reduxjs/toolkit';

const progressSlice = createSlice({
  name: 'progress',
  initialState: { visible: false },
  reducers: {
    showProgress: (state) => { state.visible = true; },
    hideProgress: (state) => { state.visible = false; },
    setProgress: (state, action) => { state.visible = !!action.payload; },
  },
});

export const { showProgress, hideProgress, setProgress } = progressSlice.actions;

const store = configureStore({
  reducer: {
    progress: progressSlice.reducer,
  },
});

export default store;

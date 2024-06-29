import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  loading: boolean;
  success: boolean | null;
  messages: string;
  openSnackbar: boolean;
}

const initialState: InitialState = {
  loading: false,
  success: null,
  messages: "",
  openSnackbar: false,
};

const sliceState = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    processing: (state) => {
      state.loading = true;
      state.success = null;
      state.messages = "";
    },
    setResult: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.messages = action.payload.messages;
      state.openSnackbar = true;
    },
    dismissSnackbar: (state) => {
      state.openSnackbar = false;
    },
  },
});

const reducer = {
  data: sliceState.reducer,
};

export const { processing, setResult, dismissSnackbar } = sliceState.actions;
export default reducer;

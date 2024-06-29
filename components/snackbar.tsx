"use client";

import { useSelector } from "react-redux";
import * as React from "react";

import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { dismissSnackbar } from "@/store/reducers";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";

export default function CustomSnackbar() {
  const { messages, success, openSnackbar } = useSelector(
    (state: RootState) => state.data
  );
  const dispatch = useAppDispatch();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(dismissSnackbar());
  };

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={handleClose}
      message="Note archived"
    >
      <Alert
        onClose={handleClose}
        severity={success !== null && success ? "success" : "error"}
        variant="filled"
      >
        <Typography variant="body1" component="p">
          {messages}
        </Typography>
      </Alert>
    </Snackbar>
  );
}

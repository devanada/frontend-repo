"use client";

import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: {
      main: blue[900],
    },
    secondary: {
      main: blue[800],
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;

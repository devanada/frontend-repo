"use client";

import React from "react";

import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { createSession } from "@/utils/actions/auth";
import { signInWithGoogle } from "@/apis/firebase";

function Page() {
  async function handleSignIn() {
    const userUid = await signInWithGoogle();
    if (userUid) {
      await createSession(userUid);
    }
  }
  return (
    <Box
      component="div"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: "100%",
        }}
        direction={{ sm: "row" }}
      >
        <Stack
          sx={{
            width: "100%",
            display: { sm: "none", md: "flex" },
            justifyContent: "end",
            padding: "1rem",
          }}
        >
          <Typography variant="subtitle1">
            Your privacy is our priority. Sign in with confidence knowing your
            information is protected. Access your account to enjoy a customized
            experience tailored just for you.
          </Typography>
        </Stack>
        <Stack
          component="div"
          sx={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            padding: "2rem",
          }}
          spacing={3}
        >
          <Typography
            sx={{ textAlign: "center", fontWeight: "bold" }}
            variant="h4"
          >
            Sign in to your account
          </Typography>
          <Stack component="div" spacing={3}>
            <Stack direction="column" spacing={2}>
              <Button
                variant="outlined"
                fullWidth
                type="submit"
                onClick={() => handleSignIn()}
              >
                <GoogleIcon sx={{ marginRight: "0.5rem" }} />
                Sign in with Google
              </Button>
            </Stack>
            <Typography sx={{ textAlign: "center" }} variant="subtitle1">
              By clicking continue, you agree to our Terms of Service and
              Privacy Policy.
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Page;

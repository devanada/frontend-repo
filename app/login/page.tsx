"use client";

import Link from "next/link";
import React from "react";

import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
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
      <Box
        component="div"
        sx={{
          width: "75%",
        }}
      >
        <Box sx={{ textAlign: "center" }} component="div">
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h4"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Sign in to your account
          </Typography>
          <Typography sx={{}} className="mt-2 text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="#"
              className="font-medium text-primary hover:underline"
              prefetch={false}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
        <Box component="div">
          <TextField
            sx={{ marginTop: "1rem" }}
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            required
            fullWidth
          />
          <TextField
            sx={{ marginTop: "1rem" }}
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            required
            fullWidth
          />
          <Stack sx={{ marginTop: "1rem" }} direction="column" spacing={2}>
            <Button variant="contained" type="submit" fullWidth>
              Sign in
            </Button>
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
        </Box>
      </Box>
    </Box>
  );
}

export default Page;

"use client";

import * as React from "react";
import Link from "next/link";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";

import { useUserSession } from "@/utils/hooks/use-user-session";
import { signOutWithGoogle } from "@/apis/firebase";
import { removeSession } from "@/utils/actions/auth";

function Header({ session }: { session: string | null }) {
  const userSessionId = useUserSession(session);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link href="/">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
              </Link>
              {userSessionId ? (
                <MenuItem onClick={handleSignOut}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : (
                <Link href="/login">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link href="/">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Home
              </Button>
            </Link>
            {userSessionId ? (
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => handleSignOut()}
              >
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;

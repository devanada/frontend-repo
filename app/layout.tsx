import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import StoreProvider from "@/components/store-provider";

import theme from "@/theme";
import CustomSnackbar from "@/components/snackbar";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = cookies().get("user_session")?.value || null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider theme={theme}>
            <Container
              maxWidth="xl"
              sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Header session={session} />
              {children}
              <CustomSnackbar />
            </Container>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

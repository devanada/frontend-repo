import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import UserForm from "@/components/user-form";

import { fetchUserData } from "@/apis/user";

async function getData() {
  const response = await fetchUserData();

  if (!response.data) {
    return {
      isLogin: false,
      message: response.message,
      data: {
        displayName: "",
        email: "",
        phoneNumber: "",
        photoURL: "",
      },
    };
  }

  return {
    isLogin: true,
    message: response.message,
    data: response.data,
  };
}

export default async function Home() {
  const { isLogin, message, data } = await getData();

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
      <Alert
        severity={isLogin ? "success" : "error"}
        sx={{ marginBottom: "1rem" }}
      >
        {message}
      </Alert>
      <UserForm data={data} />
    </Box>
  );
}

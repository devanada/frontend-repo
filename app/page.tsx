"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { Box, Button, Stack } from "@mui/material";
import { FormInputText } from "@/components/form-input";

import { fetchUserData, updateUserData } from "@/apis/user";
import { UserSchema, userSchema } from "@/utils/types/user";
import { useAppDispatch } from "@/store/hooks";
import { setResult, processing } from "@/store/reducers";
import { RootState } from "@/store/store";

export default function Home() {
  const { loading } = useSelector((state: RootState) => state.data);
  const { handleSubmit, control, setValue } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      displayName: "",
      email: "",
      phoneNumber: "",
      photoURL: "",
    },
  });
  const dispatch = useAppDispatch();

  async function getData() {
    const response = await fetchUserData();
    const result = {
      success: response.data ? true : false,
      messages: response.message,
    };

    dispatch(setResult(result));

    if (response.data) {
      setValue("displayName", response.data.displayName);
      setValue("email", response.data.email);
      setValue("phoneNumber", response.data.phoneNumber ?? "");
      setValue("photoURL", response.data.photoURL);
    }
  }

  async function updateData(data: UserSchema) {
    dispatch(processing());

    const response = await updateUserData(data);
    const result = {
      success: response.data ? true : false,
      messages: response.message,
    };

    dispatch(setResult(result));
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
        }}
        spacing={3}
      >
        <Stack
          component="form"
          id="form-user"
          spacing={2}
          onSubmit={handleSubmit(updateData)}
        >
          <FormInputText
            name="displayName"
            control={control}
            label="Display Name"
          />
          <FormInputText
            name="email"
            control={control}
            label="Email"
            disabled
          />
          <FormInputText
            name="phoneNumber"
            control={control}
            label="Phone Number"
          />
          <FormInputText
            name="photoURL"
            control={control}
            label="Photo URL"
            disabled
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            form="form-user"
            variant="outlined"
            fullWidth
            onClick={() => getData()}
            disabled={loading}
          >
            Fetch Data
          </Button>
          <Button
            form="form-user"
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

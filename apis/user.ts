"use server";

import { cookies } from "next/headers";

import { IResponse } from "@/utils/types/api";
import { IUser } from "@/utils/types/user";

export async function fetchUserData() {
  try {
    const response = await fetch("http://localhost:8080/fetch-user-data", {
      headers: {
        Cookie: `user_session=${cookies().get("user_session")?.value ?? ""}`,
      },
    });
    const result: IResponse<IUser> = await response.json();

    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updateUserData(body: IUser) {
  try {
    const response = await fetch("http://localhost:8080/update-user-data", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Cookie: `user_session=${cookies().get("user_session")?.value ?? ""}`,
      },
    });
    const result: IResponse<undefined> = await response.json();

    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

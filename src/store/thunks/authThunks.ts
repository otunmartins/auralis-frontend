import { deleteCookie } from "cookies-next";
import { fetchAuthSession } from "aws-amplify/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleSignUp, handleSignIn } from "@/lib/cognito-actions";
import apiClient from "@/lib/api/axios";
import Paths from "@/lib/api/paths";
import { toast } from "@/components/toast";

// Thunk for creating a user in Cognito and backend
export const signUpThunk = createAsyncThunk(
  "auth/signup",
  async (userData: FormData) => {
    try {
      // Step 1: Sign up with Cognito
      const data = await handleSignUp(undefined, userData);
      const email = userData.get("email");
      const name = userData.get("name");
      // Step 2: Create user in backend
      if (data?.userId) {
        await apiClient.post(Paths.CREATE_USER, {
          email,
          name,
          user_id: data?.userId,
        });
        toast.success("Account created successfully!");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.success("Failed to create an account");
        throw new Error(error.message);
      }
    }
  }
);

// Thunk for fetching logged in user details
export const fetchUserThunk = createAsyncThunk(
  "auth/user",
  async (_, { rejectWithValue }) => {
    try {
      // Sign in with Cognito

      const { tokens: { accessToken = {} } = {}, userSub = "" } =
        await fetchAuthSession();
      if (!!accessToken?.toString()) {
        // Fetch user data from backend
        const response = await apiClient.post(Paths.GET_USER, {
          user_id: userSub,
        });
        const user = response.data?.user;
        if (!user) {
          // toast.error("User not found");
          throw new Error("User not found");
        }
        return response.data?.user;
      }

      return null;
    } catch (error: any) {
      // Delete cookies to logout user if cognito logs user in but the user is not being authenticated from BE
      const cookies = document.cookie.split("; ");
      cookies.forEach((cookie) => {
        const cookieName = cookie.split("=")[0];
        deleteCookie(cookieName); // Delete each cookie
      });
      // Show error toast
      toast.error(
        error.message || "An error occurred while fetching user details"
      );

      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Thunk for signing in and getting tokens
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (userData: FormData, { rejectWithValue, dispatch }) => {
    try {
      // Sign in with Cognito
      const cognitoResponse = await handleSignIn(undefined, userData);
      // if (!cognitoResponse) {
      //   console.log(cognitoResponse, "asdfwefasdfwe");
      //   throw new Error("Failed to sign in");
      // }

      // if (cognitoResponse?.isSignedIn) {
      //   await dispatch(fetchUserThunk());
      // }
      if (cognitoResponse?.isSignedIn) {
        toast.success("Logged in successfully!");
      }
      return null;
    } catch (error: any) {
      // Show error toast
      console.log(error, "asdfwefasdfwe");
      toast.error(error.message || "An error occurred during login");

      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserThunk, loginThunk, signUpThunk } from "../thunks/authThunks";
import {
  ActionTracker,
  handleFailure,
  handlePending,
  handleSuccess,
  initialActionTracker,
} from "@/lib/action-tracker";
import { User } from "@/lib/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  _user: ActionTracker;
  _signup: ActionTracker;
  _login: ActionTracker;
  _oauthUrl: ActionTracker;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  _user: initialActionTracker,
  _signup: initialActionTracker,
  _login: initialActionTracker,
  _oauthUrl: initialActionTracker,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    // *********************** Signup *********************** //
    builder.addCase(signUpThunk.fulfilled, (state) => {
      state._signup = handleSuccess("Account created successfully");
    });
    builder.addCase(signUpThunk.pending, (state) => {
      state._signup = handlePending();
    });
    builder.addCase(signUpThunk.rejected, (state, action) => {
      state._signup = handleFailure(
        action.error.message || "Failed to create user"
      );
    });
    // *********************** Login *********************** //
    builder.addCase(loginThunk.fulfilled, (state) => {
      state._login = handleSuccess("Logged in successfully");
    });
    builder.addCase(loginThunk.pending, (state) => {
      state._login = handlePending();
    });
    builder.addCase(loginThunk.rejected, (state, { error }) => {
      state._login = handleFailure(error.message || "Failed to Login");
    });
    // *********************** Fetch User Details *********************** //
    builder.addCase(fetchUserThunk.fulfilled, (state, { payload }) => {
      state._user = handleSuccess("User fetched successfully");
      state.user = { ...payload, integrations: [] };
      state.isAuthenticated = true;
    });
    builder.addCase(fetchUserThunk.pending, (state) => {
      state._user = handlePending();
    });
    builder.addCase(fetchUserThunk.rejected, (state, { error }) => {
      state._user = handleFailure(error.message || "Failed to fetch user");
    });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

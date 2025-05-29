import {
  confirmSignUp,
  resendSignUpCode,
  signIn,
  signOut,
  signUp,
  autoSignIn,
  resetPassword,
  confirmResetPassword,
} from "aws-amplify/auth";
import { redirect } from "next/navigation";
import { AllRoutesEnum } from "./enums";
import { getErrorMessage } from "./get-error-message";
import { toast } from "@/components/toast";

const { SIGNUP, DASHBOARD, LOGIN, RESET_PASSWORD, CONFIRM_SIGNUP } =
  AllRoutesEnum;

export async function handleSignUp(
  prevState: void | string | undefined,
  formData: FormData
) {
  try {
    const { isSignUpComplete, nextStep, userId } = await signUp({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
      options: {
        userAttributes: {
          email: String(formData.get("email")),
          name: String(formData.get("name")),
        },
        autoSignIn: true,
      },
    });
    toast.success("Account created successfully!");
    return {
      userId,
      isSignUpComplete,
    };
  } catch (e) {
    getErrorMessage(e);
  }
}

export async function handleSendEmailVerificationCode(
  prevState: { message: string; errorMessage: string },
  formData: FormData
) {
  let currentState;
  try {
    await resendSignUpCode({
      username: String(formData.get("email")),
    });
    currentState = {
      ...prevState,
      message: "Verification code sent",
    };
    toast.success("Verification code sent!");
  } catch (e) {
    currentState = {
      ...prevState,
      errorMessage: getErrorMessage(e),
    };
    toast.success("Failed to send verification code");
  }
  return currentState;
}

export async function handleConfirmSignUp(
  prevState: void | string | undefined,
  formData: FormData
) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: String(formData.get("email")),
      confirmationCode: String(formData.get("code")),
    });
    // await autoSignIn();
  } catch (e) {
    getErrorMessage(e);
  }
}

export async function handleSignIn(
  prevState: void | string | undefined,
  formData: FormData
) {
  let redirectLink: any = DASHBOARD;
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    console.log(nextStep, "asdfwefasdfwe");
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      const test = await resendSignUpCode({
        username: String(formData.get("email")),
      });

      if (test) {
        toast.error("account not verified check your email");
        redirectLink =
          CONFIRM_SIGNUP + "?email=" + String(formData.get("email"));
      }
    }
    return { redirectLink, isSignedIn };
  } catch (e) {
    getErrorMessage(e);
  }
}

export async function handleSignOut() {
  try {
    await signOut();
    toast.success("Successfully logged out");
  } catch (error) {
    toast.error("Failed to log out. Please try again.");
  }
}

export async function handleForgotPassword(
  prevState: { text: string; type: string } | string | undefined,
  formData: FormData
) {
  try {
    const email = String(formData.get("email"));
    await resetPassword({
      username: email,
    });
    toast.success("Request sent! Check your email");
    return { type: "success", text: "Request sent! Check your email" };
  } catch (e) {
    toast.error("Failed to send reset request");
    return { type: "error", text: getErrorMessage(e) };
  }
}

export async function handleResetPasswordConfirmation(
  prevState: void | string | undefined,
  formData: FormData
) {
  try {
    await confirmResetPassword({
      username: String(formData.get("email")),
      confirmationCode: String(formData.get("code")),
      newPassword: String(formData.get("password")),
    });
    toast.success("Password changed successfully!");
    return { redirectLink: LOGIN };
  } catch (e) {
    toast.error("Failed to change password");
    return { error: getErrorMessage(e) };
  }
}

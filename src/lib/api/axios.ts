import axios from "axios";
import { AllRoutesEnum } from "../enums";
import { fetchAuthSession } from "aws-amplify/auth";
import Paths from "./paths";

const apiClient = axios.create({
  baseURL: Paths.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  async (config) => {
    const { SIGNUP, FORGOT_PASSWORD, RESET_PASSWORD, LOGIN } = AllRoutesEnum;
    // Skip authentication for guest routes
    const guestRoutes = [SIGNUP, FORGOT_PASSWORD, RESET_PASSWORD, LOGIN];
    const isGuestRoute = guestRoutes.some((route) =>
      config.url?.includes(route)
    );

    if (!isGuestRoute) {
      const { tokens: { accessToken = {} } = {} } = await fetchAuthSession();

      // Only add token for non-guest routes
      if (!!accessToken.toString()) {
        config.headers.Authorization = `${accessToken.toString()}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      console.log("Unauthorized access");
    }
    return Promise.reject(error);
  }
);

export default apiClient;

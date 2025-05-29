export enum AllRoutesEnum {
  // Auth routes
  LOGIN = "/login",
  SIGNUP = "/signup",
  FORGOT_PASSWORD = "/forgot-password",
  RESET_PASSWORD = "/reset-password",
  CONFIRM_SIGNUP = "/confirm-signup",

  // Main routes
  DASHBOARD = "/dashboard",
  ACCOUNT_MANAGEMENT = "/account-management",
  FILE_UPLOAD = "/file-upload",
  PREDICTIONS = "/predictions",
  INSIGHTS = "/insights",
  LOGGING_SYSTEM = "/loging-system",
  TEMPLATES = "/templates",
  SUPPORT = "/support",

  // Dynamic routes
  MOLECULE_DETAIL = "/molecule/[id]",
  PREDICTION_DETAIL = "/prediction/[id]",
  LOGGING_DETAIL = "/loging-detail/[id]",
}

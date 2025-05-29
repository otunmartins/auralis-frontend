class Paths {
  static BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  static CREATE_USER = "/user/create";
  static GET_USER = "/user";
  static GET_OAUTH_URL_FOR_INTEGRATION = "/oauth/auth-url";
  static GET_SCAN_HISTORY = "/scan-history";
  static FETCH_REPO = "/repo";
  static GET_INTEGRATIONS = "/oauth/integration";
  static GET_DASHBOARD_STATES = "/dashboard/states";
  static GET_RECENT_SCANS = "/dashboard/recent-scans";
  static FETCH_ISSUES = "/issues";
  static REGISTER_OAUTH_PLATFORM = "/oauth/callback";
}

export default Paths;

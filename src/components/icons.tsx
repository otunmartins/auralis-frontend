import * as React from "react";

type SvgIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

export const DashboardIcon = ({
  size = 20,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <g
      stroke="currentColor"
      strokeWidth="1.5"
      clipPath="url(#clip0_62659_1514)"
    >
      <path d="M1.667 5c0-1.572 0-2.357.488-2.845S3.429 1.667 5 1.667s2.357 0 2.845.488.488 1.273.488 2.845v1.667c0 1.57 0 2.357-.488 2.845S6.571 10 5 10s-2.357 0-2.845-.488c-.488-.489-.488-1.274-.488-2.846zM1.667 15.834c0-.777 0-1.165.127-1.472.169-.408.493-.732.902-.902.306-.127.694-.127 1.47-.127h1.667c.777 0 1.165 0 1.471.127.409.17.733.494.902.902.127.307.127.695.127 1.472 0 .776 0 1.164-.127 1.47-.169.409-.493.734-.902.903-.306.127-.694.127-1.47.127H4.166c-.777 0-1.165 0-1.471-.127a1.67 1.67 0 0 1-.902-.902c-.127-.307-.127-.695-.127-1.471ZM11.667 13.333c0-1.571 0-2.357.488-2.845S13.429 10 15 10s2.357 0 2.845.488.488 1.274.488 2.845V15c0 1.571 0 2.357-.488 2.845s-1.274.488-2.845.488-2.357 0-2.845-.488-.488-1.274-.488-2.845zM11.667 4.167c0-.777 0-1.165.127-1.472.169-.408.493-.732.901-.902.307-.126.695-.126 1.472-.126h1.666c.777 0 1.165 0 1.472.126.408.17.732.494.901.902.127.307.127.695.127 1.472 0 .776 0 1.164-.127 1.47-.169.409-.493.733-.901.903-.307.127-.695.127-1.472.127h-1.666c-.777 0-1.165 0-1.472-.127a1.67 1.67 0 0 1-.902-.902c-.126-.307-.126-.695-.126-1.471Z"></path>
    </g>
    <defs>
      <clipPath id="clip0_62659_1514">
        <path fill="#fff" d="M0 0h20v20H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export const FileUploadIcon = ({
  size = 20,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M3.333 10v2.12c0 2.704 0 4.056.739 4.972q.224.278.502.503c.916.738 2.268.738 4.972.738.588 0 .882 0 1.152-.095q.083-.03.164-.068c.258-.123.466-.331.881-.747l3.947-3.947c.482-.482.723-.722.85-1.029s.127-.647.127-1.328V8.333c0-3.143 0-4.714-.977-5.69-.976-.976-2.547-.976-5.69-.976m.833 16.25V17.5c0-2.357 0-3.536.733-4.268.732-.732 1.91-.732 4.267-.732h.417"
    ></path>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M8.333 4.167c-.491-.506-1.8-2.5-2.5-2.5s-2.008 1.994-2.5 2.5m2.5-1.667v5.833"
    ></path>
  </svg>
);

export const AccountManagementIcon = ({
  size = 20,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      clipPath="url(#clip0_62659_935)"
    >
      <path d="M14.583 11.136V10m0 8.333v-1.136m-2.727-4.683-1.023-.62m7.5 4.545-1.022-.62m0-3.305 1.022-.62m-7.5 4.545 1.023-.62M17.5 14.25a2.917 2.917 0 1 1-5.834 0 2.917 2.917 0 0 1 5.834 0Z"></path>
      <path
        strokeLinejoin="round"
        d="M8.75 10.833H7.5a5.833 5.833 0 0 0-5.833 5.833H8.75M11.667 5A3.333 3.333 0 1 1 5 5a3.333 3.333 0 0 1 6.667 0"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_62659_935">
        <path fill="#fff" d="M0 0h20v20H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export const PredictionIcon = ({
  size = 20,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
      d="m17 17 1.333 1.333m-.666-3.666a3 3 0 1 0-6 0 3 3 0 0 0 6 0"
    ></path>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
      d="m9.167 15.417-2.5-1.25-3.903 1.3a.833.833 0 0 1-1.097-.79V4.682c0-.316.178-.605.46-.746L6.321 1.84a.83.83 0 0 1 .7-.02L12.5 4.167h5c.46 0 .833.373.833.833v4.583"
    ></path>
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.25"
      d="M6.667 1.667v12.5"
    ></path>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
      d="M12.5 4.167v5.416"
    ></path>
  </svg>
);

export const InsightsIcon = ({
  size = 20,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      d="M17.917 3.75a1.667 1.667 0 1 1-3.334 0 1.667 1.667 0 0 1 3.334 0Z"
    ></path>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M17.06 7.838c.023.737.023 1.588.023 2.578 0 3.536 0 5.304-1.098 6.402s-2.866 1.098-6.402 1.098-5.303 0-6.401-1.098c-1.099-1.098-1.099-2.866-1.099-6.402s0-5.303 1.099-6.401 2.866-1.098 6.401-1.098c.99 0 1.842 0 2.579.024"
    ></path>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m5.417 12.083 2.327-2.327a.833.833 0 0 1 1.179 0l1.321 1.321a.833.833 0 0 0 1.179 0L13.75 8.75"
    ></path>
  </svg>
);

export const LoggingIcon = ({
  size = 20,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10.5 3.333c-4.01 0-7.167 3.035-7.167 6.667s3.157 6.666 7.167 6.666q.537 0 1.054-.071a.833.833 0 0 1 .226 1.651 9.4 9.4 0 0 1-1.28.087c-4.827 0-8.833-3.68-8.833-8.333 0-4.652 4.006-8.333 8.833-8.333q.651.001 1.28.086a.833.833 0 1 1-.226 1.652 8 8 0 0 0-1.054-.072"
      clipRule="evenodd"
    ></path>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M15.098 7.147a.83.83 0 0 1 .908.18l2.083 2.084a.833.833 0 0 1 0 1.178l-2.083 2.084a.833.833 0 0 1-1.423-.59v-1.25H9.167a.833.833 0 1 1 0-1.666h5.416v-1.25c0-.337.203-.641.515-.77"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const UserCaseIcon = ({
  size = 20,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.75"
      clipPath="url(#clip0_62464_9021)"
    >
      <path
        strokeLinejoin="round"
        d="M7.5 5.834h5c2.75 0 4.125 0 4.98.854.853.854.853 2.229.853 4.979v.833c0 2.75 0 4.125-.854 4.98-.854.854-2.23.854-4.979.854h-.833c-2.75 0-4.125 0-4.98-.855-.854-.854-.854-2.229-.854-4.979v-5"
      ></path>
      <path d="M1.667 5.834h2.5M5.833 4.167v-2.5"></path>
    </g>
    <defs>
      <clipPath id="clip0_62464_9021">
        <path fill="#fff" d="M0 0h20v20H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export const SupportIcon = ({
  size = 20,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <path
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.833"
      d="m15.417 14.135-.28-.097a2 2 0 0 1-.206-.087h.001a1.76 1.76 0 0 1-.973-1.575V9.29c0-.626.33-1.201.864-1.516l.11-.06q.096-.048.197-.084l.3-.106-.024-.317c-.18-2.344-2.468-4.291-5.406-4.291-2.939 0-5.225 1.947-5.406 4.29l-.024.318.3.106.198.084c.597.298.974.909.974 1.576v3.085c0 .625-.332 1.2-.865 1.515l-.109.06a1.76 1.76 0 0 1-1.662-.048l-.1-.062-1.383-.92a1.04 1.04 0 0 1-.464-.868v-2.44c0-.305.132-.593.36-.79l.104-.077 1.382-.921q.104-.068.212-.12l.228-.11.008-.253C3.848 4.372 6.667 2.084 10 2.084s6.153 2.288 6.248 5.258l.008.253.227.11q.11.053.212.12l1.382.92c.29.194.465.52.465.868v2.44c0 .305-.134.593-.362.79l-.103.077-1.382.921a2 2 0 0 1-.21.12l-.235.114v1.759c0 1.15-.933 2.082-2.083 2.082H10a.417.417 0 0 1 0-.832h4.167c.69 0 1.25-.56 1.25-1.25z"
    ></path>
  </svg>
);

export const DownloadIcon = ({
  size = 20,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <path
      stroke="#9C9FAD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M14.565 7.51h.018a3.753 3.753 0 0 1 3.75 3.756A3.755 3.755 0 0 1 15 15m-.435-7.49q.018-.207.018-.418A4.59 4.59 0 0 0 10 2.5a4.587 4.587 0 0 0-4.566 4.193m9.13.816a4.58 4.58 0 0 1-1.028 2.505m-8.102-3.32a4.17 4.17 0 0 0-3.767 4.155A4.174 4.174 0 0 0 5 14.939m.434-8.246a4.143 4.143 0 0 1 2.9.816M10 17.5v-6.667m0 6.667c-.583 0-1.674-1.662-2.083-2.084M10 17.5c.584 0 1.674-1.662 2.083-2.084"
    ></path>
  </svg>
);

export const FilterIcon = ({
  size = 18,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 18 18"
    className={className}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M5.25 15.75V13.5M12.75 15.75v-4.5M12.75 4.5V2.25M5.25 6.75v-4.5"
    ></path>
    <path
      stroke="#515D6F"
      strokeWidth="1.5"
      d="M5.25 13.5c-.699 0-1.048 0-1.324-.114a1.5 1.5 0 0 1-.812-.812C3 12.298 3 11.949 3 11.25s0-1.048.114-1.324a1.5 1.5 0 0 1 .812-.812C4.202 9 4.551 9 5.25 9s1.048 0 1.324.114a1.5 1.5 0 0 1 .812.812c.114.276.114.625.114 1.324s0 1.048-.114 1.324a1.5 1.5 0 0 1-.812.812c-.276.114-.625.114-1.324.114ZM12.75 9c-.699 0-1.048 0-1.324-.114a1.5 1.5 0 0 1-.812-.812c-.114-.276-.114-.625-.114-1.324s0-1.048.114-1.324a1.5 1.5 0 0 1 .812-.812c.276-.114.625-.114 1.324-.114s1.048 0 1.324.114a1.5 1.5 0 0 1 .812.812C15 5.702 15 6.051 15 6.75s0 1.048-.114 1.324a1.5 1.5 0 0 1-.812.812C13.798 9 13.449 9 12.75 9Z"
    ></path>
  </svg>
);

export const ArrowUpIcon = ({
  size = 10,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 10 14"
    className={className}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M5 12.333V1.667m0 0-4 4m4-4 4 4"
    ></path>
  </svg>
);

export const XFilledIcon = ({
  size = 20,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <rect width={size} height={size} fill="#E62E2E" rx="6"></rect>
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M4.263 4.264a1.04 1.04 0 0 1 1.473 0L10 8.527l4.263-4.263a1.042 1.042 0 0 1 1.473 1.473L11.474 10l4.263 4.264a1.042 1.042 0 1 1-1.473 1.473L10 11.473l-4.264 4.264a1.042 1.042 0 0 1-1.473-1.473L8.527 10 4.263 5.737a1.04 1.04 0 0 1 0-1.473"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const CheckFilledIcon = ({
  size = 20,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <path
      fill="#1FB356"
      d="M0 6a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z"
    ></path>
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M14.667 6.5 8.25 12.917 5.334 10"
    ></path>
  </svg>
);

export const RotateIcon = ({
  size = 20,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <path
      fill="#fff"
      stroke="#9C9FAD"
      d="M16.674 1.334c.184 0 .334.149.334.333v2.61a.596.596 0 0 1-.974.46l-.072-.07-.006-.008-.283-.3A8 8 0 1 0 18 10a.334.334 0 1 1 .666.002 8.667 8.667 0 1 1-4.022-7.32l.338.215.283-.283 1.108-1.107.02-.021.019-.024a.33.33 0 0 1 .262-.128Z"
    ></path>
  </svg>
);

export const ShareIcon = ({
  size = 20,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <path
      stroke="#9C9FAD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M9.25 2.5c-3.041.005-4.634.08-5.652 1.098C2.5 4.696 2.5 6.464 2.5 10s0 5.303 1.098 6.402C4.697 17.5 6.465 17.5 10 17.5s5.304 0 6.402-1.098c1.018-1.018 1.092-2.61 1.098-5.652"
    ></path>
    <path
      stroke="#9C9FAD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m17.5 5.021-.834-.002c-3.113-.008-4.67-.012-5.765.775-.364.261-.683.58-.945.943-.79 1.092-.79 2.65-.79 5.763M17.5 5.021a.57.57 0 0 0-.145-.393C16.716 3.872 15.06 2.5 15.06 2.5m2.44 2.521a.58.58 0 0 1-.145.351c-.638.756-2.295 2.128-2.295 2.128"
    ></path>
  </svg>
);

export const UploadIcon = ({
  size = 64,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 64 65"
    className={className}
    {...props}
  >
    <g clipPath="url(#clip0_62229_42815)">
      <rect width="64" height="64" y="0.5" fill="#F8F8F8" rx="32"></rect>
      <rect
        width="67.672"
        height="67.672"
        x="-1.939"
        y="-1.535"
        fill="#fff"
        rx="33.836"
      ></rect>
      <path
        stroke="url(#paint0_linear_62229_42815)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.82"
        d="m26.257 37.94 5.64-5.64m0 0 5.64 5.64m-5.64-5.64v12.69m11.279-6.003a7.754 7.754 0 0 0-4.934-13.736.87.87 0 0 1-.754-.425 10.57 10.57 0 0 0-9.116-5.214c-5.84 0-10.574 4.734-10.574 10.574a10.54 10.54 0 0 0 3.084 7.463"
      ></path>
    </g>
    <rect
      width="63"
      height="63"
      x="0.5"
      y="1"
      stroke="#00A6E8"
      strokeOpacity="0.1"
      rx="31.5"
    ></rect>
    <defs>
      <linearGradient
        id="paint0_linear_62229_42815"
        x1="17.798"
        x2="40.815"
        y1="19.612"
        y2="47.41"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0370C2"></stop>
        <stop offset="1" stopColor="#4BB2FE" stopOpacity="0.68"></stop>
      </linearGradient>
      <clipPath id="clip0_62229_42815">
        <rect width="64" height="64" y="0.5" fill="#fff" rx="32"></rect>
      </clipPath>
    </defs>
  </svg>
);

export const SearchIcon = ({
  size = 18,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 18 18"
  >
    <g
      fill="#888"
      fillRule="evenodd"
      clipPath="url(#clip0_62723_810)"
      clipRule="evenodd"
    >
      <path d="M12.595 12.595a.75.75 0 0 1 1.06 0l3.375 3.375a.75.75 0 1 1-1.06 1.06l-3.375-3.375a.75.75 0 0 1 0-1.06"></path>
      <path d="M.75 8.25a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0m7.5-6a6 6 0 1 0 0 12 6 6 0 0 0 0-12"></path>
    </g>
    <defs>
      <clipPath id="clip0_62723_810">
        <path fill="#fff" d="M0 0h18v18H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export const ActionEyeIcon = ({
  size = 36,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 36 32"
    className={className}
    {...props}
  >
    <path
      fill="#E6F6FD"
      d="M.833 6a6 6 0 0 1 6-6h23a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-23a6 6 0 0 1-6-6z"
    ></path>
    <g stroke="#00AFFF" strokeWidth="1.5" clipPath="url(#clip0_62273_3917)">
      <path d="M19.917 16c0-1.105-1.008-2-2.25-2-1.243 0-2.25.895-2.25 2s1.007 2 2.25 2c1.242 0 2.25-.895 2.25-2Z"></path>
      <path
        strokeLinejoin="round"
        d="M18.083 11c3.59 0 6.664 2.675 7.945 3.975.407.412.407.97 0 1.383-1.281 1.3-4.356 3.975-7.945 3.975s-6.663-2.675-7.944-3.974c-.408-.413-.407-.972 0-1.384C11.42 13.675 14.494 11 18.083 11Z"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_62273_3917">
        <path fill="#fff" d="M8.833 8h19v16h-19z"></path>
      </clipPath>
    </defs>
  </svg>
);

export const ActionDownloadIcon = ({
  size = 33,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 33 32"
    className={className}
    {...props}
  >
    <path
      fill="#E9F7EE"
      d="M.833 6a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-20a6 6 0 0 1-6-6z"
    ></path>
    <g
      stroke="#1FB356"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      clipPath="url(#clip0_62273_3912)"
    >
      <path d="M20.485 14.007h.015c1.657 0 3 1.346 3 3.006A3.004 3.004 0 0 1 20.833 20m-.348-5.993q.015-.165.015-.334A3.67 3.67 0 0 0 16.833 10a3.67 3.67 0 0 0-3.653 3.355m7.305.652a3.66 3.66 0 0 1-.823 2.004m-6.482-2.656a3.34 3.34 0 0 0-3.013 3.324 3.34 3.34 0 0 0 2.666 3.273m.347-6.597a3.315 3.315 0 0 1 2.32.653M16.833 22v-5.333m0 5.333c-.466 0-1.339-1.33-1.666-1.666M16.833 22c.467 0 1.34-1.33 1.667-1.666"></path>
    </g>
    <defs>
      <clipPath id="clip0_62273_3912">
        <path fill="#fff" d="M8.833 8h16v16h-16z"></path>
      </clipPath>
    </defs>
  </svg>
);

export const BackChevronIcon = ({
  size = 32,
  className = "",
  ...props
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 32 32"
    className={className}
    {...props}
  >
    <rect width="31" height="31" x="0.5" y="0.5" fill="#fff" rx="5.5"></rect>
    <rect
      width="31"
      height="31"
      x="0.5"
      y="0.5"
      stroke="#E3E3E3"
      rx="5.5"
    ></rect>
    <path
      stroke="#717680"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M19.333 9.5s-6.666 4.419-6.666 6 6.666 6 6.666 6"
    ></path>
  </svg>
);

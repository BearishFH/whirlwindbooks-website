import { ISvg } from "../../SvgPropsType";

export const DocumentUpload: React.FC<ISvg> = ({
  color,
  className,
  iconType = "linear",
  w = 24,
}) => {
  const renderIcon = () => {
    switch (iconType) {
      case "linear":
      case "outline":
      default:
        return (
          <>
            <path
              d="M9 17V11L7 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 11L11 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );

      case "bold":
        return (
          <>
            <path
              d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19ZM11.53 13.53C11.38 13.68 11.19 13.75 11 13.75C10.81 13.75 10.62 13.68 10.47 13.53L9.75 12.81V17C9.75 17.41 9.41 17.75 9 17.75C8.59 17.75 8.25 17.41 8.25 17V12.81L7.53 13.53C7.24 13.82 6.76 13.82 6.47 13.53C6.18 13.24 6.18 12.76 6.47 12.47L8.47 10.47C8.54 10.41 8.61 10.36 8.69 10.32C8.71 10.31 8.74 10.3 8.76 10.29C8.82 10.27 8.88 10.26 8.95 10.25C8.98 10.25 9 10.25 9.03 10.25C9.11 10.25 9.19 10.27 9.27 10.3C9.28 10.3 9.28 10.3 9.29 10.3C9.37 10.33 9.45 10.39 9.51 10.45C9.52 10.46 9.53 10.46 9.53 10.47L11.53 12.47C11.82 12.76 11.82 13.24 11.53 13.53Z"
              fill="currentColor"
            />
            <path
              d="M17.4297 8.80999C18.3797 8.81999 19.6997 8.81999 20.8297 8.81999C21.3997 8.81999 21.6997 8.14999 21.2997 7.74999C19.8597 6.29999 17.2797 3.68999 15.7997 2.20999C15.3897 1.79999 14.6797 2.07999 14.6797 2.64999V6.13999C14.6797 7.59999 15.9197 8.80999 17.4297 8.80999Z"
              fill="currentColor"
            />
          </>
        );

      case "outline":
        return (
          <>
            <path
              d="M9.00043 17.75C8.59043 17.75 8.25043 17.41 8.25043 17V12.81L7.53043 13.53C7.24043 13.82 6.76043 13.82 6.47043 13.53C6.18043 13.24 6.18043 12.76 6.47043 12.47L8.47043 10.47C8.68043 10.26 9.01043 10.19 9.29043 10.31C9.57043 10.42 9.75043 10.7 9.75043 11V17C9.75043 17.41 9.41043 17.75 9.00043 17.75Z"
              fill="currentColor"
            />
            <path
              d="M11.0004 13.7499C10.8104 13.7499 10.6204 13.6799 10.4704 13.5299L8.47043 11.5299C8.18043 11.2399 8.18043 10.7599 8.47043 10.4699C8.76043 10.1799 9.24043 10.1799 9.53043 10.4699L11.5304 12.4699C11.8204 12.7599 11.8204 13.2399 11.5304 13.5299C11.3804 13.6799 11.1904 13.7499 11.0004 13.7499Z"
              fill="currentColor"
            />
            <path
              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H14C14.41 1.25 14.75 1.59 14.75 2C14.75 2.41 14.41 2.75 14 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10C21.25 9.59 21.59 9.25 22 9.25C22.41 9.25 22.75 9.59 22.75 10V15C22.75 20.43 20.43 22.75 15 22.75Z"
              fill="currentColor"
            />
            <path
              d="M22 10.75H18C14.58 10.75 13.25 9.41999 13.25 5.99999V1.99999C13.25 1.69999 13.43 1.41999 13.71 1.30999C13.99 1.18999 14.31 1.25999 14.53 1.46999L22.53 9.46999C22.74 9.67999 22.81 10.01 22.69 10.29C22.57 10.57 22.3 10.75 22 10.75ZM14.75 3.80999V5.99999C14.75 8.57999 15.42 9.24999 18 9.24999H20.19L14.75 3.80999Z"
              fill="currentColor"
            />
          </>
        );
      case "twoTone":
        return (
          <>
            <g opacity="0.4">
              <path
                d="M9 17V11L7 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 11L11 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <path
              d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );

      case "bulk":
        return (
          <>
            <path
              opacity="0.4"
              d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z"
              fill="currentColor"
            />
            <path
              d="M15.7997 2.20999C15.3897 1.79999 14.6797 2.07999 14.6797 2.64999V6.13999C14.6797 7.59999 15.9197 8.80999 17.4297 8.80999C18.3797 8.81999 19.6997 8.81999 20.8297 8.81999C21.3997 8.81999 21.6997 8.14999 21.2997 7.74999C19.8597 6.29999 17.2797 3.68999 15.7997 2.20999Z"
              fill="currentColor"
            />
            <path
              d="M11.5304 12.47L9.53043 10.47C9.52043 10.46 9.51043 10.46 9.51043 10.45C9.45043 10.39 9.37043 10.34 9.29043 10.3C9.28043 10.3 9.28043 10.3 9.27043 10.3C9.19043 10.27 9.11043 10.26 9.03043 10.25C9.00043 10.25 8.98043 10.25 8.95043 10.25C8.89043 10.25 8.82043 10.27 8.76043 10.29C8.73043 10.3 8.71043 10.31 8.69043 10.32C8.61043 10.36 8.53043 10.4 8.47043 10.47L6.47043 12.47C6.18043 12.76 6.18043 13.24 6.47043 13.53C6.76043 13.82 7.24043 13.82 7.53043 13.53L8.25043 12.81V17C8.25043 17.41 8.59043 17.75 9.00043 17.75C9.41043 17.75 9.75043 17.41 9.75043 17V12.81L10.4704 13.53C10.6204 13.68 10.8104 13.75 11.0004 13.75C11.1904 13.75 11.3804 13.68 11.5304 13.53C11.8204 13.24 11.8204 12.76 11.5304 12.47Z"
              fill="currentColor"
            />
          </>
        );

      case "broken":
        return (
          <>
            <path
              d="M9 13.65V11L11 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 17V16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 11L7 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 9C2 4 4 2 9 2H14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V12.98"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 10C15 10 14 9 14 6V2L22 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={w}
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0, color: color }}
      className={`bearishSvg ${className}`}
    >
      {renderIcon()}
    </svg>
  );
};

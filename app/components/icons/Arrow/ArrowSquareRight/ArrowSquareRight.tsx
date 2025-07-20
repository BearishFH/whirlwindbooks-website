import { ISvg } from "../../SvgPropsType";

export const ArrowSquareRight: React.FC<ISvg> = ({
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
              d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.7402 15.53L14.2602 12L10.7402 8.46997"
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
              d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM14.79 12.53L11.26 16.06C11.11 16.21 10.92 16.28 10.73 16.28C10.54 16.28 10.35 16.21 10.2 16.06C9.91 15.77 9.91 15.29 10.2 15L13.2 12L10.2 9C9.91 8.71 9.91 8.23 10.2 7.94C10.49 7.65 10.97 7.65 11.26 7.94L14.79 11.47C15.09 11.76 15.09 12.24 14.79 12.53Z"
              fill="currentColor"
            />
          </>
        );
      case "outline":
        return (
          <>
            <path
              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
              fill="currentColor"
            />
            <path
              d="M10.7402 16.2799C10.5502 16.2799 10.3602 16.2099 10.2102 16.0599C9.92018 15.7699 9.92018 15.2899 10.2102 14.9999L13.2102 11.9999L10.2102 8.99991C9.92018 8.70991 9.92018 8.22991 10.2102 7.93991C10.5002 7.64991 10.9802 7.64991 11.2702 7.93991L14.8002 11.4699C15.0902 11.7599 15.0902 12.2399 14.8002 12.5299L11.2702 16.0599C11.1202 16.2099 10.9302 16.2799 10.7402 16.2799Z"
              fill="currentColor"
            />
          </>
        );

      case "twoTone":
        return (
          <>
            <path
              d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              opacity="0.4"
              d="M10.7402 15.53L14.2602 12L10.7402 8.46997"
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
              d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z"
              fill="currentColor"
            />
            <path
              d="M10.7402 16.2799C10.5502 16.2799 10.3602 16.2099 10.2102 16.0599C9.92018 15.7699 9.92018 15.2899 10.2102 14.9999L13.2102 11.9999L10.2102 8.99991C9.92018 8.70991 9.92018 8.22991 10.2102 7.93991C10.5002 7.64991 10.9802 7.64991 11.2702 7.93991L14.8002 11.4699C15.0902 11.7599 15.0902 12.2399 14.8002 12.5299L11.2702 16.0599C11.1202 16.2099 10.9302 16.2799 10.7402 16.2799Z"
              fill="currentColor"
            />
          </>
        );

      case "broken":
        return (
          <>
            <path
              d="M2 13.01V15C2 20 4 22 9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.7402 15.53L14.2602 12L10.7402 8.46997"
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

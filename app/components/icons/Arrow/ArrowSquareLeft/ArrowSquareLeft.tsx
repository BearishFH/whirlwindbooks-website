import { ISvg } from "../../SvgPropsType";

export const ArrowSquareLeft: React.FC<ISvg> = ({
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
              d="M13.2602 15.53L9.74023 12L13.2602 8.46997"
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
              d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.79 15C14.08 15.29 14.08 15.77 13.79 16.06C13.64 16.21 13.45 16.28 13.26 16.28C13.07 16.28 12.88 16.21 12.73 16.06L9.2 12.53C8.91 12.24 8.91 11.76 9.2 11.47L12.73 7.94C13.02 7.65 13.5 7.65 13.79 7.94C14.08 8.23 14.08 8.71 13.79 9L10.79 12L13.79 15Z"
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
              d="M13.2599 16.2799C13.0699 16.2799 12.8799 16.2099 12.7299 16.0599L9.19992 12.5299C8.90992 12.2399 8.90992 11.7599 9.19992 11.4699L12.7299 7.93991C13.0199 7.64991 13.4999 7.64991 13.7899 7.93991C14.0799 8.22991 14.0799 8.70991 13.7899 8.99991L10.7899 11.9999L13.7899 14.9999C14.0799 15.2899 14.0799 15.7699 13.7899 16.0599C13.6499 16.2099 13.4599 16.2799 13.2599 16.2799Z"
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
              d="M13.2602 15.53L9.74023 12L13.2602 8.46997"
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
              d="M13.2599 16.2799C13.0699 16.2799 12.8799 16.2099 12.7299 16.0599L9.19992 12.5299C8.90992 12.2399 8.90992 11.7599 9.19992 11.4699L12.7299 7.93991C13.0199 7.64991 13.4999 7.64991 13.7899 7.93991C14.0799 8.22991 14.0799 8.70991 13.7899 8.99991L10.7899 11.9999L13.7899 14.9999C14.0799 15.2899 14.0799 15.7699 13.7899 16.0599C13.6499 16.2099 13.4599 16.2799 13.2599 16.2799Z"
              fill="currentColor"
            />
          </>
        );

      case "broken":
        return (
          <>
            <path
              d="M2 13.05V15C2 20 4 22 9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.2602 15.53L9.74023 12L13.2602 8.46997"
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

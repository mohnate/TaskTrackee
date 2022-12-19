import { useEffect, useState } from "react";

export default function CheckSvg({ color, className }) {
  // Show if user is using small screen
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    handleWindowResize(window);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  // handle window resize and setIsSmallScreen to true
  // if user window screen is smaller than 650
  const handleWindowResize = () => {
    if (window.innerWidth > 650) {
      setIsSmallScreen(false);
    } else {
      setIsSmallScreen(true);
    }
  };

  return isSmallScreen ? (
    <svg
      viewBox="0 0 16 16"
      strokeWidth={1.5}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || null}
      style={{ verticalAlign: "center" }}
    >
      <path
        d="M3.29 8.48 5.77 11 12 4.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color || "#000"}
      />
    </svg>
  ) : (
    <svg
      width={24}
      height={24}
      strokeWidth={1.5}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || null}
      style={{ verticalAlign: "center" }}
    >
      <path
        d="m5 13 4 4L19 7"
        stroke={color || "#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

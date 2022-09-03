export default function CheckSvg({ color, className }) {
  return (
    <svg
      width={24}
      height={24}
      strokeWidth={1.5}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || null}
      style={{verticalAlign:"center"}}
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

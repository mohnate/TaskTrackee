export default function DoubleCheck({ color, className }) {
  return (
    <svg
      width={24}
      height={24}
      strokeWidth={1.5}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="m1.5 12.5 4.076 4.076a.6.6 0 0 0 .848 0L9 14M16 7l-4 4"
        stroke={color || "currentColor"}
        strokeLinecap="round"
      />
      <path
        d="m7 12 4.576 4.576a.6.6 0 0 0 .848 0L22 7"
        stroke={color || "currentColor"}
        strokeLinecap="round"
      />
    </svg>
  );
}

import PropTypes from "prop-types";

LabelOutlineSvg.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

export default function LabelOutlineSvg({ color, className }) {
  return (
    <svg
      width={24}
      height={24}
      strokeWidth={1.5}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000"
      className={className}
    >
      <path
        d="M3 17.4V6.6a.6.6 0 0 1 .6-.6h13.079c.2 0 .388.1.5.267l3.6 5.4a.6.6 0 0 1 0 .666l-3.6 5.4a.6.6 0 0 1-.5.267H3.6a.6.6 0 0 1-.6-.6z"
        stroke={color || "#fff"}
      />
    </svg>
  );
}

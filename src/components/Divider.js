export default function Divider({ mgbt, mgtp }) {
  return (
    <hr
      style={{
        borderTop: "1px solid #fff",
        marginBottom: mgbt || "20px",
        marginTop: mgtp || "8px",
      }}
    />
  );
}

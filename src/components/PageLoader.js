import spinner from "../../public/spinner.png";
import styles from "../styles/spinner.module.scss";

import ImageRender from "../lib/ImageRender";

export default function Spinner({ pad, sz }) {
  const large = { width: "100px", height: "100px" };
  const medium = { width: "75px", height: "75px" };
  const small = { width: "50px", height: "50px" };
  return (
    <div className={sz === "full" ? styles.fullSize : {}}>
      <div className={styles.postition} style={pad ? { padding: pad } : {}}>
        <div
          className={styles.container}
          style={
            sz
              ? sz === "large"
                ? large
                : sz === "medium"
                ? medium
                : sz === "small"
                ? small
                : sz === "full"
                ? large
                : {}
              : {}
          }
        >
          <ImageRender src={spinner} alt="spinner loading" />
        </div>
      </div>
    </div>
  );
}

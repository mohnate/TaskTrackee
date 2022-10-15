import spinner from "$Public/spinner.png";
import styles from "$Styles/spinner.module.scss";

import ImageRender from "$Lib/ImageRender";

export default function Spinner({ pad, sz, pos }) {
  const large = { width: "100px", height: "100px" };
  const medium = { width: "75px", height: "75px" };
  const small = { width: "50px", height: "50px" };
  return (
    <div
      className={
        pos === "full" ? styles.fullSize : pos === "fill" ? styles.fillSize : {}
      }
    >
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
                : small
              : small
          }
        >
          <ImageRender src={spinner} alt="" />
        </div>
      </div>
    </div>
  );
}

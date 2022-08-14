import styles from "../../styles/input.module.scss";
import DoubleCheckSvg from "../icons/DoubleCheckSvg";

import { useState } from "react";

export default function UsernameInput({
  id,
  usernameRef,
  label,
  footer,
  state,
}) {
  const [tally, setTally] = useState(false);
  const inputOnChange = () => {
    if (usernameRef.current.value.length >= 3) {
      if (!tally) {
        setTally(true);
      }
    } else {
      if (tally) {
        setTally(false);
      }
    }
  };

  return (
    <>
      <label htmlFor={id} className={styles.inputLabel}>
        {label || "Username"}
      </label>
      <div style={{ position: "relative", width: "100%" }}>
        <input
          id={id}
          ref={usernameRef}
          className={`${styles.usernameInput} ${
            state ? styles.inputWarn : null
          }`}
          type="text"
          placeholder="Enter username"
          aria-required="true"
          required={true}
          autoComplete="off"
          minLength="3"
          style={footer || state ? { marginBottom: "2px" } : {}}
          onChange={inputOnChange}
        />
        {tally ? (
          <DoubleCheckSvg color="#19a663" className={styles.tallyIcon} />
        ) : null}
      </div>
      {footer ? (
        <label
          htmlFor={id}
          className={`${styles.inputFooter} ${
            state ? styles.inputWarnFooter : null
          }`}
        >
          {footer || state}
        </label>
      ) : null}
    </>
  );
}

import styles from "$Styles/input.module.scss";
import DoubleCheckSvg from "../icons/DoubleCheckSvg";

import React, { useState } from "react";

const UsernameInput = React.forwardRef(({ id, label, footer, state }, ref) => {
  // Check if user inputed email address match
  // the emailPattern
  const [tally, setTally] = useState(false);

  const inputOnChange = () => {
    if (ref.current.value.length >= 3) {
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
          ref={ref}
          className={`${styles.usernameInput} ${
            state ? styles.inputWarn : null
          }`}
          type="text"
          placeholder="Enter username"
          aria-required="true"
          required={true}
          autoComplete="off"
          // minLength="3"
          style={footer || state ? { marginBottom: "2px" } : {}}
          onChange={inputOnChange}
          data-testid="usernameInput"
        />

        {tally ? (
          <DoubleCheckSvg color="#19a663" className={styles.tallyIcon} />
        ) : null}
      </div>

      {state || footer ? (
        <label
          htmlFor={id}
          className={`${styles.inputFooter} ${
            state ? styles.inputWarnFooter : null
          }`}
          data-testid="usernameLabel"
        >
          {state || footer}
        </label>
      ) : null}
    </>
  );
});

export default UsernameInput;

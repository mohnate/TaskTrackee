import styles from "$Styles/input.module.scss";
import DoubleCheckSvg from "../icons/DoubleCheckSvg";

import React, { useState } from "react";

const PasswordInput = React.forwardRef(
  ({ id, label, placeholder, footer, confirmPass = false, state }, ref) => {
    const [tally, setTally] = useState(false);
    const inputOnChange = () => {
      const passwordLength =
        ref.current.value.length > 7 && ref.current.value.length < 30;

      if (passwordLength) {
        if (confirmPass) {
          if (confirmPass.current.value === ref.current.value)
            if (!tally) {
              setTally(true);
            }
          return;
        }
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
          {label || "Password"}
        </label>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <input
            id={id}
            ref={ref}
            className={`${styles.emailInput} ${
              state ? styles.inputWarn : null
            }`}
            type="password"
            placeholder={placeholder || "Enter password"}
            aria-required="true"
            required={true}
            autoComplete="on"
            // minLength="8"
            style={footer || state ? { marginBottom: "2px" } : {}}
            onChange={inputOnChange}
            data-testid="passwordInput"
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
            data-testid="passwordLabel"
          >
            {state || footer}
          </label>
        ) : null}
      </>
    );
  }
);

export default PasswordInput;

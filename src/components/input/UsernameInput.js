import styles from "$Styles/input.module.scss";
import DoubleCheckSvg from "../icons/DoubleCheckSvg";

import React, { useState } from "react";

import PropTypes from "prop-types";

const UsernameInput = React.forwardRef(
  ({ id, label, footer, state, isCallBackRef = false }, ref) => {
    // Check if user inputed email address match
    // the emailPattern
    const [tally, setTally] = useState(false);

    const inputOnChange = () => {
      const node = isCallBackRef || ref;
      if (node.current.value.length >= 3) {
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
        {label === "none" ? null : (
          <label htmlFor={id} className={styles.inputLabel}>
            {label || "Username"}
          </label>
        )}

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
            required
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
  }
);

UsernameInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  footer: PropTypes.string,
  state: PropTypes.string,
};

UsernameInput.displayName = "UsernameInput";
export default UsernameInput;

import styles from "$Styles/input.module.scss";
import DoubleCheckSvg from "../icons/DoubleCheckSvg";

import React, { useState } from "react";

import PropTypes from "prop-types";

const EmailInput = React.forwardRef(({ id, label, footer, state }, ref) => {
  // Check if user inputed email address match
  // the emailPattern
  const [tally, setTally] = useState(false);

  const inputOnChange = () => {
    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (ref.current.value.match(emailPattern)) {
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
        {label || "Email address"}
      </label>
      <div style={{ position: "relative", width: "100%" }}>
        <input
          id={id}
          ref={ref}
          className={`${styles.emailInput} ${state ? styles.inputWarn : null}`}
          type="email"
          placeholder="Enter email address"
          // pattern='/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
          aria-required="true"
          required={true}
          autoComplete="on"
          style={footer || state ? { marginBottom: "2px" } : {}}
          onChange={inputOnChange}
          data-testid="emailInput"
        />

        {tally ? (
          <DoubleCheckSvg color="#19a663" className={styles.tallyIcon} />
        ) : null}
      </div>

      {footer || state ? (
        <label
          htmlFor={id}
          className={`${styles.inputFooter} ${
            state ? styles.inputWarnFooter : null
          }`}
          data-testid="emailLabel"
        >
          {footer || state}
        </label>
      ) : null}
    </>
  );
});

EmailInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  footer: PropTypes.string,
  state: PropTypes.string,
};

EmailInput.displayName = "EmailInput";
export default EmailInput;

import styles from "../../styles/input.module.scss";
import DoubleCheck from "../icons/DoubleCheck";

import { useState } from "react";

export default function EmailInput({ id, emailRef, label, footer, state }) {
  const [tally, setTally] = useState(false);
  const inputOnChange = () => {
    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRef.current.value.match(emailPattern)) {
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
          ref={emailRef}
          className={`${styles.emailInput} ${state ? styles.inputWarn : null}`}
          type="email"
          placeholder="Enter email address"
          // pattern='/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
          aria-required="true"
          required={true}
          autoComplete="on"
          style={footer || state ? { marginBottom: "2px" } : {}}
          onChange={inputOnChange}
        />
        {tally ? (
          <DoubleCheck color="#19a663" className={styles.tallyIcon} />
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

import styles from "../../styles/input.module.scss";
import DoubleCheck from "../icons/DoubleCheck";

import { useState } from "react";

export default function PasswordInput({
  id,
  passwordRef,
  label,
  placeholder,
  footer,
  confirmPass = false,
  state,
}) {
  const [tally, setTally] = useState(false);
  const inputOnChange = () => {
    const passwordLength =
      passwordRef.current.value.length > 7 &&
      passwordRef.current.value.length < 30;

    if (passwordLength) {
      if (confirmPass) {
        if (confirmPass.current.value === passwordRef.current.value)
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
          ref={passwordRef}
          className={`${styles.emailInput} ${state ? styles.inputWarn : null}`}
          type="password"
          placeholder={placeholder || "Enter password"}
          aria-required="true"
          required={true}
          autoComplete="on"
          minLength="8"
          style={footer || state ? { marginBottom: "2px" } : {}}
          onChange={inputOnChange}
        />
        {tally ? (
          <DoubleCheck color="#19a663" className={styles.tallyIcon} />
        ) : null}
      </div>

      {footer || state ? (
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

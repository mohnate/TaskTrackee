import styles from "../../styles/input.module.scss";

import { useState } from "react";

export default function VerificationCode({
  id,
  codeRef,
  state,
  inputOnChange,
}) {
  return (
    <>
      <input
        id={id}
        ref={codeRef}
        className={`${styles.codeInput} ${state ? styles.inputWarn : null}`}
        type="text"
        aria-required="true"
        required={true}
        autoComplete="off"
        min="0"
        max="9"
        onChange={(e) => inputOnChange(e)}
      />
    </>
  );
}

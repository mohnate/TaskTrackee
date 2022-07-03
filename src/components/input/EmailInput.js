import styles from "../../styles/input.module.scss";

export default function EmailInput({ id, emailRef, label }) {
  return (
    <>
      <label htmlFor={id} className={styles.inputLabel}>
        {label || "Email address"}
      </label>
      <input
        id={id}
        ref={emailRef}
        className={styles.emailInput}
        type="email"
        placeholder="Enter email address"
        pattern='/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
        aria-required="true"
        required={true}
        autoComplete="on"
      />
    </>
  );
}

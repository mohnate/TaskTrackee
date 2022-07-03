import styles from "../../styles/input.module.scss";

export default function PasswordInput({ id, passwordRef, label }) {
  return (
    <>
      <label htmlFor={id} className={styles.inputLabel}>
        {label || "Password"}
      </label>
      <input
        id={id}
        ref={passwordRef}
        className={styles.emailInput}
        type="password"
        placeholder="Enter password"
        aria-required="true"
        required={true}
        autoComplete="on"
      />
    </>
  );
}

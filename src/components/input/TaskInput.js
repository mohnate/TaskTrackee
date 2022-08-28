import styles from "../../styles/input.module.scss";

export default function TaskInput({ id, taskRef, placeholder, c, val }) {
  return (
    <>
      <div style={{ position: "relative", width: "100%" }}>
        <input
          id={id}
          ref={taskRef}
          className={`${styles.taskInput} ${c || ""}`}
          type="text"
          placeholder={placeholder}
          aria-required="true"
          required={false}
          autoComplete="off"
          defaultValue={val || ""}
        />
      </div>
    </>
  );
}

import styles from "$Styles/input.module.scss";

import React from "react";

import PropTypes from "prop-types";

const TaskInput = React.forwardRef(({ id, placeholder, c, val }, ref) => {
  return (
    <>
      <div style={{ position: "relative", width: "100%" }}>
        <input
          id={id}
          ref={ref}
          className={`${styles.taskInput} ${c || ""}`}
          type="text"
          placeholder={placeholder}
          aria-required="true"
          required={false}
          autoComplete="off"
          defaultValue={val || ""}
          data-testid="taskInput"
        />
      </div>
    </>
  );
});

TaskInput.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  c: PropTypes.string,
  val: PropTypes.string,
};

TaskInput.displayName = "TaskInput";
export default TaskInput;

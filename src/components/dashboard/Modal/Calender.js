import inputStyles from "$Styles/input.module.scss";
import React, { useCallback } from "react";

import PropTypes from "prop-types";

const Calender = React.forwardRef(({ dateState, setDateState }, ref) => {
  const refCallback = useCallback((node) => {
    if (node) {
      if (dateState) node.value = dateState;
      ref.current = node;
    }
  }, []);

  return (
    <div className={inputStyles.optionContainer}>
      <label className={inputStyles.dateTimeLabel} htmlFor="due-time">
        Due Date:{" "}
        <span style={{ opacity: 0.5 }}>
          {ref?.current?.value ? null : "Not Set"}
        </span>
      </label>
      <input
        className={inputStyles.dateTimeInput}
        type="datetime-local"
        id="due-time"
        ref={refCallback}
        onChange={(e) => {
          if (setDateState) setDateState(e.target.value);
        }}
      />
    </div>
  );
});

Calender.propTypes = {
  dateState: PropTypes.string,
  setDateState: PropTypes.func,
};

Calender.displayName = "Calender";
export default Calender;

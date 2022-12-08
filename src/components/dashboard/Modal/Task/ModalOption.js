import dashboardStyles from "$Styles/dashboard/dashboard.module.scss";
import inputStyles from "$Styles/input.module.scss";
import styles from "$Styles/dashboard/modal.module.scss";
import CalenderSvg from "$Components/icons/CalenderSvg";
import LabelOutlineSvg from "$Components/icons/LabelOutlineSvg";

import { useState } from "react";
import { useSelector } from "react-redux";

import LabelBarSelect from "../Label/LabelBarSelect";

export default function ModalOption({ dateRef }) {
  const [activeOption, setActiveOption] = useState(null);
  const labelData = useSelector((state) => state.labelData.value);

  const toggleBtn = (type) => {
    if (type === "calender") {
      if (activeOption === "calender") return setActiveOption(null);
      setActiveOption("calender");
    } else if (type === "label") {
      if (activeOption === "label") return setActiveOption(null);
      setActiveOption("label");
    }
  };

  const style = {
    backgroundColor: "#fff",
    height: "32px",
    borderRadius: " 8px 8px 0 0",
  };
  const calenderBtnActive = activeOption === "calender" ? style : null;
  const labelBtnActive = activeOption === "label" ? style : null;

  return (
    <>
      <div className={styles.btnOptionGroup}>
        <button
          type="button"
          onClick={() => toggleBtn("calender")}
          className={`${dashboardStyles.addTaskBtn} ${styles.optionBtn}`}
          style={calenderBtnActive}
        >
          <CalenderSvg color={activeOption === "calender" ? "#000" : "#fff"} />
        </button>
        <button
          type="button"
          onClick={() => toggleBtn("label")}
          className={`${dashboardStyles.addTaskBtn} ${styles.optionBtn}`}
          style={labelBtnActive}
        >
          <LabelOutlineSvg color={activeOption === "label" ? "#000" : "#fff"} />
        </button>
      </div>
      {activeOption === "calender" ? (
        <div className={inputStyles.optionContainer}>
          <label className={inputStyles.dateTimeLabel} htmlFor="due-time">
            Due Date:
          </label>
          <input
            className={inputStyles.dateTimeInput}
            type="datetime-local"
            id="due-time"
            ref={dateRef}
          />
        </div>
      ) : activeOption === "label" ? (
        <div className={inputStyles.optionContainer}>
          {labelData?.length > 0 ? (
            labelData.map((label) => (
              <LabelBarSelect data={label} key={label.id} />
            ))
          ) : (
            <>
              <span className={styles.missingLabel}>
                You don't have any label created currently
              </span>
            </>
          )}
        </div>
      ) : null}
    </>
  );
}

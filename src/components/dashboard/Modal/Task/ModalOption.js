import dashboardStyles from "$Styles/dashboard/dashboard.module.scss";
import inputStyles from "$Styles/input.module.scss";
import styles from "$Styles/dashboard/modal.module.scss";
import CalenderSvg from "$Components/icons/CalenderSvg";
import LabelOutlineSvg from "$Components/icons/LabelOutlineSvg";

import { useState } from "react";
import { useSelector } from "react-redux";

import LabelBarSelect from "../Label/LabelBarSelect";
import Calender from "../Calender";

export default function ModalOption({ dateRef, dateState, setDateState }) {
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

      {/* Calender or Label Section */}
      {activeOption === "calender" ? (
        <Calender
          ref={dateRef}
          dateState={dateState}
          setDateState={setDateState}
        />
      ) : activeOption === "label" ? (
        <div className={inputStyles.optionContainer}>
          {labelData?.length > 0 ? (
            labelData.map((label) => (
              <LabelBarSelect data={label} key={label.id} />
            ))
          ) : (
            <span className={styles.missingLabel}>
              You don&apos;t have any label created currently
            </span>
          )}
        </div>
      ) : null}
    </>
  );
}

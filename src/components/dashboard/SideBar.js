import styles from "$Styles/dashboard/SideBar.module.scss";
import taskList from "$Icon/taskList.svg";
import calenderToday from "$Icon/calenderToday.svg";
import upcoming from "$Icon/upcoming.svg";
import doubleCheck from "$Icon/doubleCheck.svg";
import nav from "$Icon/nav/navArrowRight.svg";
import plus from "$Icon/plus.svg";

import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Data below must be synchronized with routes/dashboard/index.js
const selectionBtn = [
  { label: "All Task", img: taskList, pathname: "alltask" },
  { label: "Today Task", img: calenderToday, pathname: "todaytask" },
  { label: "Upcoming Task", img: upcoming, pathname: "upcomingtask" },
  { label: "Finished Task", img: doubleCheck, pathname: "finishedtask" },
];

export default function SideBar({ toggleSideBar, setToggleLabelModal }) {
  const location = useLocation();
  const sideBarControls = useAnimation();
  const labelControls = useAnimation();
  // Open or close labels dropdown option
  const [toggleLabels, setToggleLabels] = useState(false);
  const labelData = useSelector((state) => state.labelData.value);

  useEffect(() => {
    if (toggleSideBar) {
      sideBarControls.start({
        x: 0,
        transition: { type: "tween" },
      });
    } else {
      sideBarControls.start({
        x: -260,
        transition: { type: "tween" },
      });
    }
  }, [toggleSideBar]);

  useEffect(() => {
    if (toggleLabels) {
      labelControls.start({
        transform: "rotate(90deg)",
        transitionTimingFunction: "linear",
      });
    } else {
      labelControls.start({
        transform: "rotate(0deg)",
        transitionTimingFunction: "linear",
      });
    }
  }, [toggleLabels]);

  const updLabelState = (e) => {
    e.stopPropagation();
    setToggleLabelModal(true);
  };

  const labelVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <motion.section
      className={styles.sidebar}
      initial={{ x: -260 }}
      animate={sideBarControls}
    >
      <nav className={styles.container}>
        {selectionBtn.map((section, index) => {
          return (
            <Link to={`/dashboard/${section.pathname}`} key={index}>
              <button
                type="button"
                className={
                  location.pathname === `/dashboard/${section.pathname}`
                    ? `${styles.btnSelcted}`
                    : `${styles.selectBtn}`
                }
              >
                <img src={section.img} alt="" className={styles.btnIcon} />
                {section.label}
              </button>
            </Link>
          );
        })}
      </nav>
      <div className={styles.container}>
        <button
          className={styles.selectBtn}
          onClick={() => setToggleLabels((prev) => !prev)}
        >
          <motion.img
            key={"labelIcon"}
            src={nav}
            alt=""
            className={styles.btnIcon}
            animate={labelControls}
          />
          <span>Labels</span>
          <div className={styles.btnLabelPlus} onClick={updLabelState}>
            <img src={plus} />
          </div>
        </button>
        <AnimatePresence mode="wait">
          {toggleLabels && (
            <motion.ul
              className={styles.dropdown}
              variants={labelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {labelData?.length > 0 ? (
                labelData.map((data) => (
                  <li className={styles.listItem} key={data.id}>
                    <div
                      className={styles.labelColor}
                      style={{ backgroundColor: `${data.colour}` }}
                    ></div>
                    <span className={styles.listItemTxt}>{data.label}</span>
                  </li>
                ))
              ) : (
                <>
                  <span className={styles.missingLabel}>
                    You don't have any label created currently
                  </span>
                </>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

import styles from "../../styles/dashboard/SideBar.module.scss";
import taskList from "../../../public/icon/taskList.svg";
import calenderToday from "../../../public/icon/calenderToday.svg";
import upcoming from "../../../public/icon/upcoming.svg";
import doubleCheck from "../../../public/icon/doubleCheck.svg";
import nav from "../../../public/icon/nav/navArrowRight.svg";
import plus from "../../../public/icon/plus.svg";

import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

// Data below must be synchronized with routes/dashboard/index.js
const selectionBtn = [
  { label: "All Task", img: taskList, pathname: "alltask" },
  { label: "Today Task", img: calenderToday, pathname: "todaytask" },
  { label: "Upcoming Task", img: upcoming, pathname: "upcomingtask" },
  { label: "Finished Task", img: doubleCheck, pathname: "finishedtask" },
];

export default function SideBar({ toggleSideBar }) {
  const location = useLocation();
  const sideBarControls = useAnimation();
  const labelControls = useAnimation();
  const [toggleLabels, setToggleLabels] = useState(false);

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
          <img src={plus} className={styles.btnLabelPlus} />
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
              <li className={styles.listItem}>
                <div className={styles.labelColor}></div>
                <span>hihi</span>
              </li>
              <li className={styles.listItem}>
                <div className={styles.labelColor}></div>
                <span>asdadadads</span>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

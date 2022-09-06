import styles from "../../styles/dashboard/SideBar.module.scss";
import taskList from "../../../public/icon/taskList.svg";
import calenderToday from "../../../public/icon/calenderToday.svg";
import upcoming from "../../../public/icon/upcoming.svg";
import doubleCheck from "../../../public/icon/doubleCheck.svg";

import { useLocation } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

// Data below must be synchronized with routes/dashboard/index.js
const selectionBtn = [
  { label: "All Task", img: taskList, pathname: "alltask" },
  { label: "Today Task", img: calenderToday, pathname: "todaytask" },
  { label: "Upcoming Task", img: upcoming, pathname: "upcomingtask" },
  { label: "Finished Task", img: doubleCheck, pathname: "finishedtask" },
];

export default function SideBar({ setActivePage, toggleSideBar }) {
  const location = useLocation();
  const controls = useAnimation();

  useEffect(() => {
    if (toggleSideBar) {
      controls.start({
        x: 0,
        transition: { type: "tween" },
      });
    } else {
      controls.start({
        x: -260,
        transition: { type: "tween" },
      });
    }
  }, [toggleSideBar]);

  return (
    <motion.section
      className={styles.sidebar}
      initial={{ x: -260 }}
      animate={controls}
    >
      <div className={styles.container}>
        {selectionBtn.map((section, index) => {
          return (
            <button
              type="button"
              key={index}
              className={
                location.pathname === `/dashboard/${section.pathname}`
                  ? `${styles.btnSelcted}`
                  : `${styles.selectBtn}`
              }
              onClick={() => setActivePage(section.pathname)}
            >
              <img src={section.img} alt="" className={styles.btnIcon} />
              {section.label}
            </button>
          );
        })}
      </div>
    </motion.section>
  );
}

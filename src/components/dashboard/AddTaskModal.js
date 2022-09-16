import dashboardStyles from "../../styles/dashboard/dashboard.module.scss";
import inputStyles from "../../styles/input.module.scss";
import styles from "../../styles/dashboard/AddTaskModal.module.scss";
// import LabelOutline from "../../../public/icon/label-outline.svg";
// import Calender from "../../../public/icon/calenderToday.svg";
import CalenderSvg from "../icons/CalenderSvg";
import LabelOutlineSvg from "../icons/LabelOutlineSvg";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../lib/supabase";

import TaskInput from "../input/TaskInput";
import WarnModal from "./WarnModal";

export default function AddTaskModal({ setToggleModal, toggleModal }) {
  const headRef = useRef();
  const taskDescRef = useRef();
  const dateRef = useRef();
  const [warn, setWarn] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const header = headRef.current.value;
    let desc = taskDescRef.current.value;
    let date = dateRef.current.value;

    if (desc === "") desc = null;
    if (date === "") date = null;
    date = new Date(date).toUTCString();

    const { data, error } = await supabase
      .from("Task")
      .insert([
        { user_uid: supabase.auth.user().id, header, desc, due_date: date },
      ]);
    if (error) console.error(error);
    setToggleModal(false);
  };

  const closeModal = (e, btnClose) => {
    const header = headRef.current.value;
    let desc = taskDescRef.current.value;
    let date = dateRef?.current ? dateRef.current.value : null;

    const headerDidChange = header !== "Task Header";
    const descDidChange = desc !== "";
    const dateDidChange = date === null ? false : date !== "";
    console.log(date);

    if (e === null && btnClose) {
      if (headerDidChange || descDidChange || dateDidChange) {
        return setWarn("You have unsaved changes");
      } else return setToggleModal(false);
    }
    if (e.currentTarget == e.target) {
      if (headerDidChange || descDidChange || dateDidChange) {
        return setWarn("You have unsaved changes");
      } else return setToggleModal(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {toggleModal ? (
          <motion.div
            className={styles.pos}
            onClick={closeModal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <main className={styles.content}>
              <form onSubmit={handleSubmit}>
                <TaskInput
                  ref={headRef}
                  id="taskHead"
                  placeholder="Headings here"
                  c={styles.head}
                  val="Task Header"
                />
                <TaskInput
                  ref={taskDescRef}
                  id="taskDesc"
                  placeholder="Description here"
                />
                <ModalOption dateRef={dateRef} />

                <div className={styles.btnGroup}>
                  <button
                    type="button"
                    onClick={() => closeModal(null, true)}
                    className={`${dashboardStyles.addTaskBtn} ${styles.cancelTaskBtn}`}
                  >
                    Cancel
                  </button>
                  {/* Submit Button  */}
                  <button
                    type="submit"
                    className={`${dashboardStyles.addTaskBtn} ${styles.addTaskBtn}`}
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </main>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {toggleModal ? (
        <div className={styles.bgClose} onClick={closeModal}></div>
      ) : null}
      {warn ? (
        <WarnModal
          msg={warn}
          setToggleModal={setToggleModal}
          setWarn={setWarn}
        />
      ) : null}
    </>
  );
}

function ModalOption({ dateRef }) {
  const [activeOption, setActiveOption] = useState(null);

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
        <div className={inputStyles.optionContainer}>Label</div>
      ) : null}
    </>
  );
}

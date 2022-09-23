import dashboardStyles from "../../../styles/dashboard/dashboard.module.scss";
import inputStyles from "../../../styles/input.module.scss";
import styles from "../../../styles/dashboard/modal.module.scss";

import React, { useEffect, useImperativeHandle, useRef } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import TaskInput from "../../input/TaskInput";
import Divider from "../../Divider";

const UpdTask = React.forwardRef(
  ({ closeModal, handleUpdate, dataId }, ref) => {
    const headRef = useRef();
    const taskDescRef = useRef();
    const dateRef = useRef();
    const taskData = useSelector((state) =>
      state.taskData.value?.filter((task) => task.id == dataId)
    );

    useImperativeHandle(ref, () => {
      return {
        headInput: () => headRef.current.value,
        descInput: () => taskDescRef.current.value,
        dateInput: () => dateRef?.current?.value,
      };
    });

    useEffect(() => {
      if (taskData[0].due_date != null) {
        const timeZoneOffset = new Date(
          taskData[0].due_date
        ).getTimezoneOffset();

        dateRef.current.value = new Date(
          new Date(taskData[0].due_date).setMinutes(
            new Date(taskData[0].due_date).getMinutes() - timeZoneOffset
          )
        )
          .toISOString()
          .slice(0, -5);
      }
    }, []);

    const modalVariants = {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 },
    };

    return (
      <motion.div
        className={styles.posBig}
        onClick={closeModal}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <main className={styles.contentBig}>
          <Divider />
          <form onSubmit={(e) => handleUpdate(e, taskData[0].id)}>
            <TaskInput
              ref={headRef}
              id="taskHead"
              placeholder="Headings here"
              c={styles.head}
              val={taskData[0].header}
            />
            <TaskInput
              ref={taskDescRef}
              id="taskDesc"
              placeholder="Description here"
              val={taskData[0].desc}
            />
            <Divider mgtp="12px" />
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
            Label
            <Divider mgbt="5px" />
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
                Save
              </button>
            </div>
          </form>
        </main>
      </motion.div>
    );
  }
);

export default UpdTask;

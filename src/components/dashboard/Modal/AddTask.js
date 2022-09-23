import dashboardStyles from "../../../styles/dashboard/dashboard.module.scss";
import styles from "../../../styles/dashboard/modal.module.scss";

import React, { useImperativeHandle, useRef } from "react";
import { motion } from "framer-motion";

import TaskInput from "../../input/TaskInput";
import ModalOption from "./ModalOption";

const AddTask = React.forwardRef(({ closeModal, handleSubmit }, ref) => {
  const headRef = useRef();
  const taskDescRef = useRef();
  const dateRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      headInput: () => headRef.current.value,
      descInput: () => taskDescRef.current.value,
      dateInput: () => dateRef?.current?.value,
    };
  });

  const modalVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
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
  );
});

export default AddTask;

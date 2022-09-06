import dashboardStyles from "../../styles/dashboard/dashboard.module.scss";
import styles from "../../styles/dashboard/AddTaskModal.module.scss";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../lib/supabase";

import TaskInput from "../input/TaskInput";

export default function AddTaskModal({ setToggleModal, toggleModal }) {
  const headRef = useRef();
  const taskDescRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const header = headRef.current.value;
    const desc = taskDescRef.current.value;
    const { data, error } = await supabase
      .from("Task")
      .insert([{ user_uid: supabase.auth.user().id, header, desc }]);
    if (error) console.error(error);
    setToggleModal(false);
  };

  const closeModal = (e) => {
    if (e.currentTarget == e.target) {
      setToggleModal(false);
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
          <>
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
                    taskRef={headRef}
                    id="taskHead"
                    placeholder="Headings here"
                    c={styles.head}
                    val="Task Header"
                  />
                  <TaskInput
                    taskRef={taskDescRef}
                    id="taskDesc"
                    placeholder="Description here"
                  />
                  <button
                    type="submit"
                    className={`${dashboardStyles.addTaskBtn} ${styles.addTaskBtn}`}
                  >
                    Add Task
                  </button>
                </form>
              </main>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
      {toggleModal ? (
        <div className={styles.bgClose} onClick={closeModal}></div>
      ) : null}
    </>
  );
}

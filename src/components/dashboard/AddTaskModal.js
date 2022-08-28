import dashboardStyles from "../../styles/dashboard/dashboard.module.scss";
import styles from "../../styles/dashboard/AddTaskModal.module.scss";

import { useRef } from "react";
import { supabase } from "../../lib/supabase";

import TaskInput from "../input/TaskInput";

export default function AddTaskModal({ setToggleModal }) {
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

  return (
    <>
      <div className={styles.pos} onClick={closeModal}>
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
      </div>
      <div className={styles.bgClose} onClick={closeModal}></div>
    </>
  );
}

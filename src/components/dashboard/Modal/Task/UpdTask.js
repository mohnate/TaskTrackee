import dashboardStyles from "$Styles/dashboard/dashboard.module.scss";
import inputStyles from "$Styles/input.module.scss";
import styles from "$Styles/dashboard/modal.module.scss";

import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { LabelContext } from "./TaskModal";

import TaskInput from "$Components/input/TaskInput";
import Divider from "$Components/Divider";
import Calender from "../Calender";
import LabelBarSelect from "../Label/LabelBarSelect";

const UpdTask = React.forwardRef(
  ({ closeModal, handleUpdate, deleteHandler, dataId }, ref) => {
    const headRef = useRef();
    const taskDescRef = useRef();
    const dateRef = useRef();
    const taskData = useSelector((state) =>
      state.taskData.value?.filter((task) => task.id == dataId)
    );
    const labelData = useSelector((state) => state.labelData.value);

    // useContext from TaskModal.js
    const { state, dispatch } = useContext(LabelContext);

    useImperativeHandle(ref, () => {
      return {
        headInput: () => headRef.current.value,
        descInput: () => taskDescRef.current.value,
        dateInput: () => dateRef?.current?.value,
      };
    });

    // Set due_date and the selected label
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
      if (taskData[0].labels_id !== null) {
        dispatch(taskData[0].labels_id);
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
            {/* Header and Description Section */}
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

            {/* Calender Section */}
            <Calender ref={dateRef} />

            {/* Label Section */}
            <div className={inputStyles.optionContainer}>
              {labelData?.length > 0 ? (
                labelData.map((label) => (
                  <LabelBarSelect
                    data={label}
                    key={label.id}
                    taskId={taskData[0].id}
                  />
                ))
              ) : (
                <span className={styles.missingLabel}>
                  You don&apos;t have any label created currently
                </span>
              )}
            </div>
            <Divider mgbt="5px" />

            {/* Button Section */}
            <div className={styles.btnGroup}>
              {/* Delete Button  */}
              <button
                type="button"
                onClick={(e) => deleteHandler(e, taskData[0].id)}
                className={`${dashboardStyles.addTaskBtn} ${styles.cancelTaskBtn}`}
              >
                Delete
              </button>
              {/* Cancel Button  */}
              <button
                type="button"
                onClick={() => closeModal(null, true)}
                className={`${dashboardStyles.addTaskBtn} ${styles.backTaskBtn}`}
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

UpdTask.displayName = "UpdTask";
export default UpdTask;

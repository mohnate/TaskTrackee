import styles from "../../styles/dashboard/dashboard.module.scss";

import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { taskNotCompleted } from "../../lib/ReduxSlice/SupabaseTaskSlice";

import TaskBar from "../../components/dashboard/TaskBar";

export default function FinishedTask() {
  const taskDataCompleted = useSelector((state) =>
    state.taskData.value?.filter((task) => {
      if (!taskNotCompleted(task)) return task;
    })
  );

  const [setToggleModal] = useOutletContext();

  return (
    <>
      <Helmet>
        <title>TaskTrackee | Finished Task</title>
      </Helmet>
      <article className={styles.mainTask}>
        {/* Completed Section */}
        {taskDataCompleted?.length > 0 ? (
          <div className={styles.taskSection}>
            {taskDataCompleted.map((task) => (
              <TaskBar setTgMd={setToggleModal} data={task} key={task.id} />
            ))}
          </div>
        ) : null}

        {/* No Task Matched  */}
        {taskDataCompleted?.length === 0 ? (
          <h2 className={styles.sectionHead}>Nothing to show here</h2>
        ) : null}
      </article>
    </>
  );
}

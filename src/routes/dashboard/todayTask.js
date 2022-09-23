import styles from "../../styles/dashboard/dashboard.module.scss";

import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import {
  dataIsLate,
  dataIsToday,
  taskNotCompleted,
} from "../../lib/ReduxSlice/SupabaseTaskSlice";

import Divider from "../../components/Divider";
import TaskBar from "../../components/dashboard/TaskBar";

export default function TodayTask() {
  const taskDataTdy = useSelector((state) =>
    state.taskData.value?.filter((task) => {
      if (dataIsToday(task) && taskNotCompleted(task) && !dataIsLate(task))
        return task;
    })
  );
  const taskDataLate = useSelector((state) =>
    state.taskData.value?.filter((task) => {
      if (dataIsToday(task) && dataIsLate(task) && taskNotCompleted(task))
        return task;
    })
  );

  const [setToggleModal] = useOutletContext();

  return (
    <>
      <Helmet>
        <title>TaskTrackee | Today Task</title>
      </Helmet>
      <article className={styles.mainTask}>
        {/* Today Section */}
        {taskDataTdy?.length > 0 ? (
          <section className={styles.taskSection}>
            <h2 className={styles.sectionHead}>Pending Task</h2>
            <Divider />
            {taskDataTdy.map((task) => (
              <TaskBar
                setTgMd={setToggleModal}
                data={task}
                key={task.id}
                date={"micro"}
              />
            ))}
          </section>
        ) : null}

        {/* Overdue Section  */}
        {taskDataLate?.length > 0 ? (
          <section className={styles.taskSection}>
            <h2 className={styles.sectionHead}>Overdue</h2>
            <Divider />
            {taskDataLate.map((task) => (
              <TaskBar
                setTgMd={setToggleModal}
                data={task}
                key={task.id}
                date={"micro"}
              />
            ))}
          </section>
        ) : null}

        {/* No Task Matched  */}
        {taskDataTdy?.length === 0 && taskDataLate?.length === 0 ? (
          <h2 className={styles.sectionHead}>No Task</h2>
        ) : null}
      </article>
    </>
  );
}

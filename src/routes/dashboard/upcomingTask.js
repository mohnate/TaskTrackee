import styles from "$Styles/dashboard/dashboard.module.scss";

import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import {
  dataIsLate,
  dataIsNextWeek,
  dataIsThisWeek,
  taskNotCompleted,
} from "$Lib/ReduxSlice/SupabaseTaskSlice";
import { useSelector } from "react-redux";

import Divider from "$Components/Divider";
import TaskBar from "$Components/dashboard/TaskBar";

export default function UpcoimngTask() {
  const taskDataThisWeek = useSelector((state) =>
    state.taskData.value?.filter((task) => {
      if (dataIsThisWeek(task) && taskNotCompleted(task) && !dataIsLate(task))
        return task;
    })
  );
  const taskDataNextWeek = useSelector((state) =>
    state.taskData.value?.filter((task) => {
      if (
        !dataIsThisWeek(task) &&
        dataIsNextWeek(task) &&
        taskNotCompleted(task) &&
        !dataIsLate(task)
      )
        return task;
    })
  );
  const taskDataLaterWeek = useSelector((state) =>
    state.taskData.value?.filter((task) => {
      if (
        !dataIsThisWeek(task) &&
        !dataIsNextWeek(task) &&
        taskNotCompleted(task) &&
        !dataIsLate(task)
      )
        return task;
    })
  );

  const lastDayOfThisWeek = () => {
    const weekdayList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const taskWeekday = new Date().toLocaleString("en-UK", {
      weekday: "short",
    });
    let results;

    weekdayList.forEach((day, index) => {
      if (day === taskWeekday) {
        const daysToShow = 6 - index;
        results = new Date(
          new Date().setDate(new Date().getDate() + daysToShow)
        ).toLocaleDateString("en-GB");
      }
    });

    return results;
  };

  const lastDayOfNextWeek = () => {
    const weekdayList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const taskWeekday = new Date().toLocaleString("en-UK", {
      weekday: "short",
    });
    let results;

    weekdayList.forEach((day, index) => {
      if (day === taskWeekday) {
        const daysToShow = 13 - index;
        results = new Date(
          new Date().setDate(new Date().getDate() + daysToShow)
        ).toLocaleDateString("en-GB");
      }
    });

    return results;
  };

  const [setToggleModal] = useOutletContext();

  return (
    <>
      <Helmet>
        <title>TaskTrackee | Upcoming Task</title>
      </Helmet>
      <article className={styles.mainTask}>
        {/* This Week Section */}
        {taskDataThisWeek?.length > 0 ? (
          <section className={styles.taskSection}>
            <h2 className={styles.sectionHead}>
              This Week ({lastDayOfThisWeek()})
            </h2>
            <Divider />
            {taskDataThisWeek.map((task) => (
              <TaskBar setTgMd={setToggleModal} data={task} key={task.id} />
            ))}
          </section>
        ) : null}

        {/* Next Week Section */}
        {taskDataNextWeek?.length > 0 ? (
          <section className={styles.taskSection}>
            <h2 className={styles.sectionHead}>
              Next Week ({lastDayOfNextWeek()})
            </h2>
            <Divider />
            {taskDataNextWeek.map((task) => (
              <TaskBar setTgMd={setToggleModal} data={task} key={task.id} />
            ))}
          </section>
        ) : null}

        {/* Later Section */}
        {taskDataLaterWeek?.length > 0 ? (
          <section className={styles.taskSection}>
            <h2 className={styles.sectionHead}>Later</h2>
            <Divider />
            {taskDataLaterWeek.map((task) => (
              <TaskBar setTgMd={setToggleModal} data={task} key={task.id} />
            ))}
          </section>
        ) : null}

        {/* No Task Matched  */}
        {taskDataThisWeek?.length === 0 &&
        taskDataNextWeek?.length === 0 &&
        taskDataLaterWeek?.length === 0 ? (
          <h2 className={styles.sectionHead}>No Task</h2>
        ) : null}
      </article>
    </>
  );
}

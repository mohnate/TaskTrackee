import styles from "../../styles/dashboard/dashboard.module.scss";

import { Helmet } from "react-helmet-async";

import Divider from "../../components/Divider";

export default function TodayTask() {
  return (
    <>
      <Helmet>
        <title>TaskTrackee | Today Task</title>
      </Helmet>
      <article className={styles.mainTask}>
        <section className={styles.taskSection}>
          <h2 className={styles.sectionHead}>Pending Task</h2>
          <Divider />
        </section>
      </article>
    </>
  );
}

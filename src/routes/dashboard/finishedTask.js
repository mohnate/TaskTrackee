import styles from "../../styles/dashboard/dashboard.module.scss";

import { Helmet } from "react-helmet-async";

import Divider from "../../components/Divider";

export default function FinishedTask() {
  return (
    <>
      <Helmet>
        <title>TaskTrackee | Finished Task</title>
      </Helmet>
      <main className={styles.mainTask}>
        <section className={styles.taskSection}>Finished Task</section>
      </main>
    </>
  );
}

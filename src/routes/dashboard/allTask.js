import styles from "../../styles/dashboard/dashboard.module.scss";

import { Helmet } from "react-helmet-async";

import Divider from "../../components/Divider";

export default function AllTask() {
  return (
    <>
      <Helmet>
        <title>TaskTrackee | All Task</title>
      </Helmet>
      <main className={styles.mainTask}>
        <section className={styles.taskSection}>
          <h2 className={styles.sectionHead}>
            Today ({new Date().toLocaleDateString("en-GB")})
          </h2>
          <Divider />
        </section>
      </main>
    </>
  );
}

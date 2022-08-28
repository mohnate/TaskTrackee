import styles from "../../styles/dashboard/dashboard.module.scss";

import { Helmet } from "react-helmet-async";

import Divider from "../../components/Divider";

export default function UpcoimngTask() {
  return (
    <>
      <Helmet>
        <title>TaskTrackee | Upcoming Task</title>
      </Helmet>
      <article className={styles.mainTask}>
        <section className={styles.taskSection}>
          <h2 className={styles.sectionHead}>
            This Week ({new Date().toLocaleDateString("en-GB")})
          </h2>
          <Divider />
        </section>
      </article>
    </>
  );
}

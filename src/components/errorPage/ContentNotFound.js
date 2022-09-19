import styles from "../../styles/errorPage.module.scss";

import { Link } from "react-router-dom";

export default function ContentNotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.errorMessage}>
        Whoops! It seems there is nothing here
      </p>
      <Link className={styles.errorLink} to="/">
        Back To Homepage
      </Link>
    </div>
  );
}

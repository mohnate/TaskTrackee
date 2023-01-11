import styles from "$Styles/account.module.scss";

import Divider from "$Components/Divider";

export default function Accountbox({ h, children }) {
  return (
    <section className={styles.boxSec}>
      <h2 className={styles.subHead}>{h} </h2>
      <Divider />
      {children}
    </section>
  );
}

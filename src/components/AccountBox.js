import styles from "$Styles/account.module.scss";

import Divider from "$Components/Divider";

import PropTypes from "prop-types";

Accountbox.propTypes = {
  h: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default function Accountbox({ h, children }) {
  return (
    <section className={styles.boxSec}>
      <h2 className={styles.subHead}>{h} </h2>
      <Divider />
      {children}
    </section>
  );
}

import styles from "../../styles/errorPage.module.scss";
import homepageStyles from "../../styles/homepage/homepage.module.scss";
import logo from "../../../public/logo/logo.png";

import { Link } from "react-router-dom";
import ImageRender from "../../lib/ImageRender";

export default function PageNotFound() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={homepageStyles.brand}>
          <div style={{ width: "200px" }}>
            <ImageRender src={logo} width="512" height="512" />
          </div>
        </div>
        <h1 className={homepageStyles.brandName} style={{ color: "#e4f0ff" }}>
          TaskTrackee
        </h1>

        <p className={styles.errorMessage}>Whoops! This page does not exists</p>
        <Link className={styles.errorLink} to="/">
          Back To Homepage
        </Link>
      </div>
    </div>
  );
}

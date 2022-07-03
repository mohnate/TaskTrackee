import styles from "../styles/homepage/homepage.module.scss";
import stylesInput from "../styles/input.module.scss";
import logo from "../../public/logo/logo.png";

import { useRef } from "react";
import ImageRender from "../lib/ImageRender";

import EmailInput from "../components/input/EmailInput";
import PasswordInput from "../components/input/PasswordInput";

export default function Homepage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <section className={styles.leftPanel}>
        <div className={styles.background}>
          <div className={styles.imgBlender}></div>
        </div>
      </section>
      <section className={styles.rightPanel}>
        <main className={styles.rightPanelMain}>
          <div className={styles.brand}>
            <ImageRender src={logo} width="512" height="512" />
          </div>
          <h1 className={styles.brandName}>TaskTrackee</h1>
          <form
            autoComplete="on"
            onSubmit={handleSubmit}
            className={styles.formControl}
          >
            <EmailInput id="loginEmail" emailRef={emailRef} />
            <PasswordInput id="loginPassword" passwordRef={passwordRef} />
            <button type="submit" className={stylesInput.submitBtn}>
              Log In
            </button>
          </form>
          <section className={styles.infoBox}>
            <p className={styles.infoPara}>
              Don't have an account?{" "}
              <span className={styles.infoCondition}>Sign Up</span>
            </p>
          </section>
        </main>
      </section>
    </div>
  );
}

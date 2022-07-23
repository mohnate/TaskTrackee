import styles from "../styles/homepage/homepage.module.scss";
import logo from "../../public/logo/logo.png";

import { lazy, Suspense, useState } from "react";
import ImageRender from "../lib/ImageRender";

const SignUpPage = lazy(() => import("../components/homepage/SignUp"));
import LoginPage from "../components/homepage/Login";

export default function Homepage() {
  const [loginComp, setLoginComp] = useState(true);

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
          <Suspense fallback={<p>wait..</p>}>
            {loginComp ? <LoginPage /> : <SignUpPage />}
          </Suspense>
          <section className={styles.infoBox}>
            <p className={styles.infoPara}>
              {loginComp
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <span
                className={styles.infoCondition}
                onClick={() => setLoginComp((prev) => !prev)}
              >
                {loginComp ? "Sign Up" : "Log In"}
              </span>
            </p>
          </section>
        </main>
      </section>
    </div>
  );
}

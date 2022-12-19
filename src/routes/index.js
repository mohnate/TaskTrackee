import styles from "$Styles/homepage/homepage.module.scss";
import logo from "$Public/logo/logo.png";

import { lazy, Suspense, useState } from "react";
import Image from "@chan_alston/image";

const SignUpPage = lazy(() => import("$Components/homepage/SignUp"));
const LoginPage = lazy(() => import("$Components/homepage/Login"));

import Spinner from "$Components/PageLoader";

export default function Homepage() {
  // Switch between SignUpPage and LoginPage depending
  // on the value of the state:
  // true -> LoginPage
  // false -> SignUpPage
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
            <Image src={logo} alt="TaskTrackee Logo" w="512px" h="512px" />
          </div>
          <h1 className={styles.brandName}>TaskTrackee</h1>

          <Suspense fallback={<Spinner sz="medium" pad="50px 0" />}>
            {loginComp ? (
              <LoginPage />
            ) : (
              <SignUpPage setLoginComp={setLoginComp} />
            )}
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

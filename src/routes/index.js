import styles from "../styles/homepage/homepage.module.scss";
import logo from "../../public/logo/logo.png";

import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ImageRender from "../lib/ImageRender";

const SignUpPage = lazy(() => import("../components/homepage/SignUp"));
const LoginPage = lazy(() => import("../components/homepage/Login"));
import Spinner from "../components/PageLoader";

export default function Homepage() {
  const [loginComp, setLoginComp] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (supabase.auth.session()) {
      navigate("/dashboard");
    }
  }, []);

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
            <ImageRender
              src={logo}
              alt="TaskTrackee Logo"
              width="512"
              height="512"
            />
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

import styles from "../styles/homepage/homepage.module.scss";
import logo from "../../public/logo/logo.png";

import { lazy, Suspense, useEffect, useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { CognitoIdentityCredentials, config as AWSconfig } from "aws-sdk";
import ImageRender from "../lib/ImageRender";
import { cookieStorage, UserPool } from "../lib/awsCognito";

const SignUpPage = lazy(() => import("../components/homepage/SignUp"));
const Verified = lazy(() => import("../components/homepage/Verified"));
import LoginPage from "../components/homepage/Login";

export default function Homepage() {
  const [loginComp, setLoginComp] = useState(true);
  const [signUpComp, setSignUpComp] = useState(true);

  useEffect(() => {
    if (UserPool.getCurrentUser()) {
      // create a cognito userto hold user details and the pools
      // that user is located at
      const cognitoUser = new CognitoUser({
        Username: UserPool.getCurrentUser().getUsername(),
        Pool: UserPool,
        Storage: cookieStorage,
      });
      console.log(cognitoUser);

      UserPool.getCurrentUser().getSession((err, data) => {
        console.log(data);
      });
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
            <ImageRender src={logo} width="512" height="512" />
          </div>
          <h1 className={styles.brandName}>TaskTrackee</h1>
          <Suspense fallback={<p>wait..</p>}>
            {loginComp ? (
              <LoginPage />
            ) : signUpComp ? (
              <SignUpPage setSignUpComp={setSignUpComp} />
            ) : (
              <Verified />
            )}
          </Suspense>
          <section className={styles.infoBox}>
            <p className={styles.infoPara}>
              {loginComp
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <span
                className={styles.infoCondition}
                onClick={() => {
                  if (!signUpComp) {
                    setSignUpComp(true);
                  }
                  setLoginComp((prev) => !prev);
                }}
              >
                {loginComp ? "Sign Up" : "Log In"}
              </span>
            </p>
            <p className={styles.infoPara}>
              {loginComp
                ? ""
                : !signUpComp
                ? ""
                : "Haven't verify your account?"}
              <span
                className={styles.infoCondition}
                onClick={() => setSignUpComp((prev) => !prev)}
              >
                {" "}
                {loginComp ? "" : !signUpComp ? "" : "Verify"}
              </span>
            </p>
          </section>
        </main>
      </section>
    </div>
  );
}

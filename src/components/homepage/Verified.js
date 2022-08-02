import styles from "../../styles/homepage/homepage.module.scss";
import stylesInput from "../../styles/input.module.scss";

import { useRef } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { UserPool } from "../../lib/awsCognito";

import VerificationCode from "../input/VerificationCode";

export default function Verified() {
  const codeRef1 = useRef();
  const codeRef2 = useRef();
  const codeRef3 = useRef();
  const codeRef4 = useRef();
  const codeRef5 = useRef();
  const codeRef6 = useRef();
  const submitBtn = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = window.localStorage.getItem("username");
    const code1 = codeRef1.current.value;
    const code2 = codeRef2.current.value;
    const code3 = codeRef3.current.value;
    const code4 = codeRef4.current.value;
    const code5 = codeRef5.current.value;
    const code6 = codeRef6.current.value;
    const code = `${code1}${code2}${code3}${code4}${code5}${code6}`;

    const cognitoUser = new CognitoUser({ Username: username, Pool: UserPool });
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
      }
    });
  };

  const inputOnChange = (e) => {
    if (!e.target.value.match(/\d/)) {
      e.target.value = "";
    } else if (e.target.nextSibling) {
      e.target.nextSibling.focus();
    } else if (!e.target.nextSibling) {
      submitBtn.current.focus();
    }

    if (e.target.value === "" && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }

    if (e.target.value.length >= 2) {
      e.target.value = e.target.value.slice(1);
    }
  };

  return (
    <>
      <hr />
      <h1 className={styles.verifiedHeader}>Verification code</h1>
      <p className={styles.verifiedDesc}>
        Check your email, we just sent you the verification code. Look into your
        trash inbox if you didn't find any.
      </p>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={styles.formControl}
      >
        <div className={styles.codeContainer}>
          <VerificationCode
            id="verifyCode1"
            codeRef={codeRef1}
            inputOnChange={inputOnChange}
          />
          <VerificationCode
            id="verifyCode2"
            codeRef={codeRef2}
            inputOnChange={inputOnChange}
          />
          <VerificationCode
            id="verifyCode3"
            codeRef={codeRef3}
            inputOnChange={inputOnChange}
          />
          <VerificationCode
            id="verifyCode4"
            codeRef={codeRef4}
            inputOnChange={inputOnChange}
          />
          <VerificationCode
            id="verifyCode5"
            codeRef={codeRef5}
            inputOnChange={inputOnChange}
          />
          <VerificationCode
            id="verifyCode6"
            codeRef={codeRef6}
            inputOnChange={inputOnChange}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <button
            ref={submitBtn}
            type="submit"
            className={stylesInput.submitBtn}
          >
            Verify
          </button>
        </div>
      </form>
    </>
  );
}

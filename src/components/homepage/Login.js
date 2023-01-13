import styles from "$Styles/homepage/homepage.module.scss";
import stylesAccount from "$Styles/account.module.scss";
import stylesInput from "$Styles/input.module.scss";

import { useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "$Lib/supabase";

import EmailInput from "../input/EmailInput";
import PasswordInput from "../input/PasswordInput";

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Login() {
  // fgtPass tells if supabase resetPassword api successfully invoked, boolean value
  const [fgtPass, setFgtPass] = useState(false);
  const reducer = (state, action) => {
    return { ...state, [action.type]: action.txt };
  };
  const initialState = {
    email: null,
    password: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email.match(emailPattern)) {
      dispatch({ type: "email", txt: "This is not a valid email!" });
      return;
    } else dispatch({ type: "email", txt: null });

    if (password.length < 8) {
      dispatch({
        type: "password",
        txt: "Your password needs to contain at least 8 character",
      });
      return;
    } else if (password.length >= 30) {
      dispatch({
        type: "password",
        txt: "Your password is too long!",
      });
      return;
    } else dispatch({ type: "password", txt: null });

    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      return dispatch({
        type: "password",
        txt: error.message,
      });
    } else if (user) {
      navigate("/dashboard/alltask");
    }
  };

  // Forget Password Func
  const forgertPass = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    if (!email) {
      dispatch({ type: "email", txt: "Please fill in your email address" });
      return;
    } else if (!email.match(emailPattern)) {
      dispatch({ type: "email", txt: "This is not a valid email!" });
      return;
    } else dispatch({ type: "email", txt: null });

    let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://tasktrackee.netlify.app/account/forget-password",
    });

    if (error) {
      console.error(error);
    } else if (data) {
      setFgtPass(true);
    }
  };

  return (
    <>
      <form
        autoComplete="on"
        onSubmit={handleSubmit}
        className={styles.formControl}
      >
        <EmailInput id="loginEmail" ref={emailRef} state={state.email} />
        <PasswordInput
          id="loginPassword"
          ref={passwordRef}
          state={state.password}
        />
        <p
          className={stylesAccount.fgtPassLink}
          style={{ marginTop: "0" }}
          onClick={forgertPass}
        >
          Forget Password?
        </p>
        {fgtPass ? (
          <p className={stylesAccount.notice}>
            An recovery link has sent to your inbox. Please check your spam
            folder if you can't find it.
          </p>
        ) : null}
        <button type="submit" className={stylesInput.submitBtn}>
          Log In
        </button>
      </form>
    </>
  );
}

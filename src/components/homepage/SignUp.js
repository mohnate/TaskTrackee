import styles from "$Styles/homepage/homepage.module.scss";
import stylesInput from "$Styles/input.module.scss";

import { useReducer, useRef } from "react";
import { supabase } from "$Lib/supabase";

import UsernameInput from "../input/UsernameInput";
import EmailInput from "../input/EmailInput";
import PasswordInput from "../input/PasswordInput";

import PropTypes from "prop-types";

SignUp.propTypes = {
  setLoginComp: PropTypes.func.isRequired,
};

export default function SignUp({ setLoginComp }) {
  const reducer = (state, action) => {
    return { ...state, [action.type]: action.txt };
  };
  const initialState = {
    username: null,
    email: null,
    password: null,
    confPassword: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confPasswordRef.current.value;
    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (username.length < 3) {
      dispatch({
        type: "username",
        txt: "Username have to contain at least 3 character",
      });
      return;
    } else dispatch({ type: "username", txt: null });

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

    if (confirmPassword != password) {
      dispatch({
        type: "confPassword",
        txt: "Your password does not match",
      });
      return;
    } else dispatch({ type: "confPassword", txt: null });

    // eslint-disable no-unused-vars
    const { user, session, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data: { username },
      }
    );

    if (error) {
      console.error(error);
    } else if (user) {
      setLoginComp(true);
    }
  };

  return (
    <>
      <form
        autoComplete="on"
        onSubmit={handleSubmit}
        className={styles.formControl}
      >
        <UsernameInput
          id="signUpUsername"
          ref={usernameRef}
          footer="Username have to contain at least 3 character"
          state={state.username}
        />
        <EmailInput id="signUpEmail" ref={emailRef} state={state.email} />
        <PasswordInput
          id="signUpPassword"
          ref={passwordRef}
          footer="Your password needs to contain at least 8 character"
          state={state.password}
        />
        <PasswordInput
          id="signUpConfPassword"
          ref={confPasswordRef}
          label="Confirm Password"
          placeholder="Re-enter password"
          confirmPass={passwordRef}
          state={state.confPassword}
        />
        <button type="submit" className={stylesInput.submitBtn}>
          Next
        </button>
      </form>
    </>
  );
}

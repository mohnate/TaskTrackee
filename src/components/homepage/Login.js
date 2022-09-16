import styles from "../../styles/homepage/homepage.module.scss";
import stylesInput from "../../styles/input.module.scss";

import { useReducer, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import EmailInput from "../input/EmailInput";
import PasswordInput from "../input/PasswordInput";

export default function Login() {
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
    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      console.error(error);
    } else if (user) {
      navigate("/dashboard/alltask");
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
        <button type="submit" className={stylesInput.submitBtn}>
          Log In
        </button>
      </form>
    </>
  );
}

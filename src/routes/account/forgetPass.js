import styles from "$Styles/account.module.scss";
import stylesInput from "$Styles/input.module.scss";

import { useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "$Lib/supabase";

import Header from "$Components/Header";
import PasswordInput from "$Components/input/PasswordInput";

export default function ForgetPass() {
  const navigate = useNavigate();
  // successMsg for successful password reset, boolean value
  const [successMsg, setSuccessMsg] = useState(false);
  // reducer for form stating input error for user
  const reducer = (state, action) => {
    return { ...state, [action.type]: action.txt };
  };
  const initialState = {
    newPassword: null,
    confPassword: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const newPasswordRef = useRef();
  const confPasswordRef = useRef();

  // Update password Func
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confPasswordRef.current.value;

    if (newPassword.length < 8) {
      return dispatch({
        type: "newPassword",
        txt: "Your new password needs to contain at least 8 character",
      });
    } else if (newPassword.length >= 30) {
      dispatch({
        type: "newPassword",
        txt: "Your password is too long!",
      });
      return;
    } else dispatch({ type: "newPassword", txt: null });

    if (confirmPassword != newPassword) {
      dispatch({
        type: "confPassword",
        txt: "Your password does not match",
      });
      return;
    } else dispatch({ type: "confPassword", txt: null });

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
      data: { passUpd: new Date() },
    });

    if (error) {
      console.error(error);
    } else if (data) {
      setSuccessMsg(true);
      setTimeout(() => {
        navigate("/dashboard/alltask");
      }, 5000);
    }
  };
  return (
    <>
      <Header toggleSideBar={false} setToggleSideBar={false} />
      <h1 className={styles.head}>Forget Password</h1>

      <div className={styles.forgetPassContainer}>
        <form
          autoComplete="on"
          onSubmit={handleSubmit}
          className={styles.formControl}
        >
          <PasswordInput
            id="resetpasswordNew"
            ref={newPasswordRef}
            label="New Password"
            footer="Your new password needs to contain at least 8 character"
            placeholder="Enter new password"
            state={state.newPassword}
          />
          <PasswordInput
            id="resetpasswordConf"
            ref={confPasswordRef}
            label="Confirm New Password"
            placeholder="Re-enter new password"
            confirmPass={newPasswordRef}
            state={state.confPassword}
          />
          <button type="submit" className={stylesInput.submitBtn}>
            Reset
          </button>
        </form>
        {successMsg ? (
          <>
            <p className={styles.successMsg}>
              You have successfully reset your password!
            </p>
            <p>Redirecting you back to dashboard in 5 seconds.</p>
          </>
        ) : null}
      </div>
    </>
  );
}

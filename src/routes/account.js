import styles from "$Styles/account.module.scss";
import stylesInput from "$Styles/input.module.scss";
import defaultAvatar from "$Icon/default-avatar.png";

import { useEffect, useReducer, useRef, useState } from "react";
import Image from "@chan_alston/image";
import { supabase } from "$Lib/supabase";

import PasswordInput from "$Components/input/PasswordInput";
import AccountBox from "$Components/AccountBox";
import Header from "$Components/Header";

export default function Account() {
  const [user, setUser] = useState({});
  const [sucessMsg, setSucessMsg] = useState(false);
  const reducer = (state, action) => {
    return { ...state, [action.type]: action.txt };
  };
  const initialState = {
    oldPassword: null,
    newPassword: null,
    confPassword: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confPasswordRef = useRef();

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser({ username: user.user_metadata.username, email: user.email });
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confPasswordRef.current.value;

    if (oldPassword.length < 8) {
      return dispatch({
        type: "oldPassword",
        txt: "Your password needs to contain at least 8 character",
      });
    } else dispatch({ type: "oldPassword", txt: null });

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

    const { error: signinErr } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: oldPassword,
    });

    if (signinErr) {
      console.error(signinErr.message);
      return dispatch({
        type: "oldPassword",
        txt: signinErr.message,
      });
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error(error);
    } else if (data) {
      setSucessMsg(true);
    }
  };

  return (
    <>
      <Header toggleSideBar={false} setToggleSideBar={false} />
      <h1 className={styles.head}>Account Settings</h1>

      <AccountBox h="Profile">
        <div className={styles.profileBox}>
          <div className={styles.avatarContainer}>
            <Image src={defaultAvatar} w={40} h={40} />
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.row}>
              <p className={styles.title}>Username</p>
              <div className={styles.dataContainer}>
                <p className={styles.data}>{user.username}</p>
                <button disabled className={styles.edit}>
                  Edit
                </button>
              </div>
            </div>
            <div className={styles.row}>
              <p className={styles.title}>Email Address</p>
              <div className={styles.dataContainer}>
                <p className={styles.data}>{user.email}</p>
                <button disabled className={styles.edit}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </AccountBox>
      <AccountBox h="Security">
        <h3 className={styles.title}>Password Reset</h3>
        <p className={styles.fgtPass}>
          Don't remember your password?{" "}
          <strong className={styles.fgtPassLink}>Forget password</strong>
        </p>
        <form
          autoComplete="on"
          onSubmit={handleSubmit}
          className={styles.formControl}
        >
          <PasswordInput
            id="resetpasswordOld"
            ref={oldPasswordRef}
            label="Old Password"
            placeholder="Enter old password"
            state={state.oldPassword}
          />
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
        {sucessMsg ? (
          <p className={styles.successMsg}>
            You have successfully reset your password!
          </p>
        ) : null}
      </AccountBox>
    </>
  );
}

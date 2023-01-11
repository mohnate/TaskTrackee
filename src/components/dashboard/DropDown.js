import styles from "$Styles/dashboard/header.module.scss";
import LogOut from "$Public/icon/log-out.svg";
import GitHub from "$Public/icon/github.svg";
import Settings from "$Public/icon/settings.svg";

import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "$Lib/supabase";
import Image from "@chan_alston/image";

// eslint-disable no-undef
const Dropdown = React.forwardRef((props, ref) => {
  const navigate = useNavigate();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    navigate("/");
    console.error(error);
  };

  const style = { width: "25px", height: "25px", verticalAlign: "middle" };

  return (
    <section className={styles.dropDownMain} ref={ref}>
      <a
        href="https://github.com/AlstonChan/TaskTrackee"
        target="_blank"
        rel="noreferrer"
        className={styles.dropDownBar}
      >
        <div className={styles.iconContainerDropdown}>
          <Image src={GitHub} style={style} />
        </div>

        <p className={styles.dorpDownHeader}>GitHub Repo</p>
      </a>
      <div className={styles.dropDownBar} onClick={() => navigate("/account")}>
        <div className={styles.iconContainerDropdown}>
          <Image src={Settings} style={style} />
        </div>
        <p className={styles.dorpDownHeader}>Settings</p>
      </div>
      <div className={styles.dropDownBar} onClick={logout}>
        <div className={styles.iconContainerDropdown}>
          <Image src={LogOut} style={style} />
        </div>
        <p className={styles.dorpDownHeader}>Logout</p>
      </div>
    </section>
  );
});

Dropdown.displayName = "Dropdown";
export default Dropdown;

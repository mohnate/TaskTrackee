import styles from "$Styles/dashboard/header.module.scss";
import LogOut from "$Public/icon/log-out.svg";
import GitHub from "$Public/icon/github.svg";

import { useNavigate } from "react-router-dom";
import { supabase } from "$Lib/supabase";
import Image from "@chan_alston/image";

export default function Dropdown({ dropDownRef }) {
  const navigate = useNavigate();
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    navigate("/");
    console.error(error);
  };

  return (
    <section className={styles.dropDownMain} ref={dropDownRef}>
      <a
        href="https://github.com/AlstonChan/TaskTrackee"
        target="_blank"
        className={styles.dropDownBar}
      >
        <div className={styles.iconContainer}>
          <Image
            src={GitHub}
            style={{ width: "25px", height: "25px", verticalAlign: "middle" }}
          />
        </div>

        <p className={styles.dorpDownHeader}>GitHub Repo</p>
      </a>
      <div className={styles.dropDownBar}>
        <div className={styles.iconContainer}>
          <Image
            src={LogOut}
            style={{ width: "25px", height: "25px", verticalAlign: "middle" }}
          />
        </div>
        <p className={styles.dorpDownHeader} onClick={logout}>
          Logout
        </p>
      </div>
    </section>
  );
}

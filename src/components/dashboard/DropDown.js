import styles from "../../styles/dashboard/header.module.scss";

import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Dropdown({ dropDownRef }) {
  const navigate = useNavigate();
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    navigate("/");
    console.error(error);
  };

  return (
    <section className={styles.dropDownMain} ref={dropDownRef}>
      <p className={styles.dropDownSec} onClick={logout}>
        Logout
      </p>
    </section>
  );
}

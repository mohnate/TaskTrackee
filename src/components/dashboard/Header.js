import styles from "../../styles/dashboard/header.module.scss";
import menu from "../../../public/icon/menu.svg";
import menuScale from "../../../public/icon/menuScale.svg";
import home from "../../../public/icon/home.svg";
import defaultAvatar from "../../../public/icon/default-avatar.png";

import ImageRender from "../../lib/ImageRender";
import { supabase } from "../../lib/supabase";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.leftComp}>
        <ImageRender src={menu} width={40} height={30} />
        <ImageRender src={home} width={40} height={30} />
      </nav>
      <div className={styles.rightComp}>
        <div className={styles.userComp}>
          <p className={styles.username}>
            {supabase.auth.user().user_metadata.username}
          </p>
          <div className={styles.imgContainer}>
            <ImageRender src={defaultAvatar} width={40} height={40} />
          </div>
        </div>
      </div>
    </header>
  );
}

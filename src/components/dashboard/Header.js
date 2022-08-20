import styles from "../../styles/dashboard/header.module.scss";
import menu from "../../../public/icon/menu.svg";
import menuScale from "../../../public/icon/menuScale.svg";
import home from "../../../public/icon/home.svg";
import defaultAvatar from "../../../public/icon/default-avatar.png";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageRender from "../../lib/ImageRender";
import { supabase } from "../../lib/supabase";

export default function Header({ toggleSideBar, setToggleSideBar }) {
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useRef();
  const toggleSideBarFunc = () => {
    setToggleSideBar((prev) => !prev);
  };
  const toggleDropDown = () => {
    setDropDown((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.leftComp}>
        <div className={styles.iconContainer} onClick={toggleSideBarFunc}>
          {toggleSideBar ? (
            <ImageRender src={menuScale} width={40} height={30} alt="menu" />
          ) : (
            <ImageRender src={menu} width={40} height={30} alt="menu" />
          )}
        </div>
        <div className={styles.iconContainer}>
          <ImageRender src={home} width={40} height={30} alt="home" />
        </div>
      </nav>
      <div className={styles.rightComp}>
        <div className={styles.userComp}>
          <p className={styles.username} onClick={toggleDropDown}>
            {supabase.auth.user().user_metadata.username}
          </p>
          <div className={styles.imgContainer} onClick={toggleDropDown}>
            <ImageRender src={defaultAvatar} width={40} height={40} />
          </div>
          {dropDown ? (
            <div className={styles.dropDownContainer}>
              <Dropdown dropDownRef={dropDownRef} />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function Dropdown({ dropDownRef }) {
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

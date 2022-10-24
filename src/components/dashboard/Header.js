import styles from "$Styles/dashboard/header.module.scss";
import menu from "$Icon/menu.svg";
import menuScale from "$Icon/menuScale.svg";
import home from "$Icon/home.svg";
import defaultAvatar from "$Icon/default-avatar.png";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImageRender from "$Lib/ImageRender";
import { supabase } from "$Lib/supabase";

import Dropdown from "./DropDown";

export default function Header({ toggleSideBar, setToggleSideBar }) {
  const [dropDown, setDropDown] = useState(false);
  const [user, setUser] = useState(null);
  const dropDownRef = useRef();
  const paraRef = useRef();
  const imgRef = useRef();

  const toggleSideBarFunc = () => {
    setToggleSideBar((prev) => !prev);
  };
  const toggleDropDown = () => {
    setDropDown((prev) => !prev);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (
        e.target != imgRef.current &&
        e.target != paraRef.current &&
        e.target != dropDownRef.current
      ) {
        setDropDown(false);
      }
    };
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [dropDown]);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then((result) => setUser(result.data.session.user));
  }, []);

  return (
    <>
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
            <Link to="/dashboard/alltask">
              <ImageRender src={home} width={40} height={30} alt="home" />
            </Link>
          </div>
        </nav>
        <div className={styles.rightComp}>
          <div className={styles.userComp}>
            <p
              className={styles.username}
              onClick={toggleDropDown}
              ref={paraRef}
            >
              {user ? user.user_metadata.username : null}
            </p>
            <div className={styles.imgContainer} onClick={toggleDropDown}>
              <ImageRender
                src={defaultAvatar}
                width={40}
                height={40}
                ref={imgRef}
              />
            </div>
            {dropDown ? (
              <div className={styles.dropDownContainer}>
                <Dropdown dropDownRef={dropDownRef} />
              </div>
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
}

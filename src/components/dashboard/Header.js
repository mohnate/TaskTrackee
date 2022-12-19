import styles from "$Styles/dashboard/header.module.scss";
import menu from "$Icon/menu.svg";
import menuScale from "$Icon/menuScale.svg";
import home from "$Icon/home.svg";
import defaultAvatar from "$Icon/default-avatar.png";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Image from "@chan_alston/image";
import { supabase } from "$Lib/supabase";

import Dropdown from "./DropDown";

export default function Header({ toggleSideBar, setToggleSideBar }) {
  const [dropDown, setDropDown] = useState(false);
  const [user, setUser] = useState(null);

  const dropDownRef = useRef();
  const paraRef = useRef();
  const imgRef = useRef();

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
          <div
            className={styles.iconContainer}
            onClick={() => setToggleSideBar((prev) => !prev)}
          >
            {toggleSideBar ? (
              <Image src={menuScale} w="30px" h="30px" alt="menu" />
            ) : (
              <Image src={menu} w="30px" h="30px" alt="menu" />
            )}
          </div>
          <div className={styles.iconContainer}>
            <Link to="/dashboard/alltask">
              <Image src={home} w="40px" h="30px" alt="home" />
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
              <Image src={defaultAvatar} w={40} h={40} imgRef={imgRef} />
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

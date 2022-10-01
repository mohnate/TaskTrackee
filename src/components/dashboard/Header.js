import styles from "../../styles/dashboard/header.module.scss";
import menu from "../../../public/icon/menu.svg";
import menuScale from "../../../public/icon/menuScale.svg";
import home from "../../../public/icon/home.svg";
import defaultAvatar from "../../../public/icon/default-avatar.png";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImageRender from "../../lib/ImageRender";
import { supabase } from "../../lib/supabase";

import Dropdown from "./DropDown";

export default function Header({ toggleSideBar, setToggleSideBar }) {
  const [dropDown, setDropDown] = useState(false);
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
              {supabase.auth.user()
                ? supabase.auth.user().user_metadata.username
                : null}
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

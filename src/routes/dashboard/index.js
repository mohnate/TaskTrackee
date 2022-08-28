import styles from "../../styles/dashboard/dashboard.module.scss";

import { Outlet, useNavigate } from "react-router-dom";
import { lazy, useEffect, useState } from "react";

import Header from "../../components/dashboard/Header";
import SideBar from "../../components/dashboard/SideBar";
import AddTaskModal from "../../components/dashboard/AddTaskModal";

// Data below must be synchronized with components/dashboard/SideBar.js
const pages = [
  { route: "alltask", label: "All Task" },
  { route: "todaytask", label: "Today Task" },
  { route: "upcomingtask", label: "Upcoming Task" },
  { route: "finishedtask", label: "Finished Task" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [toggleSideBar, setToggleSideBar] = useState(true);
  const [activePage, setActivePage] = useState(
    window.location.pathname.replace("/dashboard/", "")
  );
  const [toggleModal, setToggleModal] = useState(false);

  useEffect(() => {
    pages.forEach((page) => {
      if (activePage === page.route) {
        navigate(page.route);
      }
    });
  }, [activePage]);

  return (
    <>
      <Header
        setToggleSideBar={setToggleSideBar}
        toggleSideBar={toggleSideBar}
        setActivePage={setActivePage}
      />
      <div className={styles.container}>
        {toggleSideBar ? <SideBar setActivePage={setActivePage} /> : null}
        <main className={styles.content}>
          <header className={styles.contentHeadContainer}>
            <h1 className={styles.contentHeader}>
              {pages.map((page) => {
                return page.route === activePage ? page.label : "";
              })}
            </h1>
            <button
              className={styles.addTaskBtn}
              tabIndex="0"
              onClick={() => setToggleModal(true)}
            >
              Add Task
            </button>
          </header>
          <Outlet />
        </main>
      </div>
      {toggleModal ? <AddTaskModal setToggleModal={setToggleModal} /> : null}
    </>
  );
}

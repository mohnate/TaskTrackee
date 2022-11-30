import styles from "$Styles/dashboard/dashboard.module.scss";
import modalStyles from "$Styles/dashboard/modal.module.scss";

import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import { supabase } from "$Lib/supabase";
import { setData, updData } from "$Lib/ReduxSlice/SupabaseTaskSlice";
import {
  setLabel,
  updLabel,
  deleteLabel,
} from "$Lib/ReduxSlice/SupabaseLabelSlice";

import Header from "$Components/dashboard/Header";
import SideBar from "$Components/dashboard/SideBar";
import TaskModal from "$Components/dashboard/Modal/Task/TaskModal";
import LabelModal from "$Components/dashboard/Modal/Label/LabelModal";

// Data below must be synchronized with components/dashboard/SideBar.js
const pages = [
  { route: "alltask", label: "All Task" },
  { route: "todaytask", label: "Today Task" },
  { route: "upcomingtask", label: "Upcoming Task" },
  { route: "finishedtask", label: "Finished Task" },
];

export default function Dashboard() {
  const location = useLocation();
  const [toggleSideBar, setToggleSideBar] = useState(true); // open/close sidebar
  const [toggleTaskModal, setToggleTaskModal] = useState(false); // open/close task modal
  const [toggleLabelModal, setToggleLabelModal] = useState(false); // open/close label modal
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const dispatch = useDispatch();
  const controls = useAnimation();

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const { user } = session;
      supabase
        .from("Task")
        .select()
        .eq("user_uid", user.id)
        .then((payload) => {
          if (payload.error) {
            console.error(error);
          } else {
            dispatch(setData(payload.data));
          }
        });

      supabase
        .channel("public:Task")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "Task" },
          (payload) => {
            const newTodo = payload.new;
            dispatch(updData(newTodo));
          }
        )
        .subscribe();

      supabase
        .from("Labels")
        .select()
        .eq("user_uid", user.id)
        .then((payload) => {
          if (payload.error) {
            console.error(error);
          } else {
            dispatch(setLabel(payload.data));
          }
        });

      supabase
        .channel("public:Labels")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "Labels" },
          (payload) => {
            const newLabel = payload.new;
            const oldLabel = payload.old;
            if (payload.eventType === "DELETE") {
              dispatch(deleteLabel(oldLabel));
            } else {
              dispatch(updLabel(newLabel));
            }
          }
        )
        .subscribe();
    })();
  }, []);

  useEffect(() => {
    if (toggleSideBar) {
      controls.start({
        marginLeft: 260,
        transition: { type: "tween" },
      });
    } else {
      controls.start({
        marginLeft: 0,
        transition: { type: "tween" },
      });
    }
  }, [toggleSideBar]);

  useEffect(() => {
    handleWindowResize(window);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  // handle window resize and sets items in row
  const handleWindowResize = () => {
    if (toggleSideBar) {
      if (window.innerWidth > 900) {
        setIsSmallScreen(false);
        controls.start({
          marginLeft: 260,
          transition: { type: "tween" },
        });
      } else {
        setIsSmallScreen(true);
        controls.start({
          marginLeft: 0,
          transition: { type: "tween" },
        });
      }
    }
  };

  return (
    <>
      <Header
        setToggleSideBar={setToggleSideBar}
        toggleSideBar={toggleSideBar}
      />
      <div className={styles.container}>
        {toggleSideBar && isSmallScreen ? (
          <div
            className={modalStyles.bgClose}
            onClick={() => setToggleSideBar((prev) => !prev)}
          ></div>
        ) : null}
        <SideBar
          toggleSideBar={toggleSideBar}
          setToggleSideBar={setToggleSideBar}
          setToggleLabelModal={setToggleLabelModal}
        />
        <motion.main
          className={styles.content}
          animate={controls}
          initial={{ marginLeft: 260 }}
        >
          <header className={styles.contentHeadContainer}>
            <h1 className={styles.contentHeader}>
              {pages.map((page) => {
                return `/dashboard/${page.route}` === location.pathname
                  ? page.label
                  : "";
              })}
            </h1>
            {location.pathname === "/dashboard/finishedtask" ? null : (
              <button
                className={styles.addTaskBtn}
                tabIndex="0"
                onClick={() => setToggleTaskModal(["addTask"])}
              >
                Add Task
              </button>
            )}
          </header>
          <Outlet context={[setToggleTaskModal]} />
        </motion.main>
      </div>

      {/* modal part  */}
      <TaskModal
        setToggleTaskModal={setToggleTaskModal}
        toggleTaskModal={toggleTaskModal}
      />
      <LabelModal
        setToggleLabelModal={setToggleLabelModal}
        toggleLabelModal={toggleLabelModal}
      />
    </>
  );
}

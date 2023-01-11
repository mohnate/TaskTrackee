import styles from "$Styles/dashboard/dashboard.module.scss";
import modalStyles from "$Styles/dashboard/modal.module.scss";

import { Outlet, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import { supabase } from "$Lib/supabase";
import {
  setData,
  updData,
  deleteTask,
} from "$Lib/ReduxSlice/SupabaseTaskSlice";
import {
  setLabel,
  updLabel,
  deleteLabel,
} from "$Lib/ReduxSlice/SupabaseLabelSlice";

const TaskModal = lazy(() =>
  import("$Components/dashboard/Modal/Task/TaskModal")
);
const LabelModal = lazy(() =>
  import("$Components/dashboard/Modal/Label/LabelModal")
);

import Header from "$Components/dashboard/Header";
import SideBar from "$Components/dashboard/SideBar";
import Spinner from "$Components/PageLoader";

// Data below must be synchronized with components/dashboard/SideBar.js
const pages = [
  { route: "alltask", label: "All Task" },
  { route: "todaytask", label: "Today Task" },
  { route: "upcomingtask", label: "Upcoming Task" },
  { route: "finishedtask", label: "Finished Task" },
];

export default function Dashboard() {
  const location = useLocation();
  // Open or Close SideBar
  const [toggleSideBar, setToggleSideBar] = useState(true);
  // For open and close task modal, possible value:
  // ["addTask", data.id], ["updTask", data.id], false, true
  const [toggleTaskModal, setToggleTaskModal] = useState(false);
  // Open or Close Label Modal located at SideBar
  const [toggleLabelModal, setToggleLabelModal] = useState(false);
  // Show if user is using small screen
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const dispatch = useDispatch();
  const controls = useAnimation();

  // Side Effect for supabase to fetch data and subscribe to
  // the backend for realtime database update
  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const { user } = session;

      // Task Section
      supabase
        .from("Task")
        .select()
        .eq("user_uid", user.id)
        .then((payload) => {
          if (payload.error) {
            console.error(payload.error);
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
            const newLabel = payload.new;
            const oldLabel = payload.old;
            if (payload.eventType === "DELETE") {
              dispatch(deleteTask(oldLabel));
            } else {
              dispatch(updData(newLabel));
            }
          }
        )
        .subscribe();

      // Label Section
      supabase
        .from("Labels")
        .select()
        .eq("user_uid", user.id)
        .then((payload) => {
          if (payload.error) {
            console.error(payload.error);
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
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  // handle window resize and set isSmallScreen as
  // true if user screen is smaller than 900, this
  // pop the SideBar and make it not aligned with
  // the content and instead become a side modal
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
                  : null;
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
          {/* Content loads here */}
          <Outlet context={[setToggleTaskModal]} />
        </motion.main>
      </div>

      {/* modal part  */}
      <Suspense fallback={<Spinner sz="medium" pad="50px 0" />}>
        <TaskModal
          setToggleTaskModal={setToggleTaskModal}
          toggleTaskModal={toggleTaskModal}
        />
        <LabelModal
          setToggleLabelModal={setToggleLabelModal}
          toggleLabelModal={toggleLabelModal}
        />
      </Suspense>
    </>
  );
}

import styles from "$Styles/dashboard/modal.module.scss";

import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { supabase } from "$Lib/supabase";

import WarnModal from "../WarnModal";
import AddTask from "./AddTask";
import UpdTask from "./UpdTask";

export default function TaskModal({ setToggleTaskModal, toggleTaskModal }) {
  const taskRef = useRef();
  const [warn, setWarn] = useState();
  const taskData = useSelector((state) =>
    state.taskData.value?.filter(async (task) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const { user } = session;
      return task.user_uid == user.id;
    })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const header = taskRef.current.headInput();
    let desc = taskRef.current.descInput();
    let date;

    if (desc === "") desc = null;
    if (!taskRef.current.dateInput()) {
      date = null;
    } else {
      date = new Date(taskRef.current.dateInput()).toISOString();
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { user } = session;
    const { error } = await supabase
      .from("Task")
      .insert([{ user_uid: user.id, header, desc, due_date: date }]);
    if (error) console.error(error);
    setToggleTaskModal(false);
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    const header = taskRef.current.headInput();
    let desc = taskRef.current.descInput();
    let date;
    if (new Date(taskRef.current.dateInput()) == "Invalid Date") {
      date = null;
    } else date = new Date(taskRef.current.dateInput()).toISOString();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { user } = session;
    const { error } = await supabase
      .from("Task")
      .update([{ header, desc, due_date: date }])
      .eq("user_uid", user.id)
      .eq("id", id);
    if (error) console.error(error);
    setToggleTaskModal(false);
  };

  const closeModal = (e, btnClose) => {
    const header = taskRef.current.headInput();
    let desc = taskRef.current.descInput();
    let due_date = taskRef.current.dateInput() || null;

    const headerChanges = () => {
      for (const task of taskData) {
        if (task.id === toggleTaskModal[1]) {
          if (task.header === header) {
            return false;
          } else return true;
        }
      }
    };

    const descChanges = () => {
      for (const task of taskData) {
        if (task.id === toggleTaskModal[1]) {
          let descInput = desc;
          if (desc === "") descInput = null;
          if (task.desc == descInput) {
            return false;
          } else return true;
        }
      }
    };

    const dateChanges = () => {
      for (const task of taskData) {
        if (task.id === toggleTaskModal[1]) {
          if (task.due_date != null) {
            const adjustedDate = new Date(
              new Date(task.due_date).setMinutes(
                new Date(task.due_date).getMinutes() -
                  new Date(task.due_date).getTimezoneOffset()
              )
            )
              .toISOString()
              .slice(0, -8);

            if (adjustedDate === due_date) {
              return false;
            } else return true;
          } else {
            if (task.due_date === due_date) {
              return false;
            } else return true;
          }
        }
      }
    };

    const headerDidChange = toggleTaskModal[1]
      ? headerChanges()
      : header !== "Task Header";
    const descDidChange = toggleTaskModal[1] ? descChanges() : desc !== "";
    const dateDidChange = toggleTaskModal[1]
      ? dateChanges()
      : due_date === null
      ? false
      : due_date !== "";

    if (e === null && btnClose) {
      if (headerDidChange || descDidChange || dateDidChange) {
        return setWarn("You have unsaved changes");
      } else return setToggleTaskModal(false);
    }
    if (e.currentTarget == e.target) {
      if (headerDidChange || descDidChange || dateDidChange) {
        return setWarn("You have unsaved changes");
      } else return setToggleTaskModal(false);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {toggleTaskModal[0] === "addTask" ? (
          <AddTask
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            ref={taskRef}
          />
        ) : toggleTaskModal[0] === "updTask" ? (
          <UpdTask
            dataId={toggleTaskModal[1]}
            closeModal={closeModal}
            handleUpdate={handleUpdate}
            ref={taskRef}
          />
        ) : null}
      </AnimatePresence>

      {toggleTaskModal ? (
        <div className={styles.bgClose} onClick={closeModal}></div>
      ) : null}

      {warn ? (
        <WarnModal
          msg={warn}
          setToggleModal={setToggleTaskModal}
          setWarn={setWarn}
        />
      ) : null}
    </>
  );
}

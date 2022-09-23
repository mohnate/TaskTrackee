import styles from "../../../styles/dashboard/modal.module.scss";

import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { supabase } from "../../../lib/supabase";

import WarnModal from "./WarnModal";
import AddTask from "./AddTask";
import UpdTask from "./UpdTask";

export default function TaskModal({ setToggleModal, toggleModal }) {
  const taskRef = useRef();
  const [warn, setWarn] = useState();
  const taskData = useSelector((state) =>
    state.taskData.value?.filter(
      (task) => task.user_uid == supabase.auth.user().id
    )
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

    const { error } = await supabase
      .from("Task")
      .insert([
        { user_uid: supabase.auth.user().id, header, desc, due_date: date },
      ]);
    if (error) console.error(error);
    setToggleModal(false);
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    const header = taskRef.current.headInput();
    let desc = taskRef.current.descInput();
    let date = new Date(taskRef.current.dateInput()).toISOString();

    const { error } = await supabase
      .from("Task")
      .update([{ header, desc, due_date: date }])
      .eq("user_uid", supabase.auth.user().id)
      .eq("id", id);
    if (error) console.error(error);
    setToggleModal(false);
  };

  const closeModal = (e, btnClose) => {
    const header = taskRef.current.headInput();
    let desc = taskRef.current.descInput();
    let due_date = taskRef.current.dateInput() || null;

    const headerChanges = () => {
      for (const task of taskData) {
        if (task.id === toggleModal[1]) {
          if (task.header === header) {
            return false;
          } else return true;
        }
      }
    };

    const descChanges = () => {
      for (const task of taskData) {
        if (task.id === toggleModal[1]) {
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
        if (task.id === toggleModal[1]) {
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

    const headerDidChange = toggleModal[1]
      ? headerChanges()
      : header !== "Task Header";
    const descDidChange = toggleModal[1] ? descChanges() : desc !== "";
    const dateDidChange = toggleModal[1]
      ? dateChanges()
      : due_date === null
      ? false
      : due_date !== "";

    if (e === null && btnClose) {
      if (headerDidChange || descDidChange || dateDidChange) {
        return setWarn("You have unsaved changes");
      } else return setToggleModal(false);
    }
    if (e.currentTarget == e.target) {
      if (headerDidChange || descDidChange || dateDidChange) {
        return setWarn("You have unsaved changes");
      } else return setToggleModal(false);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {toggleModal[0] === "addTask" ? (
          <AddTask
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            ref={taskRef}
          />
        ) : toggleModal[0] === "updTask" ? (
          <UpdTask
            dataId={toggleModal[1]}
            closeModal={closeModal}
            handleUpdate={handleUpdate}
            ref={taskRef}
          />
        ) : null}
      </AnimatePresence>

      {toggleModal ? (
        <div className={styles.bgClose} onClick={closeModal}></div>
      ) : null}

      {warn ? (
        <WarnModal
          msg={warn}
          setToggleModal={setToggleModal}
          setWarn={setWarn}
        />
      ) : null}
    </>
  );
}

import styles from "../../../styles/dashboard/modal.module.scss";

import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { supabase } from "../../../lib/supabase";

import WarnModal from "./WarnModal";
import AddTask from "./AddTask";

export default function TaskModal({ setToggleModal, toggleModal }) {
  const addTaskRef = useRef();
  const [warn, setWarn] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const header = addTaskRef.current.headInput();
    let desc = addTaskRef.current.descInput();
    let date;

    if (desc === "") desc = null;
    if (!addTaskRef.current.dateInput()) {
      date = null;
    } else {
      date = new Date(addTaskRef.current.dateInput()).toUTCString();
    }

    const { error } = await supabase
      .from("Task")
      .insert([
        { user_uid: supabase.auth.user().id, header, desc, due_date: date },
      ]);
    if (error) console.error(error);
    setToggleModal(false);
  };

  const closeModal = (e, btnClose) => {
    const header = addTaskRef.current.headInput();
    let desc = addTaskRef.current.descInput();
    let date = addTaskRef.current.dateInput() || null;

    const headerDidChange = header !== "Task Header";
    const descDidChange = desc !== "";
    const dateDidChange = date === null ? false : date !== "";

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

  const modalVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {toggleModal === "addTask" ? (
          <AddTask
            modalVariants={modalVariants}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            ref={addTaskRef}
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

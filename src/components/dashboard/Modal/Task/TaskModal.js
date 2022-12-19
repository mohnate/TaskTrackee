import styles from "$Styles/dashboard/modal.module.scss";

import { createContext, useReducer, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { supabase } from "$Lib/supabase";

import WarnModal from "../WarnModal";
import AddTask from "./AddTask";
import UpdTask from "./UpdTask";
import arrayAreEqual from "$Lib/arrayEquality";

// React context for label useReducer hook to pass
// down to LabelBarSelect without prop drilling
export const LabelContext = createContext();

// toggleTaskModal inherited from routes/dashboard/index.js
// setToggleTaskModal(["updTask or addTask", data.id]);
export default function TaskModal({ setToggleTaskModal, toggleTaskModal }) {
  // store UpdTask.js and AddTask.js ref using fowardRef and useImperativeHandle
  // contains three functions to obtain the value of input using useRef hook
  // which is headInput(), descInput() and dateInput()
  const taskRef = useRef();
  // used to give warning to unsaved changes
  const [warn, setWarn] = useState();
  // selected data from redux
  const taskData = useSelector((state) =>
    state.taskData.value?.filter(async (task) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const { user } = session;
      return task.user_uid == user.id;
    })
  );

  // useReducer hook for label selection
  function reducer(state, action) {
    if (action.selected === "clear") return [];
    if (Array.isArray(action) && action.length > 0) return action;
    if (action.selected) {
      return [action.id, ...state];
    } else {
      const newState = state.filter((id) => id !== action.id);
      return newState;
    }
  }
  const [state, dispatch] = useReducer(reducer, []);

  // fucntion that reset modal data to default
  // before closing
  const resetToDefault = () => {
    dispatch({ selected: "clear" });
    setToggleTaskModal(false);
  };

  // submit new task to supabase backend
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

    // supabase working here
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { user } = session;
    const { error } = await supabase
      .from("Task")
      .insert([
        { user_uid: user.id, header, desc, due_date: date, labels_id: state },
      ]);
    if (error) console.error(error);
    resetToDefault(); // reset modal data to default after adding
  };

  // update existing task to supabase backend
  const handleUpdate = async (e, id) => {
    e.preventDefault();

    const header = taskRef.current.headInput();
    let desc = taskRef.current.descInput();
    let date;
    if (new Date(taskRef.current.dateInput()) == "Invalid Date") {
      date = null;
    } else date = new Date(taskRef.current.dateInput()).toISOString();

    // supabase working here
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { user } = session;
    const { error } = await supabase
      .from("Task")
      .update([{ header, desc, due_date: date, labels_id: state }])
      .eq("user_uid", user.id)
      .eq("id", id);
    if (error) console.error(error);
    resetToDefault(); // reset modal data to default after updating
  };

  // Supabase Delete Task Function
  const deleteHandler = async (e, id) => {
    e.preventDefault();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { user } = session;
    const { error } = await supabase
      .from("Task")
      .delete()
      .eq("user_uid", user.id)
      .eq("id", id);
    if (error) console.error(error);
    resetToDefault(); // reset modal data to default after updating
  };

  // function to close modal
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

    const labelsChanges = () => {
      for (const task of taskData) {
        if (task.id === toggleTaskModal[1]) {
          if (task.labels_id === null) {
            if (state.length === 0) return false;
            if (state.length !== 0) return true;
          } else {
            const result = arrayAreEqual(state, task.labels_id);

            if (result) return false;
            return true;
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
    const labelsDidChange = toggleTaskModal[1]
      ? labelsChanges()
      : state.length === 0
      ? false
      : true;

    // user close modal through cancel btn (e === null)
    // or close modal throguh clicking/touching background (e !== null)
    if ((e === null && btnClose) || e.currentTarget == e.target) {
      if (
        headerDidChange ||
        descDidChange ||
        dateDidChange ||
        labelsDidChange
      ) {
        return setWarn("You have unsaved changes");
      } else return resetToDefault();
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <LabelContext.Provider value={{ state, dispatch }}>
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
              deleteHandler={deleteHandler}
              ref={taskRef}
            />
          ) : null}
        </LabelContext.Provider>
      </AnimatePresence>

      {toggleTaskModal ? (
        <div className={styles.bgClose} onClick={closeModal}></div>
      ) : null}

      {warn ? (
        <WarnModal
          msg={warn}
          setToggleModal={setToggleTaskModal}
          reset={resetToDefault}
          setWarn={setWarn}
        />
      ) : null}
    </>
  );
}

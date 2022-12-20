import styles from "$Styles/dashboard/dashboard.module.scss";
import CheckSvg from "../icons/CheckSvg";

import { useState } from "react";
import { supabase } from "$Lib/supabase";

import PropTypes from "prop-types";

TaskBar.propTypes = {
  data: PropTypes.object.isRequired,
  date: PropTypes.string,
  setTgMd: PropTypes.func.isRequired,
};

export default function TaskBar({ data, date = "macro", setTgMd }) {
  // For checkBox use, set CheckSvg when mouseon on the
  // circle checkbox
  const [toggleCheck, setToggleCheck] = useState();

  const handleMouseOver = (condition) => {
    if (data.status === "completed") return;
    if (condition) {
      setToggleCheck(true);
    } else {
      setToggleCheck(false);
    }
  };

  // Supabase working, set task status
  const checkTask = async () => {
    if (data.status === "completed") {
      // set task status to "pending"
      const { error } = await supabase
        .from("Task")
        .update({ status: "pending" })
        .eq("user_uid", supabase.auth.user().id)
        .eq("id", String(data.id));
      if (error) return console.error(error);
    } else {
      // set task status to "completed"
      const { error } = await supabase
        .from("Task")
        .update({ status: "completed" })
        .eq("user_uid", supabase.auth.user().id)
        .eq("id", String(data.id));
      if (error) return console.error(error);
    }
  };

  const updTask = (e) => {
    if (e.target == e.currentTarget || e.target.tagName == "SPAN") {
      setTgMd(["updTask", data.id]);
    }
  };

  return (
    <div className={styles.taskBarContainer}>
      <span className={styles.taskDate}>
        <time
          dateTime={new Date(data.due_date).toLocaleString("en-UK", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
          style={
            data.due_date == null
              ? null
              : data.status === "completed"
                ? null
                : Date.now() > new Date(data.due_date).valueOf()
                  ? { color: "#ad1111" }
                  : null
          }
        >
          {data.due_date == null
            ? "No Due"
            : date === "micro"
              ? new Date(data.due_date).toLocaleTimeString("en-UK", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              : new Date(data.due_date).toLocaleString("en-UK", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })}
        </time>
      </span>
      <div className={styles.taskBarContent} onClick={updTask}>
        <div
          className={styles.taskBarTickBox}
          onMouseEnter={() => handleMouseOver(true)}
          onMouseLeave={() => handleMouseOver(false)}
          onClick={checkTask}
        >
          {data.status === "completed" ? (
            <CheckSvg color={"#10952d"} />
          ) : toggleCheck ? (
            <CheckSvg />
          ) : null}
        </div>
        <span
          className={styles.taskBarHeader}
          style={
            data.status === "completed"
              ? { textDecorationLine: "line-through" }
              : null
          }
        >
          {data.header}
        </span>
      </div>
    </div>
  );
}

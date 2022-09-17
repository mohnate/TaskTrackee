import styles from "../../styles/dashboard/dashboard.module.scss";
import CheckSvg from "../icons/CheckSvg";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function TaskBar({ data, date = "macro" }) {
  const [toggleCheck, setToggleCheck] = useState();

  const handleMouseOver = (condition) => {
    if (data.status === "completed") return;
    if (condition) {
      setToggleCheck(true);
    } else {
      setToggleCheck(false);
    }
  };

  const checkTask = async () => {
    if (data.status === "completed") {
      const { error } = await supabase
        .from("Task")
        .update({ status: "pending" })
        .eq("user_uid", supabase.auth.user().id)
        .eq("id", String(data.id));
      if (error) return console.error(error);
    } else {
      const { error } = await supabase
        .from("Task")
        .update({ status: "completed" })
        .eq("user_uid", supabase.auth.user().id)
        .eq("id", String(data.id));
      if (error) return console.error(error);
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
      <div className={styles.taskBarContent}>
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

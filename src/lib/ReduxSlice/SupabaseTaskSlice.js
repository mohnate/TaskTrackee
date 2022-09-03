import { createSlice } from "@reduxjs/toolkit";

export const supabaseTaskSlice = createSlice({
  name: "taskData",
  initialState: { value: null },
  reducers: {
    setData: (state, action) => {
      state.value = action.payload;

      console.info(`%c setData `, "background: #fff; color: #663399");
      console.log(state.value);
    },
    updData: (state, action) => {
      state.value.filter((task) => task.id != action.payload.id);
      const newTodos = [...state.value, action.payload];
      newTodos.sort((a, b) => b.id - a.id);
      state.value = newTodos;

      console.info(`%c updData `, "background: #ffef00; color: #00b7eb");
      console.log(state.value);
    },
  },
});
export const { setData, updData } = supabaseTaskSlice.actions;

export const taskNotCompleted = (task) => {
  if (task.status === "pending") {
    return true;
  } else return false;
};

export const dataIsToday = (task) => {
  const isSameDay = new Date(task.due_date).getDate() == new Date().getDate();
  const isSameMonth =
    new Date(task.due_date).getMonth() == new Date().getMonth();
  const isSameYear =
    new Date(task.due_date).getFullYear() == new Date().getFullYear();

  if (isSameDay && isSameMonth && isSameYear) {
    return true;
  } else return false;
};

export const dataIsTommorow = (task) => {
  const isSameDay =
    new Date(task.due_date).getDate() ==
    new Date(new Date().setDate(new Date().getDate() + 1)).getDate();
  const isSameMonth =
    new Date(task.due_date).getMonth() >=
    new Date(new Date().setDate(new Date().getDate() + 1)).getMonth();
  const isSameYear =
    new Date(task.due_date).getFullYear() >=
    new Date(new Date().setDate(new Date().getDate() + 1)).getFullYear();

  if (isSameDay && isSameMonth && isSameYear) {
    return true;
  } else return false;
};
export const dataIsFuture = (task) => {
  if (task.due_date == null) return true;

  const isLaterDay =
    new Date(task.due_date).getDate() >
    new Date(new Date().setDate(new Date().getDate() + 2)).getDate();
  const isLaterMonth =
    new Date(task.due_date).getMonth() >=
    new Date(new Date().setDate(new Date().getDate() + 2)).getMonth();
  const isLaterYear =
    new Date(task.due_date).getFullYear() >=
    new Date(new Date().setDate(new Date().getDate() + 2)).getFullYear();

  if (isLaterDay && isLaterMonth && isLaterYear) {
    return true;
  } else return false;
};
export const dataIsLate = (task) => {
  if (task.due_date == null) return false;
  if (new Date(task.due_date).getTime() < new Date().getTime()) {
    return true;
  } else return false;
};
export const dataIsThisWeek = (task) => {
  if (task.due_date == null) return false;

  const weekdayList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const taskWeekday = new Date().toLocaleString("en-UK", { weekday: "short" });
  let results;

  weekdayList.forEach((day, index) => {
    if (day === taskWeekday) {
      const daysToShow = 6 - index;

      const isWithinDay =
        new Date(task.due_date).getDate() <=
        new Date(
          new Date().setDate(new Date().getDate() + daysToShow)
        ).getDate();
      const isSameMonth =
        new Date(task.due_date).getMonth() >= new Date().getMonth();
      const isSameYear =
        new Date(task.due_date).getFullYear() >= new Date().getFullYear();

      if (isWithinDay && isSameMonth && isSameYear) {
        results = true;
      } else results = false;
    }
  });

  return results;
};
export const dataIsNextWeek = (task) => {
  if (task.due_date == null) return false;

  const weekdayList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const taskWeekday = new Date().toLocaleString("en-UK", { weekday: "short" });
  let results;

  weekdayList.forEach((day, index) => {
    if (day === taskWeekday) {
      const daysToShow = 13 - index;

      const isWithinDay =
        new Date(task.due_date).getDate() <=
        new Date(
          new Date().setDate(new Date().getDate() + daysToShow)
        ).getDate();
      const isSameMonth =
        new Date(task.due_date).getMonth() >= new Date().getMonth();
      const isSameYear =
        new Date(task.due_date).getFullYear() >= new Date().getFullYear();

      if (isWithinDay && isSameMonth && isSameYear) {
        results = true;
      } else results = false;
    }
  });

  return results;
};

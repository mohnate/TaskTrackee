import { createSlice } from "@reduxjs/toolkit";

export const supabaseTaskSlice = createSlice({
  name: "taskData",
  initialState: { value: null },
  reducers: {
    setData: (state, action) => {
      state.value = action.payload;
      state.value.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    },
    updData: (state, action) => {
      const todos = state.value.filter((task) => task.id != action.payload.id);
      const newTodos = [...todos, action.payload];
      newTodos.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
      state.value = newTodos;
    },
    deleteTask: (state, action) => {
      const todos = state.value.filter((task) => task.id != action.payload.id);
      state.value = todos;
    },
  },
});
export const { setData, updData, deleteTask } = supabaseTaskSlice.actions;

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
  const isNextDay =
    new Date(task.due_date).getDate() ==
    new Date(new Date().setDate(new Date().getDate() + 1)).getDate();
  const isSameMonth =
    new Date(task.due_date).getMonth() ==
    new Date(new Date().setDate(new Date().getDate() + 1)).getMonth();
  const isSameYear =
    new Date(task.due_date).getFullYear() ==
    new Date(new Date().setDate(new Date().getDate() + 1)).getFullYear();

  if (isNextDay && isSameMonth && isSameYear) {
    return true;
  } else return false;
};
export const dataIsFuture = (task) => {
  if (task.due_date == null) return true;

  const minimumDate = new Date();
  minimumDate.setHours(0);
  minimumDate.setMinutes(0);
  minimumDate.setSeconds(0);
  minimumDate.setMilliseconds(0);

  const isLaterDate = new Date(task.due_date);
  isLaterDate.setHours(0);
  isLaterDate.setMinutes(0);
  isLaterDate.setSeconds(0);
  isLaterDate.setMilliseconds(0);

  const results = isLaterDate.valueOf() - minimumDate.valueOf() >= 172800000; // 2 days

  if (results) {
    return true;
  } else return false;
};
export const dataIsLate = (task) => {
  if (task.due_date == null) return false;
  if (new Date(task.due_date).getTime() < new Date().getTime()) {
    return true;
  } else return false;
};

const isWithinWeek = (task, days, index) => {
  const daysToShow = days - index;
  const endOfTheWeek = new Date(
    new Date().setDate(new Date().getDate() + daysToShow)
  );
  endOfTheWeek.setHours(0);
  endOfTheWeek.setMinutes(0);
  endOfTheWeek.setSeconds(0);
  endOfTheWeek.setMilliseconds(0);

  const currentTask = new Date(task.due_date);
  currentTask.setHours(0);
  currentTask.setMinutes(0);
  currentTask.setSeconds(0);
  currentTask.setMilliseconds(0);
  return currentTask <= endOfTheWeek;
};
export const dataIsThisWeek = (task) => {
  if (task.due_date == null) return false;

  const weekdayList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const taskWeekday = new Date().toLocaleString("en-UK", { weekday: "short" });
  let results;

  weekdayList.forEach((day, index) => {
    if (day === taskWeekday) {
      if (isWithinWeek(task, 6, index)) {
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
      if (isWithinWeek(task, 13, index)) {
        results = true;
      } else results = false;
    }
  });

  return results;
};

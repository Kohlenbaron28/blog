import React from "react";

import Task from "./Task";
import { TTaskList } from "../types/types";

export default function TaskList({
  data,
  deleteItem,
  changeDone,
  startTimer,
  stopTimer,
}: TTaskList) {
  const elements = data.map((item) => {
    const { id, time, ...itemProps } = item;
    return (
      <li key={id}>
        <Task
          {...itemProps}
          deleteEl={() => deleteItem(id)}
          onChangeDone={() => changeDone(id)}
          time={time}
          stopTimer={() => stopTimer(id)}
          startTimer={() => startTimer(id)}
        />
      </li>
    );
  });
  return (
    <div className="main">
      <ul className="todo-list">{elements}</ul>
    </div>
  );
}

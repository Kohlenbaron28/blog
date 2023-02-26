import React from "react";

import Task from "./Task";
import { TData } from "../types/types";

interface ListProps {
  data: TData;
  deleteItem: (id: number) => void;
  changeDone: (id: number) => void;
  startTimer: (id: number) => void;
  stopTimer: (id: number) => void;
}

export default class TaskList extends React.Component<ListProps, {}> {
  render() {
    const { data, deleteItem, changeDone, startTimer, stopTimer } = this.props;
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
}

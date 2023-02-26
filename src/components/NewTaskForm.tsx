import React from "react";
import { TNewTask } from "../types/types";

export default function NewTaskForm({ addItem }: TNewTask) {
  const [min, setMin] = React.useState("");
  const [sec, setSec] = React.useState("");
  const [title, setTitle] = React.useState("");

  const changeItem = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    setTitle(target.value);
  };
  const onLabelChangeMin = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    setMin(target.value);
  };
  const onLabelChangeSec = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    setSec(target.value);
  };
  const onClickEnter = () => {
    if (title !== "" && min !== "" && sec !== "") {
      addItem(title, parseInt(min) * 60 + parseInt(sec));
      setTitle("");
      setMin("");
      setSec("");
    }
  };
  return (
    <div className="header">
      <h1>todos</h1>
      <form onKeyDown={onClickEnter}>
        <input
          value={title}
          onChange={changeItem}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={onLabelChangeMin}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={onLabelChangeSec}
          autoFocus
        ></input>
      </form>
    </div>
  );
}

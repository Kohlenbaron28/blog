import React from "react";
import { formatDistanceToNow } from "date-fns";

import { TTask } from "../types/types";

export default function Task({
  label,
  deleteEl,
  onChangeDone,
  done,
  time,
  startTimer,
  stopTimer,
  timer,
}: TTask) {
  let classNames = "view";
  if (done) {
    classNames += " completed";
  }

  const createdDate = new Date(time);
  return (
    <div>
      <input type="text" className="edit" value="Editing task" />
      <div className={classNames}>
        <input className="toggle" type="checkbox" onClick={onChangeDone} />
        <label>
          <span className="description">{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={startTimer}></button>
            <button className="icon icon-pause" onClick={stopTimer}></button>
            <span>{`${Math.floor(timer / 60)
              .toString()
              .padStart(2, "0")}:${Math.floor(timer % 60)
              .toString()
              .padStart(2, "0")}`}</span>
          </span>
          <span className="created">
            created {formatDistanceToNow(createdDate, { includeSeconds: true })}
          </span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={deleteEl}></button>
      </div>
    </div>
  );
}

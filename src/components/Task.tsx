import React from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

interface TaskState {
  time: number;
}
interface TaskProps {
  label: string;
  deleteEl: () => void;
  onChangeDone: () => void;
  done: boolean;
  time: Date;
  startTimer: () => void;
  stopTimer: () => void;
  timer: number;
}
export default class Task extends React.Component<TaskProps, TaskState> {
  static propTypes = {
    label: PropTypes.string,
  };
  state = {
    time: 0,
  };
  render() {
    const { label, deleteEl, onChangeDone, done, time } = this.props;
    let classNames = "view";
    if (done) {
      classNames += " completed";
    }

    const createdDate = new Date(time);
    return (
      <div>
        <div className={classNames}>
          <input className="toggle" type="checkbox" onClick={onChangeDone} />
          <label>
            <span className="description">{label}</span>
            <span className="description">
              <button
                className="icon icon-play"
                onClick={this.props.startTimer}
              ></button>
              <button
                className="icon icon-pause"
                onClick={this.props.stopTimer}
              ></button>
              <span>{`${Math.floor(this.props.timer / 60)
                .toString()
                .padStart(2, "0")}:${Math.floor(this.props.timer % 60)
                .toString()
                .padStart(2, "0")}`}</span>
            </span>
            <span className="created">
              created{" "}
              {formatDistanceToNow(createdDate, { includeSeconds: true })}
            </span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={deleteEl}></button>
        </div>
      </div>
    );
  }
}

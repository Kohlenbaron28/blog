import React from "react";
import { TData } from "../types/types";

interface FooterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  clicked: () => void;
}

export default class Footer extends React.Component<
  FooterProps,
  { children: JSX.ElementClass }
> {
  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "complited", label: "Complited" },
  ];
  render() {
    const { filter, onFilterChange, clicked } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? "selected" : "";
      return (
        <li key={name}>
          <button
            type="button"
            className={clazz}
            onClick={() => onFilterChange(name)}
          >
            {label}
          </button>
        </li>
      );
    });
    return (
      <div className="footer">
        {/* <span className="todo-count">{activeTodo} items left</span> */}
        <div>
          <ul className="filters">{buttons}</ul>
        </div>
        <button className="clear-completed" onClick={clicked}>
          Clear completed
        </button>
      </div>
    );
  }
}

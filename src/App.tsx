import React from "react";

import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import { TData } from "./types/types";

import "./index.css";

interface AppState {
  data: TData;
  filter: string;
}

export default class App extends React.Component<{}, AppState> {
  maxId = 100;
  state = {
    data: [],
    filter: "active",
  };
  interval: any;
  componentDidMount(): void {
    this.interval = setInterval(() => {
      this.setState(({ data }) => {
        let newArr = data.map((el) => {
          if (el.timer === 0) {
            return el;
          }
          if (!el.pause) {
            el.timer = el.timer - 1;
          }
          return el;
        });
        return {
          data: newArr,
        };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  deleteItemFunc = (id: number) => {
    this.setState((state) => {
      let newArr = [...state.data];
      let idx = newArr.findIndex((el) => el.id === id);
      console.log(idx);
      newArr.splice(idx, 1);
      return {
        data: newArr,
      };
    });
  };
  createTodoItem(label: string, timer: number) {
    return {
      label,
      time: new Date(),
      done: false,
      id: this.maxId++,
      timer: timer,
      pause: false,
    };
  }
  addItem = (text: string, timer: number) => {
    const newItem = this.createTodoItem(text, timer);
    this.setState((state) => {
      let newArr = [...state.data, newItem];
      return {
        data: newArr,
      };
    });
  };

  onToggleDone = (id: number) => {
    this.setState(({ data }) => {
      let idx = data.findIndex((el) => el.id === id);
      const oldItem = data[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArray = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
      return {
        data: newArray,
      };
    });
  };
  filter(items: TData, filter: string) {
    switch (filter) {
      case "all":
        return items;
      case "complited":
        return items.filter((e) => e.done);
      case "active":
        return items.filter((e) => !e.done);
      default:
        return items;
    }
  }
  onFilterChange = (filter: string) => {
    this.setState({ filter });
  };
  clearing = () => {
    this.setState(({ data }) => {
      const newData = data.filter((el) => !el.done);
      return {
        data: newData,
      };
    });
  };
  stopTimer = (id: number) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);
      const newObj = [{ ...data[idx], pause: true }];
      const newData = [
        ...data.slice(0, idx),
        ...newObj,
        ...data.slice(idx + 1),
      ];
      return {
        data: newData,
      };
    });
  };

  startTimer = (id: number) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);
      const newObj = [{ ...data[idx], pause: false }];
      const newData = [
        ...data.slice(0, idx),
        ...newObj,
        ...data.slice(idx + 1),
      ];
      return {
        data: newData,
      };
    });
  };
  render() {
    let visibleItem = this.filter(this.state.data, this.state.filter);
    // const activeCount:number = this.state.data.filter((el) => !el.done).length;
    return (
      <div className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          data={visibleItem}
          deleteItem={this.deleteItemFunc}
          changeDone={this.onToggleDone}
          stopTimer={this.stopTimer}
          startTimer={this.startTimer}
        />
        <Footer
          //   activeTodo={activeCount}
          filter={this.state.filter}
          onFilterChange={this.onFilterChange}
          clicked={this.clearing}
        />
      </div>
    );
  }
}

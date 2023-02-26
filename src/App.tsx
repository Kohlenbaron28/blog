import React from "react";
import Footer from "./components/Footer";
import TaskList from "./components/TaskList";
import NewTaskForm from "./components/NewTaskForm";
import { TData } from "./types/types";
import "./index.css";

let max: number = 1;

function App() {
  const [filterVal, setFilterVal] = React.useState("active");
  const [data, setData] = React.useState<TData>([]);
  React.useEffect(() => {
    let interval = setInterval(() => {
      let newArr = data.map((el) => {
        if (el.timer === 0) {
          return el;
        }
        if (!el.pause) {
          el.timer = el.timer - 1;
        }
        return el;
      });
      setData(newArr);
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);

  const deleteItemFunc = (id: number) => {
    let newArr = [...data];
    let idx = newArr.findIndex((el) => el.id === id);
    newArr.splice(idx, 1);
    setData(newArr);
    return data;
  };
  const createTodoItem = (label: string, timer: number) => {
    return {
      label,
      time: new Date(),
      done: false,
      id: max++,
      timer: timer,
      pause: false,
    };
  };
  const addItem = (text: string, timer: number) => {
    const newItem = createTodoItem(text, timer);
    let newArr = [...data, newItem];
    setData(newArr);
    return data;
  };

  const onToggleDone = (id: number) => {
    let idx = data.findIndex((el) => el.id === id);
    const oldItem = data[idx];
    const newItem = { ...oldItem, done: !oldItem.done };
    const newArray = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
    setData(newArray);
    return data;
  };
  const filterr = (items: TData, filterParam: string) => {
    switch (filterParam) {
      case "all":
        return items;
      case "complited":
        return items.filter((e) => e.done);
      case "active":
        return items.filter((e) => !e.done);
      default:
        return items;
    }
  };
  const onFilterChange = (filter: string) => {
    setFilterVal(filter);
  };
  const clearing = () => {
    const newData = data.filter((el) => !el.done);
    setData(newData);
    return data;
  };
  const stopTimer = (id: number) => {
    const idx = data.findIndex((el) => el.id === id);
    const newObj = [{ ...data[idx], pause: true }];
    const newData = [...data.slice(0, idx), ...newObj, ...data.slice(idx + 1)];
    setData(newData);
    return data;
  };

  const startTimer = (id: number) => {
    const idx = data.findIndex((el) => el.id === id);
    const newObj = [{ ...data[idx], pause: false }];
    const newData = [...data.slice(0, idx), ...newObj, ...data.slice(idx + 1)];
    setData(newData);
    return data;
  };
  let visibleItem = filterr(data, filterVal);
  const activeCount = data.filter((el) => !el.done).length;
  return (
    <div className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TaskList
        data={visibleItem}
        deleteItem={deleteItemFunc}
        changeDone={onToggleDone}
        stopTimer={stopTimer}
        startTimer={startTimer}
      />
      <Footer
        activeTodo={activeCount}
        filter={filterVal}
        onFilterChange={onFilterChange}
        clicked={clearing}
      />
    </div>
  );
}

export default App;

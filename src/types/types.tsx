export type TFooter = {
  activeTodo: number;
  filter: string;
  onFilterChange: (filter: string) => void;
  clicked: () => void;
};
export type TTaskList = {
  data: TData;
  deleteItem: (id: number) => void;
  changeDone: (id: number) => void;
  startTimer: (id: number) => void;
  stopTimer: (id: number) => void;
};
export type TTask = {
  label: string;
  deleteEl: () => void;
  onChangeDone: () => void;
  done: boolean;
  time: Date;
  startTimer: () => void;
  stopTimer: () => void;
  timer: number;
};
export type TNewTask = {
  addItem: (text: string, timer: number) => void;
};
export type TData = {
  label: string;
  time: Date;
  done: boolean;
  id: number;
  pause: boolean;
  timer: number;
}[];

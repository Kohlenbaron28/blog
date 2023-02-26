import React from "react";

interface NewProps {
  addItem: (text: string, timer: number) => void;
}
interface NewState {
  min: string | number;
  sec: string | number;
  title: string;
}

export default class NewTaskForm extends React.Component<NewProps, NewState> {
  state = {
    min: "",
    sec: "",
    title: "",
  };
  timer = 0;
  // submitingForm = (e) => {
  //   e.preventDefault();
  //   this.props.addItem(this.state.label, this.state.minuts, this.state.seconds);
  //   this.setState({
  //     label: '',
  //     //   minuts: 0,
  //     //   seconds: 0,
  //   });
  //   console.log(this.state);
  // };
  changeItem = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    this.setState({
      title: target.value,
    });
  };
  onLabelChangeMin = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    this.setState({
      min: target.value,
    });
  };
  onLabelChangeSec = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    this.setState({
      sec: target.value,
    });
  };

  onClickEnter = () => {
    if (
      this.state.title !== "" &&
      this.state.min !== "" &&
      this.state.sec !== ""
    ) {
      this.props.addItem(
        this.state.title,
        parseInt(this.state.min) * 60 + parseInt(this.state.sec)
      );

      this.setState({
        title: "",
        min: "",
        sec: "",
      });
    }
  };

  render() {
    return (
      <div className="header">
        <h1>todos</h1>
        <form onKeyDown={this.onClickEnter}>
          <input
            value={this.state.title}
            onChange={this.changeItem}
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            value={this.state.min}
            onChange={this.onLabelChangeMin}
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            value={this.state.sec}
            onChange={this.onLabelChangeSec}
            autoFocus
          ></input>
        </form>
      </div>
    );
  }
}

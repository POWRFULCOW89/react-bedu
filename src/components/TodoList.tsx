import "../css/TodoList.css";
import { useState, Component } from "react";

interface Todos {
  name: string;
  date: Date;
  handleDeleteTodo?: Function;
}

const sampleTodos = [
  { name: "Clean the room", date: new Date()},
  { name: "Order pizza", date: new Date()},
];

class Todo extends Component<Todos> {
  state = {
    done: false,
  };

  handleDoneTodo = () => this.setState({ done: !this.state.done });

  render() {
    return (
      <div className="block todo">
        <div className="todo-header">
          <p
            className="subtitle"
            style={{ textDecoration: this.state.done ? "line-through" : "" }}
          >
            {this.props.name}
          </p>

          <span
            className={`todo-header__check ${
              this.state.done ? "fas" : "far"
            } fa-check-circle`}
            style={{ color: this.state.done ? "green" : "gray" }}
            onClick={this.handleDoneTodo}
          ></span>
        </div>
        <div className="todo-footer">
            <span
                className={`todo-header__delete ${
                this.state.done ? "fas" : "far"
                } fa-trash-alt`}
                onClick={() => {
                    if (this.props?.handleDeleteTodo) this.props.handleDeleteTodo();
                }}
            ></span>
            <p className="has-text-right">{this.props.date.toDateString()}</p>
        </div>
      </div>
    );
  }
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todos[]>(sampleTodos);
  const [input, setInput] = useState("");

  
  const handleNewTodo = () => {
    let el = document.querySelector("#input") as HTMLButtonElement;
    let name = el.value;
    if (name) {
      let newTodos = [...todos];
      newTodos.push({ name, date: new Date() });
      setTodos(newTodos);
    }
    setInput('');
  };

  const handleDeleteTodo = (i: number): void => {
    const newTodos = [...todos];

    try {
        newTodos.splice(i, 1);
    } catch (error) {
        console.error(error);
    }

    setTodos(newTodos);
  }

  const renderTodos = (): JSX.Element[] => {
    return todos.map(({ name, date }, i) => <Todo name={name} date={date} handleDeleteTodo={() => handleDeleteTodo(i)} key={`${name}-${i}`}/>);
  };


  return (
    <div className="container">
      <h1 className="title">Todo List</h1>

      <form className="box">
        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              id="input"
              type="text"
              value={input}
              placeholder="Add a new task"
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNewTodo();
                }
              }}
            />
          </div>
          <div className="control">
            <a onClick={handleNewTodo} className="button is-info">
              Add
            </a>
          </div>
        </div>
      </form>
      <div>
        <ul className="todos box">{renderTodos()}</ul>
      </div>
      <p className="box mt-5 subtitle">Total tasks: {todos?.length}</p>
    </div>
  );
};

export default TodoList;

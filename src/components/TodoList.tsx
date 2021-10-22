import "../css/TodoList.css";
import { useState, useEffect, Component } from "react";

interface Todos {
  name: string;
  date?: Date;
  handleDeleteTodo?: Function;
  handleDoneTodo?: Function;
  done: boolean;
  index?: number;
}

// const sampleTodos = [
//   { name: "Clean the room", date: new Date(), done: false},
//   { name: "Order pizza", date: new Date(), done: false},
// ];

const Alert = ({dismiss}: {dismiss: Function}) => {
 return <div className="notification is-danger">
    <button className="delete" onClick={() => dismiss()}></button>
    This task already exists!
  </div>
}

class Todo extends Component<Todos> {

  render() {
    return (
      <div className="block todo">
        <div className="todo-header">
          <p
            className={`subtitle ${this.props.done ? 'strike' : 'unstrike'}`}
          >
            {this.props.name}
          </p>

          <span
            className={`todo-header__check ${
              this.props.done ? "fas" : "far"
            } fa-check-circle`}
            style={{ color: this.props.done ? "green" : "gray" }}
            onClick={() => {
              if (this.props.index) {
                fetch(`http://localhost:4000/todos/${this.props.index + 1}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: this.props.index,
                    done: !this.props.done,
                  }),
                })
                  .then(console.log)
                  .then(() => {
                    if (this.props.handleDoneTodo) this.props.handleDoneTodo(!this.props.done);
                  })
                  .catch(console.error)
              }

            }}
          ></span>
        </div>
        <div className="todo-footer">
            <span
                className={`todo-header__delete far fa-trash-alt`}
                onClick={() => {
                    if (this.props?.handleDeleteTodo) this.props.handleDeleteTodo();
                }}
            ></span>
            {this.props.date ? <p className="has-text-right">{ new Date(this.props.date).toDateString()}</p> : null}
        </div>
      </div>
    );
  }
}



const TodoList = () => {
  // const [todos, setTodos] = useState<Todos[]>(sampleTodos);
  const [todos, setTodos] = useState<Todos[]>([]);
  const [input, setInput] = useState("");
  const [isErrorActive, setErrorActive] = useState(false);
  const [hideDone, setHideDone] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const url = "http://localhost:4000/todos";

  useEffect(() => {
    const getData = async() => {
        const res = await fetch(url);
        const data = await res.json();
        setTodos(data);
    }

    getData();

  }, []);  
  
  const handleNewTodo = () => {
    let el = document.querySelector("#input") as HTMLButtonElement;
    let name = el.value;
    if (name) {
      let newTodos = [...todos];

      const duplicate = newTodos.map(todo => todo.name).includes(name);

      if (!duplicate){
        // Visualmente
        newTodos.push({ name, date: new Date(), done: false });
        setTodos(newTodos);

        // En el servidor
        fetch(`http://localhost:4000/todos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: newTodos.length,
            name,
            date: new Date(),
            done: false,
          }),
        })
          .then(console.log)
          .catch(console.error)

      } else setErrorActive(true);
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

  const handleDoneTodo = (i: number): void => {
    // setRefresh(true);
    const newTodos = [...todos];
    newTodos[i].done = !newTodos[i].done;
    setTodos(newTodos);
    
    // fetch(`/todos/${i}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     done: item.name,
    //     price: item.price 
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((result) => setItem(result))
    //   .catch((err) => console.log('error: ', err))
  }

  const renderTodos = () => {
    
    let newTodos = [...todos];

    if (hideDone) newTodos = newTodos.filter(todo => !todo.done);

    return <div>
      {newTodos.length > 0 && <ul className="todos box">
        {newTodos.map(({ name, date, done }, i) => <Todo name={name} date={date} done={done} index={i} handleDoneTodo={() => handleDoneTodo(i)} handleDeleteTodo={() => handleDeleteTodo(i)} key={`${name}-${i}`}/>)}
      </ul>}
    </div>

  };

  return (
    <div className="container center" style={{flexDirection: 'column', alignItems: 'stretch'}}>
      <h1 className="title left">Todo List</h1>

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
                setErrorActive(false);
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
            <button onClick={handleNewTodo} className="button is-info">
              Add
            </button>
          </div>
        </div>
      </form>

      {renderTodos()}
      
      <p className="box mt-5 subtitle">Total tasks: {todos?.length}</p>
      
      {isErrorActive && <Alert dismiss={() => setErrorActive(false)}/>}
      
      <button className="button" onClick={() => setHideDone(!hideDone)}>
        <span className="icon is-small">
          <i className={`fas fa-${hideDone ? 'eye' : 'eye-slash'}`}></i>
        </span>
        <span>{hideDone ? 'Show done' : 'Hide done'}</span>
      </button>
    </div>
  );
};

export default TodoList;

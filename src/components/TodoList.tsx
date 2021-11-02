import "../css/TodoList.css";
import { useState, useEffect, Component } from "react";
import { Link } from 'react-router-dom';
// import Paper from '@mui/material/Paper';
import { Button, IconButton, InputBase, Paper, TextField } from "@mui/material";

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
      // <div className="block todo">
      <Paper
        elevation={0}
        // sx={{fontSize: 18 }}
      >
        <div className="todo-header">
          
          <Link to={`task/${Number(this.props.index) + 1}`} style={{fontSize: 20}}>
            {this.props.name}
          </Link>

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
      {/* </div> */}
      </Paper>
    );
  }
}



const TodoList = () => {
  // const [todos, setTodos] = useState<Todos[]>(sampleTodos);
  const [todos, setTodos] = useState<Todos[]>([]);
  const [input, setInput] = useState("");
  const [isErrorActive, setErrorActive] = useState(false);
  const [hideDone, setHideDone] = useState(false);
  // const [refresh, setRefresh] = useState(false);

  const url = "http://localhost:4000/todos";

  useEffect(() => {
    const getData = async() => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        
      }
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

    <Paper
      component="form"
      elevation={3}
      sx={{ p: '15px', mb: 2, display: 'flex', alignItems: 'center'}}
    >
      <TextField 
        // id="outlined-basic" 
        label="Add a new task" 
        variant="outlined"
        sx={{ mr: 2, fontSize: 20}}
        // placeholder="Add a new task"
        // className="input"
        error={isErrorActive}
        // helperText={isErrorActive && input.length > 0 ? "Task already exists" : "Enter a task"}
        helperText={()=> {
          if (isErrorActive){
            if (input.length > 0) return "Task already exists";
            else return "Enter a task";
          }
        }}
        id="input"
        type="text"
        value={input}
        onChange={(e) => {
          setErrorActive(false);
          setInput(e.target.value);
        }}
        onKeyPress={(e) => {
          console.log('enter');
          if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            if (input.length > 0){
              handleNewTodo();
            } else setErrorActive(true);
          }
        } }
      />
      <Button  variant="contained" onClick={handleNewTodo}>
        Add
      </Button>
    </Paper>

      {renderTodos()}
      
      {/* <p className="box mt-5 subtitle">Total tasks: {todos?.length}</p> */}
      <Paper elevation={3} sx={{p: 2, fontSize: 20, m: "20px 0px"}}>
      Total tasks: {todos?.length}
        </Paper>
      
      {/* {isErrorActive && <Alert dismiss={() => setErrorActive(false)}/>} */}
      
      <Button variant="outlined"  onClick={() => setHideDone(!hideDone)}>
        <span className="icon is-small">
          <i className={`fas fa-${hideDone ? 'eye' : 'eye-slash'}`}></i>
        </span>
        &nbsp;
        <span>{hideDone ? 'Show done' : 'Hide done'}</span>
      </Button>
    </div>
  );
};

export default TodoList;

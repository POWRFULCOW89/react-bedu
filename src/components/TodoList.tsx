import '../css/TodoList.css';
import { useState } from "react";

interface Todos {
    name: string, 
    date: Date
}

const Todo = ({name, date}:Todos): JSX.Element => {
    return <div className="block todo">
        <p className='subtitle'>{name}</p>
        <p className="has-text-right">{date.toDateString()}</p>
    </div>
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todos[]>([{name: "Clean the room", date: new Date()}, {name: "Order pizza", date: new Date()}]);

    const renderTodos = (): JSX.Element[] => {
        return (todos.map(({name, date}) => <Todo name={name} date={date} />));
    }

    const handleNewTodo = () => {
        let el = document.querySelector('#input') as HTMLButtonElement;
        let name = el.value;
        if (name){
            let newTodos = [...todos];
            newTodos.push({name, date: new Date()});
            setTodos(newTodos);
        }
    }

    return (<div className="container">
        <h1 className="title">Todo List</h1>

        <form className='box'>
            <div className="field has-addons">
                <div className="control">
                    <input className="input" id="input" type="text" placeholder="Add a new task"/>
                </div>
                <div className="control">
                    <a onClick={handleNewTodo} className="button is-info">
                        Add
                    </a>
                </div>
            </div>
        </form>
        <div >
            <ul className='todos box' >{renderTodos()}</ul>
        </div>
    </div>);
}

export default TodoList;
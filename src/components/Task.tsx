import { useState, useEffect } from 'react';
import '../css/Task.css';
import { useHistory, RouteComponentProps } from 'react-router-dom';

type Params = {
    todo: string;
}

const Task = ({match}: RouteComponentProps<Params>) => {
    const history = useHistory();
    let { todo } = match.params;
    const url = "http://localhost:4000/todos/" + todo;
    const [task, setTask] = useState({name: 'Task', id: 1, date: new Date().toUTCString(), done: false});

    useEffect(() => {
        const getData = async() => {
          try {
            const res = await fetch(url);
            const data = await res.json();
            setTask(data);
          } catch (error) {
            console.error(error);
          }
        }
    
        getData();
    
    }, []); 

    return <div className="box">
        <h1 className="title">
            {task.name}
        </h1> 
        <span className="subtitle"> Task no. {task.id}</span>
        <div className="content">
            <p>Date: {task.date}</p>
            <p>Done: {task.done ? 'True' : 'False'}</p>
        </div>
        <button onClick={() => history.goBack()}>
            Back
        </button>
    </div>
}

export default Task;
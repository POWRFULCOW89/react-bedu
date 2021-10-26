import { useState, useEffect } from 'react';
import '../css/Task.css';

let urlParams = new URLSearchParams(window.location.search).get('task');
const url = "http://localhost:4000/todos/" + urlParams;

const Task = () => {
    // let task = null;
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
    </div>
}

export default Task;
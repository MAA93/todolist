
import './App.css';
import TaskForm from './TaskForm';
import Task from './Task';
import { useEffect, useState } from 'react';


function App() {
  const [tasks , setTasks] = useState([]);
  useEffect(() => {
    if(tasks.length === 0) return;
    localStorage.setItem('tasks',JSON.stringify(tasks));
  } , [tasks]);
  useEffect(() => {
    // alert('test')
   const tasks = JSON.parse(localStorage.getItem('tasks'));
   setTasks(tasks); 
  } ,[]);

  function addTasks(name){
    setTasks( prev =>{
      return [...prev, {name:name,done:false}]

    });
  }

  function removeTask(indexToremove){
    setTasks(prev => {
      return prev.filter((taskObject,index) => index !== indexToremove)
    });
  }

  function updateTaskDone(taskIndex , newDone){
    setTasks( prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    })
  }
  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length

  function getMessage(){
    const percentage = numberComplete/numberTotal * 100;
    if(percentage === 0){
      return " “You Can Do It” 💪🏻!";
    }
    if(percentage === 100){
      return '“Congratulations on Your Achievement” 👏🏻🔥 !';
    }
    return '“Keep Going” 🚀 !';
  }

  function renameTask(index,newName){
    setTasks(prev =>{
      const newTasks = [...prev];
      newTasks[index].name = newName
      return newTasks;
    })
  }

  return (
    <main>
      
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTasks}/>
     
      {tasks.map((task , index) => (
        <Task {...task} 
        onRename={newName =>renameTask(index,newName)}
        onDelete={() => removeTask(index)}
        onToggle = {done => updateTaskDone(index,done)}/>
      ))}

    </main>

  );
}

export default App;

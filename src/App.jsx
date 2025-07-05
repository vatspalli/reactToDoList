import { useEffect, useState } from "react";
import ToDoHeader from "./components/ToDoHeader";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const server = "https://todoserver-toui.onrender.com"

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json',}
      }
      const response = await fetch(`${server}/getTasks`, fetchOptions)
      const data = await response.json();
      setTaskList(data);
    }

    fetchTasks();
  },[])

  const updateTask = function(updateOptions) {
    const newTaskList = taskList.map(task => task.id === updateOptions.id ? {...task, isDone: updateOptions.isDone} : {...task});
    newTaskList.sort((a, b) => a.isDone - b.isDone);
    setTaskList(newTaskList)
  }

  const addTask = async (name) => {
    const fetchOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({name})
    }
    const response = await fetch(`${server}/addTask`, fetchOptions);
    const data = await response.json();
    const newTaskList = [...taskList];
    newTaskList.push(data);
    newTaskList.sort((a, b) => a.isDone - b.isDone);
    setTaskList(newTaskList)
  }

  const deleteTask = function(id) {
    const newTaskList = taskList.filter(task => task.id !== id);
    setTaskList(newTaskList)
  }

  return <>
    <ToDoHeader />
    <AddTask addTask={addTask}/>
    <TaskList taskList={taskList} updateTask={updateTask} deleteTask={deleteTask}/>
  </>
}
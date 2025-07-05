import TaskItem from "./TaskItem"
import './taskList.css'

export default function TaskList({taskList, updateTask, deleteTask}) {
    return <><ul>{taskList.map(task => <TaskItem task={task} updateTask={updateTask} deleteTask={deleteTask}/>)}</ul></>
}
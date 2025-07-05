import './taskItem.css'

export default function TaskItem({task, updateTask, deleteTask}) {
    const server = "https://todoserver-toui.onrender.com"

    const handleChange = async (e) => {
        const isDone = e.target.checked;
        updateTask({id: task.id, isDone})
        const fetchOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({id: task.id, isDone})
        }
        const response = await fetch(`${server}/updateTask`,fetchOptions);
        const data = await response.json();
        console.log(data);
    }

    const handleDelete = async () => {
        deleteTask(task.id);
        const fetchOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({id: task.id})
        }
        const response = await fetch(`${server}/deleteTask`,fetchOptions);
        const data = await response.json();
        console.log(data);
    }

    return <div className="taskItem">
    <li key={task.id}>
        <label>
            <input type="checkbox" onChange={handleChange} checked={task.isDone}/>
            {task.name}
        </label>
        <button onClick={handleDelete}>Delete</button>
    </li>
    </div>
}
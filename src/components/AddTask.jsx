import { useState } from "react";
import './addtask.css'

export default function AddTask({addTask}) {
    const [value, setValue] = useState("");

    const addTaskSubmit = async (e) => {
        e.preventDefault();
        if(value.trim()) {
            await addTask(value)
        }
        setValue("");
    }

    return <form className="taskForm">
        <input type="text" value={value} onChange={(e) => {setValue(e.target.value)}} placeholder="Add a task"/>
        {value.trim() !== "" && <button type="submit" onClick={addTaskSubmit}>Submit</button>}
    </form>
}
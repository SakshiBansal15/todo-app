import React, { useState } from "react";
import DisplayTasks from "./DisplayTasks"
function Tasks() {
 
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

 
  const handleSubmit = (event) => {
    event.preventDefault();

    
    const newTask = { task, description };

    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        
        
        setTask("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  return (
    <div>
      <h1 className="heading">Add New Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="inputTask">
            <label>
              Add Task 
              <input
                className="inputBox"
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="inputDescription">
            <label>
              Add Description 
              <input
                className="inputBox"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
          </div>
        </div>
        <button className="saveButton" type="submit">Save</button>
      </form>
      <hr></hr>
      <DisplayTasks></DisplayTasks>
    </div>
  );
}

export default Tasks;

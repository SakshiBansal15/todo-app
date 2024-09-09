import React, { useState,useEffect } from "react";

function DisplayTasks() {
 const[storedTasks,setStoredTasks]=useState([]) 

 const fetchData=()=>{
   fetch("http://localhost:3001/tasks")
     .then((response) => response.json())
     .then((data) => {
       data.reverse();
       setStoredTasks(data);
     })
     .catch((error) => {
       console.error("Error fetching users:", error);
     });
 }
 useEffect(() => {
   fetchData()
 });


 const deleteTask = (id) => {
   fetch(`http://localhost:3001/tasks/${id}`, {
     method: "DELETE",
   })
     .then(() => {
    
      fetchData()
     })
     .catch((error) => console.error("Error deleting task:", error));
 };


const toggleCompleted = (id, currentCompleted) => {
  fetch(`http://localhost:3001/tasks/${id}`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: !currentCompleted, 
    }),
  })
    .then((response) => response.json())
    .then((updatedTask) => {
      fetchData()
    })
    .catch((error) => console.error("Error toggling task:", error));
};




  return (
    <div>
      {storedTasks.map((t) => (
        <div key={t.id}>
          <div className="dataBox">
            <div className="data">
              <div className="task">{t.task}</div>

              <textarea class="my-textarea">{t.description}</textarea>

              <div>
                <button className="delete" onClick={() => deleteTask(t.id)}>
                  delete
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>

              <div>
                <input
                  className="checkStatus"
                  type="checkbox"
                  checked={t.completed}
                  onClick={() => toggleCompleted(t.id, t.completed)}
                />
              </div>
            </div>
          </div>
          <hr></hr>
        </div>
      ))}
    </div>
  );
}

export default DisplayTasks;

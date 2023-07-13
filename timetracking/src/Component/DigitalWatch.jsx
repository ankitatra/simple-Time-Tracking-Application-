import React, { useState, useEffect } from "react";


const DigitalWatch = () => {
  const [time, setTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [timerState, setTimerState] = useState("stopped");
  const [modalOpen, setModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (timerState === "running") {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setTimerInterval(interval);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timerState]);
const startTimer = () => {
    setTimerState("running");
  };
const pauseTimer = () => {
    setTimerState("paused");
  };
 const resetTimer = () => {
    setTimerState("stopped");
    setTime(0);
  };
const saveTime = () => {
    const formattedTime = formatTime(time);
    console.log("Time saved:", formattedTime);
    setTimerState("paused");
    setModalOpen(true)
     };
 const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const openModal = () => {
    setModalOpen(true)
   };
 
   const closeModal = () => {
    setModalOpen(false)
    setTimerState("stopped");
    setTime(0);
   };
 
   const handleSaveTask = () => {
     const newTask = {
       title: taskTitle,
       description: taskDescription,
       time: new Date().toLocaleTimeString(),
     };
 
     setTasks((prevTasks) => [...prevTasks, newTask]);
     setTaskTitle("");
     setTaskDescription("");
 
   };
   const handleEdit=()=>{

   }
   const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };
return (
    <div>
    {}
      <h2>Digital Watch</h2>
      <div>{formatTime(time)}</div>

      <button onClick={startTimer} disabled={timerState === "running"}>
        Start
      </button>

      <button onClick={pauseTimer} disabled={timerState !== "running"}>
        Pause
      </button>

      <button onClick={resetTimer}>Reset</button>

      <button onClick={saveTime} disabled={timerState === "stopped"}>
        Save
      </button>

      <div>
      <h2>Tasks Section</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>
              {task.title} - Time Tracked: {task.timeTracked}
            </span>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>

    {modalOpen&&
     <div className="modal">
     <div className="modal-content">
       <h3>Save Task</h3>
       <input
         type="text"
         placeholder="Task Title"
         value={taskTitle}
         onChange={(e) => setTaskTitle(e.target.value)}
       />
       <input
         type="text"
         placeholder="Task Description"
         value={taskDescription}
         onChange={(e) => setTaskDescription(e.target.value)}
       />
       <div>
         <button onClick={handleSaveTask}>Save</button>
         <button onClick={closeModal}>Cancel</button>
       </div>
     </div>
   </div>
    }
    </div>
      
  );
};

export default DigitalWatch;

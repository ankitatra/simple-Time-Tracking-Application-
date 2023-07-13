import React, { useState, useEffect } from "react";

const DigitalWatch = () => {
  const [time, setTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [timerState, setTimerState] = useState("stopped");

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

  return (
    <div>
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
    </div>
  );
};

export default DigitalWatch;

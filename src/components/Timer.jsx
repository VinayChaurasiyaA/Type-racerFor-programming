import React, { useEffect, useState } from "react";

const Timer = ({ startCounting, correctWord }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let id;
    if (startCounting) {
      id = setInterval(() => {
        setTimeElapsed((oldTime) => oldTime + 1);
      }, 1000);
      //   console.log("start from nowhere")
    }
    return () => {
      clearInterval(id);
    };
  }, [startCounting]);
  const minutes = timeElapsed / 60;
  return (
    <div>
      <div>
        <span>Time : {timeElapsed}</span>
      </div>
      <span>Speed : {(correctWord / minutes || 0).toFixed(2)} WPM</span>
    </div>
  );
};

export default Timer;

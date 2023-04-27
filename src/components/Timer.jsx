import React, { useEffect, useState } from "react";

const Timer = ({
  startCounting,
  correctWord,
  setStartCounting,
  setUserInput,
}) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  // const [oldTime, setOldTime] = useState();
  const [isActive, setIsActive] = useState(false);
  const handle = (value, event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(value);
    if (value === timeElapsed) {
      // console.log("done")
      setUserInput("Time up!");
      setStartCounting(false);
    }
  };
  const handleClick = (e) => {
    e.stopPropagation();
    return setIsActive(!isActive);
  };
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
      <div className="time">
        <span>Time : {timeElapsed} sec</span>
      </div>
      <div className="speed">
        <span>Speed : {(correctWord / minutes || 0).toFixed(2)} WPM</span>
      </div>
      <div className="buttons">
        <button onClick={(event) => handle(500, event)} className="btn">
          <span
            onClick={(e) => handleClick(e)}
            style={{ color: isActive ? "red" : "black" }}
          >
            No limit
          </span>
        </button>
        <button onClick={(event) => handle(30, event)} className="btn">
          <span
            onClick={(e) => handleClick(e)}
            style={{ color: isActive ? "red" : "black" }}
          >
            30{" "}
          </span>
        </button>
        <button onClick={(event) => handle(60, event)} className="btn">
          <span
            onClick={(e) => handleClick(e)}
            style={{ color: isActive ? "red" : "black" }}
          >
            60{" "}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Timer;

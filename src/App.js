import React, { useRef, useState } from "react";
import "./App.css";
//https://github.com/gamer-ai/eletypes-frontend/tree/main/src
import sound from "./assets/sound.mp3";
import { person } from "./data";
import Word from "./components/Word";
import Timer from "./components/Timer";

function App() {
  const [userInput, setUserInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [startCounting, setStartCounting] = useState(false);
  const [mode, setMode] = useState("Light");
  const [sound, setSound] = useState("On");

  // todo : take random number of id from 1-Object.keys(person).length and then show that data only

  const len =
    Math.floor(Math.random() * useRef(Object.keys(person).length).current) || 1;

  const cloud = useRef(person[len].split(" "));

  // console.log(len);
  

  const processInput = (value) => {
    if (activeIndex === cloud.current.length) {
      new Audio(sound).play();
      setStartCounting(false);
      return;
    }
    // if(sound === "On") {
    // }
    if (!startCounting) {
      setStartCounting(true);
    }
    if (value.endsWith(" ")) {
      if (activeIndex === cloud.current.length - 1) {
        setStartCounting(false);
        setUserInput("Completed");
        // console.log("voer")
        // return;
      } else {
        setUserInput("");
      }
      // that means user has enter and now wants to check whether it's right or wrong
      setActiveIndex((index) => index + 1);
      // setUserInput("");
      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeIndex] = word === cloud.current[activeIndex];
        return newResult;
      });
    } else {
      setUserInput(value);
    }
  };

  // const toggleSound = () => {
  //   sound === "On" ? setSound("Off") : setSound("On");
  // };
  const toggleMode = () => {
    mode === "Light" ? setMode("Dark") : setMode("Light");
  };
  return (
    <>
      <div className={`${mode === "Light" ? "app" : "dark-app"}`}>
        <h2 className={`${mode === "Light" ? "header" : "dark-header"}`}>
          Typing checker
        </h2>
        {/* <h4>
          Keyboard Sound{" "}
          <span
            style={{ cursor: "pointer", color: "red" }}
            onClick={toggleSound}
          >
            {" "}
            {sound}
          </span>
        </h4> */}
        <div className="switch-box">
          <div>
            <h4 className={`${mode === "Light" ? "modes" : "dark-mode"}`}>
              Mode: {mode === "Light" ? "Normal" : "Developer"}
            </h4>
          </div>
          <div>
            <label class="switch">
              <input type="checkbox" onClick={toggleMode} />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div className="container">
          <div className="word-show">
            <p className="word">
              {cloud.current.map((word, index) => {
                return (
                  <Word
                    className="word-show"
                    key={index}
                    text={word}
                    active={index === activeIndex}
                    correct={correctWordArray[index]}
                  />
                );
              })}
            </p>
          </div>

          <input
            className={`${mode === "input" ? "modes" : "dark-input"}`}
            type="text"
            value={userInput}
            onChange={(e) => processInput(e.target.value)}
          />
          <div>
            <Timer
              setStartCounting={setStartCounting}
              startCounting={startCounting}
              correctWord={correctWordArray.filter(Boolean).length}
              setUserInput={setUserInput}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

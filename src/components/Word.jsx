import React from "react";

const Word = ({ text, active, correct }) => {
  if (correct === true) {
    return <span className="correct">{text} </span>;
  }
  if (correct === false) {
    return <span className="incorrect">{text} </span>;
  }
  return (
    <span style={{ fontWeight: active ? "bold" : "normal" }}>{text} </span>
  );
};

export default Word;

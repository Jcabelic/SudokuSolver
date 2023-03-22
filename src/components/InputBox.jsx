import React from "react";
import "./SudokuSolver.css";

const InputBox = (props) => {
  return (
    <div>
      <div className="input">
        <input
          type="text"
          className="input-box"
          maxLength="1"
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
        />
      </div>
    </div>
  );
};

export default InputBox;

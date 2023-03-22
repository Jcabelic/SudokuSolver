import React from "react";
import InputBox from "./InputBox";
import "./SudokuSolver.css";

const GridBox = (props) => {
  const startIndex = props.startIndex;
  // const endIndex = props.endIndex;
  const inputValues = props.inputValues;
  const setInputValues = props.setInputValues;

  return (
    <div className="box-grid">
      {Array(9)
        .fill()
        .map((_, index) => {
          const inputIndex =
            startIndex + Math.floor(index / 3) * 9 + (index % 3);
          return (
            <InputBox
              key={index}
              value={inputValues[inputIndex]}
              onChange={(newValue) => {
                const newInputValues = [...inputValues];
                newInputValues[inputIndex] = newValue;
                setInputValues(newInputValues);
              }}
            />
          );
        })}
    </div>
  );
};

export default GridBox;

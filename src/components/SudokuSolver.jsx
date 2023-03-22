/* eslint-disable no-unused-vars */
import React from "react";
import GridBox from "./GridBox";
import { useState } from "react";
import Sudoku from "sudoku-js";
import "./SudokuSolver.css";
import logo from "../assets/sudoku-logo.svg";

const SudokuSolver = () => {
  const [inputValues, setInputValues] = useState(Array(81).fill(" "));

  //transform the array to a 9x9 array
  const transformArrayRow = (arr) => {
    const result = Array(9)
      .fill()
      .map(() => Array(9).fill());
    let row = 0,
      col = 0;
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        result[row][col] = item;
      } else {
        result[row][col] = item.toString();
      }
      col++;
      if (col === 9) {
        row++;
        col = 0;
      }
    });
    return result;
  };

  //Initialization of the board to solve
  let initialBoard = transformArrayRow(inputValues);

  // transpose the boardArrayRow into array based in Column
  const transpose = (arr) => arr[0].map((_, i) => arr.map((row) => row[i]));

  //convert the boardArrayRow into array based in SubGrid
  const convertRowsToBoxes = (arr) => {
    const result = [];
    for (let i = 0; i < 9; i++) {
      result.push([]);
    }
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let boxIndex = 3 * Math.floor(i / 3) + Math.floor(j / 3);
        result[boxIndex].push(arr[i][j]);
      }
    }
    return result;
  };

  //check if the board is valid
  const isSudokuValid = () => {
    let boardRow = initialBoard;
    let boardCol = transpose(initialBoard);
    let boardSubGrid = convertRowsToBoxes(initialBoard);
    //
    const isValidArray = (array) => {
      const seen = {};
      for (let i = 0; i < array.length; i++) {
        const num = array[i];
        if (num !== "" && (num < 1 || num > 9 || seen[num])) {
          return false;
        }
        seen[num] = true;
      }
      return true;
    };

    for (let i = 0; i < 9; i++) {
      if (
        !isValidArray(boardRow[i]) ||
        !isValidArray(boardCol[i]) ||
        !isValidArray(boardSubGrid[i])
      ) {
        return false;
      }
    }

    return true;
  };

  //generate a sudoku boards
  const generateSudokuEasy = () => {
    const sampleBoards = [
      [
        ["1", "3", "4", "2", "7", "8", "5", "6", "9"],
        ["2", "5", "8", "1", "6", "9", "3", "4", "7"],
        ["6", "7", "9", "4", "5", "3", "1", "2", "8"],
        ["4", "1", "2", "3", "8", "5", "7", "9", "6"],
        ["3", "6", "5", "7", "9", "2", "4", "8", "1"],
        ["8", "9", "7", "6", "1", "4", "2", "3", "5"],
        ["5", "2", "1", "8", "3", "6", "9", "7", "4"],
        ["7", "4", "6", "9", "2", "1", "8", "5", "3"],
        ["9", "8", "3", "5", "4", "7", "6", "1", "2"],
      ],
      [
        ["5", "3", "6", "1", "2", "4", "7", "8", "9"],
        ["2", "1", "4", "7", "8", "9", "3", "5", "6"],
        ["7", "8", "9", "3", "5", "6", "1", "2", "4"],
        ["4", "5", "1", "2", "3", "7", "6", "9", "8"],
        ["3", "6", "2", "4", "9", "8", "5", "1", "7"],
        ["8", "9", "7", "5", "6", "1", "2", "4", "3"],
        ["1", "2", "8", "6", "4", "3", "9", "7", "5"],
        ["6", "4", "5", "9", "7", "2", "8", "3", "1"],
        ["9", "7", "3", "8", "1", "5", "4", "6", "2"],
      ],
      [
        ["1", "2", "4", "3", "5", "6", "7", "8", "9"],
        ["3", "5", "6", "7", "8", "9", "1", "2", "4"],
        ["7", "8", "9", "1", "2", "4", "3", "6", "5"],
        ["2", "4", "1", "5", "3", "7", "6", "9", "8"],
        ["5", "6", "7", "9", "4", "8", "2", "1", "3"],
        ["8", "9", "3", "2", "6", "1", "5", "4", "7"],
        ["4", "3", "2", "6", "9", "5", "8", "7", "1"],
        ["6", "7", "8", "4", "1", "3", "9", "5", "2"],
        ["9", "1", "5", "8", "7", "2", "4", "3", "6"],
      ],
      [
        ["9", "1", "2", "3", "4", "5", "6", "7", "8"],
        ["3", "4", "5", "6", "7", "8", "1", "2", "9"],
        ["6", "7", "8", "1", "2", "9", "3", "4", "5"],
        ["1", "2", "3", "4", "5", "6", "8", "9", "7"],
        ["4", "5", "6", "8", "9", "7", "2", "1", "3"],
        ["7", "8", "9", "2", "1", "3", "4", "5", "6"],
        ["2", "3", "7", "5", "6", "1", "9", "8", "4"],
        ["5", "6", "1", "9", "8", "4", "7", "3", "2"],
        ["8", "9", "4", "7", "3", "2", "5", "6", "1"],
      ],
      [
        ["6", "1", "2", "3", "4", "5", "7", "8", "9"],
        ["3", "4", "5", "7", "8", "9", "1", "2", "6"],
        ["7", "8", "9", "1", "2", "6", "3", "4", "5"],
        ["1", "2", "3", "4", "5", "7", "6", "9", "8"],
        ["4", "5", "6", "8", "9", "1", "2", "3", "7"],
        ["8", "9", "7", "2", "6", "3", "4", "5", "1"],
        ["2", "3", "1", "5", "7", "8", "9", "6", "4"],
        ["5", "6", "4", "9", "1", "2", "8", "7", "3"],
        ["9", "7", "8", "6", "3", "4", "5", "1", "2"],
      ],
    ];
    let randomBoard = sampleBoards[Math.floor(Math.random() * 5)];

    randomBoard = JSON.parse(JSON.stringify(randomBoard));
    // Remove some values to create empty cells
    let emptyCells = 0;
    while (emptyCells < 40) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (randomBoard[row][col] !== "") {
        randomBoard[row][col] = "";
        emptyCells++;
      }
    }

    setInputValues(randomBoard.flat());
  };
  const generateSudokuHard = () => {
    const sampleBoards = [
      [
        ["1", "3", "4", "2", "7", "8", "5", "6", "9"],
        ["2", "5", "8", "1", "6", "9", "3", "4", "7"],
        ["6", "7", "9", "4", "5", "3", "1", "2", "8"],
        ["4", "1", "2", "3", "8", "5", "7", "9", "6"],
        ["3", "6", "5", "7", "9", "2", "4", "8", "1"],
        ["8", "9", "7", "6", "1", "4", "2", "3", "5"],
        ["5", "2", "1", "8", "3", "6", "9", "7", "4"],
        ["7", "4", "6", "9", "2", "1", "8", "5", "3"],
        ["9", "8", "3", "5", "4", "7", "6", "1", "2"],
      ],
      [
        ["5", "3", "6", "1", "2", "4", "7", "8", "9"],
        ["2", "1", "4", "7", "8", "9", "3", "5", "6"],
        ["7", "8", "9", "3", "5", "6", "1", "2", "4"],
        ["4", "5", "1", "2", "3", "7", "6", "9", "8"],
        ["3", "6", "2", "4", "9", "8", "5", "1", "7"],
        ["8", "9", "7", "5", "6", "1", "2", "4", "3"],
        ["1", "2", "8", "6", "4", "3", "9", "7", "5"],
        ["6", "4", "5", "9", "7", "2", "8", "3", "1"],
        ["9", "7", "3", "8", "1", "5", "4", "6", "2"],
      ],
      [
        ["1", "2", "4", "3", "5", "6", "7", "8", "9"],
        ["3", "5", "6", "7", "8", "9", "1", "2", "4"],
        ["7", "8", "9", "1", "2", "4", "3", "6", "5"],
        ["2", "4", "1", "5", "3", "7", "6", "9", "8"],
        ["5", "6", "7", "9", "4", "8", "2", "1", "3"],
        ["8", "9", "3", "2", "6", "1", "5", "4", "7"],
        ["4", "3", "2", "6", "9", "5", "8", "7", "1"],
        ["6", "7", "8", "4", "1", "3", "9", "5", "2"],
        ["9", "1", "5", "8", "7", "2", "4", "3", "6"],
      ],
      [
        ["9", "1", "2", "3", "4", "5", "6", "7", "8"],
        ["3", "4", "5", "6", "7", "8", "1", "2", "9"],
        ["6", "7", "8", "1", "2", "9", "3", "4", "5"],
        ["1", "2", "3", "4", "5", "6", "8", "9", "7"],
        ["4", "5", "6", "8", "9", "7", "2", "1", "3"],
        ["7", "8", "9", "2", "1", "3", "4", "5", "6"],
        ["2", "3", "7", "5", "6", "1", "9", "8", "4"],
        ["5", "6", "1", "9", "8", "4", "7", "3", "2"],
        ["8", "9", "4", "7", "3", "2", "5", "6", "1"],
      ],
      [
        ["6", "1", "2", "3", "4", "5", "7", "8", "9"],
        ["3", "4", "5", "7", "8", "9", "1", "2", "6"],
        ["7", "8", "9", "1", "2", "6", "3", "4", "5"],
        ["1", "2", "3", "4", "5", "7", "6", "9", "8"],
        ["4", "5", "6", "8", "9", "1", "2", "3", "7"],
        ["8", "9", "7", "2", "6", "3", "4", "5", "1"],
        ["2", "3", "1", "5", "7", "8", "9", "6", "4"],
        ["5", "6", "4", "9", "1", "2", "8", "7", "3"],
        ["9", "7", "8", "6", "3", "4", "5", "1", "2"],
      ],
    ];
    let randomBoard = sampleBoards[Math.floor(Math.random() * 5)];

    randomBoard = JSON.parse(JSON.stringify(randomBoard));
    // Remove some values to create empty cells
    let emptyCells = 0;
    while (emptyCells < 46) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (randomBoard[row][col] !== "") {
        randomBoard[row][col] = "";
        emptyCells++;
      }
    }

    setInputValues(randomBoard.flat());
  };
  const generateSudokuExpert = () => {
    const sampleBoards = [
      [
        ["1", "3", "4", "2", "7", "8", "5", "6", "9"],
        ["2", "5", "8", "1", "6", "9", "3", "4", "7"],
        ["6", "7", "9", "4", "5", "3", "1", "2", "8"],
        ["4", "1", "2", "3", "8", "5", "7", "9", "6"],
        ["3", "6", "5", "7", "9", "2", "4", "8", "1"],
        ["8", "9", "7", "6", "1", "4", "2", "3", "5"],
        ["5", "2", "1", "8", "3", "6", "9", "7", "4"],
        ["7", "4", "6", "9", "2", "1", "8", "5", "3"],
        ["9", "8", "3", "5", "4", "7", "6", "1", "2"],
      ],
      [
        ["5", "3", "6", "1", "2", "4", "7", "8", "9"],
        ["2", "1", "4", "7", "8", "9", "3", "5", "6"],
        ["7", "8", "9", "3", "5", "6", "1", "2", "4"],
        ["4", "5", "1", "2", "3", "7", "6", "9", "8"],
        ["3", "6", "2", "4", "9", "8", "5", "1", "7"],
        ["8", "9", "7", "5", "6", "1", "2", "4", "3"],
        ["1", "2", "8", "6", "4", "3", "9", "7", "5"],
        ["6", "4", "5", "9", "7", "2", "8", "3", "1"],
        ["9", "7", "3", "8", "1", "5", "4", "6", "2"],
      ],
      [
        ["1", "2", "4", "3", "5", "6", "7", "8", "9"],
        ["3", "5", "6", "7", "8", "9", "1", "2", "4"],
        ["7", "8", "9", "1", "2", "4", "3", "6", "5"],
        ["2", "4", "1", "5", "3", "7", "6", "9", "8"],
        ["5", "6", "7", "9", "4", "8", "2", "1", "3"],
        ["8", "9", "3", "2", "6", "1", "5", "4", "7"],
        ["4", "3", "2", "6", "9", "5", "8", "7", "1"],
        ["6", "7", "8", "4", "1", "3", "9", "5", "2"],
        ["9", "1", "5", "8", "7", "2", "4", "3", "6"],
      ],
      [
        ["9", "1", "2", "3", "4", "5", "6", "7", "8"],
        ["3", "4", "5", "6", "7", "8", "1", "2", "9"],
        ["6", "7", "8", "1", "2", "9", "3", "4", "5"],
        ["1", "2", "3", "4", "5", "6", "8", "9", "7"],
        ["4", "5", "6", "8", "9", "7", "2", "1", "3"],
        ["7", "8", "9", "2", "1", "3", "4", "5", "6"],
        ["2", "3", "7", "5", "6", "1", "9", "8", "4"],
        ["5", "6", "1", "9", "8", "4", "7", "3", "2"],
        ["8", "9", "4", "7", "3", "2", "5", "6", "1"],
      ],
      [
        ["6", "1", "2", "3", "4", "5", "7", "8", "9"],
        ["3", "4", "5", "7", "8", "9", "1", "2", "6"],
        ["7", "8", "9", "1", "2", "6", "3", "4", "5"],
        ["1", "2", "3", "4", "5", "7", "6", "9", "8"],
        ["4", "5", "6", "8", "9", "1", "2", "3", "7"],
        ["8", "9", "7", "2", "6", "3", "4", "5", "1"],
        ["2", "3", "1", "5", "7", "8", "9", "6", "4"],
        ["5", "6", "4", "9", "1", "2", "8", "7", "3"],
        ["9", "7", "8", "6", "3", "4", "5", "1", "2"],
      ],
    ];
    let randomBoard = sampleBoards[Math.floor(Math.random() * 5)];

    randomBoard = JSON.parse(JSON.stringify(randomBoard));
    // Remove some values to create empty cells
    let emptyCells = 0;
    while (emptyCells < 56) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (randomBoard[row][col] !== "") {
        randomBoard[row][col] = "";
        emptyCells++;
      }
    }

    setInputValues(randomBoard.flat());
  };
  /* const generateSudoku = () => {
    const grid = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => "")
    );

    const isValid = (grid, row, col, value) => {
      for (let i = 0; i < 9; i++) {
        if (grid[row][i] === value || grid[i][col] === value) {
          return false;
        }
      }

      const subgridRow = Math.floor(row / 3) * 3;
      const subgridCol = Math.floor(col / 3) * 3;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[subgridRow + i][subgridCol + j] === value) {
            return false;
          }
        }
      }

      return true;
    };

    const fillGrid = (grid, row = 0, col = 0) => {
      if (col === 9) {
        row++;
        col = 0;
      }

      if (row === 9) {
        return true;
      }

      const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      for (let i = 0; i < values.length; i++) {
        const value = values[i];

        if (isValid(grid, row, col, value)) {
          grid[row][col] = value;

          if (fillGrid(grid, row, col + 1)) {
            return true;
          }

          grid[row][col] = "";
        }
      }

      return false;
    };

    fillGrid(grid);
    console.log(grid);
    const updatedGrid = JSON.parse(JSON.stringify(grid));
    // Remove some values to create empty cells
    let emptyCells = 0;
    while (emptyCells < 56) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (updatedGrid[row][col] !== "") {
        updatedGrid[row][col] = "";
        emptyCells++;
      }
    }

    //undefineds to empty strings
    const array = updatedGrid.map((cell) =>
      cell.map((value) => (value === undefined ? "" : value.toString()))
    );

    // console.log(array);
    setInputValues(array.flat());
    return array.flat();
  }; */

  //reset the board
  const resetArray = () => {
    setInputValues(Array(81).fill(""));
  };

  //create an Array for posible solution for a given cell
  const possibilities = (board, row, col) => {
    //check if a given value is a valid solution for a given cell
    const isValidSolution = (initialBoard, row, col, value) => {
      for (let i = 0; i < 9; i++) {
        if (
          initialBoard[row][i] === value.toString() ||
          initialBoard[i][col] === value.toString() ||
          initialBoard[3 * Math.floor(row / 3) + Math.floor(i / 3)][
            3 * Math.floor(col / 3) + (i % 3)
          ] === value.toString()
        )
          return false;
      }
      return true;
    };
    let listOfPossibilities = [];
    for (let i = 1; i <= 9; i++) {
      if (isValidSolution(board, row, col, i)) {
        listOfPossibilities.push(i);
      }
    }
    return listOfPossibilities;
  };

  //check if the board array has single item array on it
  const hasSingleItem = (arr) => {
    for (let item of arr) {
      if (Array.isArray(item) && item.length === 1) {
        return true;
      }
    }
    return false;
  };

  //Apply Omission Algorithm
  const applyOmissionToBoard = (board) => {
    //filter possibilities using Omission Algorithm
    const omissionAlgo = (possibilities) => {
      const filteredPossibilities = possibilities.map((item, index) => {
        if (typeof item === "string") {
          return item; // retain the string value
        } else {
          const values = item;
          const candidates = []; // indices where values appear
          for (let i = 0; i < values.length; i++) {
            const val = values[i];
            const foundIndex = possibilities.findIndex(
              (otherValues, otherIndex) =>
                Array.isArray(otherValues) &&
                otherIndex !== index &&
                otherValues.includes(val)
            );
            if (foundIndex === -1) {
              candidates.push(i); // this value appears only in this item
            }
          }
          if (candidates.length === 1) {
            const uniqueIndex = candidates[0];
            const uniqueValue = values[uniqueIndex];
            return [uniqueValue]; // omit the other values
          } else {
            return values; // retain the values as is
          }
        }
      });
      return filteredPossibilities;
    };
    for (let i = 0; i < 9; i++) {
      board[i] = omissionAlgo(board[i]);
    }
    return board;
  };

  //Solve Sudoku
  const solveSudoku = (board) => {
    //create an array of possibilities per cell
    let listOfPossibilitiesPerCell = [];

    //loop through the board
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === "") {
          //then check if the cell is empty
          //if it is empty then find the possibilities
          const validNums = possibilities(board, i, j);
          listOfPossibilitiesPerCell.push(validNums);
        } //if it is not empty then push the value to the array
        else {
          listOfPossibilitiesPerCell.push(board[i][j]);
        }
      }
    }
    let possibilitiesBoard = transformArrayRow(listOfPossibilitiesPerCell);
    //   console.log(transformArrayRow(possibilitiesBoard));
    //filter possibilities using Omission Algorithm in a row
    possibilitiesBoard = applyOmissionToBoard(possibilitiesBoard);
    //   console.log(possibilitiesBoard);
    //transpose the possibilitiesBoard into array based in Column
    possibilitiesBoard = transpose(possibilitiesBoard);
    //   console.log(possibilitiesBoard);
    //filter possibilities using Omission Algorithm in a column
    possibilitiesBoard = applyOmissionToBoard(possibilitiesBoard);
    //   console.log(possibilitiesBoard);
    //transpose the possibilitiesBoard back to boardArray based in Row
    possibilitiesBoard = transpose(possibilitiesBoard);
    //create a copy of the board but converted into 1D array
    const boardArray = JSON.parse(JSON.stringify(board)).flat();
    //iniatialize the
    listOfPossibilitiesPerCell = possibilitiesBoard.flat();
    //loop through the listOfPossibilitiesPerCell
    for (let i = 0; i < 81; i++) {
      //check if the cell has only one possibility
      if (listOfPossibilitiesPerCell[i].length === 1) {
        //if it has only one possibility then replace the value in the boardArray
        boardArray[i] = listOfPossibilitiesPerCell[i][0];
      }
    }

    //convert the boardArray back to 2D array
    const updatedBoard = transformArrayRow(boardArray);
    //   console.log(updatedBoard);
    if (hasSingleItem(listOfPossibilitiesPerCell)) {
      return solveSudoku(updatedBoard);
    } else {
      //use library to solve the sudoku if omission algo fails to solve the puzzle completely
      const solution = JSON.parse(JSON.stringify(updatedBoard));
      // console.log(solution);
      return Sudoku.solve(solution);
    }
  };

  //check if the board has empty cells
  const boardHasEmptyCell = (initialBoard) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (initialBoard[i][j] === "") {
          return true;
        }
      }
    }

    return false;
  };

  // find what cell is the easiest to fill or have the least possible solution
  // returns the row and column index of the cell
  const findMaxEmptyCell = (board) => {
    let maxSum = 0;
    let maxCell = [-1, -1];

    // Helper function to get the values in a given row
    const getRowValues = (rowIndex) => {
      return board[rowIndex].filter((val) => val !== "");
    };

    // Helper function to get the values in a given column
    const getColValues = (colIndex) => {
      return board.map((row) => row[colIndex]).filter((val) => val !== "");
    };

    // Helper function to get the values in a given box
    const getBoxValues = (rowIndex, colIndex) => {
      const boxStartRow = Math.floor(rowIndex / 3) * 3;
      const boxStartCol = Math.floor(colIndex / 3) * 3;
      const boxValues = [];

      for (let i = boxStartRow; i < boxStartRow + 3; i++) {
        for (let j = boxStartCol; j < boxStartCol + 3; j++) {
          if (board[i][j] !== "") {
            boxValues.push(board[i][j]);
          }
        }
      }

      return boxValues;
    };

    // Loop through each cell in the board
    board.forEach((row, rowIndex) => {
      row.forEach((val, colIndex) => {
        // If the cell is empty, calculate the sum of the lengths of its rowValues, colValues, and boxValues
        if (val === "") {
          const rowValues = getRowValues(rowIndex);
          const colValues = getColValues(colIndex);
          const boxValues = getBoxValues(rowIndex, colIndex);
          const sum = rowValues.length + colValues.length + boxValues.length;

          // If the sum is greater than the current maxSum, update maxSum and maxCell
          if (sum > maxSum) {
            maxSum = sum;
            maxCell = [rowIndex, colIndex];
          }
        }
      });
    });

    return maxCell;
  };

  //solve the whole Sudoku Board
  const solveAll = () => {
    if (boardHasEmptyCell(initialBoard)) {
      if (!isSudokuValid()) return alert("Invalid Sudoku Board");
      else {
        const solveAll = solveSudoku(initialBoard);
        // console.log(solveAll);
        setInputValues(solveAll.flat());
      }
    } else {
      alert("Sudoku Board is already solved");
    }
  };

  //solve the Sudoku Board by step
  const solveSudokuByStep = () => {
    //check if sudoku board is not solved
    if (boardHasEmptyCell(initialBoard)) {
      //check if sudoku board is valid
      if (isSudokuValid()) {
        //solve for solution
        const solution = solveSudoku(initialBoard);
        //find what cell is the easiest to solve
        const [row, col] = findMaxEmptyCell(initialBoard);
        //log the row and col of the cell and the solution
        /* For Testing Purposes
        const rowVal = () => {
          let rowVal = row;
          switch (rowVal) {
            case 0:
              return "1st row";
            case 1:
              return "2nd row";
            case 2:
              return "3rd row";
            case 3:
              return "4th row";
            case 4:
              return "5th row";
            case 5:
              return "6th row";
            case 6:
              return "7th row";
            case 7:
              return "8th row";
            case 8:
              return "9th row";
            default:
              return "unknown row";
          }
        };
        const colVal = () => {
          let colVal = col;
          switch (colVal) {
            case 0:
              return "1st column";
            case 1:
              return "2nd column";
            case 2:
              return "3rd column";
            case 3:
              return "4th column";
            case 4:
              return "5th column";
            case 5:
              return "6th column";
            case 6:
              return "7th column";
            case 7:
              return "8th column";
            case 8:
              return "9th column";
            default:
              return "unknown column";
          }
        };
        console.log(
          `The solution for cell at [${rowVal()},${colVal()}] is ${
            solution[row][col]
          }`
        );
      */

        let updatedBoard = JSON.parse(JSON.stringify(initialBoard));
        updatedBoard[row][col] = solution[row][col].toString();
        setInputValues(updatedBoard.flat());
      } else {
        return alert("Invalid Sudoku Board");
      }
    } else return alert("Sudoku is already solved");
  };

  //log puzzle as array of numbers for debugging purposes
  const logPuzzle = () => {
    // setInputValues(initialBoard);
    console.log(initialBoard);
  };

  return (
    <div className="container">
      <div className="header">
        <div>
          <img src={logo} className="logo" alt="Logo"></img>
        </div>
        <div>
          <h1 className="App-Title">SOLVER</h1>
        </div>
      </div>
      <div className="instruction">
        <p>Instruction: </p>
        <p>Fill-in with the appropriate numbers.</p>
      </div>
      <div className="sudoku-grid">
        {Array(9)
          .fill()
          .map((_, index) => {
            const startIndex = Math.floor(index / 3) * 27 + (index % 3) * 3;
            const endIndex = startIndex + 20;
            return (
              <GridBox
                key={index}
                startIndex={startIndex}
                endIndex={endIndex}
                inputValues={inputValues}
                setInputValues={setInputValues}
              />
            );
          })}
      </div>
      <div className="buttons">
        {/* UI Buttons for testing */}
        {/*         <div className="set-val1-btn">
          <button
            id="forTesting"
            className="button"
            onClick={setValuesForTesting}
          >
            Set Initial Values
          </button>
          <button
            id="forTesting"
            className="set-val2-btn"
            onClick={setValuesForTesting2}
          >
            Set Initial Values 2
          </button>
          <button
            id="forTesting"
            className="set-val3-btn"
            onClick={setValuesForTesting3}
          >
            Set Initial Values 3
          </button>
        </div> */}

        <div className="solving-btn">
          <button
            id="solve"
            className="button solve"
            onClick={solveSudokuByStep}
          >
            SOLVE STEP
          </button>
          <button id="solve" className="button solve" onClick={solveAll}>
            SOLVE ALL
          </button>
        </div>
        <h3 className="generate-puzzle-title">Generate Random Puzzle</h3>
        <div className="generate-puzzle">
          {" "}
          <div className="generate-puzzle-btn">
            <button
              id="forTesting"
              className="button-generate"
              onClick={generateSudokuEasy}
            >
              Easy
            </button>
          </div>
          <div className="generate-puzzle-btn">
            <button
              id="forTesting"
              className="button-generate"
              onClick={generateSudokuHard}
            >
              Hard
            </button>
          </div>
          <div className="generate-puzzle-btn">
            <button
              id="forTesting"
              className="button-generate"
              onClick={generateSudokuExpert}
            >
              Expert
            </button>
          </div>
        </div>

        <div className="reset">
          <button id="reset" className="button reset-btn" onClick={resetArray}>
            Reset
          </button>
        </div>
        {/* Below are UI Buttons For Testing only */}
        {/* <div>
          <button id="isValid" className="button" onClick={isSudokuValid}>
            Check Puzzle Validity
          </button>
        </div> */}

        {/* <div>
          <button id="calc" className="button" onClick={calculateEmptyCells}>
            Log empty cells
          </button>
        </div> */}
        {/* <div>
          <button id="log" className="button" onClick={logPuzzle}>
            Log Puzzle
          </button>
        </div> */}
      </div>
      <div className="footer">
        <p>2023 © Jerson Cabelic</p>
        <p>All Rights Reserved</p>
      </div>
    </div>
  );
};

export default SudokuSolver;

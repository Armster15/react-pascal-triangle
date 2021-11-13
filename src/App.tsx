import React, { useEffect } from "react";
import { useList } from "react-use";

const addRow = (pascalsTriangle: number[][]) => {
  let lastRow = pascalsTriangle[pascalsTriangle.length - 1]; // 1, 3, 3, 1
  let newRow: number[] = [];

  lastRow.forEach((num, index) => {
    let nextNumber: number | undefined = lastRow[index + 1];
    if (nextNumber !== undefined) {
      newRow.push(num + lastRow[index + 1]);
    }
  });

  newRow = [1, ...newRow, 1];
  return [...pascalsTriangle, newRow];
};

const App = () => {
  const [pascalsTriangle, modifyPascalsTriangle] = useList([[1], [1, 1]]);

  useEffect(() => {
    let newTriangle = [...pascalsTriangle];

    // "in range" hack
    Array(5)
      .fill(undefined)
      .forEach(() => {
        newTriangle = addRow(newTriangle);
      });
    modifyPascalsTriangle.set(newTriangle);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <div className="flex space-x-3 items-start">
        {/* Pascal Triangle Box */}
        <div className="flex-1 box text-center overflow-x-auto">
          {pascalsTriangle.map((row, index) => (
            <div className="space-x-3" key={index}>
              {row.map((num, index) => (
                <span key={index}>{num}</span>
              ))}
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="box">
          <h1 className="font-bold text-2xl">Pascal's Triangle</h1>
          <h3 className="text-gray-500">Armaan Aggarwal</h3>

          {/* Add/Remove row buttons */}
          <div className="flex justify-center space-x-2 mt-3">
            <button
              className="btn btn-green"
              onClick={() => modifyPascalsTriangle.set(addRow(pascalsTriangle))}
            >
              Add Row
            </button>
            <button
              className="btn btn-red"
              onClick={() => {
                if (pascalsTriangle.length <= 2) {
                  alert("Cannot remove further");
                } else modifyPascalsTriangle.removeAt(-1);
              }}
            >
              Remove Row
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

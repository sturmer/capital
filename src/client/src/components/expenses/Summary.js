import React from "react";

const Summary = (props) => {
  return (
    <>
      <h2>Summary</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.total}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export { Summary };

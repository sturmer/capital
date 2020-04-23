import React from "react";

const Summary = (props) => {
  return (
    <>
      <h2>Summary</h2>
      <table className="table table-striped table-bordered">
        <tbody>
          {Object.keys(props.totalsByCategory).map((cat) => (
            <tr key={cat}>
              <th>{cat}</th>
              <td>{props.totalsByCategory[cat]}</td>
            </tr>
          ))}
          <tr>
            <th>Total</th>
            <td>{props.total}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export { Summary };

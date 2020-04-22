import React from "react";

const Summary = (props) => {
  return (
    <>
      <h2>Summary</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.total}</td>
            {Object.keys(props.totalByCategory).map((k) => (
              <td key={k}>
                {k}: {props.totalByCategory[k]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export { Summary };

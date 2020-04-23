import React from "react";

const Summary = (props) => {
  console.log({ props });

  return (
    <>
      <h2>Summary</h2>
      <h3>By Category</h3>
      <table className="table table-striped table-bordered">
        <tbody>
          {props.totalsByCategory &&
            Object.keys(props.totalsByCategory).map((cat) => (
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

      <h3>By Month</h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {Object.keys(props.totalsByMonth).map((m) => (
              <th key={m}>{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {props.totalsByMonth &&
              Object.keys(props.totalsByMonth).map((m) => (
                <td key={m}>{props.totalsByMonth[m]}</td>
              ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export { Summary };

import React from "react";

const Summary = (props) => {
  console.log({
    totalsByCategory: props.totalsByCategory,
    type: typeof props.totalsByCategory,
  });
  if (props.totalsByCategory)
    Object.keys(props.totalsByCategory).forEach((cat) => {
      console.log(`<th>${cat}</th>`);
    });

  return (
    <>
      <h2>Summary</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Total</th>
            {/* {Object.keys(props.totalsByCategory).forEach((cat) => (
              <th>{cat}</th>
            ))} */}
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

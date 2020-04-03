import React from "react";

export function CategoryPanel(props) {
    return (
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {props.categories.map(c => (
            <Category key={c.name} name={c.name} totalCost={c.cost ?? " - "} />
          ))}
        </tbody>
      </table>
    );
  }
  
  function Category(props) {
    return (
      <tr>
        <td>{props.name}</td>
        <td>{props.totalCost}</td>
      </tr>
    );
  }
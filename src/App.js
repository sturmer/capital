import React from "react";
import "./App.css";

const costs = [
  { name: "utilities", cost: 13.9 },
  { name: "housing", cost: 21.4 },
  { name: "foodDelivery", cost: 5.6 }
];

function createCategory() {
  // TODO Dialog with name; then add row to table CategoryPanel
}

function App() {
  // TODO get categories from DB table
  return (
    <>
      <CategoryPanel />
      <button onClick={createCategory}>New</button>
    </>
  );
}

function CategoryPanel() {
  return (
    <div className="ExpenseCategory">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {costs.map(c => (
            <Category name={c.name} totalCost={c.cost} />
          ))}
        </tbody>
      </table>
    </div>
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

export default App;

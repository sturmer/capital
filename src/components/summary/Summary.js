import React, { useEffect, useReducer } from "react";

import { actionTypes } from "./actionTypes";
import { reducer } from "./reducer";

const initialState = {
  expenses: [],
  isFetching: false,
  hasError: false,
  total: 0,
  totalsByCategory: {},
  totalsByMonth: {},
};

// TODO Rename to SummaryPanel
const Summary = (props) => {
  console.log({ props });

  const [state, dispatch] = useReducer(reducer, initialState);

  // Get all expenses to display. Write auth data to state.
  // TODO This is repeated code from ExpensePanel
  useEffect(() => {
    dispatch({ type: actionTypes.fetchExpenses });

    fetch(`/expenses/${props.authUser}`, {
      headers: { Authorization: `Bearer ${props.authToken}` },
    })
      // TODO Remove this res.json/resJson absurdity
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((resJson) => {
        console.log({ resJson });
        dispatch({
          type: actionTypes.fetchExpensesSuccess,
          payload: resJson,
        });
      })

      .catch((error) => {
        console.log(error);
        dispatch({ type: actionTypes.fetchExpensesFail });
      });
  }, [props.authUser, props.authToken]);

  // Update Totals.
  useEffect(() => {
    fetch(`/expenses/${props.authUser}/total`, {
      headers: {
        Authorization: `Bearer ${props.authToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((resJson) => {
        console.log({ totals: resJson });
        dispatch({ type: actionTypes.updateTotal, payload: resJson });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: actionTypes.fetchExpensesFail }); // TODO Anything that fails -- Just use one "failed request on server" action
      });
  }, [state.expenses, props.authUser, props.authToken]);

  return (
    <>
      <h2>Summary</h2>
      <h3>By Category</h3>
      <table className="table table-striped table-bordered">
        <tbody>
          {state.totalsByCategory &&
            Object.keys(state.totalsByCategory).map((cat) => (
              <tr key={cat}>
                <th>{cat}</th>
                <td>{state.totalsByCategory[cat]}</td>
              </tr>
            ))}
          <tr>
            <th>Total</th>
            <td>{state.total}</td>
          </tr>
        </tbody>
      </table>

      <h3>By Month</h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {Object.keys(state.totalsByMonth).map((m) => (
              <th key={m}>{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {state.totalsByMonth &&
              Object.keys(state.totalsByMonth).map((m) => (
                <td key={m}>{state.totalsByMonth[m]}</td>
              ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export { Summary };

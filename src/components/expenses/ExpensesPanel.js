import React, { useState, useEffect, useReducer } from "react";

import { NewExpenseLineForm } from "./NewExpenseLineForm";
import { Summary } from "./Summary";
import { reducer } from "./reducer";
import { actionTypes } from "./actionTypes";
import { setAuthAction } from "./actions";

const initialState = {
  expenses: [],
  isFetching: false,
  hasError: false,
  authToken: null,
  authUser: null,
  expenseToAdd: null,
  idToDelete: null,
  total: 0,
  totalsByCategory: {},
};

// TODO Create a separate Revenues panel with the incoming money!
// TODO Click on list item to edit it!
const ExpensesPanel = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showForm, setShowForm] = useState(false);

  //
  useEffect(() => {
    dispatch(setAuthAction(props.authUser, props.authToken));

    dispatch({ type: actionTypes.fetchExpenses });

    fetch(`/expenses/${props.authUser}`, {
      headers: { Authorization: `Bearer ${props.authToken}` },
    })
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

  useEffect(() => {
    if (!state.expenseToAdd) {
      return;
    }
    fetch("/expenses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${state.authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: state.authUser,
        expense: state.expenseToAdd,
      }),
    })
      .then((res) => {
        console.log({ res });
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.error);
        }
      })
      .then((resJson) => {
        console.log("...expense saved", { resJson });
        const persistedExpense = {
          id: resJson.expenseId,
          ...state.expenseToAdd,
        };

        // TODO Remove this whole .then? (also in delete category)

        dispatch({
          type: actionTypes.savingSuccess,
          payload: persistedExpense,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: actionTypes.savingFailed });
      });
  }, [state.authUser, state.authToken, state.expenseToAdd]);

  useEffect(() => {
    if (!state.idToDelete) {
      return;
    }

    const id = state.idToDelete;
    state.idToDelete = null;

    fetch(`/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${state.authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(`...deleted ${id} [${res}]`);
      })
      .catch((err) => {
        console.error(`...delete failed for ${id}: ${err}`);
      });
  }, [state.authToken, state.idToDelete]);

  // Update Totals
  useEffect(() => {
    fetch(`/expenses/${state.authUser}/total`, {
      headers: {
        Authorization: `Bearer ${state.authToken}`,
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
        // console.log({ resJson });
        dispatch({ type: actionTypes.updateTotal, payload: resJson });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: actionTypes.fetchExpensesFail }); // TODO Anything that fails -- Just use one "failed request on server" action
      });
  }, [state.expenses, state.authUser, state.authToken]);

  const deleteExpense = (id) => {
    dispatch({ type: actionTypes.deleteExpense, payload: id });
  };

  return (
    <>
      {state.isFetching ? (
        <div className="card">
          <div className="card-body">
            <p className="card-text">LOADING...</p>
          </div>
        </div>
      ) : state.expenseToAdd ? (
        <div className="card">
          <div className="card-body">
            <p className="card-text">SAVING...</p>
          </div>
        </div>
      ) : state.hasError ? (
        <div className="card">
          <div className="card-body">
            <p className="card-text">AN ERROR HAS OCCURRED</p>
          </div>
        </div>
      ) : (
        <>
          <h2>Expenses</h2>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Category</th>
                <th scope="col">To/From</th>
                <th scope="col">Description</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {state.expenses.length > 0 &&
                state.expenses.map((e) => (
                  <tr key={e.id}>
                    <td>{e.date}</td>
                    <td>{e.amount}</td>
                    <td>{e.category}</td>
                    <td>{e.toFrom}</td>
                    <td>{e.description}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => deleteExpense(e.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

              {/* TODO Add cancel button (and/or use Esc to cancel) */}
            </tbody>
          </table>
          {showForm && (
            <NewExpenseLineForm
              handleVisibility={setShowForm}
              dispatch={dispatch}
              actionType={actionTypes.addExpense}
            />
          )}

          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            New Expense
          </button>

          <Summary
            total={state.total}
            totalsByCategory={state.totalsByCategory}
          />
        </>
      )}
    </>
  );
};

export { ExpensesPanel };

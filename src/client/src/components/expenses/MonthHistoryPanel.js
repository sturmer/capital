import React, { useState, useEffect, useReducer } from "react";
import { Card, CardText, Container, Button, Row } from "reactstrap";

import { NewExpenseLineForm } from "./NewExpenseLineForm";
import { ExpenseDetail } from "./ExpenseDetail";

const actionTypes = {
  fetchExpenses: "FETCH_EXPENSES_REQUEST",
  fetchExpensesSuccess: "FETCH_EXPENSES_SUCCESS",
  fetchExpensesFail: "FETCH_EXPENSES_FAILURE",
  deleteExpense: "DELETE_EXPENSE",
  addExpense: "ADD_EXPENSE",
  SET_AUTH: "SET_AUTH",
};

const initialState = {
  expenses: [],
  isFetching: false,
  isSaving: false,
  hasError: false,
  authToken: null,
  authUser: null,
};

const reducer = (state, action) => {
  let newState = null;
  switch (action.type) {
    case actionTypes.SET_AUTH:
      return {
        ...state,
        authUser: action.payload.user,
        authToken: action.payload.token,
      };
    case actionTypes.fetchExpenses:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case actionTypes.fetchExpensesSuccess:
      console.log({ payload: action.payload });
      newState = {
        ...state,
        isFetching: false,
        expenses: action.payload,
      };
      return newState;
    case actionTypes.fetchExpensesFail:
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    case actionTypes.deleteExpense:
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload),
      };

    case actionTypes.addExpense:
      console.log("adding expense...");

      // This fetch needs fixing.
      fetch(`/expenses/${state.authUser}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expense: action.payload }),
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
          const newExpense = { id: resJson.expenseId, ...action.payload };
          newState = {
            ...state,
            expenses: [...state.expenses, newExpense],
          };
          // TODO Remove this whole .then? (also in delete category)
          return newState;
        })
        .catch((err) => {
          console.error(err);
          return state;
        });

      // FIXME We need to wait for the server to finish before saving the state.
      return state;

    default:
      return state;
  }
};

// TODO Click on list item to edit it!
const MonthHistoryPanel = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_AUTH,
      payload: { user: props.authUser, token: props.authToken },
    });

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

  const deleteExpense = (id) => {
    // TODO Write the changed expenses to file
    dispatch({ type: actionTypes.deleteExpense, payload: id });
  };

  return (
    <>
      {state.isFetching ? (
        <Card>
          <CardText>LOADING...</CardText>
        </Card>
      ) : state.hasError ? (
        <Card>
          <CardText>AN ERROR HAS OCCURRED</CardText>
        </Card>
      ) : (
        <Container fluid="sm">
          <h2>Expenses</h2>
          {state.expenses.length > 0 &&
            state.expenses.map((e) => (
              <Row key={e.id}>
                <ExpenseDetail
                  date={e.date}
                  amount={e.amount}
                  category={e.category}
                  toFrom={e.toFrom}
                  description={e.description}
                />
                <Button color="warning" onClick={() => deleteExpense(e.id)}>
                  Delete
                </Button>
              </Row>
            ))}

          <Row>
            {showForm && (
              <NewExpenseLineForm
                handleVisibility={setShowForm}
                dispatch={dispatch}
                actionType={actionTypes.addExpense}
              />
            )}
          </Row>

          <Row>
            <Button color="primary" onClick={() => setShowForm(!showForm)}>
              New Expense
            </Button>
            {/* TODO Add cancel button (and/or use Esc to cancel) */}
          </Row>
        </Container>
      )}
    </>
  );
};

export { MonthHistoryPanel };

import React, { useState, useEffect, useContext, useReducer } from "react";
import { Card, CardText, Container, Button, Row } from "reactstrap";

// import { NewExpenseLineForm } from "./NewExpenseLineForm";
import { ExpenseDetail } from "./ExpenseDetail";
import { AuthContext } from "./App";

// const gConstants = require("./constants");

const actionTypes = {
  fetchExpenses: "FETCH_EXPENSES_REQUEST",
  fetchExpensesSuccess: "FETCH_EXPENSES_SUCCESS",
  fetchExpensesFail: "FETCH_EXPENSES_FAILURE",
  deleteExpense: "DELETE_EXPENSE",
};

const initialState = {
  expenses: [],
  isFetching: false,
  hasError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    // TODO Use the equivalent of an enum instead of strings for types (actionType.fetchCategoriesReq)
    case actionTypes.fetchExpenses:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case actionTypes.fetchExpensesSuccess:
      return {
        ...state,
        isFetching: false,
        expenses: action.payload,
      };
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
    default:
      return state;
  }
};

// TODO Click on list item to edit it!
const MonthHistoryPanel = () => {
  const { state: authState } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch({ type: actionTypes.fetchExpenses });

    fetch("/expenses", {
      headers: { Authorization: `Bearer ${authState.token}` },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((resJson) => {
        console.log(resJson);
        dispatch({
          type: actionTypes.fetchExpensesSuccess,
          payload: resJson,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: actionTypes.fetchExpensesFail });
      });
  }, [authState.token]);

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

          {/* FIXME */}
          {/* <Row>
            {showForm && (
              <NewExpenseLineForm
                handleVisibility={setShowForm}
                handleExpenses={setExpenses}
                currentExpenses={expenses}
                currency={gConstants.currency}
              />
            )}
          </Row> */}
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

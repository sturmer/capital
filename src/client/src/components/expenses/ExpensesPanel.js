import React, { useState, useEffect, useReducer } from "react";
// TODO Do without reactstrap
import { Card, Col, CardText, Container, Button, Row } from "reactstrap";

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
};

// TODO Create a separate Revenues panel with the incoming money!
// TODO Click on list item to edit it!
const ExpensesPanel = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showForm, setShowForm] = useState(false);

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
        dispatch({ type: actionTypes.updateTotal, payload: resJson.total });
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
        <Card>
          <CardText>LOADING...</CardText>
        </Card>
      ) : state.expenseToAdd ? (
        <Card>
          <CardText>SAVING...</CardText>
        </Card>
      ) : state.hasError ? (
        <Card>
          <CardText>AN ERROR HAS OCCURRED</CardText>
        </Card>
      ) : (
        <Container fluid="sm">
          <h2>Expenses</h2>
          <Row>
            <Col>Date</Col>
            <Col>Amount</Col>
            <Col>Category</Col>
            <Col>To/From</Col>
            <Col>Description</Col>
            <Col></Col>
          </Row>
          {state.expenses.length > 0 &&
            state.expenses.map((e) => (
              <Row key={e.id}>
                <Col>{e.date}</Col>
                <Col>{e.amount}</Col>
                <Col>{e.category}</Col>
                <Col>{e.toFrom}</Col>
                <Col>{e.description}</Col>
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
          <Summary total={state.total} />
        </Container>
      )}
    </>
  );
};

export { ExpensesPanel };

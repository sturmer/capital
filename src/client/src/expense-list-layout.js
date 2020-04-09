import React from "react";
import { Container, Button, Row } from "reactstrap";

// import { NewExpenseLineForm } from "./NewExpenseLineForm";
import { ExpenseDetail } from "./ExpenseDetail";

// import { store } from "./store";

// TODO Click on list item to edit it!
const ExpenseListLayout = (props) => {
  //   const [showForm, setShowForm] = useState(false);

  const deleteExpense = (id) => {
    // TODO Write the changed expenses to file
    // store.dispatch(deleteExpense(id));
  };

  return (
    <>
      <Container fluid="sm">
        <h2>Expenses</h2>
        {props.expenses.length > 0 &&
          props.expenses.map((e) => (
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
                dispatch={dispatch}
                actionType={actionTypes.addExpense}
              />
            )}
          </Row> */}
        {/* <Row>
          <Button color="primary" onClick={() => setShowForm(!showForm)}>
            New Expense
          </Button>
        </Row> */}
        {/* TODO Add cancel button (and/or use Esc to cancel) */}
      </Container>
    </>
  );
};

export { ExpenseListLayout };

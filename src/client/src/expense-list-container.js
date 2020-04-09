import { connect } from "react-redux";
import { ExpenseListLayout } from "./expense-list-layout";

const mapStateToProps = (store) => {
  return {
    ...store.expensesState,
  };
};

const ExpenseListContainer = connect(mapStateToProps)(ExpenseListLayout);
export { ExpenseListContainer };

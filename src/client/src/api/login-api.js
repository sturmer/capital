import { store } from "../store";

import { login } from "../actions/login-actions";

const getExpenses = () => {
  fetch("/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.email,
      password: data.password,
    }),
  })
    .then((res) => {
      console.log({ res });
      if (res.ok) {
        console.log("Result OK");
        return res.json();
      }
      console.log("Uh-oh");
      throw res;
    })
    .then((resJson) => {
      console.log({ resJson });
      store.dispatch(login(resJson));
    });
  // FIXME how do we set data on catch?
  // .catch((error) => {
  //   setData({
  //     ...data,
  //     isSubmitting: false,
  //     errorMessage: error.message || error.statusText,
  //   });
  // });
};

export { getExpenses };

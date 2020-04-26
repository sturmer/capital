import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

// TODO
test("renders Log In form", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/log in/i);
  expect(linkElement).toBeInTheDocument();
});

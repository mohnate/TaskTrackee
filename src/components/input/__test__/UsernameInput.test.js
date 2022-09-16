import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import UsernameInput from "../UsernameInput";

test("Username Input with no input error", () => {
  const v = {
    id: "test-username",
    label: "Username Label",
    footer: "Username Footer",
    state: false,
  };

  render(
    <UsernameInput
      id={v.id}
      label={v.label}
      footer={v.footer}
      state={v.state}
    />
  );

  const usernameLabel = screen.getByLabelText(/Username Label/i);
  expect(usernameLabel).toBeInTheDocument();

  const usernamePlaceholder = screen.getByPlaceholderText(/Enter username/i);
  expect(usernamePlaceholder).toBeInTheDocument();

  const usernameFooter = screen.getByText(/Username Footer/i);
  expect(usernameFooter).toBeInTheDocument();
});

test("Username Input with no input error with default label and no footer", () => {
  const v = {
    id: "test-Username",
    state: false,
    ref: { current: { value: null } },
  };

  render(<UsernameInput ref={v.ref} id={v.id} state={v.state} />);

  const usernameLabel = screen.getByLabelText(/Username/i);
  expect(usernameLabel).toBeInTheDocument();

  const inputElement = screen.getByTestId(/usernameInput/i);
  fireEvent.change(inputElement, { target: { value: "123" } });
  expect(inputElement.value).toBe("123");

  const checkedIcon = screen.getByTestId(/DoubleCheckSvg/i);
  expect(checkedIcon).toBeInTheDocument();
});

test("Username Input with input error with default label and no footer", () => {
  const v = {
    id: "test-Username",
    state: "Username have to contain at least 3 character",
    footer: "Username Footer",
    ref: { current: { value: null } },
  };

  render(
    <UsernameInput ref={v.ref} id={v.id} footer={v.footer} state={v.state} />
  );

  const usernameLabel = screen.getByLabelText(/Username/i);
  expect(usernameLabel).toBeInTheDocument();

  const inputElement = screen.getByTestId(/usernameInput/i);
  fireEvent.change(inputElement, { target: { value: "12" } });
  expect(inputElement.value).toBe("12");

  const usernameFooter = screen.getByText(
    /Username have to contain at least 3 character/i
  );
  expect(usernameFooter).toBeInTheDocument();
});

import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import PasswordInput from "../PasswordInput";

test("Password Input with no input error", () => {
  const v = {
    id: "test-password",
    label: "Password Label",
    footer: "Password Footer",
    state: false,
  };

  render(
    <PasswordInput
      id={v.id}
      label={v.label}
      footer={v.footer}
      state={v.state}
    />
  );

  const passwordLabel = screen.getByLabelText(/Password Label/i);
  expect(passwordLabel).toBeInTheDocument();

  const passwordPlaceholder = screen.getByPlaceholderText(/Enter password/i);
  expect(passwordPlaceholder).toBeInTheDocument();

  const passwordFooter = screen.getByText(/Password Footer/i);
  expect(passwordFooter).toBeInTheDocument();
});

test("Password Input with no input error with default label and no footer", () => {
  const v = {
    id: "test-password",
    state: false,
    ref: { current: { value: null } },
  };

  render(<PasswordInput ref={v.ref} id={v.id} state={v.state} />);

  const passwordLabel = screen.getByLabelText(/Password/i);
  expect(passwordLabel).toBeInTheDocument();

  const inputElement = screen.getByTestId(/passwordInput/i);
  fireEvent.change(inputElement, { target: { value: "12345678" } });
  expect(inputElement.value).toBe("12345678");

  const checkedIcon = screen.getByTestId(/DoubleCheckSvg/i);
  expect(checkedIcon).toBeInTheDocument();
});

test("Password Input with input error with default label and no footer", () => {
  const v = {
    id: "test-password",
    state: "Your password needs to contain at least 8 character",
    footer: "Password Footer",
    ref: { current: { value: null } },
  };

  render(
    <PasswordInput ref={v.ref} id={v.id} footer={v.footer} state={v.state} />
  );

  const passwordLabel = screen.getByLabelText(/Password/i);
  expect(passwordLabel).toBeInTheDocument();

  const inputElement = screen.getByTestId(/passwordInput/i);
  fireEvent.change(inputElement, { target: { value: "12345" } });
  expect(inputElement.value).toBe("12345");

  const usernameFooter = screen.getByText(
    /Your password needs to contain at least 8 character/i
  );
  expect(usernameFooter).toBeInTheDocument();
});

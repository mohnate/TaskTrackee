import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import EmailInput from "../EmailInput";

test("Email Input with no input error", () => {
  const v = {
    id: "test-email",
    label: "Email Label",
    footer: "Email Footer",
    state: false,
  };

  render(
    <EmailInput id={v.id} label={v.label} footer={v.footer} state={v.state} />
  );

  const emailLabel = screen.getByLabelText(/Email Label/i);
  expect(emailLabel).toBeInTheDocument();

  const emailPlaceholder = screen.getByPlaceholderText(/Enter email address/i);
  expect(emailPlaceholder).toBeInTheDocument();

  const emailFooter = screen.getByText(/Email Footer/i);
  expect(emailFooter).toBeInTheDocument();
});

test("Email Input with no input error with default label and no footer", () => {
  const v = {
    id: "test-email",
    state: false,
    ref: { current: { value: null } },
  };

  render(<EmailInput ref={v.ref} id={v.id} state={v.state} />);

  const emailLabel = screen.getByLabelText(/Email address/i);
  expect(emailLabel).toBeInTheDocument();

  const inputElement = screen.getByTestId(/emailInput/i);
  fireEvent.change(inputElement, { target: { value: "test@gmail.com" } });
  expect(inputElement.value).toBe("test@gmail.com");

  const checkedIcon = screen.getByTestId(/DoubleCheckSvg/i);
  expect(checkedIcon).toBeInTheDocument();
});

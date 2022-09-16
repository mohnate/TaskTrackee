import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TaskInput from "../TaskInput";

test("Task Input with no input error with placeholder", () => {
  const v = {
    id: "test-task",
    placeholder: "Task Placeholder",
    ref: { current: { value: null } },
  };

  render(<TaskInput ref={v.ref} id={v.id} placeholder={v.placeholder} />);

  const usernamePlaceholder = screen.getByPlaceholderText(/Task Placeholder/i);
  expect(usernamePlaceholder).toBeInTheDocument();

  const inputElement = screen.getByTestId(/taskInput/i);
  fireEvent.change(inputElement, { target: { value: "My task" } });
  expect(inputElement.value).toBe("My task");
});

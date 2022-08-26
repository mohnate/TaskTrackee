import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Homepage from "../index";
import "../../../__mocks__/intersectionObserverMock";

test("render main heading", () => {
  render(
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/TaskTrackee/i);
  expect(linkElement).toBeInTheDocument();
});

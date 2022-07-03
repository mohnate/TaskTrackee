import "../styles/global.scss";

import { Routes, Route } from "react-router-dom";

import Homepage from "./index";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  );
}

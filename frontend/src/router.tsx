import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./screen/Login";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

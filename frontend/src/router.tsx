import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./screens/Login";
import { RequireAuth } from "./contexts/Auth/RequiredAuth";
import { Sidebar } from "./components/Sidebar";
import { UserList } from "./screens/Users";
import { Customer } from "./screens/Customer";

export const AppRouter = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Sidebar />
            </RequireAuth>
          }
        >
          <Route path="user">
            <Route index element={<UserList />} />
          </Route>

          <Route path="customer">
            <Route index element={<Customer />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

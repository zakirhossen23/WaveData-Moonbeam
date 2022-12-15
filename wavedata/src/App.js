import Cookies from 'js-cookie'
import * as React from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";

import Login from "./pages/LogIn";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import SurveyDetails from "./pages/SurveyDetails";
import Team from "./pages/Team";
import TrialDetails from "./pages/TrialDetails";
import Trials from "./pages/Trials";

import ResetAll from './pages/ResetAll';
import cors from 'cors'
import './assets/bootstrap.css';
export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetall" element={<ResetAll />} />

        <Route element={<DashboardLayout />}>
          <Route
            path="/trials"
            element={
              <RequireAuth>
                <Trials />
              </RequireAuth>
            }
          />
          <Route
            path="/trials/:id"
            element={
              <RequireAuth>
                <TrialDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/trials/:id/survey/:id"
            element={
              <RequireAuth>
                <SurveyDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/team"
            element={
              <RequireAuth>
                <Team />
              </RequireAuth>
            }
          />
          <Route
            path="/payment"
            element={
              <RequireAuth>
                <Payment />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter >

  );

  function RequireAuth({ children }) {
    let location = useLocation();
    if (Cookies.get("login") === "true"){
      return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


}

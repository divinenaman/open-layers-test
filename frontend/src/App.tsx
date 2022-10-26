import "./App.css";
import React from "react";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import MapPage from "./components/mapPage";
import Login from "./components/login";
import Signup from "./components/signup";

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useSelector((s: RootState) => s.user);
  let location = useLocation();
  if (!auth.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function RequireNotAuth({ children }: { children: JSX.Element }) {
  let auth = useSelector((s: RootState) => s.user);

  if (auth.isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <div
      className="App"
      style={{
        position: "relative",
        zIndex: 100,
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <MapPage />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            <RequireNotAuth>
              <Login />
            </RequireNotAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <RequireNotAuth>
              <Signup />
            </RequireNotAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

// curr location
// redux toolkit
// name of user
// material
// typescript
// routing

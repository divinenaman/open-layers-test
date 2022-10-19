import "./App.css";
import React, { useRef, useState } from "react";
import { Map } from "ol";
import useMap from "./hook/useMap";

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import MapPage from "./components/mapPage";
import Login from "./components/login";

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

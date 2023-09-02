import { Toaster } from "react-hot-toast";
import "./style.css";
import LoginRegister from "./components/LoginRegister";
import Dashboard from "./components/Dashboard";
import { useState, useEffect } from "react";
import checkAuth from "./helpers/auth";
import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./components/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    if (checkAuth()) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <>
      <Routes>
        <Route
          exact
          path='/'
          element={
            isAuthenticated ? (
              <Dashboard defaultOption='Notes' />
            ) : (
              <LoginRegister />
            )
          }
        />
        <Route
          exact
          path='/login'
          element={
            <PublicRoute>
              <LoginRegister defaultOption='Login' />
            </PublicRoute>
          }
        />
        <Route
          exact
          path='/register'
          element={
            <PublicRoute>
              <LoginRegister defaultOption='Register' />
            </PublicRoute>
          }
        />
        <Route
          exact
          path='/dashboard/notes'
          element={
            <PrivateRoute>
              <Dashboard defaultOption='Notes' />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path='/dashboard/settings'
          element={
            <PrivateRoute>
              <Dashboard defaultOption='Settings' />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path='/dashboard/create/note'
          element={
            <PrivateRoute>
              <Dashboard defaultOption='Create Note' />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path='/dashboard/update/note/:noteid'
          element={
            <PrivateRoute>
              <Dashboard defaultOption='Update Note' />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path='/dashboard/note/:noteid'
          element={
            <PrivateRoute>
              <Dashboard defaultOption='Note' />
            </PrivateRoute>
          }
        />
        <Route exact path='*' element={<h1>Not Found</h1>} />
      </Routes>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 2000,
          style: {
            fontFamily: "Arial",
            fontSize: "18px",
          },
        }}
      />
    </>
  );
}

export default App;

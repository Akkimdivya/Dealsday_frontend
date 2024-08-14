import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './context/AuthContext';
import EmployeeList from './components/EmployeeList'
import EditEmployee from './components/EditEmployee'
import './App.css';
import CreateEmployee from "./components/CreateEmployee";
//import EmployeeList from "./components/EmployeeList";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          /> 
          <Route
            path="/employee"
            element={
              <PrivateRoute>
                <EmployeeList />
              </PrivateRoute>
            }
          /> 
          <Route
            path="/create-employee"
            element={
              <PrivateRoute>
                <CreateEmployee />
              </PrivateRoute>
            }
          /> 
           <Route path="/edit-employee/:ID" element={<PrivateRoute><EditEmployee/></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;

import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Register from "./components/register";
import Login from "./components/login";
import PaymentForm from "./components/paymentForm";  // Import your payment form

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />  {/* Default route can be login */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pay" element={<PaymentForm />} />  {/* Payment form route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
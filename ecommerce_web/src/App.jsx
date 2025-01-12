import { useEffect, useState } from 'react'
import './App.css'
import Login from './component/Login/login'
import Register from './component/register/register'
import Home from './component/Home/index';
import { Box } from '@mui/material'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductList from './component/UserDashboard/productList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      setIsLoggedIn(true);
    }
    
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (isLoggedIn) {
      return <Navigate to="/home" />;
    }
    return children;
  };
  return (
    <Router>
      <Box>
        <Routes>
          {/* Define routes */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user-dashboard" element={<ProductList addToCart={()=>{}} />} />
          {/* Protected Route for Home */}
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <Login setIsLoggedIn={setIsLoggedIn}  />
              </ProtectedRoute>
            }
          />

          {/* Redirect to home or login based on authentication */}
          <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        </Routes>
      </Box>
    </Router>
  )
}

export default App

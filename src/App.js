import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import HomePage from './homepage';
import Cart from './cart';
import { CartProvider } from './CartContext'; // Import CartProvider

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <CartProvider> {/* Wrap the application with CartProvider */}
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={loggedIn ? <Navigate to="/home" /> : <Login setLoggedIn={setLoggedIn} />} />
                    <Route path="/signup" element={loggedIn ? <Navigate to="/home" /> : <Signup />} />
                    <Route path="/home" element={loggedIn ? <HomePage /> : <Navigate to="/login" />} />
                    <Route path="/cart" element={loggedIn ? <Cart /> : <Navigate to="/login" />} />
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;

import React, { createContext, useState, useContext } from 'react';

// Create the Cart Context
const CartContext = createContext();

export const useCart = () => useContext(CartContext); // Custom hook to use cart context

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]); // State to hold cart items

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            // If the item already exists in the cart, update its quantity
            updateCartQuantity(item.id, existingItem.quantity + 1);
        } else {
            // If it's a new item, add it to the cart with a quantity of 1
            setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]); // Set initial quantity to 1
        }
    };

    const removeFromCart = (id) => {
        // Remove item from cart
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    const updateCartQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(id); // Remove item if quantity is 0 or less
        } else {
            // Update the quantity of the item in the cart
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    // Provide the context values to the children components
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

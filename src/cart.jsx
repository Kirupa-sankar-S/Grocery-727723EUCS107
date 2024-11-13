import React from "react";
import { useCart } from "./CartContext";
import "./cart.css";

const Cart = () => {
    const { cartItems, updateCartQuantity, removeFromCart } = useCart();

    // Function to calculate total price per item
    const calculateSubTotal = (price, quantity) => {
        const parsedPrice = parseFloat(price);
        const parsedQuantity = parseInt(quantity, 10); // Ensure quantity is an integer
        return (parsedPrice * parsedQuantity).toFixed(2); // Calculate subtotal
    };

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2>Items ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</h2>
                <h2>Quantity</h2>
                <h2>Sub-total</h2>
            </div>
            {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                        {item.offerText && (
                            <div className="discount-badge">
                                <span>{item.offerText}</span>
                            </div>
                        )}
                        <img src={item.imageUrl} alt={item.name} className="item-image" />
                        <div className="item-details">
                            <p>{item.name}</p>
                            <p>
                                ₹{parseFloat(item.price).toFixed(2)}{" "}
                                <span className="item-original-price">
                                    ₹{parseFloat(item.oldPrice).toFixed(2)}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="quantity-control">
                        <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <div className="item-subtotal">
                        <p>₹{calculateSubTotal(item.price, item.quantity)}</p> {/* Sub-total calculation */}
                    </div>
                    <button className="delete-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Cart;

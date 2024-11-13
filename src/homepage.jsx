import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Import the useCart hook
import './homepage.css';

const HomePage = () => {
    const { addToCart } = useCart(); // Use the Cart context to get addToCart

    const products = [
        {
            id: 1,
            name: 'Capsicum - Green (Loose)',
            brand: 'fresho!',
            weightOptions: ['1 kg'],
            price: 80,
            oldPrice: 128.77,
            discount: '38% OFF',
            imageUrl: 'https://t3.ftcdn.net/jpg/01/68/25/84/240_F_168258402_z8L7jLEOq3SeyNWvVkHRXoglUVEueZ4U.jpg',
            offerText: 'Har Din Sasta!',
        },
        {
            id: 2,
            name: 'Carrot - Orange (Loose)',
            brand: 'fresho!',
            weightOptions: ['1 kg'],
            price: 77.04,
            oldPrice: 101.37,
            discount: '24% OFF',
            imageUrl: 'https://t4.ftcdn.net/jpg/00/53/09/51/240_F_53095132_RYsAcP3cQ72jM84ibY2FGCCAe9K14CiM.jpg',
            offerText: 'Har Din Sasta!',
        },
        {
            id: 3,
            name: 'Cauliflower',
            brand: 'fresho!',
            weightOptions: ['1 pc - approx. 400 to 600 g'],
            price: 56.22,
            oldPrice: 73.97,
            discount: '24% OFF',
            imageUrl: 'https://t4.ftcdn.net/jpg/09/84/01/43/240_F_984014351_RWJDL0jDMMpoho0L3ryIMtlkwK1ddTrE.jpg',
            offerText: 'Get it for ₹32.01!',
        },
        {
            id: 4,
            name: 'Coriander Leaves',
            brand: 'fresho!',
            weightOptions: ['1 kg'],
            price: 85.37,
            oldPrice: 112.33,
            discount: '24% OFF',
            imageUrl: 'https://t3.ftcdn.net/jpg/01/01/26/10/240_F_101261047_sU0WdKqW7ugC92ou2M2ZWcJTTpwLJJe2.jpg',
            offerText: '',
        },
    ];

    const navigate = useNavigate();

    return (
        <div className="homepage">
            {/* Navbar */}
            <div className="navbar">
                <div className="logo">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqy0FHSEzvXrRZaWjyUzCB4BKh_FTOWb0u9w&s" alt="BigBasket Logo" />
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search for Products..." />
                    <button>Search</button>
                </div>
                <div className="user-actions">
                    <button className="select-location">Select Location</button>
                    <div className="profile-logo">
                        <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG-Free-Image.png" alt="Profile" />
                    </div>
                    <div className="cart-icon" onClick={() => navigate('/cart')}>
                        <img src="https://t4.ftcdn.net/jpg/01/63/42/79/240_F_163427943_W56xtj7YydS4YujdUqQot94IINtt91FV.jpg" alt="Cart" />
                    </div>
                </div>
            </div>

            {/* Banner Section */}
            <div className="banner">
                <div className="banner-content">
                    <h1>Fresh And <span className="highlight">Organic</span> Products</h1>
                    <p>Freshness you can taste! Shop smart, shop with us.</p>
                    <button className="shop-now-btn">Shop Now</button>
                </div>
            </div>

            {/* Navigation Section */}
            <div className="navigation">
                <button className="shop-by-category-btn">Shop by Category</button>
                <nav className="category-nav">
                    <a href="/">Fruits & Vegetables</a>
                    <a href="/">Dairy & Breakfast</a>
                    <a href="/">Cool Drinks & Juices</a>
                    <a href="/">Tea, Coffee & Health Drinks</a>
                    <a href="/">Bakery & Biscuits</a>
                    <span className="more-categories">»</span>
                </nav>
            </div>

            {/* Product Grid Section */}
            <div className="product-grid">
                <h2>My Smart Basket</h2>
                <div className="products">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProductCard = ({ product, addToCart }) => {
    const [count, setCount] = useState(0);

    const handleAddClick = () => {
        addToCart(product); // Call the addToCart function
        setCount(1); // Set count to 1 when added
    };

    const handleIncrement = () => {
        setCount(count + 1);
        addToCart({ ...product, quantity: count + 1 });
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
            addToCart({ ...product, quantity: count - 1 });
        } else {
            setCount(0);
            addToCart({ ...product, quantity: 0 });
        }
    };

    return (
        <div className="product-card">
            {product.discount && <div className="discount-badge">{product.discount}</div>}
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
                <p className="product-brand">{product.brand}</p>
                <h3 className="product-name">{product.name}</h3>
                <select className="product-weight">
                    {product.weightOptions.map((weight, index) => (
                        <option key={index} value={weight}>
                            {weight}
                        </option>
                    ))}
                </select>
                <div className="price-info">
                    <span className="product-price">₹{product.price}</span>
                    <span className="old-price">₹{product.oldPrice}</span>
                </div>
                {product.offerText && <div className="offer-text">{product.offerText}</div>}
            </div>
            <div className="card-actions">
                {count === 0 ? (
                    <button className="add-button" onClick={handleAddClick}>
                        Add
                    </button>
                ) : (
                    <div className="counter">
                        <button className="decrement" onClick={handleDecrement}>-</button>
                        <span className="count-display">{count}</span>
                        <button className="increment" onClick={handleIncrement}>+</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
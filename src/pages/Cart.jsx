import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, total } = useCart();
    const navigate = useNavigate();

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role === 'vendor') {
            navigate('/');
        }
    }, [navigate]);

    if (cart.length === 0) {
        return (
            <div className="cart-empty-container">
                <div className="cart-empty-card glass-card">
                    <div className="gradient-bar-top"></div>
                    <div className="empty-icon">👜</div>
                    <h1 className="empty-title">Your Collection is <span className="gradient-text">Empty</span></h1>
                    <p className="empty-desc">
                        Discover unique artifacts and timeless creations from India's finest artisans. Your selection will appear here for curation.
                    </p>
                    <Link to="/marketplace" className="btn btn-primary btn-explore">
                        Explore Marketplace
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container animate-fade-in">
            <header className="cart-header">
                <h1 className="cart-title">Curated <span className="gradient-text">Selection</span></h1>
                <p className="cart-subtitle">Review your artifacts before securing ownership</p>
            </header>

            <div className="cart-grid">
                {/* Cart Items */}
                <div className="cart-items-column">
                    {cart.map((item, i) => (
                        <div key={item._id} className="cart-product-card glass-card animate-slide-up" style={{ animationDelay: `${i * 0.15}s` }}>
                            {/* Decorative Edge */}
                            <div className="card-edge"></div>

                            <div className="product-image-container">
                                {item.images && item.images[0] ? (
                                    <img src={item.images[0]} alt={item.title} className="product-image" />
                                ) : (
                                    <div className="product-placeholder">🏺</div>
                                )}
                            </div>

                            <div className="product-details">
                                <p className="listing-tag">Masterpiece Listing</p>
                                <h3 className="product-title">{item.title}</h3>
                                {item.vendorId && (
                                    <div className="vendor-badge">
                                        <span className="vendor-dot"></span>
                                        <p className="vendor-name">{item.vendorId.businessName}</p>
                                    </div>
                                )}
                                <div className="unit-price">₹{item.price.toLocaleString()}</div>
                            </div>

                            <div className="product-actions">
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => updateQuantity(item._id, -1)}
                                        className="qty-btn"
                                    >−</button>
                                    <span className="qty-val">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item._id, 1)}
                                        className="qty-btn"
                                    >+</button>
                                </div>

                                <div className="total-controls">
                                    <div className="item-subtotal-group">
                                        <p className="subtotal-label">Subtotal</p>
                                        <p className="subtotal-val">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="remove-btn"
                                        title="Remove Item"
                                    >
                                        <span className="trash-icon">🗑️</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="continue-shopping">
                        <Link to="/marketplace" className="continue-link">
                            <span className="link-line"></span>
                            Continue Curation
                        </Link>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="cart-summary-column">
                    <div className="summary-folio glass-card">
                        <div className="folio-gradient"></div>

                        <div className="folio-header">
                            <h2 className="folio-title">Order <span className="gradient-text">Folio</span></h2>
                            <p className="folio-subtitle">Secure Acquisition Summary</p>
                        </div>

                        <div className="folio-details">
                            <div className="folio-row">
                                <span className="folio-label">Selection Value</span>
                                <span className="folio-val">₹{total.toLocaleString()}</span>
                            </div>
                            <div className="folio-row">
                                <span className="folio-label">Global Logistics</span>
                                <span className="folio-badge-free">Complimentary</span>
                            </div>
                            <div className="folio-row">
                                <span className="folio-label">Platform Custody</span>
                                <span className="folio-val">₹0 <span className="strikethrough">₹499</span></span>
                            </div>
                        </div>

                        <div className="folio-total-section">
                            <div className="total-flex">
                                <span className="total-label">Total Acquisition</span>
                                <div className="total-right">
                                    <div className="final-price">₹{total.toLocaleString()}</div>
                                    <p className="inclusive-text">Inclusive of all duties</p>
                                </div>
                            </div>
                        </div>

                        <div className="folio-actions">
                            <Link to="/checkout" className="btn btn-primary btn-checkout">
                                <span className="btn-text">Proceed to Checkout</span>
                                <div className="btn-shimmer"></div>
                            </Link>

                            <div className="trust-grid">
                                <div className="trust-item">
                                    <span className="trust-icon">🛡️</span>
                                    <span className="trust-text">Secured SSL</span>
                                </div>
                                <div className="trust-item">
                                    <span className="trust-icon">💎</span>
                                    <span className="trust-text">Authentic Only</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

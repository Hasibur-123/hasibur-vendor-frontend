import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
    const { cart, total, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        zip: '',
        paymentMethod: 'PhonePe'
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role === 'vendor') {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            alert('Please login to checkout');
            navigate('/login');
            return;
        }
        const user = JSON.parse(userStr);

        try {
            setLoading(true);

            // Step 1: Create Order
            const orderRes = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders`, {
                items: cart,
                totalAmount: total,
                userId: user.id,
                role: user.role,
                shippingAddress: formData
            });

            const createdOrders = orderRes.data;
            const firstOrder = Array.isArray(createdOrders) ? createdOrders[0] : createdOrders;

            // Step 2: Initiate PhonePe Payment
            if (formData.paymentMethod === 'PhonePe') {
                const paymentRes = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/payment/initiate`, {
                    orderId: firstOrder._id,
                    amount: total
                });

                if (paymentRes.data.success) {
                    // Redirect to PhonePe payment page
                    window.location.href = paymentRes.data.paymentUrl;
                } else {
                    alert('Payment initiation failed. Please try again.');
                    setLoading(false);
                }
            } else {
                // For other payment methods (future implementation)
                clearCart();
                alert('Order placed successfully!');
                navigate('/orders');
            }

        } catch (err) {
            console.error(err);
            alert('Failed to place order');
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="checkout-empty-container">
                <div className="empty-state-card glass-card">
                    <div className="gradient-bar-top"></div>
                    <div className="empty-icon">🛒</div>
                    <h1 className="empty-title">Manifest Your <span className="gradient-text">Collection</span></h1>
                    <p className="empty-desc">
                        Your curators' box is currently empty. Explore our collection of timeless artifacts to begin.
                    </p>
                    <Link to="/marketplace" className="btn btn-primary btn-marketplace">
                        Go to Marketplace
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container animate-fade-in">
            <header className="checkout-header">
                <h1 className="checkout-title">Secure <span className="gradient-text">Manifesto</span></h1>
                <div className="secure-badge glass-card">
                    <span className="pulse-dot"></span>
                    <span className="secure-text">256-Bit Acquisition Protocol Active</span>
                </div>
            </header>

            <div className="checkout-grid">
                {/* Form Side */}
                <div className="form-column">
                    <div className="form-card glass-card animate-slide-up">
                        <div className="decorative-glow"></div>

                        <div className="section-title-row">
                            <div className="step-number">01</div>
                            <h2 className="step-title">Coordinates</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="checkout-form">
                            <div className="form-group">
                                <label className="form-label">Universal Delivery Address</label>
                                <textarea
                                    required
                                    name="address"
                                    placeholder="Apartment, Street, Landmark, District..."
                                    onChange={handleChange}
                                    className="input-textarea"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">City Hub</label>
                                    <input required type="text" name="city" placeholder="e.g. Jaipur" onChange={handleChange} className="input-field" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Postal Code</label>
                                    <input required type="text" name="zip" placeholder="6-digit PIN" onChange={handleChange} className="input-field" />
                                </div>
                            </div>

                            <div className="payment-section">
                                <div className="section-title-row">
                                    <div className="step-number">02</div>
                                    <h2 className="step-title">Gateway Selection</h2>
                                </div>

                                <div className="payment-options">
                                    {[
                                        { id: 'PhonePe', label: 'PhonePe Secure Node', icon: '📱', desc: 'Secure bank-to-bank transfer' },
                                        { id: 'UPI', label: 'UPI Quantum Pay', icon: '⚡', desc: 'Instant mobile verification' },
                                        { id: 'Card', label: 'Luxury Credit / Debit', icon: '💳', desc: 'Global card network support' }
                                    ].map(method => (
                                        <label key={method.id} className={`payment-option ${formData.paymentMethod === method.id ? 'active' : ''}`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.id}
                                                checked={formData.paymentMethod === method.id}
                                                onChange={handleChange}
                                                className="hidden-radio"
                                            />
                                            <span className="option-icon">{method.icon}</span>
                                            <div className="option-details">
                                                <p className="option-label">{method.label}</p>
                                                <p className="option-desc">{method.desc}</p>
                                            </div>
                                            <div className="option-check">
                                                {formData.paymentMethod === method.id && <div className="check-dot" />}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="submit-section">
                                <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                                    <div className="btn-content">
                                        {loading ? (
                                            <>
                                                <div className="spinner-sm"></div>
                                                <span>Initiating Protocol...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Authorize ₹{total.toLocaleString()} Acquisition</span>
                                                <span className="arrow-icon">→</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="btn-shine"></div>
                                </button>
                                <p className="disclaimer-text">
                                    Final price includes all curated logistics & platform duties
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Summary Side */}
                <div className="summary-column animate-slide-up-delayed">
                    <div className="summary-card glass-card">
                        <div className="gradient-bar-top"></div>

                        <div className="summary-header">
                            <div className="summary-title-group">
                                <h2 className="summary-title">Manifest</h2>
                                <p className="summary-subtitle">{cart.length} Artifacts Locked</p>
                            </div>
                            <div className="vault-status">
                                <p className="vault-label">Vault Status</p>
                                <span className="vault-badge">Reserved</span>
                            </div>
                        </div>

                        <div className="cart-items custom-scrollbar">
                            {cart.map((item, i) => (
                                <div key={item._id} className="cart-item" style={{ animationDelay: `${i * 0.1}s` }}>
                                    <div className="item-thumbnail">
                                        {item.images?.[0] ? (
                                            <img src={item.images[0]} alt={item.title} className="item-img" />
                                        ) : <div className="item-placeholder">🏺</div>}
                                    </div>
                                    <div className="item-info">
                                        <p className="item-title">{item.title}</p>
                                        <p className="item-qty">{item.quantity} Unit{item.quantity > 1 ? 's' : ''} × ₹{item.price.toLocaleString()}</p>
                                    </div>
                                    <p className="item-total">₹{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>

                        <div className="summary-footer">
                            <div className="cost-row">
                                <span>Logistic Overhead</span>
                                <span className="text-emerald">Gratis</span>
                            </div>
                            <div className="total-row">
                                <span className="total-label">Authorized Total</span>
                                <div className="total-value-group">
                                    <div className="total-amount">₹{total.toLocaleString()}</div>
                                    <p className="currency-label">Currency: Indian Rupee (INR)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="trust-badges">
                        {[
                            { i: "🛡️", t: "Encrypted Node", d: "End-to-End secure payment pipe" },
                            { i: "📦", t: "White-Glove Delivery", d: "Professional artifact transport" }
                        ].map((box, i) => (
                            <div key={i} className="trust-card glass-card">
                                <span className="trust-icon">{box.i}</span>
                                <div className="trust-text">
                                    <p className="trust-title">{box.t}</p>
                                    <p className="trust-desc">{box.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

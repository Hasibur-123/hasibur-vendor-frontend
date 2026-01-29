import React from 'react';
import { Link } from 'react-router-dom';
import './BecomePrimeSeller.css';

const BecomePrimeSeller = () => {
    return (
        <div className="prime-container">
            {/* Hero */}
            <section className="prime-hero">
                <div className="prime-hero-content">
                    <div className="prime-logo-large">
                        <span className="prime-check">✓</span>prime
                    </div>
                    <h1 className="prime-hero-subtitle">
                        The badge that means business.<br />
                        Unlock up to 300% more sales with the Prime badge.
                    </h1>
                    <Link to="/register?role=vendor" className="prime-cta-btn">Join Prime Seller</Link>
                </div>
            </section>

            {/* Benefits */}
            <section className="prime-benefits-section">
                <h2 className="prime-section-title">Why become a Prime Seller?</h2>
                <div className="prime-grid">
                    <div className="prime-card">
                        <span className="prime-icon">⚡</span>
                        <h3 className="prime-card-title">Fast Delivery Badge</h3>
                        <p className="prime-card-desc">
                            Customers love fast shipping. The Prime badge signals guaranteed 1-day or 2-day delivery, increasing conversion rates significantly.
                        </p>
                    </div>
                    <div className="prime-card">
                        <span className="prime-icon">👁️</span>
                        <h3 className="prime-card-title">Higher Visibility</h3>
                        <p className="prime-card-desc">
                            Prime products get priority placement in search results and are featured in exclusive Prime Day deals and events.
                        </p>
                    </div>
                    <div className="prime-card">
                        <span className="prime-icon">🏆</span>
                        <h3 className="prime-card-title">Win the Buy Box</h3>
                        <p className="prime-card-desc">
                            Prime sellers utilize Vendar Fulfillment (FBV), which greatly increases your chances of winning the Buy Box.
                        </p>
                    </div>
                </div>
            </section>

            {/* Badge Preview */}
            <section className="badge-preview-section">
                <h2 className="prime-section-title">Stand out in the crowd</h2>
                <div className="badge-demo-box">
                    <div className="demo-img"></div>
                    <div className="demo-content">
                        <h4>Handcrafted Blue Pottery Vase - Jaipur Special</h4>
                        <div className="prime-badge-icon">
                            <span className="prime-check-small">✓</span>prime
                        </div>
                        <div className="demo-price">₹ 1,299.00</div>
                        <p style={{ fontSize: '0.9rem', color: '#555', marginTop: '0.5rem' }}>
                            FREE Delivery by Vendar<br />
                            <span style={{ color: '#119633', fontWeight: 'bold' }}>In stock.</span>
                        </p>
                    </div>
                </div>
                <p className="badge-text">
                    This exclusive badge tells customers your product is quality-checked and ready to ship instantly.
                </p>
            </section>

            {/* How to qualify */}
            <section className="prime-req-section">
                <h2 className="prime-section-title">How to qualify for Prime</h2>
                <ul className="req-list">
                    <li className="req-item">
                        <div className="req-number">1</div>
                        <div>
                            <h3>Register for Vendar Fulfillment (FBV)</h3>
                            <p>Send your inventory to our warehouses. We handle the storage, packing, and Prime-speed delivery.</p>
                        </div>
                    </li>
                    <li className="req-item">
                        <div className="req-number">2</div>
                        <div>
                            <h3>Self-Ship Prime</h3>
                            <p>Alternatively, show us you can consistently deliver within 2 days using your own logistics to get the badge.</p>
                        </div>
                    </li>
                    <li className="req-item">
                        <div className="req-number">3</div>
                        <div>
                            <h3>Maintain Performance</h3>
                            <p>Keep your order defect rate below 1% and cancellation rate below 1% to keep the badge.</p>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default BecomePrimeSeller;

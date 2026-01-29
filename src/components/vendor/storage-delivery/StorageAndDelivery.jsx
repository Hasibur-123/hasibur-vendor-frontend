import React from 'react';
import { Link } from 'react-router-dom';
import './StorageAndDelivery.css';

const StorageAndDelivery = () => {
    return (
        <div className="sd-container">
            {/* Hero */}
            <section className="sd-hero">
                <div className="sd-hero-content">
                    <h1 className="sd-hero-title">Delivering Happiness, Every Time</h1>
                    <p className="sd-hero-desc">
                        Choose the right fulfillment method for your business.
                        Whether you want us to handle everything or prefer shipping yourself, we have a solution for you.
                    </p>
                    <Link to="/register?role=vendor" className="sd-cta-btn">Start Shipping</Link>
                </div>
            </section>

            {/* Fulfillment Methods */}
            <section className="sd-options-section">
                <h2 className="sd-section-heading">Ways to Ship with Vendar</h2>
                <div className="sd-options-grid">
                    {/* FBA / Vendar Fulfillment */}
                    <div className="sd-option-card">
                        <span className="sd-card-icon">📦</span>
                        <h3 className="sd-card-title">Fulfillment by Vendar (FBV)</h3>
                        <p className="sd-card-desc">
                            You store your products in our secure warehouses. When an order comes in, we pick, pack, and deliver it to the customer. We also handle customer service and returns.
                        </p>
                        <ul className="sd-benefits-list">
                            <li className="sd-benefit-item"><span className="sd-check">✓</span> <strong>Prime Badge</strong> on your listings</li>
                            <li className="sd-benefit-item"><span className="sd-check">✓</span> Next-Day Delivery options</li>
                            <li className="sd-benefit-item"><span className="sd-check">✓</span> 24/7 Customer Support included</li>
                        </ul>
                    </div>

                    {/* Easy Ship */}
                    <div className="sd-option-card">
                        <span className="sd-card-icon">🚚</span>
                        <h3 className="sd-card-title">Vendar Easy Ship</h3>
                        <p className="sd-card-desc">
                            You store and pack your products. Our logistics partner picks up the package from your doorstep and delivers it to the customer.
                        </p>
                        <ul className="sd-benefits-list">
                            <li className="sd-benefit-item"><span className="sd-check">✓</span> Control over your inventory</li>
                            <li className="sd-benefit-item"><span className="sd-check">✓</span> Automated pickup scheduling</li>
                            <li className="sd-benefit-item"><span className="sd-check">✓</span> Professional delivery network</li>
                        </ul>
                    </div>

                    {/* Self Ship */}
                    <div className="sd-option-card">
                        <span className="sd-card-icon">🏠</span>
                        <h3 className="sd-card-title">Self Ship</h3>
                        <p className="sd-card-desc">
                            You separate store, pack, and deliver your products using your own third-party carrier or personal delivery fleet.
                        </p>
                        <ul className="sd-benefits-list">
                            <li className="sd-benefit-item"><span className="sd-check">✓</span> Full control over shipping costs</li>
                            <li className="sd-benefit-item"><span className="sd-check">✓</span> Suitable for hyper-local businesses</li>
                            <li className="sd-benefit-item"><span className="sd-check">✓</span> Direct customer interaction</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Why Choose Section (Value Props) */}
            <section className="sd-value-section">
                <h2 className="sd-section-heading" style={{marginBottom: '3rem'}}>Why Choose Vendar for Shipping</h2>
                <div className="sd-value-grid">
                    <div className="sd-value-item">
                        <svg className="sd-value-icon" viewBox="0 0 64 64" fill="none">
                            <circle cx="32" cy="32" r="30" fill="#e8f4f8"/>
                            <path d="M32 16c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm0 28c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12z" fill="#FF9900"/>
                            <circle cx="32" cy="32" r="4" fill="#FF9900"/>
                        </svg>
                        <h3 className="sd-value-title">Pan-India Reach</h3>
                        <p className="sd-value-desc">Deliver to 19,000+ pincodes, including remote towns and villages across India.</p>
                    </div>
                    <div className="sd-value-item">
                        <svg className="sd-value-icon" viewBox="0 0 64 64" fill="none">
                            <circle cx="32" cy="32" r="30" fill="#e8f4f8"/>
                            <rect x="18" y="20" width="28" height="24" rx="2" stroke="#FF9900" strokeWidth="2" fill="none"/>
                            <path d="M22 28l6 6 12-12" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h3 className="sd-value-title">Damage Protection</h3>
                        <p className="sd-value-desc">We reimburse you for any damage during transit or storage in our warehouse.</p>
                    </div>
                    <div className="sd-value-item">
                        <svg className="sd-value-icon" viewBox="0 0 64 64" fill="none">
                            <circle cx="32" cy="32" r="30" fill="#e8f4f8"/>
                            <rect x="20" y="18" width="24" height="32" rx="2" stroke="#FF9900" strokeWidth="2" fill="none"/>
                            <path d="M24 22v24M40 22v24M20 28h24M20 36h24M20 44h24" stroke="#FF9900" strokeWidth="1.5"/>
                        </svg>
                        <h3 className="sd-value-title">Pay on Delivery</h3>
                        <p className="sd-value-desc">Access millions of customers who prefer paying cash upon delivery (COD).</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StorageAndDelivery;

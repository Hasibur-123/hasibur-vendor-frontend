import React from 'react';
import { Link } from 'react-router-dom';
import './WhySellOnVendor.css';

const WhySellOnVendor = () => {
    return (
        <div className="why-sell-container">
            {/* Hero Section */}
            <section className="why-hero">
                <div className="why-hero-content">
                    <h1 className="why-hero-title">Reach Crores of Customers on Vendor</h1>
                    <p className="why-hero-subtitle">
                        Become a seller today and expand your business across India and the globe.
                        Whether you are a manufacturer, reseller, or artisan, Vendor is your partner in growth.
                    </p>
                    <Link to="/register?role=vendor">
                        <button className="why-hero-cta">Start Selling</button>
                    </Link>
                </div>
            </section>

            {/* Stats Ribbon */}
            <section className="stats-ribbon">
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-number">10 Lakh+</span>
                        <span className="stat-label">Sellers</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">4000+</span>
                        <span className="stat-label">Cities served</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">10 Years</span>
                        <span className="stat-label">Of Trust</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">100%</span>
                        <span className="stat-label">Secure Payments</span>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits-section">
                <h2 className="section-heading">Why Sellers Choose Vendor?</h2>
                <div className="benefits-grid">
                    <div className="benefit-card">
                        <div className="benefit-icon-wrapper">
                            <svg className="benefit-icon" viewBox="0 0 64 64" fill="none">
                                <circle cx="32" cy="32" r="30" fill="#e8f4f8" />
                                <path d="M32 16c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm0 28c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12z" fill="#FF9900" />
                                <path d="M32 24v16M24 32h16" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3 className="benefit-title">Reach Crores of Customers</h3>
                        <p className="benefit-desc">
                            Sell to millions of customers across India from day one. Our platform puts your products in front of the right buyers.
                        </p>
                    </div>

                    <div className="benefit-card">
                        <div className="benefit-icon-wrapper">
                            <svg className="benefit-icon" viewBox="0 0 64 64" fill="none">
                                <circle cx="32" cy="32" r="30" fill="#e8f4f8" />
                                <rect x="16" y="20" width="32" height="24" rx="2" stroke="#FF9900" strokeWidth="2" fill="none" />
                                <path d="M16 24h32M20 20v-4h24v4" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="24" cy="40" r="2" fill="#FF9900" />
                                <circle cx="40" cy="40" r="2" fill="#FF9900" />
                            </svg>
                        </div>
                        <h3 className="benefit-title">Stress-Free Delivery</h3>
                        <p className="benefit-desc">
                            Use our world-class fulfillment network. We pick, pack, and ship your orders so you can focus on your craft.
                        </p>
                    </div>

                    <div className="benefit-card">
                        <div className="benefit-icon-wrapper">
                            <svg className="benefit-icon" viewBox="0 0 64 64" fill="none">
                                <circle cx="32" cy="32" r="30" fill="#e8f4f8" />
                                <rect x="20" y="18" width="24" height="32" rx="2" stroke="#FF9900" strokeWidth="2" fill="none" />
                                <path d="M24 22v24M40 22v24M20 28h24M20 36h24M20 44h24" stroke="#FF9900" strokeWidth="1.5" />
                                <circle cx="32" cy="46" r="2" fill="#FF9900" />
                            </svg>
                        </div>
                        <h3 className="benefit-title">Timely Payments</h3>
                        <p className="benefit-desc">
                            Get paid securely and on time directly into your bank account. Our payment cycles are transparent and reliable.
                        </p>
                    </div>
                </div>
            </section>

            {/* Scale Your Business / Crore Club */}
            <section className="crore-club-section">
                <div className="crore-club-container">
                    <div className="crore-text">
                        <h2 className="crore-title">Join the Vendor Crore Club</h2>
                        <p className="crore-desc">
                            Thousands of our sellers have become crorepatis by selling on Vendor.
                            From small artisans to large manufacturers, we provide the tools to scale your business to new heights.
                        </p>
                        <Link to="/register?role=vendor">
                            <button className="why-hero-cta">Become a Seller</button>
                        </Link>
                    </div>
                    <div className="crore-image">
                        <img src="/assets/vendor-success.png" alt="Success Story" />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bottom-cta-section">
                <h2 className="bottom-cta-title">Ready to start your journey?</h2>
                <Link to="/register?role=vendor">
                    <button className="why-hero-cta">Start Selling</button>
                </Link>
            </section>
        </div>
    );
};

export default WhySellOnVendor;

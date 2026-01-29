import React from 'react';
import { Link } from 'react-router-dom';
import './RequirementsToSell.css';

const RequirementsToSell = () => {
    return (
        <>
            {/* ======= NEW HERO SECTION ======= */}
            <section className="req-hero-section">
                <div className="req-hero-bg">
                    <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&q=80"
                        alt="Sell on IQVENUS"
                        className="req-hero-img"
                        loading="eager"
                    />
                    <div className="req-hero-overlay"></div>
                </div>

                <div className="req-hero-content">
                    <h1 className="req-hero-title">
                        Start Selling on <span className="gradient-text">IQVENUS</span>
                    </h1>
                    <p className="req-hero-subtitle">
                        Join India's trusted artisan marketplace and sell your products to thousands of verified buyers.
                    </p>

                    <Link to="/register?role=vendor" className="req-hero-btn">
                        Become a Seller
                    </Link>
                </div>
            </section>

            <div className="requirements-container">
                {/* Header */}
                <header className="requirements-header">
                    <h1 className="requirements-title">Requirements to sell on IQVENUS</h1>
                    <p className="requirements-subtitle">
                        Selling on Vendar is easy. All you need is a few basic details to register your account and start selling your artisanal products to millions of customers.
                    </p>
                </header>

                {/* Core Requirements Grid */}
                <div className="req-grid">
                    {/* Contact Details */}
                    <div className="req-card">
                        <div className="req-icon-wrapper">
                            <span className="req-icon">📱</span>
                        </div>
                        <h3 className="req-card-title">Contact Details</h3>
                        <p className="req-card-text">
                            You need to provide your contact details for account management and customer communication.
                        </p>
                        <ul className="req-details-list">
                            <li className="req-detail-item"><span className="check-icon">✓</span> Mobile Number</li>
                            <li className="req-detail-item"><span className="check-icon">✓</span> Email Address</li>
                        </ul>
                    </div>

                    {/* GST & PAN */}
                    <div className="req-card">
                        <div className="req-icon-wrapper">
                            <span className="req-icon">📝</span>
                        </div>
                        <h3 className="req-card-title">GST & PAN Info</h3>
                        <p className="req-card-text">
                            Mandatory for selling taxable goods across India. GST simplifies the taxation process.
                        </p>
                        <ul className="req-details-list">
                            <li className="req-detail-item"><span className="check-icon">✓</span> GSTIN Number</li>
                            <li className="req-detail-item"><span className="check-icon">✓</span> PAN Card Details</li>
                            <li className="req-detail-item"><span className="check-icon">✓</span> Business Name</li>
                        </ul>
                    </div>

                    {/* Bank Account */}
                    <div className="req-card">
                        <div className="req-icon-wrapper">
                            <span className="req-icon">🏦</span>
                        </div>
                        <h3 className="req-card-title">Bank Account</h3>
                        <p className="req-card-text">
                            An active bank account is required to receive payments from your sales directly.
                        </p>
                        <ul className="req-details-list">
                            <li className="req-detail-item"><span className="check-icon">✓</span> Account Number</li>
                            <li className="req-detail-item"><span className="check-icon">✓</span> IFSC Code</li>
                            <li className="req-detail-item"><span className="check-icon">✓</span> Account Holder Name</li>
                        </ul>
                    </div>
                </div>

                {/* GST Help Section */}
                <div className="gst-help-section">
                    <div className="gst-content">
                        <h3>Don't have a GSTIN?</h3>
                        <p>
                            If you sell only tax-exempted goods (like certain raw handicrafts), you might not need a GSTIN.
                            However, for most online selling, it is recommended.
                        </p>
                        <a href="https://reg.gst.gov.in/registration/" target="_blank" rel="noopener noreferrer" className="link-btn">
                            Apply for GST Registration &rarr;
                        </a>
                    </div>
                    <div className="gst-image">
                        <img src="/assets/gst-illustration.png" alt="GST Registration" />
                    </div>
                </div>

                {/* CTA Section */}
                <div className="req-cta-section">
                    <Link to="/register?role=vendor">
                        <button className="start-selling-btn-large">Start Selling Now</button>
                    </Link>
                    <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                        Already have an account? <Link to="/login" style={{ color: '#007185' }}>Log in</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default RequirementsToSell;

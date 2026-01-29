import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './VendorNavbar.css';

const VendorNavbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Retrieve user from localStorage
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Determine if we should show dark mode or light mode
    // The request implies a light theme (Amazon style), but the app is dark.
    // We'll trust the requested aesthetic but keep it clean.
    const isDarkMode = false; // Set to true if you want to force dark mode to match app

    return (
        <nav className={`vendor-navbar ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="vendor-navbar-container">
                {/* Brand */}
                <Link to="/" className="vendor-brand">
                    <span className="vendor-brand-title">IQVENUS</span>

                </Link>

                {/* Desktop Navigation */}
                <div className="vendor-nav-links">
                    <div className="vendor-nav-item">
                        <span className="vendor-nav-link">
                            Sell Online <span className="vendor-dropdown-arrow">▼</span>
                        </span>
                        <div className="vendor-dropdown-menu">
                            <Link to="/vendor/requirements" className="vendor-dropdown-link featured-item">
                                Requirements to Sell
                            </Link>
                            <Link to="/vendor/why-sell" className="vendor-dropdown-link">
                                Why Sell on Vendar
                            </Link>
                            <Link to="/vendor/listing-guide" className="vendor-dropdown-link">
                                List your Products
                            </Link>
                            <Link to="/vendor/shipping" className="vendor-dropdown-link">
                                Storage & Delivery
                            </Link>
                            <Link to="/vendor/help" className="vendor-dropdown-link">
                                Help & Support
                            </Link>
                            <Link to="/vendor/stories" className="vendor-dropdown-link">
                                Seller Success Stories
                            </Link>
                        </div>
                    </div>

                    <div className="vendor-nav-item">
                        <span className="vendor-nav-link">
                            Grow Your Business <span className="vendor-dropdown-arrow">▼</span>
                        </span>
                        <div className="vendor-dropdown-menu">
                            <Link to="/vendor/prime" className="vendor-dropdown-link featured-item">
                                Become a Prime Seller
                            </Link>
                            <Link to="/vendor/growth-tools" className="vendor-dropdown-link">
                                Tools to help you grow
                            </Link>
                            <Link to="/vendor/programs" className="vendor-dropdown-link">
                                Selling Programs
                            </Link>

                            <Link to="/vendor/service-providers" className="vendor-dropdown-link">
                                Find Service Providers
                            </Link>
                            <Link to="/vendor/festivals" className="vendor-dropdown-link">
                                Shopping Festivals
                            </Link>
                        </div>
                    </div>

                    <div className="vendor-nav-item">
                        <span className="vendor-nav-link">
                            Fees & Pricing <span className="vendor-dropdown-arrow">▼</span>
                        </span>
                        <div className="vendor-dropdown-menu">
                            <Link to="/vendor/fees" className="vendor-dropdown-link featured-item">
                                Types of Fees
                            </Link>
                            <Link to="/vendor/fulfillment-comparison" className="vendor-dropdown-link">
                                Comparing Fulfillment Channels
                            </Link>
                            <Link to="/vendor/profitability-calculator" className="vendor-dropdown-link">
                                Calculating Profitability
                            </Link>
                            <Link to="/vendor/payouts" className="vendor-dropdown-link">
                                Payment Cycles
                            </Link>
                        </div>
                    </div>

                    <Link to="/support" className="vendor-nav-link">
                        Learn More
                    </Link>
                </div>

                {/* Actions */}
                <div className="vendor-actions">
                    <Link to="/vendor/dashboard" className="vendor-cta">
                        Studio Dashboard
                    </Link>

                    {user && (
                        <div className="vendor-profile-menu">
                            <button onClick={handleLogout} className="vendor-profile-btn" title="Logout">
                                <div className="vendor-avatar">
                                    {user.name?.charAt(0).toUpperCase() || 'V'}
                                </div>
                            </button>
                        </div>
                    )}

                    <button className="vendor-mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span className="vendor-bar"></span>
                        <span className="vendor-bar"></span>
                        <span className="vendor-bar"></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default VendorNavbar;

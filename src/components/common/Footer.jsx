import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            {/* 1. Newsletter Section - Premium Engagement */}
            <div className="footer-newsletter">
                <div className="footer-container">
                    <div className="newsletter-content">
                        <div className="newsletter-text">
                            <h3>Join the IQVENUS Family</h3>
                            <p>Subscribe for artisan stories, exclusive launches, and sustainable living tips.</p>
                        </div>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Enter your email address" required aria-label="Email for newsletter" />
                            <button type="submit">Subscribe Now</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="footer-main">
                <div className="footer-container">
                    <div className="footer-grid">
                        {/* 2. Brand & Mission */}
                        <div className="footer-column brand-col">
                            <Link to="/" className="footer-logo">
                                IQ<span className="saffron-text">VENUS</span>
                            </Link>
                            <p className="footer-mission">
                                Empowering Indian artisans by bringing authentic, handcrafted treasures directly to your home. Sustainable, ethical, and uniquely yours.
                            </p>
                            <div className="footer-socials">
                                <a href="#" className="social-link" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social-link" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                                <a href="#" className="social-link" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                                <a href="#" className="social-link" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>

                        {/* 3. Shop Links */}
                        <div className="footer-column">
                            <h4 className="footer-heading">Shop by Craft</h4>
                            <ul className="footer-links">
                                <li><Link to="/marketplace?category=Handloom">Handloom Textiles</Link></li>
                                <li><Link to="/marketplace?category=Pottery">Earthen Pottery</Link></li>
                                <li><Link to="/marketplace?category=Wood Craft">Traditional Woodwork</Link></li>
                                <li><Link to="/marketplace?category=Jewelry">Artisan Jewelry</Link></li>
                                <li><Link to="/marketplace?category=Home Decor">Home & Decor</Link></li>
                            </ul>
                        </div>

                        {/* 4. Vendor Links */}
                        <div className="footer-column">
                            <h4 className="footer-heading">Sell on IQVENUS</h4>
                            <ul className="footer-links">
                                <li><Link to="/become-a-vendor">Become a Vendor</Link></li>
                                <li><Link to="/vendor/guidelines">Seller Guidelines</Link></li>
                                <li><Link to="/vendor/fees">Fees & Payouts</Link></li>
                                <li><Link to="/vendor/shipping">Shipping Policy</Link></li>
                                <li><Link to="/vendor/success-stories">Success Stories</Link></li>
                            </ul>
                        </div>

                        {/* 5. Support & Trust */}
                        <div className="footer-column">
                            <h4 className="footer-heading">Customer Care</h4>
                            <ul className="footer-links">
                                <li><Link to="/profile">My Account</Link></li>
                                <li><Link to="/orders">Track Orders</Link></li>
                                <li><Link to="/support">Help Center</Link></li>
                                <li><Link to="/returns">Returns & Refunds</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* 6. Trust Signals - Industry Standard */}
                    <div className="footer-trust-signals">
                        <div className="trust-badge">
                            <span className="trust-icon">🛡️</span>
                            <div className="trust-info">
                                <strong>Secure Payments</strong>
                                <span>256-bit SSL Encryption</span>
                            </div>
                        </div>
                        <div className="trust-badge">
                            <span className="trust-icon">✨</span>
                            <div className="trust-info">
                                <strong>100% Authentic</strong>
                                <span>Handpicked from Artisans</span>
                            </div>
                        </div>
                        <div className="trust-badge">
                            <span className="trust-icon">🚚</span>
                            <div className="trust-info">
                                <strong>PAN India Delivery</strong>
                                <span>Fast & Reliable Shipping</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 7. Footer Bottom - Legal & Payments */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <div className="footer-bottom-wrapper">
                        <div className="footer-bottom-left">
                            <p className="copyright">© {currentYear} IQVENUS Marketplace. Built for India's Heritage.</p>
                            <div className="footer-legal">
                                <Link to="/terms">Terms</Link>
                                <span className="dot"></span>
                                <Link to="/privacy">Privacy</Link>
                                <span className="dot"></span>
                                <Link to="/cookies">Cookies</Link>
                            </div>
                        </div>
                        <div className="footer-payment-icons">
                            <i className="fab fa-cc-visa" title="Visa"></i>
                            <i className="fab fa-cc-mastercard" title="Mastercard"></i>
                            <i className="fab fa-cc-amex" title="Amex"></i>
                            <i className="fab fa-cc-paypal" title="Paypal"></i>
                            <i className="fab fa-apple-pay" title="Apple Pay"></i>
                            <i className="fab fa-google-pay" title="Google Pay"></i>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


import React from 'react';
import { Link } from 'react-router-dom';
import './VendorLanding.css';

const VendorLanding = () => {
    return (
        <div className="landing-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg-layer">
                    <div className="blob blob-primary animate-pulse-slow"></div>
                    <div className="blob blob-secondary animate-pulse-slow"></div>
                </div>

                <div className="hero-content">
                    <div className="tag-pill animate-fade-in">
                        <span className="pill-dot animate-ping"></span>
                        <span className="pill-text">Direct-to-Customer Seller Program</span>
                    </div>

                    <h1 className="hero-title animate-slide-up">
                        Sell Your Products <span className="gradient-text">Nationwide</span> <br />
                        on IQVENUS
                    </h1>

                    <p className="hero-subtitle animate-slide-up delay-1">
                        Turn your craft into a scalable digital business. IQVENUS connects verified vendors and studios with trusted buyers across India and abroad.
                    </p>

                    <div className="hero-cta-group animate-slide-up delay-2">
                        <Link to="/register?role=vendor" className="primary-btn group">
                            Start Selling on IQVENUS <span className="btn-arrow group-hover-slide">→</span>
                        </Link>
                        <a href="#how-it-works" className="outline-btn">
                            See How It Works
                        </a>
                    </div>

                    <div className="hero-tags animate-fade-in delay-4">
                        {['Handloom', 'Pottery', 'Wood Craft', 'Jewelry', 'Organic Products', 'Traditional Art'].map(cat => (
                            <span key={cat} className="hero-tag">{cat}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-it-works-section">
                <div className="section-header">
                    <h2 className="section-title">How <span className="gradient-text">IQVENUS</span> Works</h2>
                    <p className="section-subtitle">A seamless journey from artisan to customer</p>
                </div>

                <div className="flow-container container">
                    <div className="flow-grid">
                        <div className="flow-item animate-slide-up">
                            <div className="flow-icon">📝</div>
                            <h3 className="flow-title">Vendor Joins IQVENUS</h3>
                            <p className="flow-desc">Submit your application and get verified as a trusted seller.</p>
                            <div className="flow-arrow">→</div>
                        </div>
                        <div className="flow-item animate-slide-up delay-1">
                            <div className="flow-icon">👨‍🎨</div>
                            <h3 className="flow-title">Onboard Artisans</h3>
                            <p className="flow-desc">Add skilled artisans under your shop to showcase their talent.</p>
                            <div className="flow-arrow">→</div>
                        </div>
                        <div className="flow-item animate-slide-up delay-2">
                            <div className="flow-icon">📦</div>
                            <h3 className="flow-title">List Products</h3>
                            <p className="flow-desc">Upload your catalog with high-quality images and pricing.</p>
                            <div className="flow-arrow">→</div>
                        </div>
                        <div className="flow-item animate-slide-up delay-3">
                            <div className="flow-icon">🛍️</div>
                            <h3 className="flow-title">Customers Buy Online</h3>
                            <p className="flow-desc">Orders flow through IQVENUS with automated logistics.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Vendor Advantages */}
            <section id="advantages" className="features-section">
                <div className="section-header">
                    <h2 className="section-title">Everything You Need to <span className="gradient-text">Grow</span></h2>
                    <p className="section-subtitle">Built for artisans, studios, and MSMEs</p>
                </div>

                <div className="features-grid">
                    {[
                        { icon: "🌍", title: "Nationwide Buyers", desc: "Access verified B2B and retail buyers across India with built-in logistics support." },
                        { icon: "⚡", title: "Smart Studio Dashboard", desc: "Manage products, artisans, inventory, and bulk orders from one professional control panel." },
                        { icon: "🛡️", title: "Secure Payments", desc: "Payments are held safely and released automatically after successful delivery — no delays, no risk." }
                    ].map((adv, i) => (
                        <div key={i} className={`feature-card glass-card group animate-slide-up delay-${i}`}>
                            <div className="feature-icon group-hover-scale">{adv.icon}</div>
                            <h3 className="feature-title">{adv.title}</h3>
                            <p className="feature-desc">{adv.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Dashboard Preview */}
            <section className="preview-section">
                <div className="preview-grid">
                    <div className="preview-text-col">
                        <h2 className="preview-title">Your Seller <span className="gradient-text">Command Center</span></h2>
                        <p className="preview-desc">
                            Monitor orders, track earnings, manage artisans, and scale production — all in real time.
                        </p>
                        <div className="preview-list">
                            {[
                                { t: "Live Earnings Dashboard", d: "Daily, weekly, and monthly revenue tracking with granular insights." },
                                { t: "Bulk Order Management", d: "Convert inquiries into confirmed orders and manage distribution effortlessly." },
                                { t: "Stock Alerts", d: "Get automated notifications before your inventory runs out." }
                            ].map((item, i) => (
                                <div key={i} className="preview-item group">
                                    <div className="preview-num group-hover-active">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className="preview-item-title">{item.t}</h4>
                                        <p className="preview-item-desc">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="preview-img-col group scale-up-center">
                        <div className="glow-backdrop group-hover-glow"></div>
                        <div className="img-card glass-card group-hover-tilt">
                            <img
                                src="/assets/analytics-dashboard.png"
                                alt="Vendor Dashboard Preview"
                                className="dashboard-img"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Onboarding Steps */}
            <section className="steps-section">
                <div className="section-header">
                    <h2 className="section-title">Step-by-Step <span className="gradient-text">Onboarding</span></h2>
                    <p className="section-subtitle">Go live in as little as 48 hours</p>
                </div>

                <div className="steps-grid">
                    <div className="steps-line"></div>

                    {[
                        { step: "01", title: "Apply as Vendor", desc: "Submit business details and your unique craft portfolio." },
                        { step: "02", title: "Verification", desc: "IQVENUS team reviews identity and product quality standards." },
                        { step: "03", title: "Upload Products", desc: "List your catalog with high-quality images, price, and stock." },
                        { step: "04", title: "Start Selling", desc: "Receive orders across India and get paid securely via our platform." }
                    ].map((s, i) => (
                        <div key={i} className={`step-card group animate-slide-up delay-${i}`}>

                            <div className="step-icon-box group-hover-border">
                                {i + 1}
                            </div>
                            <h3 className="step-title">{s.title}</h3>
                            <p className="step-desc">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Commissions */}
            <section className="commission-section">
                <div className="commission-glow"></div>
                <div className="commission-card glass-card">
                    <div className="commission-grid">
                        <div className="commission-info">
                            <h2 className="commission-title">Fair & <br />Transparent Pricing</h2>
                            <p className="commission-subtitle">
                                We only earn when you earn. No setup fees, no hidden charges, just pure business growth.
                            </p>
                            <div className="fee-block">
                                <div className="fee-label">Platform Fee</div>
                                <div className="fee-value">5-10% <span className="fee-note">Base</span></div>
                            </div>
                            <p className="fee-disclaimer">*Category dependent tiered commission</p>
                        </div>
                        <div className="commission-list-col">
                            <h3 className="list-title">The IQVENUS Advantage:</h3>
                            <ul className="advantage-list">
                                {[
                                    "Zero Setup or Listing Fees",
                                    "Free High-Res Catalog Support",
                                    "AI-Powered Demand Insights",
                                    "Priority Seller Support 24/7"
                                ].map(text => (
                                    <li key={text} className="advantage-item group">
                                        <div className="check-icon group-hover-check">✓</div>
                                        <span className="advantage-text group-hover-white">{text}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="apply-btn-wrapper">
                                <Link to="/register?role=vendor" className="apply-btn">Start Selling Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="faq-section">
                <div className="section-header">
                    <h2 className="section-title">Seller <span className="gradient-text">Q&A</span></h2>
                    <p className="section-subtitle">Everything you need to know to get started</p>
                </div>

                <div className="faq-grid">
                    {[
                        { q: "Who can sell on IQVENUS?", a: "Registered artisans, cooperatives, craft studios, MSMEs, and rural producers with authentic handcrafted products." },
                        { q: "How long does approval take?", a: "Typically, our team verifies identity and product quality within 24–48 hours after document submission." },
                        { q: "Are there any monthly fees?", a: "No. You only pay a small commission on successful sales. There are no subscription or listing fees." },
                        { q: "When do I get paid?", a: "Payments are settled weekly after successful order delivery directly into your registered bank account." }
                    ].map((faq, i) => (
                        <div key={i} className={`faq-card glass-card group animate-slide-up delay-${i}`}>
                            <h3 className="faq-question">
                                <span className="faq-q-mark">Q.</span>
                                {faq.q}
                            </h3>
                            <div className="faq-answer">
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2 className="cta-title">Grow Your Craft <br /><span className="gradient-text">Business</span></h2>
                    <div className="cta-subtitle-box">
                        <p className="cta-subtitle">Join thousands of Indian artisans already selling online and reaching customers nationwide.</p>
                        <Link to="/register?role=vendor" className="primary-btn btn-lg">Start Selling Now</Link>
                    </div>
                    <div className="trust-badges group">
                        {['✓ Verified Identity', '✓ Secure Escrow', '✓ 24/7 Seller Support'].map(item => (
                            <span key={item} className="trust-badge group-hover-visible">{item}</span>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VendorLanding;

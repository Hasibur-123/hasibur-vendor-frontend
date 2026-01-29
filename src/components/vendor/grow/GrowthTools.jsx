import React from 'react';
import { Link } from 'react-router-dom';
import './GrowthTools.css';

const GrowthTools = () => {
    return (
        <div className="growth-container">
            {/* Hero */}
            <section className="growth-hero">
                <div className="growth-hero-content">
                    <h1 className="growth-hero-title">Tools to Accelerate Your Growth</h1>
                    <p className="growth-hero-subtitle">
                        From advertising to automated pricing, we provide a suite of tools designed to help you reach more customers and increase sales.
                    </p>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="growth-tools-section">
                <h2 className="growth-section-title">Explore Growth Solutions</h2>
                <div className="growth-grid">
                    <div className="growth-card">
                        <div className="growth-icon">📢</div>
                        <h3 className="growth-card-title">Sponsored Products</h3>
                        <p className="growth-card-desc">
                            Boost visibility by advertising your listings on the first page of search results. You only pay when a customer clicks your ad.
                        </p>
                        <Link to="#" className="growth-link">Start Advertising &rarr;</Link>
                    </div>

                    <div className="growth-card">
                        <div className="growth-icon">🎟️</div>
                        <h3 className="growth-card-title">Vendar Coupons</h3>
                        <p className="growth-card-desc">
                            Offer digital coupons to incentivize purchases. Coupons appear directly on search results and product pages.
                        </p>
                        <Link to="#" className="growth-link">Create a Coupon &rarr;</Link>
                    </div>

                    <div className="growth-card">
                        <div className="growth-icon">⚡</div>
                        <h3 className="growth-card-title">Lightning Deals</h3>
                        <p className="growth-card-desc">
                            Run limited-time flash sales that are featured on the Vendar Deals page, creating urgency and driving high volume.
                        </p>
                        <Link to="#" className="growth-link">Submit a Deal &rarr;</Link>
                    </div>

                    <div className="growth-card">
                        <div className="growth-icon">🤖</div>
                        <h3 className="growth-card-title">Automated Pricing</h3>
                        <p className="growth-card-desc">
                            Stay competitive without manual updates. Set rules to automatically adjust your prices in response to the Buy Box price.
                        </p>
                        <Link to="#" className="growth-link">Configure Rules &rarr;</Link>
                    </div>

                    <div className="growth-card">
                        <div className="growth-icon">®️</div>
                        <h3 className="growth-card-title">Brand Registry</h3>
                        <p className="growth-card-desc">
                            Protect your intellectual property and unlock A+ Content to tell your brand story with rich images and text.
                        </p>
                        <Link to="#" className="growth-link">Enroll Brand &rarr;</Link>
                    </div>

                    <div className="growth-card">
                        <div className="growth-icon">📊</div>
                        <h3 className="growth-card-title">Business Analytics</h3>
                        <p className="growth-card-desc">
                            Get deep insights into your sales, traffic, and conversion rates. Understand what profitable products to stock.
                        </p>
                        <Link to="#" className="growth-link">View Dashboard &rarr;</Link>
                    </div>
                </div>
            </section>

            {/* Spotlight */}
            <section className="marketing-spotlight">
                <div className="spotlight-container">
                    <div className="spotlight-img">
                        <img src="/assets/analytics-dashboard.png" alt="Analytics Dashboard" />
                    </div>
                    <div className="spotlight-content">
                        <h2 className="spotlight-title">Advertise with Confidence</h2>
                        <p className="spotlight-desc">
                            "Sponsored Products helped us increase our daily sales by 40% in just two weeks. The dashboard makes it easy to see exactly what we're spending and earning."
                        </p>
                        <Link to="#" className="primary-btn">Launch Campaign</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GrowthTools;

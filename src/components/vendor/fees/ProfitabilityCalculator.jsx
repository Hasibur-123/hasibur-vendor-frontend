import React from 'react';
import './VendorFees.css';

const ProfitabilityCalculator = () => {
    return (
        <div className="fees-container">
            <section className="fees-hero">
                <h1 className="fees-hero-title">Profitability Calculator</h1>
                <p className="fees-hero-subtitle">Estimate your real earnings before you list.</p>
            </section>


            <section className="calc-example-section">
                <h2 className="section-heading">Real-world Example</h2>
                <div className="calc-box">

                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                        Handmade Cotton Shirt
                    </h3>

                    <div className="calc-row">
                        <span className="calc-label" style={{ color: '#333' }}>Selling Price</span>
                        <span className="calc-value">₹ 1,000</span>
                    </div>

                    <div className="calc-row">
                        <span className="calc-label">(-) Referral Fee (13%)</span>
                        <span className="calc-value" style={{ color: '#B12704' }}>₹ 130</span>
                    </div>

                    <div className="calc-row">
                        <span className="calc-label">(-) Closing Fee</span>
                        <span className="calc-value" style={{ color: '#B12704' }}>₹ 10</span>
                    </div>

                    <div className="calc-row">
                        <span className="calc-label">(-) Shipping (Easy Ship, National)</span>
                        <span className="calc-value" style={{ color: '#B12704' }}>₹ 70</span>
                    </div>
                    <div className="calc-row">
                        <span className="calc-label">(-) GST on Fees (18%)</span>
                        <span className="calc-value" style={{ color: '#B12704' }}>₹ 37.8</span>
                    </div>

                    <div className="calc-row total">
                        <span className="calc-label" style={{ color: '#00af5b' }}>Total Earnings</span>
                        <span className="calc-value" style={{ color: '#00af5b' }}>₹ 752.2</span>
                    </div>
                </div>
                <p style={{ marginTop: '2rem', color: '#555', fontStyle: 'italic' }}>
                    * This is an estimate. Actual values may vary based on weight and precise location.
                </p>
            </section>
        </div>
    );
};

export default ProfitabilityCalculator;

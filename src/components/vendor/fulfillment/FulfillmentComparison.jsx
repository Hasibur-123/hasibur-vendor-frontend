import React from 'react';
import { Link } from 'react-router-dom';
import './FulfillmentComparison.css';

const FulfillmentComparison = () => {
    return (
        <div className="fulfillment-container">
            {/* Hero */}
            <section className="fulfillment-hero">
                <div className="fulfillment-hero-content">
                    <h1 className="fulfillment-title">Choose Your Fulfillment Channel</h1>
                    <p className="fulfillment-subtitle">
                        Compare our three fulfillment models to find the one that fits your business needs, budget, and operational capabilities.
                    </p>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="comparison-section">
                <table className="compare-table">
                    <thead>
                        <tr>
                            <th className="compare-feature">Feature</th>
                            <th className="best-choice-header">
                                <span className="badge-fbv">RECOMMENDED</span><br />
                                Fulfillment by Vendar (FBV)
                            </th>
                            <th className="compare-header">Easy Ship</th>
                            <th className="compare-header">Self Ship</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="compare-feature">Prime Badge</td>
                            <td className="best-choice"><span className="check-mark">✓</span></td>
                            <td><span className="cross-mark">—</span></td>
                            <td><span className="cross-mark">—</span></td>
                        </tr>
                        <tr>
                            <td className="compare-feature">Warehousing</td>
                            <td className="best-choice">Managed by Vendar</td>
                            <td>Managed by You</td>
                            <td>Managed by You</td>
                        </tr>
                        <tr>
                            <td className="compare-feature">Packing & Labeling</td>
                            <td className="best-choice">Managed by Vendar</td>
                            <td>Managed by You</td>
                            <td>Managed by You</td>
                        </tr>
                        <tr>
                            <td className="compare-feature">Delivery to Customer</td>
                            <td className="best-choice">Vendar Logistics</td>
                            <td>Vendar Logistics</td>
                            <td>Your Carrier (e.g. FedEx)</td>
                        </tr>
                        <tr>
                            <td className="compare-feature">Customer Service & Returns</td>
                            <td className="best-choice">Managed by Vendar</td>
                            <td>Managed by Vendar (Partial)</td>
                            <td>Managed by You</td>
                        </tr>
                        <tr>
                            <td className="compare-feature">Pay on Delivery (COD)</td>
                            <td className="best-choice"><span className="check-mark">✓</span></td>
                            <td><span className="check-mark">✓</span></td>
                            <td>Depends on your carrier</td>
                        </tr>
                        <tr>
                            <td className="compare-feature">Fee Structure</td>
                            <td className="best-choice">Storage + Weight Handling</td>
                            <td>Shipping Fee only</td>
                            <td>You pay carrier directly</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* CTA */}
            <section className="calc-cta-section">
                <div className="calc-cta-content">
                    <h2 className="calc-cta-title">Not sure about the costs?</h2>
                    <p>Use our Profitability Calculator to see estimated earnings for each fulfillment method.</p>
                    <Link to="/vendor/profitability-calculator" className="primary-btn">Calculate Your Profit</Link>
                </div>
            </section>
        </div>
    );
};

export default FulfillmentComparison;

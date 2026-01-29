import React from 'react';
import { Link } from 'react-router-dom';
import './VendorFees.css';

const VendorFees = () => {
    return (
        <div className="fees-container">
            <section className="fees-hero">
                <h1 className="fees-hero-title">Understanding Fees</h1>
                <p className="fees-hero-subtitle">
                    Our fee structure is transparent and simple. You only pay when you sell.
                    There are no setup fees or monthly subscription charges.
                </p>
            </section>

            <section className="fees-section">
                <div className="fee-types-grid">
                    {/* Referral Fee */}
                    <div className="fee-card">
                        <div className="fee-header">
                            <div className="fee-icon-circle">₹</div>
                            <h2 className="fee-title">Referral Fee</h2>
                        </div>
                        <p className="fee-desc">
                            A percentage of the selling price charged for facilitating the sale on Vendar. This varies by product category.
                        </p>
                        <div className="fee-example">
                            <strong>Typically:</strong> 5% to 15% of item price.
                        </div>
                    </div>

                    {/* Closing Fee */}
                    <div className="fee-card">
                        <div className="fee-header">
                            <div className="fee-icon-circle">🔒</div>
                            <h2 className="fee-title">Closing Fee</h2>
                        </div>
                        <p className="fee-desc">
                            A small fixed fee charged per unit sold, based on the price range of the product.
                        </p>
                        <div className="fee-example">
                            <strong>Typically:</strong> ₹5 to ₹25 per unit.
                        </div>
                    </div>

                    {/* Shipping Fee */}
                    <div className="fee-card">
                        <div className="fee-header">
                            <div className="fee-icon-circle">🚚</div>
                            <h2 className="fee-title">Shipping Fee</h2>
                        </div>
                        <p className="fee-desc">
                            Charged if you use Vendar Easy Ship or Fulfillment by Vendar (FBV). Calculated based on weight and distance.
                        </p>
                        <div className="fee-example">
                            <strong>Starts at:</strong> ₹40 for local delivery (500g).
                        </div>
                    </div>
                </div>
            </section>

            <section className="fee-table-section">
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Referral Fee Schedule</h2>
                <table className="fee-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Fee Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Apparel & Accessories</td><td>13%</td></tr>
                        <tr><td>Jewelry (Precious)</td><td>5%</td></tr>
                        <tr><td>Jewelry (Fashion)</td><td>15%</td></tr>
                        <tr><td>Home Decor & Handicrafts</td><td>12%</td></tr>
                        <tr><td>Books</td><td>5%</td></tr>
                        <tr><td>Toys</td><td>11%</td></tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default VendorFees;

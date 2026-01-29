import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentCycles.css';

const PaymentCycles = () => {
    return (
        <div className="payouts-container">
            {/* Hero */}
            <section className="payouts-hero">
                <div className="payouts-hero-content">
                    <h1 className="payouts-title">Payment Cycles Explained</h1>
                    <p className="payouts-subtitle">
                        Get paid securely and regularly. Vendar settles your payments directly to your bank account every 7 days.
                    </p>
                </div>
            </section>

            {/* Cycle Steps */}
            <section className="cycle-section">
                <h2 className="payouts-section-title">How the payment process works</h2>
                <div className="cycle-steps">
                    <div className="cycle-step">
                        <div className="step-icon-circle">📦</div>
                        <h3 className="step-title">Order Shipped</h3>
                        <p className="step-desc">
                            The cycle begins when you confirm shipment (Self Ship) or when we ship it (FBV).
                        </p>
                    </div>
                    <div className="cycle-step">
                        <div className="step-icon-circle">⏳</div>
                        <h3 className="step-title">7-Day Hold</h3>
                        <p className="step-desc">
                            Proceeds are held for 7 days after delivery to cover any potential returns or claims.
                        </p>
                    </div>
                    <div className="cycle-step">
                        <div className="step-icon-circle">💸</div>
                        <h3 className="step-title">Balance Cleared</h3>
                        <p className="step-desc">
                            On the 8th day, the eligible balance becomes 'Available for Payout'.
                        </p>
                    </div>
                    <div className="cycle-step">
                        <div className="step-icon-circle">🏦</div>
                        <h3 className="step-title">Bank Transfer</h3>
                        <p className="step-desc">
                            Vendar automatically transfers the available balance to your bank account every Monday.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="payouts-faq-section">
                <div className="payouts-faq-container">
                    <h2 className="payouts-section-title">Common Questions</h2>

                    <div className="payout-card">
                        <h3><span style={{ color: '#FF9900' }}>Q.</span> How often will I get paid?</h3>
                        <p>
                            Vendar operates on a weekly payout cycle. Settlements are initiated every Monday for all orders that have completed their 7-day post-delivery window.
                        </p>
                    </div>

                    <div className="payout-card">
                        <h3><span style={{ color: '#FF9900' }}>Q.</span> What deduction happens before payout?</h3>
                        <p>
                            We deduct the Vendar Referral Fees, Closing Fees, and Shipping Fees (if using Easy Ship/FBV) before transferring the net amount to you. GST on fees is also deducted.
                        </p>
                    </div>

                    <div className="payout-card">
                        <h3><span style={{ color: '#FF9900' }}>Q.</span> Why is my balance 'Reserved'?</h3>
                        <p>
                            A portion of your sales may be held in 'rolling reserve' if you are a new seller or have high return rates, to ensure you have funds to cover potential refunds.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PaymentCycles;

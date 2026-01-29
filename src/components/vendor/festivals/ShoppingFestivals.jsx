import React from 'react';
import { Link } from 'react-router-dom';
import './ShoppingFestivals.css';

const ShoppingFestivals = () => {
    const festivals = [
        {
            month: "Jan",
            name: "Republic Day Sale",
            date: "Jan 20 - Jan 26",
            desc: "Kickstart the year with huge demand for electronics and fashion."
        },
        {
            month: "Mar",
            name: "Holi Shopping Store",
            date: "Mar 10 - Mar 15",
            desc: "Focus on apparel, puja essentials, and sweets/gourmet foods."
        },
        {
            month: "July",
            name: "Prime Day",
            date: "July 12 - July 13",
            desc: "The biggest event for Prime members. Exclusive launches & lightning deals."
        },
        {
            month: "Oct",
            name: "Great Indian Festival",
            date: "Oct 5 - Nov 10",
            desc: "The month-long celebration covering Dussehra and Diwali. Peak traffic of the year."
        }
    ];

    return (
        <div className="festivals-container">
            {/* Hero */}
            <section className="festivals-hero">
                <div className="festivals-hero-content">
                    <h1 className="festivals-title">Celebrate Success</h1>
                    <p className="festivals-subtitle">
                        Participate in India's biggest shopping festivals.
                        Vendors see up to 5x jump in sales during the Great Indian Festival.
                    </p>
                    <Link to="/register?role=vendor" className="primary-btn" style={{ background: '#FF9900', color: '#111' }}>Start Preparing</Link>
                </div>
            </section>

            {/* Timeline */}
            <section className="timeline-section">
                <div className="section-header-fest">
                    <h2>Mark Your Calendar</h2>
                    <p>Key sales events you shouldn't miss</p>
                </div>

                <div className="timeline-grid">
                    {festivals.map((fest, index) => (
                        <div key={index} className="timeline-item">
                            <div className="fest-card">
                                <span className="fest-name">{fest.name}</span>
                                <div className="fest-date">{fest.date}</div>
                                <p className="fest-desc">{fest.desc}</p>
                            </div>
                            <div className="month-circle"></div>
                            <div style={{ fontWeight: '700', color: '#555' }}>{fest.month}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* How to Prep */}
            <section className="prep-section">
                <h2>How to Win This Festive Season</h2>
                <div className="prep-grid">
                    <div className="prep-item">
                        <div className="prep-icon">📦</div>
                        <h3 className="prep-title">Stock Up Early</h3>
                        <p className="prep-desc">
                            Inbound your inventory to our fulfillment centers at least 3 weeks before the event starts.
                        </p>
                    </div>
                    <div className="prep-item">
                        <div className="prep-icon">💰</div>
                        <h3 className="prep-title">Plan Discounts</h3>
                        <p className="prep-desc">
                            Schedule Coupons and Lightning Deals in advance to attract bargain hunters.
                        </p>
                    </div>
                    <div className="prep-item">
                        <div className="prep-icon">📸</div>
                        <h3 className="prep-title">Refresh Content</h3>
                        <p className="prep-desc">
                            Update your product images and titles with festive keywords (e.g., "Diwali Gift").
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ShoppingFestivals;

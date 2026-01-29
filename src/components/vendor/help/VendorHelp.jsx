import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './VendorHelp.css';

const VendorHelp = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const topics = [
        { icon: "getting-started", title: "Getting Started", desc: "Registering account, listing first product, and verification." },
        { icon: "shipping", title: "Shipping & Delivery", desc: "Managing orders, scheduling pickups, and shipping fees." },
        { icon: "payments", title: "Payments & Fees", desc: "Understanding commission, closing fees, and payout cycles." },
        { icon: "returns", title: "Returns & Refunds", desc: "Managing return requests and refunding customers." },
        { icon: "account", title: "Account Settings", desc: "Updating business info, GST details, and login security." },
        { icon: "growth", title: "Grow Business", desc: "Advertising, promotions, and performance metrics." }
    ];

    const faqs = [
        {
            q: "How do I update my bank account details?",
            a: "Go to Settings > Account Info > Bank Account. Enter your new details. For security, there may be a 3-day hold on payouts after updating bank info."
        },
        {
            q: "What happens if a customer returns a product?",
            a: "If using FBV, we handle it. If Self-Ship, you must authorize the return within 48 hours. Once received, issue a refund from the Orders dashboard."
        },
        {
            q: "Why is my listing verified but not active?",
            a: "Check your inventory level. If quantity is 0, the listing is inactive. Also ensure you have no pending quality alerts on the dashboard."
        },
        {
            q: "How is the commission calculated?",
            a: "Commission is a percentage of the final selling price (including shipping). The rate depends on the product category (refer to Fee Schedule)."
        }
    ];

    const renderIcon = (iconType) => {
        switch (iconType) {
            case 'getting-started':
                return <svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" stroke="#1A237E" strokeWidth="2" /><circle cx="32" cy="28" r="2" fill="#FFD700" /><line x1="32" y1="30" x2="32" y2="38" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" /><line x1="28" y1="34" x2="36" y2="34" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" /></svg>;
            case 'shipping':
                return <svg viewBox="0 0 64 64" fill="none"><rect x="16" y="20" width="32" height="24" rx="2" stroke="#1A237E" strokeWidth="2" /><path d="M22 28l6 6 12-12" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
            case 'payments':
                return <svg viewBox="0 0 64 64" fill="none"><rect x="18" y="16" width="28" height="36" rx="2" stroke="#1A237E" strokeWidth="2" /><line x1="22" y1="20" x2="42" y2="20" stroke="#FFD700" strokeWidth="1.5" /><line x1="20" y1="28" x2="44" y2="28" stroke="#FFD700" strokeWidth="1.5" /><line x1="20" y1="36" x2="44" y2="36" stroke="#FFD700" strokeWidth="1.5" /><circle cx="32" cy="48" r="1.5" fill="#1A237E" /></svg>;
            case 'returns':
                return <svg viewBox="0 0 64 64" fill="none"><path d="M20 32h24v14H20z" stroke="#1A237E" strokeWidth="2" fill="none" /><path d="M32 16v14M28 26l4-4 4 4" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
            case 'account':
                return <svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="26" r="6" stroke="#1A237E" strokeWidth="2" fill="none" /><path d="M18 42c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#FFD700" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>;
            case 'growth':
                return <svg viewBox="0 0 64 64" fill="none"><polyline points="18 44 26 34 32 38 46 20" stroke="#1A237E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx="46" cy="20" r="2" fill="#FFD700" /></svg>;

            default:
                return null;
        }
    };

    return (
        <div className="v-help-container">

            {/* HERO SECTION WITH BACKGROUND IMAGE */}
            <section className="v-help-hero">
                <div className="v-help-hero-overlay"></div>

                <div className="v-help-hero-content">
                    <h1 className="v-help-title">How can we help you?</h1>

                    <div className="v-help-search-box">
                        <span className="v-help-search-icon">🔍</span>
                        <input
                            type="text"
                            className="v-help-input"
                            placeholder="Type a topic, question, or keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* TOPICS GRID */}
            <section className="v-help-topics-section">
                <div className="v-topics-grid">
                    {topics.map((topic, index) => (
                        <Link to="#" key={index} className="v-topic-card">
                            <div className="v-topic-icon">
                                {renderIcon(topic.icon)}
                            </div>
                            <h3 className="v-topic-title">{topic.title}</h3>
                            <p className="v-topic-desc">{topic.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="v-faq-section">
                <h2 className="v-faq-heading">Frequently Asked Questions</h2>

                <div className="v-faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className="v-faq-item">
                            <button className="v-faq-trigger" onClick={() => toggleFaq(index)}>
                                {faq.q}
                                <span>{openFaq === index ? '−' : '+'}</span>
                            </button>
                            <div className={`v-faq-content ${openFaq === index ? 'open' : ''}`}>
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CONTACT FOOTER */}
            <section className="v-contact-footer">
                <h2 className="v-contact-title">Need more help?</h2>
                <p>Our Seller Support team is available 24/7 to assist you.</p>
                <Link to="/support" className="v-contact-btn">Contact Seller Support</Link>
            </section>

        </div>
    );
};

export default VendorHelp;

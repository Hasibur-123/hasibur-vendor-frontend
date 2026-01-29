import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceProviders.css';

const ServiceProviders = () => {
    const services = [
        {
            icon: "📷",
            title: "Imaging",
            desc: "Get professional product photos that meet Vendar's standards. High-quality images can increase sales by up to 15%.",
            link: "Explore Photographers"
        },
        {
            icon: "📋",
            title: "Cataloging",
            desc: "Experts who help you create rich product descriptions, updated attributes, and accurate variations.",
            link: "Find Cataloging Experts"
        },
        {
            icon: "💼",
            title: "Account Management",
            desc: "Hire a dedicated manager to oversee your daily operations, pricing strategy, and inventory health.",
            link: "Hire an Account Manager"
        },
        {
            icon: "📢",
            title: "Advertising Optimization",
            desc: "Specialists to set up and manage your Sponsored Products campaigns for maximum ROI.",
            link: "Find Ad Specialists"
        },
        {
            icon: "📦",
            title: "Storage & Prep",
            desc: "Third-party warehouses to store your goods and prepare them for FBA/FBV (labeling, poly-bagging).",
            link: "View Storage Partners"
        },
        {
            icon: "⚖️",
            title: "Tax & Accounting",
            desc: "Chartered Accountants to help with GST registration, monthly filings, and financial reconciliation.",
            link: "Accounting Services"
        }
    ];

    return (
        <div className="spn-container">
            {/* Hero */}
            <section className="spn-hero">
                <div className="spn-hero-content">
                    <h1 className="spn-hero-title">Service Provider Network</h1>
                    <p className="spn-hero-subtitle">
                        Connect with vetting third-party professionals to help you bridge the gap between where you are and where you want to be.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="spn-categories-section">
                <h2 className="spn-section-title">What help do you need today?</h2>
                <div className="spn-grid">
                    {services.map((service, index) => (
                        <div key={index} className="spn-card">
                            <span className="spn-icon">{service.icon}</span>
                            <h3 className="spn-card-title">{service.title}</h3>
                            <p className="spn-card-desc">{service.desc}</p>
                            <Link to="#" className="spn-link">{service.link} &rarr;</Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Provider Spotlight */}
            <section className="spn-featured-section">
                <div className="spn-featured-container">
                    <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                        alt="Service Provider"
                        className="featured-provider-img"
                    />
                    <div className="featured-content">
                        <span className="featured-badge">Featured Partner</span>
                        <blockquote className="featured-quote">
                            "We utilized the Imaging services from the network. The quality of our listing improved drastically, and we saw a 2x jump in page views within a week."
                        </blockquote>
                        <div className="featured-author">
                            - Rajesh Exports, <span style={{ fontWeight: '400', color: '#555' }}>seller since 2023</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="spn-cta-section">
                <h2 style={{ marginBottom: '1rem' }}>Ready to scale?</h2>
                <p>Browse through 500+ verified service providers.</p>
                <Link to="#" className="spn-cta-btn">Browse All Services</Link>
            </section>
        </div>
    );
};

export default ServiceProviders;

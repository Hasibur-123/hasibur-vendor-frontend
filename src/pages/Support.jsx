import React from 'react';
import './Support.css';

const Support = () => {
    return (
        <div className="support-container animate-fade-in">
            <header className="support-header">
                <div className="priority-badge">
                    <span className="pulse-dot animate-pulse"></span>
                    <span className="priority-text">Priority Resolution Node</span>
                </div>
                <h1 className="support-title">GUILD <span className="gradient-text">CONCIERGE</span></h1>
                <p className="support-subtitle">
                    Facing an anomaly in your acquisition or studio sync? Our resolution architects are standing by 24/7.
                </p>
            </header>

            <div className="support-grid">
                {/* Contact Card */}
                <div className="support-card glass-card animate-slide-up">
                    <div className="card-icon">📡</div>
                    <div className="card-content">
                        <h3 className="card-title">Direct <span className="text-primary">Intelligence</span></h3>
                        <p className="card-desc">Initiate a secure comms channel with our support team regarding order manifests or profile synchronization.</p>

                        <div className="contact-methods">
                            <div className="contact-box group">
                                <p className="contact-label">Electronic Mail</p>
                                <p className="contact-value group-hover-primary">concierge@vendar.io</p>
                            </div>
                            <div className="contact-box group">
                                <p className="contact-label">Global Hotline</p>
                                <p className="contact-value group-hover-secondary">+91 (800) VENDAR-HQ</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ / Handbooks Card */}
                <div className="support-card glass-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="card-icon">📔</div>
                    <div className="card-content">
                        <h3 className="card-title">Protocol <span className="text-secondary">Library</span></h3>
                        <p className="card-desc">Access the standard operating procedures for the Vendar ecosystem.</p>

                        <div className="topic-list">
                            {['Shipping & Logistics Matrix', 'Refund Settlement Protocol', 'Vendor Quality Compliance', 'Secure Escrow Operations'].map(topic => (
                                <button key={topic} className="topic-btn">
                                    {topic} <span className="arrow">→</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <footer className="support-footer">
                <p className="footer-tag">Vendar Global Support Infrastructure v4.2 • Secured encrypted link</p>
            </footer>
        </div>
    );
};

export default Support;

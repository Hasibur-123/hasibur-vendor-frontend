import React from 'react';
import { Link } from 'react-router-dom';
import './SellingPrograms.css';

const SellingPrograms = () => {
    return (
        <div className="programs-container">
            <section className="programs-hero">
                <h1>Programs tailored for your needs</h1>
                <p style={{ fontSize: '1.2rem', color: '#555' }}>
                    Discover specialized programs designed to help different types of businesses succeed on Vendar.
                </p>
            </section>

            {/* Vendar Karigar - The Artisan Program */}
            <div className="program-card-large">
                <div className="program-img" style={{ backgroundImage: 'url("https://m.media-amazon.com/images/G/31/karigar/Karigar_Hero_Desktop.jpg")' }}></div>
                <div className="program-content">
                    <span className="program-badge">For Artisans & Weavers</span>
                    <h2 className="program-title">Vendar Karigar</h2>
                    <p className="program-desc">
                        A dedicated store for authentic Indian handicrafts and handlooms. We provide special marketing support to highlight the unique story of "Made in India" products.
                    </p>
                    <Link to="#" className="program-link">Join Karigar &rarr;</Link>
                </div>
            </div>

            {/* Vendar B2B */}
            <div className="program-card-large">
                <div className="program-img" style={{ backgroundImage: 'url("https://m.media-amazon.com/images/G/31/b2b/B2B_Hero_Desktop.jpg")' }}></div>
                <div className="program-content">
                    <span className="program-badge">For Wholesalers</span>
                    <h2 className="program-title">Vendar Business (B2B)</h2>
                    <p className="program-desc">
                        Sell in bulk to verified business customers. Offer quantity discounts and GST invoices to cater to corporate and institutional buyers.
                    </p>
                    <Link to="#" className="program-link">Start B2B Selling &rarr;</Link>
                </div>
            </div>

            {/* Global Selling */}
            <div className="program-card-large">
                <div className="program-img" style={{ backgroundImage: 'url("https://m.media-amazon.com/images/G/31/ags/Global_Selling_Hero.jpg")' }}></div>
                <div className="program-content">
                    <span className="program-badge">For Exporters</span>
                    <h2 className="program-title">Vendar Global Selling</h2>
                    <p className="program-desc">
                        Take your business international. Reach customers in the USA, UK, Australia, and more using our cross-border logistics solutions.
                    </p>
                    <Link to="/vendor/global-selling" className="program-link">Explore Global &rarr;</Link>
                </div>
            </div>
        </div>
    );
};

export default SellingPrograms;

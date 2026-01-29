import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ListProductsInfo.css';

const ListProductsInfo = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!(token && user));
    }, []);

    const handleAddProduct = () => {
        if (isLoggedIn) {
            navigate('/vendor/dashboard');
        } else {
            navigate('/login?redirect=/vendor/dashboard');
        }
    };

    return (
        <div className="list-products-container">
            {/* Hero */}
            <section className="lp-hero">
                <div className="lp-hero-content">
                    <h1 className="lp-hero-title">Listing Products on Vendar</h1>
                    <p className="lp-hero-desc">
                        Showcase your unique craftsmanship to the world. Our tools make it easy to create beautiful, accurate listings that attract buyers.
                    </p>
                    <button className="lp-primary-btn" onClick={handleAddProduct}>
                        Add a Product Now
                    </button>
                </div>
            </section>

            {/* Methods */}
            <section className="lp-methods-section">
                <h2 className="lp-section-heading">Ways to List Your Products</h2>
                <div className="lp-methods-grid">
                    {/* Method 1: Single Upload */}
                    <div className="lp-method-card">
                        <div className="lp-method-img">
                            <img src="/assets/product-upload-single.png" alt="Single Product Upload" />
                        </div>
                        <div className="lp-method-content">
                            <h3 className="lp-method-title">Create a New Listing</h3>
                            <p className="lp-method-desc">
                                Perfect for artisans with unique, handmade items. Upload images, write a story about your craft, and set your price.
                            </p>
                            <button className="lp-link" onClick={handleAddProduct} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                                Start listing single products &rarr;
                            </button>
                        </div>
                    </div>

                    {/* Method 2: Bulk Upload */}
                    <div className="lp-method-card">
                        <div className="lp-method-img">
                            <img src="/assets/product-upload-bulk.png" alt="Bulk Upload" />
                        </div>
                        <div className="lp-method-content">
                            <h3 className="lp-method-title">Bulk Upload Tool</h3>
                            <p className="lp-method-desc">
                                Have a large inventory? Use our spreadsheet templates to upload multiple variations or products at once.
                            </p>
                            <button className="lp-link" onClick={() => {
                                if (isLoggedIn) {
                                    navigate('/vendor/dashboard');
                                } else {
                                    navigate('/login?redirect=/vendor/dashboard');
                                }
                            }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                                Learn about bulk listing &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Step-by-Step Guide */}
            <section className="lp-steps-section">
                <div className="lp-steps-container">
                    <h2 className="lp-section-heading">How to create a perfect listing</h2>

                    <div className="lp-step-row">
                        <div className="lp-step-number">01</div>
                        <div className="lp-step-content">
                            <h3 className="lp-step-title">Product Identity</h3>
                            <p className="lp-step-desc">
                                Provide a clear title and select the correct category (e.g., Home Decor, Jewelry). This helps customers find your product easily in search results.
                            </p>
                        </div>
                    </div>

                    <div className="lp-step-row">
                        <div className="lp-step-number">02</div>
                        <div className="lp-step-content">
                            <h3 className="lp-step-title">High-Quality Images</h3>
                            <p className="lp-step-desc">
                                Upload at least 3-4 images showing your product from different angles. Good lighting and a plain background work best to showcase details.
                            </p>
                        </div>
                    </div>

                    <div className="lp-step-row">
                        <div className="lp-step-number">03</div>
                        <div className="lp-step-content">
                            <h3 className="lp-step-title">Description & Story</h3>
                            <p className="lp-step-desc">
                                Describe the materials used and the craft technique. Customers on Vendar love to know the story behind the art.
                            </p>
                        </div>
                    </div>

                    <div className="lp-step-row">
                        <div className="lp-step-number">04</div>
                        <div className="lp-step-content">
                            <h3 className="lp-step-title">Price & Inventory</h3>
                            <p className="lp-step-desc">
                                Set a competitive price and update your available quantity. You can also offer bulk discounts for B2B buyers directly on the listing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools CTA */}
            <section className="lp-tools-section">
                <h2 className="lp-section-heading">Listing Tools</h2>
                <div className="lp-tools-grid">
                    <div className="lp-tool-item">
                        <span className="lp-tool-icon">📷</span>
                        <h4 className="lp-tool-title">Photo Guidelines</h4>
                        <p>Learn how to take professional photos with your phone.</p>
                    </div>
                    <div className="lp-tool-item">
                        <span className="lp-tool-icon">📋</span>
                        <h4 className="lp-tool-title">Quality Check</h4>
                        <p>Understand our quality standards for global export.</p>
                    </div>
                    <div className="lp-tool-item">
                        <span className="lp-tool-icon">🏷️</span>
                        <h4 className="lp-tool-title">Category Guide</h4>
                        <p>Find the right category for your unique artifacts.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ListProductsInfo;

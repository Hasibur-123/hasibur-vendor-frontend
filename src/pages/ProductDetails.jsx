import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/${id}`);
            setProduct(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleBuyNow = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        addToCart(product);
        navigate('/checkout');
    };

    if (loading) {
        return (
            <div className="product-loading-container">
                <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Fetching artisan masterpiece...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-loading-container">
                <div className="not-found-card glass-card">
                    <div className="not-found-icon">🔍</div>
                    <h1 className="not-found-title">Artifact Not Found</h1>
                    <Link to="/marketplace" className="return-btn">Return to Marketplace</Link>
                </div>
            </div>
        );
    }

    const isAvailable = product.availability && product.isApproved;

    return (
        <div className="product-details-container animate-fade-in">
            {/* Breadcrumb replacement / Back Button */}
            <Link to="/marketplace" className="back-link">
                <span>←</span>
                <span>Back to Marketplace</span>
            </Link>

            <div className="product-grid">
                {/* Left: Image Gallery */}
                <div className="product-gallery">
                    <div className="main-image-card glass-card">
                        <div className="image-wrapper">
                            {product.images?.[0] ? (
                                <img src={product.images[0]} alt={product.title} className="product-main-img" />
                            ) : (
                                <div className="product-placeholder">🏺</div>
                            )}
                            <div className="category-badge">
                                <span>{product.category}</span>
                            </div>
                        </div>
                    </div>

                    {product.images?.length > 1 && (
                        <div className="thumbnail-strip">
                            {product.images.map((img, idx) => (
                                <div key={idx} className="thumbnail-card glass-card">
                                    <img src={img} className="thumbnail-img" alt={`Angle ${idx + 1}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Product Details */}
                <div className="product-info-panel">
                    <div className="product-header">
                        <h1 className="product-title">{product.title}</h1>
                        <div className="price-row">
                            <span className="product-price">₹{product.price}</span>
                            <div className="divider-vertical" />
                            <span className={`availability-badge ${isAvailable ? 'available' : 'unavailable'}`}>
                                {isAvailable ? 'Authentication Verified' : 'Standard Sale'}
                            </span>
                        </div>
                    </div>

                    <div className="description-card glass-card">
                        <h3 className="section-label">The Artisan Story</h3>
                        <p className="description-text">
                            {product.description}
                        </p>
                    </div>

                    <div className="specs-grid">
                        <div className="swatch-card glass-card">
                            <div className="swatch-icon">⚡</div>
                            <div className="swatch-content">
                                <p className="swatch-label">Stock Status</p>
                                <p className={`swatch-value ${product.stock > 0 ? 'text-success' : 'text-error'}`}>
                                    {product.stock > 0 ? `${product.stock} Units Available` : 'Sold Out'}
                                </p>
                            </div>
                        </div>
                        <div className="swatch-card glass-card">
                            <div className="swatch-icon">🚚</div>
                            <div className="swatch-content">
                                <p className="swatch-label">Delivery Promise</p>
                                <p className="swatch-value">{product.deliveryInfo || 'Pan-India 3-5 Days'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Merchant Profile */}
                    {product.vendorId && (
                        <div className="merchant-card glass-card">
                            <div className="merchant-info">
                                <div className="merchant-avatar">
                                    🏪
                                </div>
                                <div className="merchant-details">
                                    <p className="merchant-label">Authorized Merchant</p>
                                    <Link to={`/vendor/${product.vendorId._id}`} className="merchant-name">
                                        {product.vendorId.businessName}
                                    </Link>
                                    <div className="merchant-meta">
                                        <span>📍 {product.vendorId.location?.city}</span>
                                        <span>•</span>
                                        <span className="text-primary">⭐ {product.vendorId.rating || '4.9'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="merchant-action">
                                <button className="view-brand-btn">
                                    View Brand
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="action-panel">
                        {user?.role === 'vendor' ? (
                            <div className="vendor-warning">
                                <div className="warning-icon animate-pulse">⚠️</div>
                                <div className="warning-content">
                                    <p className="warning-title">Merchant Perspective Enabled</p>
                                    <p className="warning-desc">You cannot purchase your own or other artifacts.</p>
                                </div>
                                <button className="dashboard-btn" onClick={() => navigate('/vendor/dashboard')}>Dashboard</button>
                            </div>
                        ) : (
                            <div className="buyer-actions">
                                <button
                                    className="buy-now-btn"
                                    disabled={!isAvailable || product.stock <= 0}
                                    onClick={handleBuyNow}
                                >
                                    <span className="btn-text">{product.stock > 0 ? 'Buy This Piece' : 'Notify Restock'}</span>
                                </button>
                                <button
                                    className="add-cart-btn"
                                    disabled={!isAvailable || product.stock <= 0}
                                    onClick={() => addToCart(product)}
                                >
                                    Add To Collection
                                </button>
                            </div>
                        )}

                        {!user && (
                            <p className="auth-hint">
                                <Link to="/login" className="login-link">Log in</Link> for guaranteed shipping coverage
                            </p>
                        )}
                    </div>

                    {/* Certifications */}
                    {product.documents?.length > 0 && (
                        <div className="certifications-section">
                            <h4 className="section-label">Authenticity Certificates</h4>
                            <div className="cert-grid">
                                {product.documents.map((doc, idx) => (
                                    <a key={idx} href={doc} target="_blank" rel="noopener noreferrer" className="cert-card glass-card">
                                        <div className="cert-icon">📜</div>
                                        <div className="cert-info">
                                            <p className="cert-label">Verification Doc</p>
                                            <p className="cert-name">Artifact-Spec-{idx + 1}.pdf</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

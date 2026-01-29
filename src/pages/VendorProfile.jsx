import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ChatWindow from '../components/common/ChatWindow';
import './VendorProfile.css';

const VendorProfile = () => {
    const { id } = useParams(); // Vendor ID
    const [vendor, setVendor] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vendorRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/vendors/${id}`);
                setVendor(vendorRes.data);

                const productsRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products?vendorId=${id}`);
                setProducts(productsRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, [id]);

    if (!vendor) {
        return (
            <div className="profile-loading-container">
                <div className="profile-loader"></div>
            </div>
        );
    }

    return (
        <div className="public-profile-container animate-fade-in">
            {/* Header / Hero */}
            <header className="profile-header glass-card">
                <div className="profile-avatar-container">
                    <div className="profile-avatar">🏪</div>
                    <div className="avatar-glow"></div>
                </div>

                <h1 className="business-name">{vendor.businessName}</h1>

                <div className="location-badge">
                    <span className="location-icon">📍</span>
                    <span>{vendor.location?.city}, {vendor.location?.state}</span>
                </div>

                <p className="business-desc">{vendor.description || 'No description available for this artisan studio.'}</p>

                <div className="action-row">
                    <button className="contact-btn" onClick={() => setShowChat(true)}>
                        <span className="btn-icon">💬</span>
                        Chat with Artisan
                    </button>
                    <div className="stats-row">
                        <div className="stat-pill">
                            <span className="stat-value">{products.length}</span>
                            <span className="stat-label">Artifacts</span>
                        </div>
                        <div className="stat-pill">
                            <span className="stat-value">{vendor.rating} ★</span>
                            <span className="stat-label">Rating</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Products Grid */}
            <section className="profile-content">
                <div className="section-header">
                    <h2 className="section-title">The <span className="gradient-text">Collection</span></h2>
                    <div className="section-divider"></div>
                </div>

                {products.length > 0 ? (
                    <div className="collection-grid">
                        {products.map((product, i) => (
                            <Link to={`/product/${product._id}`} key={product._id} className="collection-card glass-card animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                                <div className="card-image-wrapper">
                                    {product.images && product.images[0] ? (
                                        <img src={product.images[0]} alt={product.title} className="card-image" />
                                    ) : (
                                        <div className="placeholder-image">📦</div>
                                    )}
                                    <div className="overlay-gradient"></div>
                                    <div className="view-btn">
                                        View Artifact
                                    </div>
                                </div>
                                <div className="card-details">
                                    <h3 className="card-title">{product.title}</h3>
                                    <p className="card-price">₹{product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="empty-collection glass-card">
                        <div className="empty-icon">🏺</div>
                        <p className="empty-text">This artisan has not listed any artifacts yet.</p>
                    </div>
                )}
            </section>

            {/* Chat Overlay */}
            {showChat && currentUser && (
                <ChatWindow
                    currentUserId={currentUser.id}
                    targetUserId={vendor.userId._id}
                    targetName={vendor.businessName}
                    onClose={() => setShowChat(false)}
                />
            )}

            {/* Login Prompt for Chat */}
            {showChat && !currentUser && (
                <div className="login-prompt glass-card animate-slide-up">
                    <div className="prompt-content">
                        <div className="prompt-icon">🔒</div>
                        <p className="prompt-text">Please login to start a secure conversation.</p>
                        <button className="prompt-close-btn" onClick={() => setShowChat(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorProfile;

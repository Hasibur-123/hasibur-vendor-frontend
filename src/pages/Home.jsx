import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [trending, setTrending] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    useEffect(() => {
        fetchTrending();
    }, []);

    const fetchTrending = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/latest`);
            setTrending(response.data.slice(0, 4));
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) navigate(`/marketplace?search=${search}`);
    };

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.pageYOffset);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="home-container animate-fade-in">
            {/* NEW Premium Centered Hero Section */}
            <section className="hero-modern">
                <div className="hero-bg-overlay"></div>
                <div className="hero-content-centered animate-fade-in">
                    {/* Premium Hero Disclaimer Aspect */}
                    <div className="hero-disclaimer-premium">
                        <div className="status-glow-container">
                            <span className="status-glow"></span>
                        </div>
                        <div className="disclaimer-content-lux">
                            <span className="disclaimer-label">Live Preview</span>
                            <span className="disclaimer-separator"></span>
                            <p className="disclaimer-text-main">
                                Currently in <strong>Private Beta & Maintenance</strong>
                            </p>
                        </div>
                    </div>

                    <div className="hero-tagline-chips">
                        <span className="tag-chip">Handmade</span>
                        <span className="tag-chip">Authentic</span>
                        <span className="tag-chip">Fair Trade</span>
                        <span className="tag-chip">PAN India Delivery</span>
                    </div>

                    <h1 className="hero-main-title">
                        Discover Authentic <br />
                        <span className="saffron-text">Indian Handcrafted</span> Products
                    </h1>

                    <p className="hero-description">
                        Directly from skilled artisans across India. Ethical, handmade, premium quality.
                    </p>

                    <div className="hero-search-container glass-card">
                        <form onSubmit={handleSearch} className="hero-search-form">
                            <input
                                type="text"
                                placeholder="Search handmade products, categories, or artisans..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="hero-search-input"
                            />
                            <button type="submit" className="hero-search-btn">
                                Search
                            </button>
                        </form>
                    </div>

                    <div className="hero-category-chips">
                        {['Pottery', 'Jewelry', 'Wooden Crafts', 'Textiles', 'Home Decor'].map(cat => (
                            <Link key={cat} to={`/marketplace?category=${cat}`} className="cat-chip">
                                {cat}
                            </Link>
                        ))}
                    </div>

                    <div className="hero-actions">
                        <Link to="/marketplace" className="btn-primary-lux">
                            Shop Handcrafted Products
                        </Link>
                        <Link
                            to={user?.role === 'vendor' ? "/vendor/dashboard" : "/become-a-vendor"}
                            className="btn-ghost-lux"
                        >
                            Become a Vendor
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Signals Section */}
            <section className="trust-signals">
                <div className="trust-container">
                    <div className="trust-item">
                        <span className="trust-icon">⭐</span>
                        <div className="trust-text">
                            <strong>10,000+</strong>
                            <span>Artisans</span>
                        </div>
                    </div>
                    <div className="trust-item">
                        <span className="trust-icon">🚚</span>
                        <div className="trust-text">
                            <strong>PAN India</strong>
                            <span>Delivery</span>
                        </div>
                    </div>
                    <div className="trust-item">
                        <span className="trust-icon">🛡️</span>
                        <div className="trust-text">
                            <strong>100% Authentic</strong>
                            <span>Handmade</span>
                        </div>
                    </div>
                    <div className="trust-item">
                        <span className="trust-icon">💳</span>
                        <div className="trust-text">
                            <strong>Secure</strong>
                            <span>Payments</span>
                        </div>
                    </div>
                </div>
            </section>



            {/* Premium Curated Collections */}
            <section id="categories" className="collections-section">
                <div className="container">
                    <div className="section-title-box">
                        <span className="section-tag">Explore Collections</span>
                        <h2 className="section-main-title">Curated <span className="saffron-text">Handcrafted</span> Categories</h2>
                        <p className="section-desc">Handpicked treasures from India's most talented artisans.</p>
                    </div>

                    <div className="collections-grid">
                        {[
                            { title: 'Handloom', img: '/assets/category-handloom.jpg', count: '120+ Products' },
                            { title: 'Pottery', img: '/assets/category-pottery.jpg', count: '85+ Products' },
                            { title: 'Wood Craft', img: '/assets/category-woodcraft.jpg', count: '150+ Products' },
                            { title: 'Organic Food', img: '/assets/category-organic-food.jpg', count: '60+ Products' },
                            { title: 'Jewelry', img: '/assets/category-jewelry.jpg', count: '200+ Products' },
                            { title: 'Home Decor', img: '/assets/category-home-decor.jpg', count: '140+ Products' }
                        ].map((cat, i) => (
                            <Link
                                to={`/marketplace?category=${cat.title}`}
                                key={cat.title}
                                className="collection-card animate-slide-up"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <div className="collection-img-container">
                                    <img src={cat.img} alt={cat.title} className="collection-img" />
                                    <div className="collection-overlay">
                                        <span className="collection-count">{cat.count}</span>
                                        <h3 className="collection-title">{cat.title}</h3>
                                        <button className="collection-btn">Browse Now</button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>


            {/* Trending Collection: Premium E-commerce Grid */}
            <section className="featured-products">
                <div className="container">
                    <div className="section-header-flex">
                        <div className="header-left">
                            <span className="section-tag">Popular Now</span>
                            <h2 className="section-main-title">Trending <span className="saffron-text">Creations</span></h2>
                        </div>
                        <Link to="/marketplace" className="view-all-link">
                            View All Products <span>→</span>
                        </Link>
                    </div>

                    <div className="products-grid-premium">
                        {trending.map((product, i) => (
                            <Link to={`/product/${product._id}`} key={product._id} className="product-card-lux animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="product-media">
                                    {product.images?.[0] ? (
                                        <img src={product.images[0]} alt={product.title} className="product-image" />
                                    ) : (
                                        <div className="product-placeholder">VENDAR</div>
                                    )}
                                    <div className="product-badge">New Arrival</div>
                                    <div className="product-quick-view">Quick View</div>
                                </div>
                                <div className="product-details-lux">
                                    <p className="product-cat-tiny">{product.category || 'Handcrafted'}</p>
                                    <h4 className="product-title-lux">{product.title}</h4>
                                    <div className="product-meta-row">
                                        <p className="product-vendor-lux">by {product.vendorId?.businessName || 'Master Artisan'}</p>
                                        <div className="product-rating">
                                            <span>★</span> 4.8
                                        </div>
                                    </div>
                                    <div className="product-footer-lux">
                                        <span className="product-price-lux">₹{product.price.toLocaleString()}</span>
                                        <button className="add-cart-btn-tiny">+</button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>


            {/* Separate Vendor Section BELOW Hero & Trending */}
            <section className="vendor-cta-section">
                <div className="vendor-cta-container glass-card">
                    <div className="vendor-cta-content">
                        <h2 className="vendor-cta-title">Sell on <span className="saffron-text">IQVENUS</span></h2>
                        <p className="vendor-cta-description">
                            Empower artisans and grow your business nationwide. Reach thousands of customers who value authenticity.
                        </p>
                    </div>
                    <div className="vendor-cta-action">
                        <Link
                            to={user?.role === 'vendor' ? "/vendor/dashboard" : "/become-a-vendor"}
                            className="btn-primary-lux"
                        >
                            {user?.role === 'vendor' ? 'Go to Dashboard' : 'Become a Vendor'}
                        </Link>
                    </div>
                </div>
            </section>


            {/* Artisan Stories: Impact & Heritage Redesign */}
            <section className="impact-section">
                <div className="container">
                    <div className="section-title-box centered">
                        <span className="section-tag">The Human Touch</span>
                        <h2 className="section-main-title">Stories of <span className="saffron-text">Indian Heritage</span></h2>
                        <p className="section-desc">Every purchase directly supports these master artisans and their ancestral crafts.</p>
                    </div>

                    <div className="stories-grid-modern">
                        {[
                            {
                                role: 'Master Weaver',
                                name: 'Ramesh from Banaras',
                                img: '/assets/story-weaver.jpg',
                                story: '“I am carrying forward 400 years of silk weaving heritage. Each sari takes 15 days of meditative labor.”'
                            },
                            {
                                role: 'Terracotta Artist',
                                name: 'Leela from Rajasthan',
                                img: '/assets/story-pottery.jpg',
                                story: '“Shaping stories from the golden sands into timeless earthen masterpieces. It’s my life and my legacy.”'
                            },
                            {
                                role: 'Rural Embroiderer',
                                name: 'Sita from Kutch',
                                img: '/assets/story-embroidery.jpg',
                                story: '“The colors of my community are in my threads. Your support keeps our village traditions alive.”'
                            }
                        ].map((story, i) => (
                            <div key={i} className="story-card-premium animate-slide-up" style={{ animationDelay: `${i * 0.2}s` }}>
                                <div className="story-image-box">
                                    <img src={story.img} alt={story.name} className="story-img-lux" />
                                    <div className="story-badge">{story.role}</div>
                                </div>
                                <div className="story-content-lux">
                                    <h3 className="story-name-lux">{story.name}</h3>
                                    <p className="story-text-lux">{story.story}</p>
                                    <Link to="/stories" className="read-more-link">Read Full Story →</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



        </div>
    );
};

export default Home;

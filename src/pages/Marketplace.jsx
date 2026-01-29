import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Marketplace.css';
import useSearch from '../hooks/useSearch';
import SearchBar from '../components/common/SearchBar';

import axios from 'axios';

const SkeletonCard = () => (
    <div className="marketplace-product-card skeleton-card">
        <div className="mp-image-container skeleton-box"></div>
        <div className="mp-details">
            <div className="skeleton-line" style={{ width: '80%', height: '20px', margin: '10px 0' }}></div>
            <div className="skeleton-line" style={{ width: '40%', height: '15px', margin: '5px 0' }}></div>
            <button className="view-details-btn skeleton-line" disabled></button>
        </div>
    </div>
);

const ProductCard = React.memo(({ product, onClick }) => (
    <div className="marketplace-product-card" onClick={onClick}>
        <div className="mp-image-container">
            {product.images?.[0] ? (
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="mp-product-img"
                    loading="lazy"
                    onLoad={(e) => { e.target.style.opacity = '1'; }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        const placeholder = e.target.parentElement.querySelector('.mp-placeholder');
                        if (placeholder) placeholder.style.display = 'flex';
                    }}
                    style={{ opacity: '0.1' }}
                />
            ) : null}
            <div className="mp-placeholder" style={{ display: product.images?.[0] ? 'none' : 'flex' }}>
                ARTISAN
            </div>
            {product.isApproved && (
                <div className="verified-badge">
                    <span className="verified-text">Verified</span>
                </div>
            )}
        </div>

        <div className="mp-details">
            <div className="mp-header">
                <h3 className="mp-title">{product.title}</h3>
                <div className="mp-rating">
                    <span className="stars">⭐ {product.vendorId?.rating || '4.5'}</span>
                    <span className="reviews-count">(50+ orders)</span>
                </div>
                <p className="mp-vendor">By: {product.vendorId?.businessName || 'Rural Artisan'}</p>
            </div>
            <div className="mp-pricing-block">
                <p className="mp-price">₹{product.price.toLocaleString()}</p>
                <p className="mp-delivery">Free Delivery • In Stock</p>
            </div>
            <button className="view-details-btn">View Details</button>
        </div>
    </div>
));

ProductCard.displayName = 'ProductCard';

const Sidebar = ({ categories, params, onCategoryClick, onPriceChange, onSortChange }) => {
    return (
        <aside className="mp-sidebar">
            <div className="mp-sidebar-content-inner">
                <div className="sidebar-group">
                    <h4 className="sidebar-heading">Category Guilds</h4>
                    <div className="sidebar-links">
                        <button
                            className={`sidebar-link ${!params.category ? 'active' : ''}`}
                            onClick={() => onCategoryClick('All')}
                        >
                            All Discoveries
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat._id}
                                className={`sidebar-link ${params.category === cat.name ? 'active' : ''}`}
                                onClick={() => onCategoryClick(cat.name)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="sidebar-group">
                    <h4 className="sidebar-heading">Price Range</h4>
                    <div className="price-inputs">
                        <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                            <input
                                type="number"
                                placeholder="Min"
                                value={params.minPrice || ''}
                                onChange={(e) => onPriceChange(e.target.value, params.maxPrice)}
                                style={{ width: '50%', padding: '10px', borderRadius: '8px', border: '1px solid #eee' }}
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={params.maxPrice || ''}
                                onChange={(e) => onPriceChange(params.minPrice, e.target.value)}
                                style={{ width: '50%', padding: '10px', borderRadius: '8px', border: '1px solid #eee' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="sidebar-group last-group">
                    <h4 className="sidebar-heading">Sort By</h4>
                    <div className="select-container">
                        <select
                            value={params.sort || 'newest'}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="sort-dropdown-sidebar"
                        >
                            <option value="score">Most Relevant</option>
                            <option value="newest">Newest First</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Spacer for scroll visibility */}
                <div style={{ height: '60px' }}></div>
            </div>
        </aside>
    );
};

const Pagination = ({ pagination, onPageChange }) => {
    if (!pagination || pagination.totalPages <= 1) return null;

    return (
        <div className="pagination-container">
            <button
                disabled={pagination.page === 1}
                onClick={() => onPageChange(pagination.page - 1)}
                className="page-btn"
            >
                Previous
            </button>
            {[...Array(pagination.totalPages)].map((_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    className={`page-btn ${pagination.page === i + 1 ? 'active' : ''}`}
                >
                    {i + 1}
                </button>
            ))}
            <button
                disabled={pagination.page === pagination.totalPages}
                onClick={() => onPageChange(pagination.page + 1)}
                className="page-btn"
            >
                Next
            </button>
        </div>
    );
};

const Marketplace = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const {
        products,
        loading,
        error,
        pagination,
        params,
        updateParams
    } = useSearch();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`);
                setCategories(response.data);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const q = searchParams.get('q') || '';
        const category = searchParams.get('category') || '';
        const sort = searchParams.get('sort') || 'newest';
        const minPrice = searchParams.get('minPrice') || '';
        const maxPrice = searchParams.get('maxPrice') || '';
        const page = parseInt(searchParams.get('page')) || 1;

        updateParams({ q, category, sort, minPrice, maxPrice, page });
    }, [location.search]);

    const syncURL = (newParams) => {
        const urlParams = new URLSearchParams(location.search);
        Object.entries(newParams).forEach(([key, value]) => {
            if (value && value !== 'All') {
                urlParams.set(key, value);
            } else {
                urlParams.delete(key);
            }
        });
        if (!newParams.page) urlParams.set('page', '1');
        navigate({ search: urlParams.toString() }, { replace: true });
    };

    const handleCategoryClick = (cat) => syncURL({ category: cat === 'All' ? '' : cat, page: 1 });
    const handleSearch = (q) => syncURL({ q, page: 1 });
    const handleSortChange = (sort) => syncURL({ sort, page: 1 });
    const handlePriceChange = (min, max) => syncURL({ minPrice: min, maxPrice: max });
    const handlePageChangeLocal = (page) => syncURL({ page });

    return (
        <div className="marketplace-container">
            <header className="marketplace-header">
                <div className="header-content centered">
                    <div className="status-badge glass-card">
                        <span className="status-dot"></span>
                        <span className="status-text">Direct from Indian Artisans</span>
                    </div>
                    <h1 className="header-title">
                        Discover Authentic <span className="gradient-text">Indian Products</span>
                    </h1>
                    <p className="header-description">
                        Handcrafted by skilled artisans • Verified quality • Fast delivery
                    </p>

                    <div style={{ width: '100%', marginTop: '1rem' }}>
                        <SearchBar onSearch={handleSearch} initialValue={params.q} />
                    </div>
                </div>
            </header>

            <div className="marketplace-content-wrapper container">
                <Sidebar
                    categories={categories}
                    params={params}
                    onCategoryClick={handleCategoryClick}
                    onPriceChange={handlePriceChange}
                    onSortChange={handleSortChange}
                />

                <main className="marketplace-main">
                    <div className="mp-results-header">
                        <div className="results-count">
                            <strong>{pagination.total}</strong> artisan products found
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <select
                                value={params.sort || 'newest'}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="sort-dropdown"
                            >
                                <option value="score">Most Relevant</option>
                                <option value="newest">Newest First</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                            <button className="mobile-filter-trigger" onClick={() => setIsFilterModalOpen(true)}>
                                ⚙️ Filters
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="error-state glass-card">
                            <p className="error-text">{error}</p>
                            <button onClick={() => updateParams({})} className="reset-btn">Retry</button>
                        </div>
                    )}

                    <div style={{ position: 'relative', minHeight: '600px' }}>
                        {loading && products.length > 0 && (
                            <div className="loading-overlay-simple">
                                <div className="loading-spinner"></div>
                            </div>
                        )}

                        {loading && products.length === 0 ? (
                            <div className="products-grid">
                                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                            </div>
                        ) : !loading && products.length === 0 ? (
                            <div className="empty-state glass-card">
                                <h3 className="empty-title">No products found.</h3>
                                <p className="empty-desc">Try adjusting your filters or search terms.</p>
                                <button onClick={() => syncURL({ q: '', category: '', minPrice: '', maxPrice: '', page: 1 })} className="reset-btn">
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <div style={{ opacity: loading ? 0.6 : 1 }}>
                                <div className="products-grid">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                            onClick={() => navigate(`/product/${product._id}`)}
                                        />
                                    ))}
                                </div>
                                <Pagination pagination={pagination} onPageChange={handlePageChangeLocal} />
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {isFilterModalOpen && (
                <div className="filter-modal-overlay" onClick={() => setIsFilterModalOpen(false)}>
                    <div className="filter-modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Filters</h3>
                            <button className="close-modal" onClick={() => setIsFilterModalOpen(false)}>✕</button>
                        </div>
                        <div className="modal-sidebar-wrapper">
                            <Sidebar
                                categories={categories}
                                params={params}
                                onCategoryClick={handleCategoryClick}
                                onPriceChange={handlePriceChange}
                                onSortChange={handleSortChange}
                            />
                        </div>
                        <button className="apply-filters-btn" onClick={() => setIsFilterModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Marketplace;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VendorDashboard.css';

const VendorDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [vendor, setVendor] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [commissions, setCommissions] = useState(null);

    const [formData, setFormData] = useState({
        businessName: '',
        description: '',
        city: '',
        state: '',
        documents: ''
    });
    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        image: '',
        documents: '',
        type: 'product',
        stock: 0,
        deliveryInfo: 'Standard delivery (3-5 business days)',
        availability: true
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const userStr = localStorage.getItem('user');
                if (!userStr) {
                    navigate('/login');
                    return;
                }
                const user = JSON.parse(userStr);
                if (user.role !== 'vendor') {
                    alert('Access Denied. Vendors only.');
                    navigate('/');
                    return;
                }

                // Ensure we have a valid user ID (supports both id and _id)
                const userId = user.id || user._id;

                if (!userId) {
                    throw new Error("Invalid user session. Please login again.");
                }

                // Fetch Vendor Profile by User ID
                const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/vendors/user/${userId}`);
                const v = res.data;
                setVendor(v);
                setFormData({
                    businessName: v.businessName,
                    description: v.description || '',
                    city: v.location?.city || '',
                    state: v.location?.state || '',
                    documents: v.documents?.join(',') || ''
                });

                // Fetch other data in parallel after getting vendor ID
                try {
                    const [prodRes, catRes, commRes] = await Promise.all([
                        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products?vendorId=${v._id}`),
                        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/categories`),
                        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/vendors/${v._id}/commissions`)
                    ]);

                    setProducts(prodRes.data);
                    setCategories(catRes.data);
                    if (catRes.data.length > 0) {
                        setNewProduct(prev => ({ ...prev, category: catRes.data[0].name }));
                    }
                    setCommissions(commRes.data);
                } catch (secondaryErr) {
                    console.error("Failed to load secondary data", secondaryErr);
                    // We don't block the dashboard if secondary data fails, just log it
                }

                setLoading(false);

            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || err.message || "Failed to load vendor workspace");
                setLoading(false);
            }
        };
        fetchVendorData();
    }, [navigate]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/vendors/${vendor._id}`, {
                ...formData,
                documents: formData.documents.split(',').map(s => s.trim())
            });
            alert('Profile Updated');
            window.location.reload();
        } catch (err) {
            alert('Failed to update');
        }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`, {
                ...newProduct,
                vendorId: vendor._id,
                images: newProduct.image.split(',').map(s => s.trim()),
                documents: newProduct.documents.split(',').map(s => s.trim()).filter(s => s !== '')
            });
            alert('Product Created');
            setNewProduct({
                title: '',
                description: '',
                price: '',
                category: categories.length > 0 ? categories[0].name : '',
                image: '',
                documents: '',
                type: 'product',
                stock: 0,
                deliveryInfo: 'Standard delivery (3-5 business days)',
                availability: true
            });
            // Refresh list
            const prodRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products?vendorId=${vendor._id}`);
            setProducts(prodRes.data);
        } catch (err) {
            alert('Failed to create product');
        }
    };



    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loader-box">
                    <div className="studio-spinner"></div>
                    <p className="loading-text">Initializing Seller Workspace...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-loading">
                <div className="error-box" style={{ textAlign: 'center', color: '#ff4d4f' }}>
                    <h2>⚠️ Unable to Load Dashboard</h2>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="action-btn" style={{ marginTop: '1rem', background: '#333' }}>
                        Retry Connection
                    </button>
                    <button onClick={() => navigate('/')} className="action-btn" style={{ marginTop: '1rem', marginLeft: '1rem', background: 'transparent', border: '1px solid #333', color: '#333' }}>
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    if (!vendor) return null; // Should be covered by loading/error, but valid safety net

    return (
        <div className="dashboard-container animate-fade-in">
            <header className="dashboard-header">
                <h1 className="studio-title">Merchant <span className="gradient-text">Studio</span></h1>
                <p className="studio-subtitle">Managing {vendor.businessName}</p>
            </header>

            {/* Status Banners */}
            {!vendor.isApproved && (
                <div className="status-banner banner-pending animate-slide-up">
                    <div className="banner-content">
                        <div className="banner-icon">⏳</div>
                        <div className="banner-text">
                            <h3>Verification In Progress</h3>
                            <p>Your merchant profile is being reviewed by our curators. You can still set up your shop and add products in the meantime.</p>
                        </div>
                    </div>
                </div>
            )}

            {products.some(p => !p.isApproved) && vendor.isApproved && (
                <div className="status-banner banner-review animate-slide-up">
                    <div className="banner-content">
                        <div className="banner-icon">🏺</div>
                        <div className="banner-text">
                            <h3>Artifacts Under Review</h3>
                            <p>Some newly added items are awaiting quality control. They will be visible in the marketplace shortly.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Responsive Tabs Navigation */}
            <nav className="dashboard-nav glass-card scrollbar-hide">
                {[
                    { id: 'overview', label: 'Overview', icon: '📊' },
                    { id: 'products', label: 'Inventory', icon: '📦' },
                    { id: 'commissions', label: 'Fees', icon: '📜' },
                    { id: 'settings', label: 'Storefront', icon: '⚙️' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        <span className="tab-label">{tab.label}</span>
                    </button>
                ))}
            </nav>

            {/* Overview Content */}
            {activeTab === 'overview' && (
                <div className="tab-content overview-grid">
                    {[
                        { label: 'Total Artifacts', value: products.length, icon: '🏺', color: 'primary' },
                        { label: 'Merchant Rating', value: `${vendor.rating} ★`, icon: '✨', color: 'warning' },
                        { label: 'Global Status', value: vendor.isApproved ? 'LIVE' : 'PENDING', icon: '🌐', color: vendor.isApproved ? 'success' : 'warning' }
                    ].map((stat, i) => (
                        <div key={i} className={`stat-card glass-card animate-slide-up card-${stat.color}`} style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="stat-icon">{stat.icon}</div>
                            <h2 className="stat-value">{stat.value}</h2>
                            <p className="stat-label">{stat.label}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Products Content */}
            {activeTab === 'products' && (
                <div className="tab-content products-section">
                    <div className="publish-card glass-card">
                        <div className="card-header">
                            <div className="header-icon-box">＋</div>
                            <h3 className="card-title">Publish New Artifact</h3>
                        </div>

                        <form onSubmit={handleProductSubmit} className="publish-form">
                            <div className="form-row">
                                <div className="form-group span-2">
                                    <label className="input-label">Artifact Title</label>
                                    <input type="text" placeholder="e.g. Hand-Carved Teakwood Elephant" className="input-field"
                                        value={newProduct.title} onChange={e => setNewProduct({ ...newProduct, title: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="input-label">Listing Type</label>
                                    <select className="input-field select-input"
                                        value={newProduct.type} onChange={e => setNewProduct({ ...newProduct, type: e.target.value })} >
                                        <option value="product">Physical Inventory</option>
                                        <option value="service">Custom Commission / Service</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="input-label">The Artifact Story (Description)</label>
                                <textarea placeholder="Describe the craftsmanship, materials, and heritage..." className="input-field textarea-input"
                                    value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} required />
                            </div>

                            <div className="form-grid-4">
                                <div className="form-group">
                                    <label className="input-label">Price (₹)</label>
                                    <input type="number" placeholder="0.00" className="input-field"
                                        value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="input-label">Initial Stock</label>
                                    <input type="number" placeholder="10" className="input-field"
                                        value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} required />
                                </div>
                                <div className="form-group span-2">
                                    <label className="input-label">Category Guild</label>
                                    <select className="input-field select-input"
                                        value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} required >
                                        {categories.length === 0 ? (
                                            <option value="General">General Marketplace</option>
                                        ) : (
                                            categories.map(cat => (
                                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                                            ))
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="input-label">High-Res Media URL</label>
                                    <input type="text" placeholder="https://image-cloud.com/artifact-main.jpg" className="input-field"
                                        value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="input-label">Shipping Logistics Hub</label>
                                    <input type="text" placeholder="Standard Delivery (3-5 Days)" className="input-field"
                                        value={newProduct.deliveryInfo} onChange={e => setNewProduct({ ...newProduct, deliveryInfo: e.target.value })} required />
                                </div>
                            </div>

                            <div className="checkbox-group glass-inset">
                                <input type="checkbox" id="availability" className="custom-checkbox" checked={newProduct.availability}
                                    onChange={e => setNewProduct({ ...newProduct, availability: e.target.checked })} />
                                <label htmlFor="availability" className="checkbox-label">Instantly enable for Public Discovery</label>
                            </div>

                            <button className="launch-btn">
                                Launch Artifact to Marketplace
                            </button>
                        </form>
                    </div>

                    <div className="inventory-grid">
                        {products.map((p, i) => (
                            <div key={p._id} className="inventory-card glass-card animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                                <div className="inventory-media">
                                    <img src={p.images?.[0] || '/assets/inventory-placeholder.png'} className="inventory-img" alt={p.title} />
                                    <div className="media-overlay"></div>
                                    <div className="status-badge-container">
                                        <span className={`status-pill ${p.isApproved ? 'pill-live' : 'pill-verifying'}`}>
                                            {p.isApproved ? 'Live' : 'Verifying'}
                                        </span>
                                    </div>
                                    <div className="media-title">
                                        <h4>{p.title}</h4>
                                    </div>
                                </div>
                                <div className="inventory-details">
                                    <div className="details-header">
                                        <span className="price-tag">₹{p.price}</span>
                                        <div className="stock-info">
                                            <p className="stock-label">Stock</p>
                                            <p className={`stock-value ${p.stock > 0 ? 'text-success' : 'text-error'}`}>{p.stock} Units</p>
                                        </div>
                                    </div>

                                    <div className="tags-row">
                                        <span className="tag">{p.category}</span>
                                        <span className={`tag ${p.availability ? 'tag-enabled' : 'tag-disabled'}`}>
                                            {p.availability ? 'Discovery Enabled' : 'Discovery Hidden'}
                                        </span>
                                    </div>

                                    <div className="actions-row">
                                        <button className="action-btn edit-btn">Edit</button>
                                        <button
                                            onClick={() => {
                                                if (confirm('Permanently remove this artifact?')) {
                                                    axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/${p._id}`).then(() => {
                                                        setProducts(products.filter(item => item._id !== p._id));
                                                    });
                                                }
                                            }}
                                            className="action-btn delete-btn"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}





            {/* Commissions Content */}
            {activeTab === 'commissions' && (
                <div className="tab-content commissions-section animate-fade-in">
                    <div className="fee-hub">
                        <div className="hub-header">
                            <h2>Fee Transparency Hub</h2>
                            <p>Vendar believes in complete transparency. Our commission structure ensures high-quality platform maintenance and global marketing for your craft.</p>
                        </div>

                        <div className="rates-grid">
                            <div className="rates-card glass-card">
                                <div className="card-header-icon">
                                    <div className="icon-box icon-indigo">🏷️</div>
                                    <h3>Category Guild Rates</h3>
                                </div>
                                <div className="rates-list">
                                    {commissions?.categoryDefaults.map(cat => {
                                        const override = commissions.vendorOverrides.find(v => v.categoryId === cat.id);
                                        const effectiveComm = override ? override.commission : cat.commission;

                                        return (
                                            <div key={cat.id} className="rate-item glass-inset">
                                                <div>
                                                    <p className="rate-name">{cat.name}</p>
                                                    {override && <span className="rate-badge">Exclusive Partner Rate</span>}
                                                </div>
                                                <div className="rate-value text-success">{effectiveComm}%</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="rates-card glass-card">
                                <div className="card-header-icon">
                                    <div className="icon-box icon-amber">⭐</div>
                                    <h3>Item-Specific Rates</h3>
                                </div>
                                {commissions?.productOverrides.length > 0 ? (
                                    <div className="rates-list">
                                        {commissions.productOverrides.map(po => (
                                            <div key={po._id} className="rate-item glass-inset">
                                                <span className="rate-name truncate">{po.title}</span>
                                                <div className="rate-value text-warning">{po.commissionOverride}%</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="empty-rates">
                                        <p className="empty-icon">📜</p>
                                        <p className="empty-msg">No individual artifacts tagged with custom rates.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="platform-notice glass-card">
                            <h4 className="notice-header">
                                <span>🛡️</span>
                                <span>Platform Logic Notice</span>
                            </h4>
                            <p className="notice-text">
                                Platform fees are automatically handled. Payout priority tiering:
                                <span className="highlight-text">Item Tier {'>'} Partner Override {'>'} Global Default</span>.
                                Fees cover insurance, cloud operations, and our global B2B matchmaking engine.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Content */}
            {activeTab === 'settings' && (
                <div className="tab-content settings-section animate-fade-in">
                    <div className="settings-card glass-card">
                        <div className="settings-header">
                            <div className="settings-icon">⚙️</div>
                            <div>
                                <h3>Storefront Profile</h3>
                                <p className="subtitle">Public facing identity</p>
                            </div>
                        </div>

                        <form onSubmit={handleProfileUpdate} className="settings-form">
                            <div className="form-group">
                                <label className="input-label">Business Identity Name</label>
                                <input className="input-field"
                                    value={formData.businessName} onChange={e => setFormData({ ...formData, businessName: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label className="input-label">Brand Lore (Description)</label>
                                <textarea className="input-field textarea-input"
                                    value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="input-label">Headquarters City</label>
                                    <input className="input-field"
                                        value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="input-label">Region / State</label>
                                    <input className="input-field"
                                        value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="input-label">Verification Dossier (Document URLs)</label>
                                <input className="input-field"
                                    value={formData.documents} onChange={e => setFormData({ ...formData, documents: e.target.value })}
                                    placeholder="e.g. GST Certificate, ID Proof (Comma separated)" />
                                <p className="input-hint">Multiple URLs supported, separated by commas.</p>
                            </div>

                            <div className="form-actions">
                                <button className="update-btn">
                                    Update Store Identity
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import OrderTimeline from '../components/customer/OrderTimeline';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const { cart, total } = useCart();

    // Auth & User State
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    // Dashboard Data State
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalSpent: 0,
        pendingDeliveries: 0,
        completedOrders: 0
    });

    // Profile Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        currentPassword: '',
        newPassword: ''
    });
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        const u = JSON.parse(storedUser);

        if (u.role === 'vendor') {
            navigate('/vendor/dashboard');
            return;
        }

        setUser(u);
        setFormData(prev => ({ ...prev, name: u.name, email: u.email }));

        // Fetch Dashboard Data
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders?userId=${u.id}`);
                const ordersData = res.data;
                setOrders(ordersData);

                // Calculate stats
                const totalSpent = ordersData.reduce((sum, order) => sum + order.totalAmount, 0);
                const pendingDeliveries = ordersData.filter(o =>
                    o.status !== 'completed' && o.status !== 'cancelled'
                ).length;
                const completedOrders = ordersData.filter(o => o.status === 'completed').length;

                setStats({
                    totalOrders: ordersData.length,
                    totalSpent,
                    pendingDeliveries,
                    completedOrders
                });
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // ------------------- Dashboard Logic -------------------

    const getStatusBadge = (status) => {
        const statusMap = {
            pending: { class: 'status-pending', label: 'Pending' },
            accepted: { class: 'status-accepted', label: 'Confirmed' },
            processing: { class: 'status-processing', label: 'Processing' },
            in_progress: { class: 'status-processing', label: 'Processing' }, // Backwards compatibility
            shipped: { class: 'status-shipped', label: 'Shipped' },
            delivered: { class: 'status-completed', label: 'Delivered' },
            completed: { class: 'status-completed', label: 'Delivered' }, // Backwards compatibility
            cancelled: { class: 'status-cancelled', label: 'Cancelled' }
        };
        const statusInfo = statusMap[status] || { class: 'status-default', label: status };
        return (
            <span className={`status-badge ${statusInfo.class}`}>
                {statusInfo.label}
            </span>
        );
    };

    const getPaymentBadge = (paymentStatus) => {
        const statusMap = {
            pending: { class: 'payment-pending', label: 'Payment Pending' },
            paid: { class: 'payment-paid', label: 'Paid' },
            failed: { class: 'payment-failed', label: 'Failed' }
        };
        const statusInfo = statusMap[paymentStatus] || { class: 'payment-default', label: paymentStatus };
        return (
            <span className={`payment-badge ${statusInfo.class}`}>
                {statusInfo.label}
            </span>
        );
    };

    const getAllProducts = () => {
        const products = [];
        orders.forEach(order => {
            if (order.status === 'completed') {
                order.items.forEach(item => {
                    if (item.productId) {
                        products.push({
                            ...item.productId,
                            orderId: order._id,
                            orderDate: order.createdAt,
                            quantity: item.quantity,
                            pricePaid: item.price
                        });
                    }
                });
            }
        });
        return products;
    };

    const getCartByVendor = () => {
        const vendorGroups = {};
        cart.forEach(item => {
            const vendorId = item.vendorId?._id || 'unknown';
            const vendorName = item.vendorId?.businessName || 'Unknown Vendor';
            if (!vendorGroups[vendorId]) {
                vendorGroups[vendorId] = {
                    vendorName,
                    items: [],
                    total: 0
                };
            }
            vendorGroups[vendorId].items.push(item);
            vendorGroups[vendorId].total += item.price * item.quantity;
        });
        return Object.values(vendorGroups);
    };

    // ------------------- Profile Logic -------------------

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const verifyEmail = () => {
        alert('Verification email sent to ' + formData.email);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedUser = { ...user, name: formData.name, email: formData.email };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setMsg('Profile updated successfully!');
    };

    if (loading || !user) {
        return (
            <div className="profile-loading-container">
                <div className="profile-loader"></div>
                <p className="loading-text">Loading Your Profile...</p>
            </div>
        );
    }

    return (
        <div className="profile-container animate-fade-in">
            <h1 className="profile-page-title">My <span className="gradient-text">Account</span></h1>

            <div className="profile-dashboard-layout">
                {/* 1. Sidebar Navigation */}
                <aside className="profile-sidebar glass-card">
                    <div className="sidebar-identity">
                        <div className="sidebar-avatar">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="sidebar-info">
                            <h2 className="sidebar-name">{user.name}</h2>
                            <p className="sidebar-email">{user.email}</p>
                            {!user.isVerified && (
                                <span onClick={verifyEmail} className="verify-link">⚠️ Verify Account</span>
                            )}
                        </div>
                    </div>

                    <nav className="sidebar-nav">
                        {[
                            { id: 'overview', label: 'Overview', icon: '📊' },
                            { id: 'orders', label: 'My Orders', icon: '📦' },
                            { id: 'products', label: 'My Products', icon: '🏺' },
                            { id: 'cart', label: 'My Cart', icon: '🛒' },
                            { id: 'settings', label: 'Settings', icon: '⚙️' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                            >
                                <span className="tab-icon">{tab.icon}</span>
                                <span className="tab-label">{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="sidebar-footer">
                        <button onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            navigate('/login');
                        }} className="logout-btn">
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* 2. Main Content Area */}
                <main className="profile-content">

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="tab-pane overview-pane animate-slide-up">
                            <h2 className="pane-title">Dashboard Overview</h2>
                            <div className="stats-grid">
                                {[
                                    { label: 'Total Orders', value: stats.totalOrders, icon: '📦', color: 'primary' },
                                    { label: 'Total Spent', value: `₹${stats.totalSpent.toLocaleString()}`, icon: '💰', color: 'success' },
                                    { label: 'Pending', value: stats.pendingDeliveries, icon: '🚚', color: 'warning' },
                                    { label: 'Cart Items', value: cart.length, icon: '🛒', color: 'info' }
                                ].map((stat, i) => (
                                    <div key={i} className={`stat-card glass-card card-${stat.color}`}>
                                        <div className="stat-icon">{stat.icon}</div>
                                        <h3 className="stat-value">{stat.value}</h3>
                                        <p className="stat-label">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Order Preview */}
                            {orders.length > 0 && (
                                <div className="recent-order-preview glass-card">
                                    <div className="preview-header">
                                        <h3>Recent Order</h3>
                                        <button onClick={() => setActiveTab('orders')} className="link-btn">View All</button>
                                    </div>
                                    <div className="preview-content">
                                        <div className="preview-meta">
                                            <span className="preview-id">#{orders[0]._id.slice(-6).toUpperCase()}</span>
                                            <span className="preview-date">{new Date(orders[0].createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="preview-status">
                                            {getStatusBadge(orders[0].status)}
                                        </div>
                                        <div className="preview-total">
                                            ₹{orders[0].totalAmount.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="tab-pane orders-pane animate-slide-up">
                            <h2 className="pane-title">Order History</h2>
                            {orders.length === 0 ? (
                                <div className="empty-state glass-card">
                                    <div className="empty-icon">📦</div>
                                    <h4>No Orders Yet</h4>
                                    <p>Start shopping to see your orders here.</p>
                                    <Link to="/marketplace" className="btn btn-primary">Explore Marketplace</Link>
                                </div>
                            ) : (
                                <div className="orders-list">
                                    {orders.map((order) => (
                                        <div key={order._id} className="order-card glass-card">
                                            <div className="order-header">
                                                <div className="order-meta">
                                                    <h4 className="order-id">Order #{order._id.slice(-8).toUpperCase()}</h4>
                                                    <p className="order-date">
                                                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                            day: '2-digit', month: 'long', year: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                                <div className="order-badges">
                                                    {getStatusBadge(order.status)}
                                                    {getPaymentBadge(order.paymentStatus)}
                                                </div>
                                            </div>

                                            <OrderTimeline
                                                status={order.status}
                                                createdAt={order.createdAt}
                                                updatedAt={order.updatedAt}
                                            />

                                            <div className="order-items-preview">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="mini-item">
                                                        <span className="mini-qty">{item.quantity}x</span>
                                                        <span className="mini-name">{item.productId?.title || 'Product'}</span>
                                                        <span className="mini-price">₹{item.price.toLocaleString()}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="order-footer">
                                                <div className="shipping-address">
                                                    <small>Shipping to:</small>
                                                    <p>{order.shippingAddress?.city || 'Unknown'}</p>
                                                </div>
                                                <div className="order-total">
                                                    <span>Total:</span>
                                                    <strong>₹{order.totalAmount.toLocaleString()}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div className="tab-pane products-pane animate-slide-up">
                            <h2 className="pane-title">My Collection</h2>
                            {getAllProducts().length === 0 ? (
                                <div className="empty-state glass-card">
                                    <div className="empty-icon">🏺</div>
                                    <h4>No Products Yet</h4>
                                    <p>Complete an order to see your products here.</p>
                                </div>
                            ) : (
                                <div className="products-grid">
                                    {getAllProducts().map((product, i) => (
                                        <div key={`${product._id}-${i}`} className="product-card glass-card">
                                            <div className="product-image-container">
                                                {product.images?.[0] ? (
                                                    <img src={product.images[0]} alt={product.title} className="product-image" />
                                                ) : (
                                                    <div className="product-placeholder">🏺</div>
                                                )}
                                            </div>
                                            <div className="product-info">
                                                <h4 className="product-title">{product.title}</h4>
                                                <p className="product-price">Paid: ₹{product.pricePaid?.toLocaleString()}</p>
                                                <Link to={`/product/${product._id}`} className="btn btn-secondary btn-sm">
                                                    View Item
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Cart Tab */}
                    {activeTab === 'cart' && (
                        <div className="tab-pane cart-pane animate-slide-up">
                            <h2 className="pane-title">Cart Summary</h2>
                            {cart.length === 0 ? (
                                <div className="empty-state glass-card">
                                    <div className="empty-icon">🛒</div>
                                    <h4>Your Cart is Empty</h4>
                                    <Link to="/marketplace" className="btn btn-primary">Start Shopping</Link>
                                </div>
                            ) : (
                                <>
                                    <div className="vendor-groups">
                                        {getCartByVendor().map((vendorGroup, i) => (
                                            <div key={i} className="vendor-group glass-card">
                                                <div className="vendor-header">
                                                    <h4 className="vendor-name">{vendorGroup.vendorName}</h4>
                                                    <p className="vendor-total">₹{vendorGroup.total.toLocaleString()}</p>
                                                </div>
                                                <div className="vendor-items">
                                                    {vendorGroup.items.map((item, idx) => (
                                                        <div key={idx} className="cart-item-row">
                                                            <span className="item-name">{item.title}</span>
                                                            <span className="item-qty">x{item.quantity}</span>
                                                            <span className="item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cart-actions-row">
                                        <div className="cart-total-display">
                                            <span>Total:</span>
                                            <strong>₹{total.toLocaleString()}</strong>
                                        </div>
                                        <Link to="/cart" className="btn btn-primary">Go to Full Cart</Link>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div className="tab-pane settings-pane animate-slide-up">
                            <h2 className="pane-title">Account Settings</h2>
                            <div className="settings-card glass-card">
                                {msg && <div className="success-banner">{msg}</div>}

                                <form onSubmit={handleUpdate} className="settings-form">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="tel" name="phone" placeholder="+91..." value={formData.phone} onChange={handleChange} className="input-field" />
                                    </div>

                                    <div className="form-divider"></div>

                                    <h3>Security</h3>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input type="password" name="newPassword" placeholder="Change password..." onChange={handleChange} className="input-field" />
                                    </div>

                                    <button type="submit" className="save-btn">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
};

export default Profile;

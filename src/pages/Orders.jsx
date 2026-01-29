import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (user.role === 'vendor') {
            navigate('/vendor/dashboard');
            return;
        }
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders?userId=${user.id}`);
            setOrders(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const retryPayment = async (orderId, amount) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/payment/initiate`, {
                orderId,
                amount
            });

            if (res.data.success) {
                window.location.href = res.data.paymentUrl;
            } else {
                alert('Failed to initiate payment. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('Payment retry failed');
        }
    };

    const requestRefund = async (orderId, totalAmount) => {
        const reason = prompt('Please enter the reason for refund:');
        if (!reason) return;

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/refund/initiate`, {
                orderId,
                amount: totalAmount,
                reason
            });

            if (res.data.success) {
                alert('Refund request submitted successfully!');
                fetchOrders();
            } else {
                alert('Failed to submit refund request');
            }
        } catch (err) {
            console.error(err);
            alert('Refund request failed');
        }
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            pending: 'status-pending',
            accepted: 'status-accepted',
            shipped: 'status-shipped',
            delivered: 'status-delivered',
            cancelled: 'status-cancelled',
            refund_requested: 'status-refund-requested',
            refunded: 'status-refunded'
        };
        const className = statusMap[status] || 'status-default';
        return (
            <span className={`status-badge ${className}`}>
                {status.replace('_', ' ')}
            </span>
        );
    };

    const getPaymentBadge = (status, retryCount) => {
        const statusMap = {
            pending: 'payment-pending',
            paid: 'payment-paid',
            failed: 'payment-failed',
            refunded: 'payment-refunded'
        };
        const className = statusMap[status] || 'payment-default';
        return (
            <div className="payment-status-wrapper">
                <span className={`payment-badge ${className}`}>
                    {status}
                </span>
                {retryCount > 0 && (
                    <span className="retry-count">
                        (Sync Node: {retryCount})
                    </span>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Retrieving Order Ledger...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-container animate-fade-in">
            <header className="orders-header">
                <div className="header-glow"></div>
                <h1 className="header-title">Ownership <span className="gradient-text">History</span></h1>
                <p className="header-subtitle">Chronicle of your acquired masterpieces</p>
            </header>

            {orders.length === 0 ? (
                <div className="orders-empty glass-card animate-slide-up">
                    <div className="empty-decor-line"></div>
                    <div className="empty-icon">Void</div>
                    <div className="empty-content">
                        <h3 className="empty-title">The Ledger is <span className="gradient-text">Empty</span></h3>
                        <p className="empty-message">You haven't initiated any acquisitions yet. Explore the marketplace to begin your collection.</p>
                    </div>
                    <button onClick={() => navigate('/marketplace')} className="explore-btn">
                        Explore Marketplace
                    </button>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order, i) => (
                        <div key={order._id} className="order-card glass-card animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                            {/* Decorative ID */}
                            <div className="order-card-id">
                                #{order._id.slice(-6).toUpperCase()}
                            </div>

                            <div className="order-card-header">
                                <div className="order-meta">
                                    <p className="meta-label">Manifest ID</p>
                                    <h3 className="meta-id">Protocol {order._id.slice(-8).toUpperCase()}</h3>
                                    <p className="meta-date">
                                        Timestamp: {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div className="order-status-group">
                                    {getStatusBadge(order.status)}
                                    <div className="pt-2">
                                        {getPaymentBadge(order.paymentStatus, order.paymentRetryCount || 0)}
                                    </div>
                                </div>
                            </div>

                            <div className="order-items">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="order-item">
                                        <div className="item-image-box">
                                            {item.productId?.images?.[0] ? (
                                                <img
                                                    src={item.productId.images[0]}
                                                    alt={item.productId.title}
                                                    className="item-image"
                                                />
                                            ) : <div className="item-placeholder">Artifact</div>}
                                        </div>
                                        <div className="item-details">
                                            <p className="item-title">{item.productId?.title || 'Unknown Artifact'}</p>
                                            <div className="item-stats">
                                                <span className="item-qty">{item.quantity} Unit{item.quantity > 1 ? 's' : ''}</span>
                                                <span className="item-dot"></span>
                                                <p className="item-price">₹{item.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-footer">
                                <div className="order-total">
                                    <p className="total-label">Total Authorized Value</p>
                                    <h3 className="total-amount">₹{order.totalAmount.toLocaleString()}</h3>
                                </div>

                                <div className="order-actions">
                                    {order.paymentStatus === 'failed' && (
                                        <button
                                            onClick={() => retryPayment(order._id, order.totalAmount)}
                                            className="action-btn btn-retry"
                                        >
                                            Initiate Node Retry
                                        </button>
                                    )}
                                    {order.paymentStatus === 'pending' && order.status === 'pending' && (
                                        <button
                                            onClick={() => retryPayment(order._id, order.totalAmount)}
                                            className="action-btn btn-finalize animate-pulse"
                                        >
                                            Finalize Payment
                                        </button>
                                    )}
                                    {(order.status === 'delivered' || order.status === 'accepted' || order.status === 'shipped') &&
                                        order.paymentStatus === 'paid' &&
                                        order.status !== 'refund_requested' &&
                                        order.status !== 'refunded' && (
                                            <button
                                                onClick={() => requestRefund(order._id, order.totalAmount)}
                                                className="action-btn btn-refund"
                                            >
                                                Initiate Refund Protocol
                                            </button>
                                        )}
                                    {order.status === 'refund_requested' && (
                                        <div className="refund-pending-badge">
                                            <span className="status-dot animate-pulse"></span>
                                            <span className="refund-pending-text">Refund Node Pending</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;

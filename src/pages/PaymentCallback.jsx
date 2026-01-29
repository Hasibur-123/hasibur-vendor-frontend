import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './PaymentCallback.css';

const PaymentCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('processing');
    const [message, setMessage] = useState('Verifying node transaction...');

    useEffect(() => {
        const orderId = searchParams.get('orderId');

        // In production, PhonePe will POST to this page
        // For now, we'll check the order status
        const verifyPayment = async () => {
            try {
                // Wait a moment for callback to process
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Check order status
                const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders?userId=${JSON.parse(localStorage.getItem('user')).id}`);
                const order = res.data.find(o => o._id === orderId);

                if (order && order.paymentStatus === 'paid') {
                    setStatus('success');
                    setMessage('Acquisition Confirmed. Updating Ownership Ledger.');
                    localStorage.removeItem('cart'); // Clear cart from localStorage
                    setTimeout(() => navigate('/orders'), 3000);
                } else {
                    setStatus('failed');
                    setMessage('Verification Node Timeout. Please check your ledger status.');
                    setTimeout(() => navigate('/orders'), 3000);
                }
            } catch (err) {
                setStatus('error');
                setMessage('Protocol Error. Secure link establishment failed.');
            }
        };

        if (orderId) {
            verifyPayment();
        } else {
            setStatus('error');
            setMessage('Invalid Payment Callback Protocol');
        }
    }, [searchParams, navigate]);

    return (
        <div className="callback-container">
            <div className="callback-bg-glow"></div>

            <div className="callback-card glass-card animate-slide-up">
                <div className="status-icon-wrapper">
                    {status === 'processing' && <div className="spinner"></div>}
                    {status === 'success' && <div className="icon success-icon">✓</div>}
                    {status === 'failed' && <div className="icon failed-icon">!</div>}
                    {status === 'error' && <div className="icon error-icon">✕</div>}
                </div>

                <div className="status-content">
                    {status === 'processing' && (
                        <>
                            <h2 className="status-title">Verifying <span className="gradient-text">Protocol</span></h2>
                            <p className="status-message animate-pulse">Syncing with banking node...</p>
                        </>
                    )}
                    {status === 'success' && (
                        <>
                            <h2 className="status-title text-success">Transfer <span className="gradient-text">Complete</span></h2>
                            <p className="status-message">{message}</p>
                        </>
                    )}
                    {status === 'failed' && (
                        <>
                            <h2 className="status-title text-warning">Pending <span className="gradient-text">Validation</span></h2>
                            <p className="status-message">{message}</p>
                        </>
                    )}
                    {status === 'error' && (
                        <>
                            <h2 className="status-title text-error">System <span className="gradient-text">Error</span></h2>
                            <p className="status-message">{message}</p>
                        </>
                    )}
                </div>

                <div className="callback-footer">
                    <p className="callback-subtext">Redirecting to Secure Ledger...</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentCallback;

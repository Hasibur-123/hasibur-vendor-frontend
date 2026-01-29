import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            if (res.data.user.role === 'vendor') {
                navigate('/vendor/dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    const quickLogin = (email, password) => {
        setFormData({ email, password });
        // Auto-submit simulation
        setTimeout(() => {
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
        }, 100);
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
            </div>

            <div className="login-card glass-card animate-fade-in">
                <div className="login-header">
                    <h1 className="login-title">Welcome <span className="gradient-text">Back</span></h1>
                    <p className="login-subtitle">Access Your Marketplace</p>
                </div>

                {/* Test Credentials Section */}
                <div className="sandbox-card">
                    <div className="sandbox-glow"></div>
                    <p className="sandbox-header">
                        <span className="status-dot animate-pulse"></span>
                        Quick Sandbox Access
                    </p>
                    <div className="sandbox-actions">
                        <button
                            type="button"
                            onClick={() => quickLogin('customer@vendar.com', 'password123')}
                            className="sandbox-btn"
                        >
                            <span className="btn-content">👤 Buyer Mode</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => quickLogin('vendor@vendar.com', 'password123')}
                            className="sandbox-btn"
                        >
                            <span className="btn-content">🏪 Seller Mode</span>
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="error-banner animate-bounce">
                        ⚠️ {error}
                    </div>
                )}

                <form id="loginForm" onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label className="input-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="e.g. artisan@craft.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                            className="input-field"
                        />
                    </div>

                    <div className="form-group">
                        <div className="label-row">
                            <label className="input-label">Password</label>
                            <a href="#" className="forgot-link">Forgot?</a>
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Your secure password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                            className="input-field"
                        />
                    </div>

                    <button type="submit" className="login-submit-btn">
                        Sign In <span className="arrow-icon">→</span>
                    </button>
                </form>

                <div className="login-footer">
                    <p className="footer-text">
                        New to Vendar? <Link to="/register" className="register-link">Create an account</Link>
                    </p>
                </div>
            </div>

            <p className="copyright-tag">
                Crafted with Pride 🇮🇳 2026
            </p>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Importing the dedicated CSS

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get role from query param (?role=vendor)
    const queryParams = new URLSearchParams(location.search);
    const initialRole = queryParams.get('role') || 'client';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: initialRole,
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="register-container">
            {/* Background Decorative Elements */}
            <div className="register-bg-layer">
                <div className="bg-blob blob-secondary"></div>
                <div className="bg-blob blob-accent"></div>
            </div>

            <div className="register-card glass-card animate-fade-in text-center">
                <div className="register-header">
                    <h1 className="register-title">Join <span className="gradient-text">Vendar</span></h1>
                    <p className="register-subtitle">Start Your B2B Journey</p>
                </div>

                {error && (
                    <div className="error-banner animate-bounce">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="input-label">Full Name</label>
                            <input
                                className="input-field"
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                onChange={handleChange}
                                required
                                autoComplete="name"
                            />
                        </div>
                        <div className="form-group">
                            <label className="input-label">Phone Number</label>
                            <input
                                className="input-field"
                                type="tel"
                                name="phone"
                                placeholder="+91 00000 00000"
                                onChange={handleChange}
                                required
                                autoComplete="tel"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="input-label">Email Address</label>
                        <input
                            className="input-field"
                            type="email"
                            name="email"
                            placeholder="artisan@vendar.com"
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label className="input-label">Secure Password</label>
                        <input
                            className="input-field"
                            type="password"
                            name="password"
                            placeholder="Create a strong password"
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="form-group">
                        <label className="input-label">Account Purpose</label>
                        <div className="role-selector">
                            <label className={`role-option ${formData.role === 'client' ? 'active' : ''}`}>
                                <input type="radio" name="role" value="client" checked={formData.role === 'client'} onChange={handleChange} className="hidden-radio" />
                                <span>I'm a Buyer</span>
                            </label>
                            <label className={`role-option ${formData.role === 'vendor' ? 'active' : ''}`}>
                                <input type="radio" name="role" value="vendor" checked={formData.role === 'vendor'} onChange={handleChange} className="hidden-radio" />
                                <span>I'm a Seller</span>
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="submit-btn group">
                        Create Workspace <span className="btn-arrow">→</span>
                    </button>
                </form>

                <div className="register-footer">
                    <p className="footer-text">
                        Already have an account? <Link to="/login" className="login-link">Sign In</Link>
                    </p>
                </div>
            </div>

            <p className="footer-tagline">
                Building India's Digital Artisan Hub 🏺
            </p>
        </div>
    );
};

export default Register;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const { cart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    const handleLogout = () => {
        setIsMenuOpen(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const navLinks = [
        { label: 'Marketplace', path: '/marketplace' },
        ...(user?.role === 'vendor'
            ? [{ label: 'Studio Dashboard', path: '/vendor/dashboard' }]
            : user
                ? [
                    { label: 'The Guild', path: '/become-a-vendor' }
                ]
                : [{ label: 'The Guild', path: '/become-a-vendor' }]
        ),
        { label: 'Support', path: '/support' }
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Brand Identity */}
                <Link to="/" onClick={closeMenu} className="navbar-brand">
                    <span className="brand-title">IQVENUS</span>

                </Link>

                {/* Navigation Matrix (Desktop) */}
                <div className="navbar-links-desktop">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.label}
                            <span className="link-underline"></span>
                        </Link>
                    ))}
                </div>

                {/* User Operations */}
                <div className="navbar-actions">
                    {/* Cart Node - Hidden for Vendors */}
                    {user?.role !== 'vendor' && (
                        <Link to="/cart" onClick={closeMenu} className="cart-link">
                            <span className="cart-icon">🛒</span>
                            {cart.length > 0 && (
                                <span className="cart-badge">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button onClick={toggleMenu} className="mobile-toggle">
                        <span className={`toggle-bar ${isMenuOpen ? 'open-1' : ''}`}></span>
                        <span className={`toggle-bar ${isMenuOpen ? 'open-2' : ''}`}></span>
                        <span className={`toggle-bar ${isMenuOpen ? 'open-3' : ''}`}></span>
                    </button>

                    {/* Profile Link (Desktop) */}
                    {user ? (
                        <div className="user-menu-desktop">
                            <Link to="/profile" className="user-profile-link">
                                <div className="user-avatar-small">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="user-info-small">
                                    <p className="user-name-small">{user.name}</p>
                                    <p className="user-role-small">{user.role}</p>
                                </div>
                            </Link>
                            <button onClick={handleLogout} className="logout-btn-desktop">
                                Terminate
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons-desktop">
                            <Link to="/login" className="login-link">
                                Auth
                            </Link>
                            <Link to="/register" className="join-btn">
                                Join Guild
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Drawer */}
                <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
                <aside className={`mobile-menu-drawer ${isMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-nav-links">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={closeMenu}
                                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mobile-menu-footer">
                        {user ? (
                            <>
                                <Link to="/profile" onClick={closeMenu} className="mobile-user-profile">
                                    <div className="mobile-user-avatar">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="mobile-user-info">
                                        <p className="mobile-user-name">{user.name}</p>
                                        <p className="mobile-user-role">{user.role} Hub</p>
                                    </div>
                                </Link>
                                <button onClick={handleLogout} className="mobile-logout-btn">
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <div className="mobile-auth-grid">
                                <Link to="/login" onClick={closeMenu} className="mobile-login-btn">Log In</Link>
                                <Link to="/register" onClick={closeMenu} className="mobile-join-btn">Join Guild</Link>
                            </div>
                        )}
                        <p className="mobile-version-text">Vendar Artisan Ecosystem • v4.2</p>
                    </div>
                </aside>
            </div>
        </nav>
    );
};

export default Navbar;

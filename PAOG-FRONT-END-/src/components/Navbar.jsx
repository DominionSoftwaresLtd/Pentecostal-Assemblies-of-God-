import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo Kingdom enightement.jpg';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [hasActiveSession, setHasActiveSession] = useState(false);
    const userMenuRef = useRef(null);
    const navigate = useNavigate();

    // Load logged-in user from localStorage
    const loadUser = () => {
        const adminUser = localStorage.getItem('kemt_admin_user');
        const memberUser = localStorage.getItem('kemt_current_user');
        if (adminUser) {
            try { setCurrentUser(JSON.parse(adminUser)); } catch { setCurrentUser(null); }
        } else if (memberUser) {
            try { setCurrentUser(JSON.parse(memberUser)); } catch { setCurrentUser(null); }
        } else {
            setCurrentUser(null);
        }
    };

    // Check if an attendance session is currently open
    const checkActiveSession = async () => {
        try {
            const res = await fetch('/api/attendance/active');
            if (res.ok) {
                const data = await res.json();
                setHasActiveSession(Boolean(data.hasActiveSession));
            }
        } catch {}
    };

    useEffect(() => {
        loadUser();
        checkActiveSession();
        window.addEventListener('storage', loadUser);
        window.addEventListener('kemt_auth_change', loadUser);
        
        // Poll for live attendance sessions every 20 seconds
        const sessionInterval = setInterval(checkActiveSession, 20000);

        return () => {
            window.removeEventListener('storage', loadUser);
            window.removeEventListener('kemt_auth_change', loadUser);
            clearInterval(sessionInterval);
        };
    }, []);

    // Close user dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('kemt_admin_token');
        localStorage.removeItem('kemt_admin_user');
        localStorage.removeItem('kemt_member_token');
        localStorage.removeItem('kemt_current_user');
        setCurrentUser(null);
        setUserMenuOpen(false);
        window.dispatchEvent(new Event('kemt_auth_change'));
        navigate('/');
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        setOpenDropdown(null);
    };

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    };

    const isAdmin = currentUser && (currentUser.isAdmin || currentUser.role === 'Super Admin');

    return (
        <div className="site-header-wrapper">
            {mobileMenuOpen && (
                <div className="menu-backdrop" onClick={toggleMobileMenu}></div>
            )}
            {/* Top Bar */}
            <div className="top-bar">
                <div className="container">
                    <div className="top-bar-content">
                        <div className="top-bar-left">
                            <span title="info@paogngungo.org">
                                <i className="fas fa-envelope"></i>
                                <span className="top-bar-email-full">info@paogngungo.org</span>
                                <span className="top-bar-email-short">info@paogngungo.org</span>
                            </span>
                            <span><i className="fas fa-phone"></i> +254 720 140 213</span>
                            <span className="top-bar-location"><i className="fas fa-map-marker-alt"></i> P.O. Box 213-60113 Kiritiri, Mbeere</span>
                        </div>

                        {/* Live Check-In Trigger in Top Orange Utility Bar */}
                        {hasActiveSession && (
                            <div className="top-bar-center">
                                <Link 
                                    to={currentUser ? "/dashboard" : "/check-in"} 
                                    className="top-bar-checkin-link"
                                    title="Active church attendance session is currently open"
                                >
                                    <span className="top-bar-pulse-dot"></span>
                                    <span>Live Check-In Open &rarr;</span>
                                </Link>
                            </div>
                        )}

                        <div className="top-bar-right">
                            <a href="https://www.facebook.com/share/1EXQmKx4QE/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://www.tiktok.com/@kingdom_enlightment" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
                            <a href="https://www.youtube.com/@KingdomEnlightenmentMinistries" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                            <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header */}
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <Link to="/">
                                <img src={logoImg} alt="Pentecostal Assemblies of God - Ngungo Assembly" className="logo-img" />
                                <div className="logo-name">
                                    <span className="logo-name-top">Pentecostal Assemblies of God</span>
                                    <span className="logo-name-bottom">NGUNGO ASSEMBLY</span>
                                </div>
                            </Link>
                        </div>

                        <nav className={`main-nav ${mobileMenuOpen ? 'active' : ''}`}>
                            <ul className="nav-menu">
                                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Home</NavLink></li>
                                <li className={`dropdown ${openDropdown === 'about' ? 'active' : ''}`}>
                                    <NavLink to="/about" onClick={() => toggleDropdown('about')}>About Us <i className="fas fa-chevron-down"></i></NavLink>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/about#who-we-are" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Who We Are</Link></li>
                                        <li><Link to="/about#order-of-services" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Order of Services</Link></li>
                                        <li><Link to="/about#assemblies" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>District Assemblies</Link></li>
                                        <li><Link to="/about#vision-mission" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Vision &amp; Mission</Link></li>
                                        <li><Link to="/about#statement-of-faith" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Statement of Faith</Link></li>
                                    </ul>
                                </li>
                                <li className={`dropdown ${openDropdown === 'ministries' ? 'active' : ''}`}>
                                    <NavLink to="/ministries" onClick={() => toggleDropdown('ministries')}>Departments <i className="fas fa-chevron-down"></i></NavLink>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/ministries#women" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Women Department</Link></li>
                                        <li><Link to="/ministries#men" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Men Department</Link></li>
                                        <li><Link to="/ministries#youth" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Youth Department</Link></li>
                                        <li><Link to="/ministries#sundayschool" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Sunday School Department</Link></li>
                                        <li><Link to="/ministries#worship" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Praise and Worship</Link></li>
                                        <li><Link to="/ministries#instrumentalists" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Instrumentalist Ministry</Link></li>
                                        <li><Link to="/ministries#choir" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Church Choir</Link></li>
                                        <li><Link to="/ministries#ushering" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Ushering Ministry</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/about#assemblies" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Assemblies</Link></li>
                                <li><NavLink to="/leadership" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Leadership</NavLink></li>
                                <li><NavLink to="/events" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Events</NavLink></li>
                                <li><NavLink to="/gallery" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Gallery</NavLink></li>
                                <li><NavLink to="/contact" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }}>Contact Us</NavLink></li>
                                
                                {/* Mobile Live Service Check-In Link */}
                                {hasActiveSession && (
                                    <li className="mobile-only-nav-item">
                                        <Link 
                                            to={currentUser ? "/dashboard" : "/check-in"} 
                                            onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }} 
                                            className="mobile-nav-btn"
                                            style={{
                                                background: '#f0fdf4',
                                                border: '1.5px solid #10B981',
                                                color: '#166534',
                                                fontWeight: 800,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}
                                        >
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', animation: 'pulse 1.8s infinite' }}></span>
                                            Service Check-In Open
                                        </Link>
                                    </li>
                                )}

                                {/* Mobile Auth Options */}
                                {!currentUser ? (
                                    <li className="mobile-only-nav-item">
                                        <Link to="/login" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }} className="mobile-nav-btn login-btn">
                                            <i className="fas fa-sign-in-alt"></i> Log In / Sign Up
                                        </Link>
                                    </li>
                                ) : (
                                    <>
                                        {isAdmin && (
                                            <li className="mobile-only-nav-item">
                                                <Link to="/admin" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }} className="mobile-nav-btn" style={{ color: '#2563EB' }}>
                                                    <i className="fas fa-tachometer-alt"></i> Admin Panel
                                                </Link>
                                            </li>
                                        )}
                                        <li className="mobile-only-nav-item">
                                            <button onClick={() => { setMobileMenuOpen(false); handleSignOut(); }}
                                                style={{ background: 'none', border: '2px solid #dc2626', borderRadius: '6px', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '10px 16px', color: '#dc2626', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'inherit' }}>
                                                <i className="fas fa-sign-out-alt"></i> Sign Out
                                            </button>
                                        </li>
                                    </>
                                )}
                                <li className="mobile-only-nav-item">
                                    <Link to="/donate" onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null); }} className="mobile-nav-btn donate-btn">
                                        <i className="fas fa-heart"></i> Give / Paybill: 4136387
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        <div className="nav-buttons">
                            {currentUser ? (
                                /* Logged-In User Profile Pill with Avatar + First Name ▾ */
                                <div ref={userMenuRef} className="user-profile-pill-wrapper" style={{ position: 'relative' }}>
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '5px 14px 5px 5px',
                                            borderRadius: '50px',
                                            border: '2px solid #2563EB',
                                            background: 'rgba(37,99,235,0.07)',
                                            cursor: 'pointer',
                                            fontFamily: 'inherit',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,99,235,0.14)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,99,235,0.07)'}
                                    >
                                        <span style={{
                                            width: '32px', height: '32px', borderRadius: '50%',
                                            background: '#2563EB', color: '#fff', fontWeight: 800,
                                            fontSize: '0.8rem', display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', flexShrink: 0
                                        }}>
                                            {getInitials(currentUser.name)}
                                        </span>
                                        <span style={{ color: '#1e293b', fontWeight: 700, fontSize: '0.88rem', maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {currentUser.name?.split(' ')[0]}
                                        </span>
                                        <i className={`fas fa-chevron-${userMenuOpen ? 'up' : 'down'}`} style={{ color: '#2563EB', fontSize: '0.7rem' }}></i>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {userMenuOpen && (
                                        <div style={{
                                            position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                                            background: '#fff', borderRadius: '12px',
                                            boxShadow: '0 12px 32px rgba(0,0,0,0.14)',
                                            border: '1px solid #e2e8f0', padding: '8px',
                                            minWidth: '220px', zIndex: 9999
                                        }}>
                                            {/* User info */}
                                            <div style={{ padding: '10px 12px 12px', borderBottom: '1px solid #f1f5f9', marginBottom: '6px' }}>
                                                <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.92rem' }}>{currentUser.name}</div>
                                                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>{currentUser.email}</div>
                                                <span style={{
                                                    display: 'inline-block', marginTop: '6px',
                                                    padding: '2px 10px', borderRadius: '20px',
                                                    background: isAdmin ? 'rgba(37,99,235,0.12)' : '#f0fdf4',
                                                    color: isAdmin ? '#2563EB' : '#166534',
                                                    fontSize: '0.72rem', fontWeight: 700
                                                }}>
                                                    {isAdmin ? '⚡ Administrator' : '✅ Member'}
                                                </span>
                                            </div>

                                            {/* My Departments */}
                                            <Link to="/ministries" onClick={() => setUserMenuOpen(false)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '8px', color: '#1e293b', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600, transition: 'background 0.15s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                <i className="fas fa-users" style={{ color: '#2563EB', width: '16px', textAlign: 'center' }}></i>
                                                My Departments
                                            </Link>

                                            {/* 4. Admin Dashboard (if admin) */}
                                            {isAdmin && (
                                                <Link to="/admin" onClick={() => setUserMenuOpen(false)}
                                                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '8px', color: '#334155', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}
                                                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                    <i className="fas fa-tachometer-alt" style={{ color: '#2563EB', width: '16px', textAlign: 'center' }}></i>
                                                    Admin Panel
                                                </Link>
                                            )}

                                            {/* 5. Logout */}
                                            <div style={{ marginTop: '6px', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                                                <button
                                                    onClick={handleSignOut}
                                                    style={{
                                                        width: '100%', display: 'flex', alignItems: 'center',
                                                        gap: '10px', padding: '10px 12px', borderRadius: '8px',
                                                        background: '#fef2f2', border: '1px solid #fecaca',
                                                        color: '#dc2626', fontSize: '0.88rem', fontWeight: 700,
                                                        cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                                                        fontFamily: 'inherit'
                                                    }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#fff'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#dc2626'; }}
                                                >
                                                    <i className="fas fa-sign-out-alt" style={{ width: '16px', textAlign: 'center' }}></i>
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login" className="btn btn-login">Log In</Link>
                            )}

                            <Link to="/donate" className="btn btn-primary" title="Paybill: 4136387, Acc: YOUR NAME">
                                <i className="fas fa-heart"></i> Paybill: 4136387
                            </Link>
                        </div>

                        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;

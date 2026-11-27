import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo ngungo.png';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [hasActiveSession, setHasActiveSession] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const userMenuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === '/';
    const heroMode = isHome && !scrolled;

    // Scroll listener — adds shadow + shrinks header
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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
        const sessionInterval = setInterval(checkActiveSession, 20000);
        return () => {
            window.removeEventListener('storage', loadUser);
            window.removeEventListener('kemt_auth_change', loadUser);
            clearInterval(sessionInterval);
        };
    }, []);

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

    const handleDropdownToggle = (e, name) => {
        if (mobileMenuOpen || (typeof window !== 'undefined' && window.innerWidth <= 1024)) {
            e.preventDefault();
            e.stopPropagation();
            setOpenDropdown(prev => prev === name ? null : name);
        }
    };

    const closeAll = () => {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    };

    const isAdmin = currentUser && (currentUser.isAdmin || currentUser.role === 'Super Admin');

    return (
        <div className={`site-header-wrapper${scrolled ? ' scrolled' : ''}${heroMode ? ' hero-mode' : ''}`}>
            {mobileMenuOpen && (
                <div className="menu-backdrop" onClick={toggleMobileMenu}></div>
            )}

            {/* ── Refined Top Bar ── */}
            <div className="top-bar">
                <div className="container">
                    <div className="top-bar-content">
                        <div className="top-bar-left">
                            <span className="top-bar-email-wrap">
                                <i className="fas fa-envelope"></i>
                                <span className="top-bar-email-full">info@pagngungo.co.ke</span>
                            </span>
                            <span className="top-bar-divider top-bar-email-wrap">|</span>
                            <a href="tel:+254720140213" className="top-bar-phone-wrap">
                                <i className="fas fa-phone-alt"></i>
                                <span>+254 720 140 213</span>
                            </a>
                        </div>

                        <div className="top-bar-right">
                            <div className="top-bar-socials">
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                    <i className="fab fa-youtube"></i>
                                </a>
                                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                                    <i className="fab fa-tiktok"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Header ── */}
            <header className="header">
                <div className="container">
                    <div className="header-content">

                        {/* Logo */}
                        <div className="logo">
                            <Link to="/">
                                <img src={logoImg} alt="PAG Ngungo Assembly" className="logo-img" />
                                <div className="logo-name">
                                    <span className="logo-name-top">
                                        PAG — NGUNGO <span className="logo-assembly-word">ASSEMBLY</span>
                                    </span>
                                    <span className="logo-name-bottom">MBEERE DISTRICT HEADQUARTERS</span>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation */}
                        <nav className={`main-nav ${mobileMenuOpen ? 'active' : ''}`} aria-label="Main navigation">
                            <ul className="nav-menu">
                                <li>
                                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeAll}>
                                        Home
                                    </NavLink>
                                </li>
                                <li className={`dropdown ${openDropdown === 'about' ? 'active' : ''}`}>
                                    <NavLink to="/about" onClick={(e) => handleDropdownToggle(e, 'about')}>
                                        About Us <i className={`fas fa-chevron-${openDropdown === 'about' ? 'up' : 'down'}`}></i>
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/about" onClick={closeAll}>About PAG Ngungo</Link></li>
                                        <li><Link to="/about#who-we-are" onClick={closeAll}>Who We Are</Link></li>
                                        <li><Link to="/about#district-hq" onClick={closeAll}>District Headquarters</Link></li>
                                        <li><Link to="/about#order-of-services" onClick={closeAll}>Order of Services</Link></li>
                                        <li><Link to="/about#vision-mission" onClick={closeAll}>Vision &amp; Mission</Link></li>
                                        <li><Link to="/about#statement-of-faith" onClick={closeAll}>Statement of Faith</Link></li>
                                    </ul>
                                </li>
                                <li className={`dropdown ${openDropdown === 'departments' ? 'active' : ''}`}>
                                    <NavLink to="/departments" onClick={(e) => handleDropdownToggle(e, 'departments')}>
                                        Departments <i className={`fas fa-chevron-${openDropdown === 'departments' ? 'up' : 'down'}`}></i>
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/departments" onClick={closeAll}>All Departments</Link></li>
                                        <li className="dropdown-group-label">Four Pillars</li>
                                        <li><Link to="/departments#women" onClick={closeAll}>Women Department</Link></li>
                                        <li><Link to="/departments#men" onClick={closeAll}>Men Department</Link></li>
                                        <li><Link to="/departments#youth" onClick={closeAll}>Youth Department</Link></li>
                                        <li><Link to="/departments#sundayschool" onClick={closeAll}>Sunday School</Link></li>
                                    </ul>
                                </li>
                                <li className={`dropdown ${openDropdown === 'ministries' ? 'active' : ''}`}>
                                    <NavLink to="/ministries" onClick={(e) => handleDropdownToggle(e, 'ministries')}>
                                        Ministries <i className={`fas fa-chevron-${openDropdown === 'ministries' ? 'up' : 'down'}`}></i>
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/ministries" onClick={closeAll}>All Ministries</Link></li>
                                        <li className="dropdown-group-label">Sanctuary Arms</li>
                                        <li><Link to="/ministries#worship" onClick={closeAll}>Praise &amp; Worship</Link></li>
                                        <li><Link to="/ministries#instrumentalists" onClick={closeAll}>Instrumentalists</Link></li>
                                        <li><Link to="/ministries#choir" onClick={closeAll}>Sanctuary Choir</Link></li>
                                        <li><Link to="/ministries#ushering" onClick={closeAll}>Ushering &amp; Protocol</Link></li>
                                    </ul>
                                </li>
                                <li>
                                    <NavLink to="/assemblies" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeAll}>
                                        Assemblies
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/leadership" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeAll}>
                                        Leadership
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/gallery" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeAll}>
                                        Gallery
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeAll}>
                                        Contact
                                    </NavLink>
                                </li>

                                {/* Mobile-only items */}
                                {!currentUser ? (
                                    <li className="mobile-only-nav-item">
                                        <Link to="/login" onClick={closeAll} className="mobile-nav-btn login-btn">
                                            <i className="fas fa-sign-in-alt"></i> Log In / Sign Up
                                        </Link>
                                    </li>
                                ) : (
                                    <>
                                        {isAdmin && (
                                            <li className="mobile-only-nav-item">
                                                <Link to="/admin" onClick={closeAll} className="mobile-nav-btn" style={{ color: '#E87D1E' }}>
                                                    <i className="fas fa-tachometer-alt"></i> Admin Panel
                                                </Link>
                                            </li>
                                        )}
                                        <li className="mobile-only-nav-item">
                                            <button onClick={() => { closeAll(); handleSignOut(); }} style={{ background: 'none', border: '2px solid #dc2626', borderRadius: '6px', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '10px 16px', color: '#dc2626', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'inherit' }}>
                                                <i className="fas fa-sign-out-alt"></i> Sign Out
                                            </button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>

                        {/* Desktop right buttons */}
                        <div className="nav-buttons">
                            {currentUser ? (
                                <div ref={userMenuRef} className="user-profile-pill-wrapper" style={{ position: 'relative' }}>
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px 5px 5px', borderRadius: '50px', border: '2px solid #E87D1E', background: 'rgba(232,125,30,0.07)', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s ease' }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,125,30,0.14)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(232,125,30,0.07)'}
                                    >
                                        <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E87D1E', color: '#fff', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            {getInitials(currentUser.name)}
                                        </span>
                                        <span style={{ color: '#1e293b', fontWeight: 700, fontSize: '0.88rem', maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {currentUser.name?.split(' ')[0]}
                                        </span>
                                        <i className={`fas fa-chevron-${userMenuOpen ? 'up' : 'down'}`} style={{ color: '#2563EB', fontSize: '0.7rem' }}></i>
                                    </button>

                                    {userMenuOpen && (
                                        <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, background: '#fff', borderRadius: '12px', boxShadow: '0 12px 32px rgba(0,0,0,0.14)', border: '1px solid #e2e8f0', padding: '8px', minWidth: '220px', zIndex: 9999 }}>
                                            <div style={{ padding: '10px 12px 12px', borderBottom: '1px solid #f1f5f9', marginBottom: '6px' }}>
                                                <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.92rem' }}>{currentUser.name}</div>
                                                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>{currentUser.email}</div>
                                                <span style={{ display: 'inline-block', marginTop: '6px', padding: '2px 10px', borderRadius: '20px', background: isAdmin ? 'rgba(232,125,30,0.12)' : '#f0fdf4', color: isAdmin ? '#E87D1E' : '#166534', fontSize: '0.72rem', fontWeight: 700 }}>
                                                    {isAdmin ? '⚡ Administrator' : '✅ Member'}
                                                </span>
                                            </div>
                                            <Link to="/ministries" onClick={() => setUserMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '8px', color: '#1e293b', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600, transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                <i className="fas fa-users" style={{ color: '#3b82f6', width: '16px', textAlign: 'center' }}></i>
                                                My Departments
                                            </Link>
                                            {isAdmin && (
                                                <Link to="/admin" onClick={() => setUserMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '8px', color: '#334155', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                    <i className="fas fa-tachometer-alt" style={{ color: '#E87D1E', width: '16px', textAlign: 'center' }}></i>
                                                    Admin Panel
                                                </Link>
                                            )}
                                            <div style={{ marginTop: '6px', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                                                <button onClick={handleSignOut} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', fontFamily: 'inherit' }} onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#dc2626'; }}>
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
                        </div>

                        <div className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
                            <span className={mobileMenuOpen ? 'open' : ''}></span>
                            <span className={mobileMenuOpen ? 'open' : ''}></span>
                            <span className={mobileMenuOpen ? 'open' : ''}></span>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;

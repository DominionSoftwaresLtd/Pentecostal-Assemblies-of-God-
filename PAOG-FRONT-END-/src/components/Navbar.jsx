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

    const closeAll = () => {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
    };

    const handleNav = (e, path) => {
        if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1)) {
            return;
        }
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        
        closeAll();
        
        if (path.includes('#')) {
            const [targetPath, hash] = path.split('#');
            const currentPath = location.pathname;
            if (currentPath === targetPath || (targetPath === '' && currentPath === '/')) {
                const el = document.getElementById(hash);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
            }
        }
        navigate(path);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    };

    const isAdmin = currentUser && (currentUser.isAdmin || currentUser.role === 'Super Admin');

    return (
        <>
            {mobileMenuOpen && (
                <div className="menu-backdrop" onClick={closeAll}></div>
            )}
            <div className={`site-header-wrapper${scrolled ? ' scrolled' : ''}${heroMode ? ' hero-mode' : ''}`}>

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
                            <Link to="/" onClick={(e) => handleNav(e, '/')}>
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
                                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={(e) => handleNav(e, '/')}>
                                        Home
                                    </NavLink>
                                </li>
                                <li className="dropdown">
                                    <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={(e) => handleNav(e, '/about')}>
                                        About Us <i className="fas fa-chevron-down"></i>
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/about" onClick={(e) => handleNav(e, '/about')}>About PAG Ngungo</Link></li>
                                        <li><Link to="/about#who-we-are" onClick={(e) => handleNav(e, '/about#who-we-are')}>Who We Are</Link></li>
                                        <li><Link to="/about#district-hq" onClick={(e) => handleNav(e, '/about#district-hq')}>District Headquarters</Link></li>
                                        <li><Link to="/about#order-of-services" onClick={(e) => handleNav(e, '/about#order-of-services')}>Order of Services</Link></li>
                                        <li><Link to="/about#vision-mission" onClick={(e) => handleNav(e, '/about#vision-mission')}>Vision &amp; Mission</Link></li>
                                        <li><Link to="/about#statement-of-faith" onClick={(e) => handleNav(e, '/about#statement-of-faith')}>Statement of Faith</Link></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <NavLink to="/departments" className={({ isActive }) => isActive ? 'active' : ''} onClick={(e) => handleNav(e, '/departments')}>
                                        Departments <i className="fas fa-chevron-down"></i>
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/departments" onClick={(e) => handleNav(e, '/departments')}>All Departments</Link></li>
                                        <li className="dropdown-group-label">Four Pillars</li>
                                        <li><Link to="/departments#women" onClick={(e) => handleNav(e, '/departments#women')}>Women Department</Link></li>
                                        <li><Link to="/departments#men" onClick={(e) => handleNav(e, '/departments#men')}>Men Department</Link></li>
                                        <li><Link to="/departments#youth" onClick={(e) => handleNav(e, '/departments#youth')}>Youth Department</Link></li>
                                        <li><Link to="/departments#sundayschool" onClick={(e) => handleNav(e, '/departments#sundayschool')}>Sunday School</Link></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <NavLink to="/ministries" className={({ isActive }) => isActive ? 'active' : ''} onClick={(e) => handleNav(e, '/ministries')}>
                                        Ministries <i className="fas fa-chevron-down"></i>
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/ministries" onClick={(e) => handleNav(e, '/ministries')}>All Ministries</Link></li>
                                        <li className="dropdown-group-label">Sanctuary Arms</li>
                                        <li><Link to="/ministries#worship" onClick={(e) => handleNav(e, '/ministries#worship')}>Praise &amp; Worship</Link></li>
                                        <li><Link to="/ministries#instrumentalists" onClick={(e) => handleNav(e, '/ministries#instrumentalists')}>Instrumentalists</Link></li>
                                        <li><Link to="/ministries#choir" onClick={(e) => handleNav(e, '/ministries#choir')}>Sanctuary Choir</Link></li>
                                        <li><Link to="/ministries#ushering" onClick={(e) => handleNav(e, '/ministries#ushering')}>Ushering &amp; Protocol</Link></li>
                                    </ul>
                                </li>
                                <li>
                                    <NavLink to="/assemblies" className={({ isActive }) => isActive ? 'active' : ''} onClick={(e) => handleNav(e, '/assemblies')}>
                                        Assemblies
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/leadership" className={({ isActive }) => isActive ? 'active' : ''} onClick={(e) => handleNav(e, '/leadership')}>
                                        Leadership
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/gallery" className={({ isActive }) => isActive ? 'active' : ''} onClick={(e) => handleNav(e, '/gallery')}>
                                        Gallery
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={(e) => handleNav(e, '/contact')}>
                                        Contact
                                    </NavLink>
                                </li>

                                 {/* Mobile-only items */}
                                {!currentUser ? (
                                    <li className="mobile-only-nav-item">
                                        <Link to="/login" onClick={(e) => handleNav(e, '/login')} className="mobile-nav-btn login-btn">
                                            <i className="fas fa-sign-in-alt"></i> Log In / Sign Up
                                        </Link>
                                    </li>
                                ) : (
                                    <>
                                        <li className="mobile-only-nav-item">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#f8fafc', borderRadius: '12px', margin: '4px 8px 6px', border: '1px solid #e2e8f0' }}>
                                                <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E87D1E', color: '#fff', fontWeight: 800, fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    {getInitials(currentUser.name)}
                                                </span>
                                                <div style={{ overflow: 'hidden', textAlign: 'left' }}>
                                                    <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#1e293b', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{currentUser.name}</div>
                                                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{isAdmin ? '⚡ Administrator' : '✅ Member'}</div>
                                                </div>
                                            </div>
                                        </li>
                                        {isAdmin && (
                                            <li className="mobile-only-nav-item">
                                                <Link to="/admin" onClick={(e) => handleNav(e, '/admin')} className="mobile-nav-btn" style={{ color: '#E87D1E' }}>
                                                    <i className="fas fa-tachometer-alt"></i> Admin Panel
                                                </Link>
                                            </li>
                                        )}
                                        <li className="mobile-only-nav-item">
                                            <button onClick={() => { closeAll(); handleSignOut(); }} style={{ background: 'none', border: '2px solid #dc2626', borderRadius: '50px', cursor: 'pointer', width: 'calc(100% - 16px)', margin: '6px 8px 4px', textAlign: 'center', padding: '9px 16px', color: '#dc2626', fontWeight: 700, fontSize: '0.84rem', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
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
                                        className="user-avatar-btn"
                                        title={`${currentUser.name} — Click to view profile menu`}
                                        aria-label="User profile menu"
                                    >
                                        <span className="user-avatar-monogram">
                                            {getInitials(currentUser.name)}
                                        </span>
                                        <span className="user-avatar-name">
                                            {currentUser.name?.split(' ')[0]}
                                        </span>
                                        <i className={`fas fa-chevron-${userMenuOpen ? 'up' : 'down'} user-avatar-chevron`}></i>
                                    </button>

                                    {userMenuOpen && (
                                        <div style={{
                                            position: 'absolute',
                                            top: 'calc(100% + 12px)',
                                            right: 0,
                                            background: '#ffffff',
                                            borderRadius: '16px',
                                            boxShadow: '0 20px 50px -4px rgba(0, 0, 50, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.06)',
                                            border: '1px solid #e2e8f0',
                                            padding: '8px',
                                            minWidth: '240px',
                                            zIndex: 9999,
                                            animation: 'fadeIn 0.2s ease'
                                        }}>
                                            <div style={{
                                                padding: '12px 14px',
                                                background: 'linear-gradient(135deg, #000044 0%, #000066 100%)',
                                                borderRadius: '12px',
                                                color: '#fff',
                                                marginBottom: '8px'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <span style={{
                                                        width: '36px',
                                                        height: '36px',
                                                        borderRadius: '50%',
                                                        background: 'linear-gradient(135deg, #E87D1E 0%, #f59e0b 100%)',
                                                        color: '#fff',
                                                        fontWeight: 800,
                                                        fontSize: '0.85rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexShrink: 0,
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                                                    }}>
                                                        {getInitials(currentUser.name)}
                                                    </span>
                                                    <div style={{ overflow: 'hidden' }}>
                                                        <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.92rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                                            {currentUser.name}
                                                        </div>
                                                        <div style={{ fontSize: '0.74rem', color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                            {currentUser.email}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <span style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        padding: '2px 8px',
                                                        borderRadius: '20px',
                                                        background: isAdmin ? 'rgba(232,125,30,0.25)' : 'rgba(16, 185, 129, 0.25)',
                                                        color: isAdmin ? '#ffa347' : '#6ee7b7',
                                                        fontSize: '0.7rem',
                                                        fontWeight: 700,
                                                        border: isAdmin ? '1px solid rgba(232,125,30,0.4)' : '1px solid rgba(16, 185, 129, 0.4)'
                                                    }}>
                                                        {isAdmin ? '⚡ Administrator' : '✅ Active Member'}
                                                    </span>
                                                </div>
                                            </div>

                                            <Link
                                                to="/ministries"
                                                onClick={() => setUserMenuOpen(false)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                    padding: '9px 12px',
                                                    borderRadius: '8px',
                                                    color: '#1e293b',
                                                    textDecoration: 'none',
                                                    fontSize: '0.86rem',
                                                    fontWeight: 600,
                                                    transition: 'background 0.15s'
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <i className="fas fa-users" style={{ color: '#3b82f6', width: '16px', textAlign: 'center' }}></i>
                                                My Departments
                                            </Link>

                                            {isAdmin && (
                                                <Link
                                                    to="/admin"
                                                    onClick={() => setUserMenuOpen(false)}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                        padding: '9px 12px',
                                                        borderRadius: '8px',
                                                        color: '#E87D1E',
                                                        textDecoration: 'none',
                                                        fontSize: '0.86rem',
                                                        fontWeight: 700,
                                                        background: 'rgba(232, 125, 30, 0.06)',
                                                        marginTop: '2px',
                                                        transition: 'background 0.15s'
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(232, 125, 30, 0.12)'}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(232, 125, 30, 0.06)'}
                                                >
                                                    <i className="fas fa-tachometer-alt" style={{ color: '#E87D1E', width: '16px', textAlign: 'center' }}></i>
                                                    Admin Command Center
                                                </Link>
                                            )}

                                            <div style={{ marginTop: '6px', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                                                <button
                                                    onClick={handleSignOut}
                                                    style={{
                                                        width: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                        padding: '9px 12px',
                                                        borderRadius: '8px',
                                                        background: '#fef2f2',
                                                        border: '1px solid #fecaca',
                                                        color: '#dc2626',
                                                        fontSize: '0.85rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer',
                                                        textAlign: 'left',
                                                        transition: 'all 0.2s',
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
        </>
    );
};

export default Navbar;

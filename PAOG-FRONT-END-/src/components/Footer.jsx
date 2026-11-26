import React from 'react';
import { Link } from 'react-router-dom';
import dominionLogo from '../assets/dominion softwares main logo.png';
import logoImg from '../assets/logo ngungo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-col">
                            <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                                <img 
                                    src={logoImg} 
                                    alt="PAG Ngungo Assembly" 
                                    style={{ 
                                        width: '54px', 
                                        height: '54px', 
                                        objectFit: 'contain', 
                                        borderRadius: '50%', 
                                        background: '#ffffff', 
                                        padding: '3px',
                                        boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                                        flexShrink: 0
                                    }} 
                                />
                                <div>
                                    <h3 style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.18rem', margin: 0 }}>
                                        Pentecostal Assemblies of God
                                    </h3>
                                    <p style={{ color: '#E87D1E', fontWeight: 700, fontSize: '0.86rem', margin: '4px 0 0' }}>
                                        Ngungo Assembly — Mbeere District HQ
                                    </p>
                                </div>
                            </div>
                            <p>Proclaiming the full Gospel of Jesus Christ, making disciples, and coordinating assemblies across Mbeere District and Kyuso Circuit, Kitui County.</p>
                            <div className="footer-social">
                                <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                                <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
                            </div>
                        </div>
                        <div className="footer-col">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/departments">Church Departments</Link></li>
                                <li><Link to="/ministries">Sanctuary Ministries</Link></li>
                                <li><Link to="/assemblies">District Assemblies</Link></li>
                                <li><Link to="/leadership">Leadership Team</Link></li>
                                <li><Link to="/gallery">Gallery</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Departments &amp; Ministries</h4>
                            <ul>
                                <li><Link to="/departments#women">Women Department</Link></li>
                                <li><Link to="/departments#men">Men Department</Link></li>
                                <li><Link to="/departments#youth">Youth Department</Link></li>
                                <li><Link to="/departments#sundayschool">Sunday School Department</Link></li>
                                <li><Link to="/ministries#worship">Praise and Worship</Link></li>
                                <li><Link to="/ministries#instrumentalists">Instrumentalist Ministry</Link></li>
                                <li><Link to="/ministries#choir">Choir Ministry</Link></li>
                                <li><Link to="/ministries#ushering">Ushering Ministry</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Service Times &amp; Location</h4>
                            <ul className="contact-info">
                                <li>
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>Ngungo Assembly Sanctuary<br />Mbeere District, Embu County, Kenya</span>
                                </li>
                                <li>
                                    <i className="fas fa-clock"></i>
                                    <span>
                                        <strong>Sunday:</strong> 8:00 AM (Sunday School &amp; English)<br />
                                        <strong>Sunday:</strong> 10:30 AM (Main Service)<br />
                                        <strong>Friday:</strong> 7:00 PM (Fellowship)<br />
                                        <strong>Saturday:</strong> 4:00 PM (Youth)
                                    </span>
                                </li>
                                <li>
                                    <i className="fas fa-envelope"></i>
                                    <span>info@pagngungo.org</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p>&copy; {new Date().getFullYear()} Pentecostal Assemblies of God - Ngungo Assembly (Mbeere District HQ). All Rights Reserved.</p>
                        <div className="footer-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <Link to="/login">Sign In</Link>
                            <a 
                                href="https://dominionsoftwares.org" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', transition: 'color 0.3s ease' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                                title="Dominion Softwares Ltd - Custom Software & Web Engineering"
                            >
                                Powered By
                                <img src={dominionLogo} alt="Dominion Softwares Ltd" style={{ height: '14px', width: 'auto', objectFit: 'contain', opacity: 0.75, verticalAlign: 'middle' }} />
                                <strong style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>Dominion Softwares Ltd</strong>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

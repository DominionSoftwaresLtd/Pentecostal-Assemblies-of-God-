import React from 'react';
import { Link } from 'react-router-dom';
import dominionLogo from '../assets/dominion softwares main logo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-col">
                            <div className="footer-logo">
                                <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.3px' }}>
                                    PENTECOSTAL ASSEMBLIES OF GOD
                                </h3>
                                <div style={{ color: '#E87D1E', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                                    Ngungo Assembly • Mbeere District HQ
                                </div>
                            </div>
                            <p>Headquarter church for Mbeere District under the spiritual leadership of Bishop Rev Clement Simba. Worshiping God in Spirit and Truth, and serving assemblies across Mbeere District and Kyuso, Kitui County.</p>
                            <div style={{ marginTop: '14px', padding: '10px 14px', background: 'rgba(232, 125, 30, 0.12)', border: '1px solid rgba(232, 125, 30, 0.3)', borderRadius: '8px' }}>
                                <div style={{ color: '#E87D1E', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Giving via M-Pesa</div>
                                <div style={{ color: '#fff', fontSize: '0.88rem', marginTop: '2px' }}><strong>Paybill:</strong> 4136387 &bull; <strong>Acc:</strong> YOUR NAME</div>
                            </div>
                        </div>
                        <div className="footer-col">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/ministries">Ministries</Link></li>
                                <li><Link to="/programs">Programs</Link></li>
                                <li><Link to="/events">Events</Link></li>
                                <li><Link to="/gallery">Gallery</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Our Departments</h4>
                            <ul>
                                <li><Link to="/ministries#women">Women Department</Link></li>
                                <li><Link to="/ministries#men">Men Department</Link></li>
                                <li><Link to="/ministries#youth">Youth Department</Link></li>
                                <li><Link to="/ministries#sundayschool">Sunday School Department</Link></li>
                                <li><Link to="/ministries#worship">Praise and Worship</Link></li>
                                <li><Link to="/ministries#instrumentalists">Instrumentalists &amp; Choir</Link></li>
                                <li><Link to="/ministries#ushering">Ushering Ministry</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Contact Info</h4>
                            <ul className="contact-info">
                                <li>
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>P.O. Box 213-60113<br />Kiritiri, Mbeere, Kenya</span>
                                </li>
                                <li>
                                    <i className="fas fa-phone"></i>
                                    <span>+254 720 140 213</span>
                                </li>
                                <li>
                                    <i className="fas fa-envelope"></i>
                                    <span>info@paogngungo.org</span>
                                </li>
                                <li>
                                    <i className="fas fa-user-tie"></i>
                                    <span>Bishop Clement Simba<br />District Overseer</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p>&copy; {new Date().getFullYear()} Pentecostal Assemblies of God - Ngungo Assembly. All Rights Reserved.</p>
                        <div className="footer-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <Link to="/login">Sign In</Link>
                            <a 
                                href="https://dominionsoftwares.org" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', transition: 'color 0.3s ease' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#E87D1E'}
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

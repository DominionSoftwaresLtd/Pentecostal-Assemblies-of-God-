import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Static fallback images (bundled at build time)
import vincentImg from '../assets/Vincent Mwenda.jpeg';
import moriceImg from '../assets/Mutharimi.jpg';
import mwanziaImg from '../assets/Mwanzia.jpg';
import kennedyImg from '../assets/Kennedy Mutuku.JPG';
import mukamiImg from '../assets/mukami.jpg';
import rayImg from '../assets/ray.jpg';
import odinaImg from '../assets/odina.jpg';
import georgeImg from '../assets/george.jpg';

const leadership = [
  { name: 'Vincent Mwendwa', role: 'Director', initials: 'VM', color: '#e67e22', image: vincentImg },
  { name: 'Morice Mutharimi', role: 'Chairperson', initials: 'MM', color: '#2980b9', image: moriceImg },
  { name: 'Mwanzia David', role: 'Outreach Incharge', initials: 'MD', color: '#27ae60', image: mwanziaImg },
  { name: 'Kennedy Mutuku', role: 'Digital Infrastructure Director', initials: 'KM', color: '#8e44ad', image: kennedyImg, objectPosition: 'top center' },
  { name: 'Evaline Mukami', role: 'Secretary', initials: 'EM', color: '#16a085', image: mukamiImg },
  { name: 'Grace Odina Kambaga', role: 'Treasurer', initials: 'GK', color: '#e74c3c', image: odinaImg },
  { name: 'George William', role: 'Welfare Incharge', initials: 'GW', color: '#2c3e50', image: georgeImg },
  { name: 'Raymond Ewoi', role: 'Prayer Coordinator', initials: 'RE', color: '#c0392b', image: rayImg },
  { name: 'Victor Muriungi', role: 'Worship Coordinator', initials: 'VM', color: '#d4ac0d' },
  { name: 'Joy Mucangi', role: 'Discipleship Incharge', initials: 'JM', color: '#059669' },
];
const STATIC_IMAGES = {
  'Vincent Mwendwa': vincentImg,
  'Vincent Mwenda': vincentImg,
  'Morice Mutharimi': moriceImg,
  'Mwanzia David': mwanziaImg,
  'Kennedy Mutuku': kennedyImg,
  'Evaline Mukami': mukamiImg,
  'Grace Odina Kambaga': odinaImg,
  'George William': georgeImg,
  'Raymond Ewoi': rayImg,
};

const resolveImage = (leader) => {
  if (!leader.image) return STATIC_IMAGES[leader.name] || null;
  if (leader.image.startsWith('http') || leader.image.startsWith('data:')) return leader.image;
  if (leader.image.startsWith('/assets/')) return STATIC_IMAGES[leader.name] || null;
  if (leader.image.startsWith('uploads/')) return `/${leader.image}`;
  return STATIC_IMAGES[leader.name] || null;
};

const Leadership = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await fetch('/api/leadership');
        const data = await res.json();
        if (data.success && data.leaders && data.leaders.length > 0) {
          setLeaders(data.leaders.sort((a, b) => (Number(a.order) || 99) - (Number(b.order) || 99)));
        }
      } catch (err) {
        console.warn('Leadership API unavailable, using static fallback.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  return (
    <main className="leadership-page">

      {/* Banner */}
      <section className="page-banner leadership-banner">
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">The Team</span>
            <h1>Leadership Team</h1>
            <p>Servant-leaders committed to advancing the Kingdom of God through humility, faith and dedication.</p>
          </div>
        </div>
      </section>

      {/* Leadership Grid */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '12px' }} />
              <p style={{ margin: 0 }}>Loading leadership team...</p>
            </div>
          ) : (
            <div className="leader-grid">
              {leaders.map((person, i) => {
                const imgSrc = resolveImage(person);
                return (
                  <div className="leader-card" key={person._id || i}>
                    <div
                      className="leader-photo"
                      style={{ background: `linear-gradient(160deg, ${person.color || '#E87D1E'}dd, ${person.color || '#E87D1E'}88)` }}
                    >
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={person.name}
                          style={person.objectPosition ? { objectPosition: person.objectPosition } : undefined}
                          onError={e => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : (
                        <span className="leader-initials">{person.initials || person.name?.slice(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="leader-info">
                      <h3 className="leader-name">{person.name}</h3>
                      <p className="leader-role">{person.role}</p>
                      {person.bio && (
                        <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '6px', lineHeight: '1.5' }}>{person.bio}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join Us in This Mission</h2>
            <p>Whether through prayer, giving, or going — there is a place for you in what God is doing through KEMT.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
              <Link to="/donate" className="btn btn-secondary">Support Us</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Leadership;

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

const fallbackLeadership = [
  { _id: 'ldr-1', name: 'Bishop Rev Clement Simba', role: 'Bishop & District Overseer', department: 'District Leadership', initials: 'CS', color: '#e67e22', bio: 'Bishop and Overseer of Mbeere District, presiding over Ngungo Assembly Headquarters, Ngangari Assembly, and Muumoni Assembly.', order: 1 },
  { _id: 'ldr-2', name: 'Rev John Ngochi', role: 'District Secretary', department: 'District Executive', initials: 'JN', color: '#2980b9', bio: 'District Secretary for Mbeere District and Minister in charge of Kathera Assembly.', order: 2 },
  { _id: 'ldr-3', name: 'Rev Shem Mugo', role: 'District Treasurer', department: 'District Executive', initials: 'SM', color: '#27ae60', bio: 'District Treasurer stewarding the financial resources of Mbeere District.', order: 3 },
  { _id: 'ldr-4', name: 'John Matu', role: 'District Layman', department: 'District Council', initials: 'JM', color: '#8e44ad', bio: 'District Layman coordinating lay leaders and believers across Mbeere District.', order: 4 },
  { _id: 'ldr-5', name: 'Charles Njagi', role: 'District Clerk', department: 'District Secretariat', initials: 'CN', color: '#16a085', bio: 'District Clerk managing administrative and official documentation across the district.', order: 5 },
  { _id: 'ldr-6', name: 'David Robert', role: 'Church Deacon', department: 'Ngungo Assembly Leadership', initials: 'DR', color: '#e74c3c', bio: 'Church Deacon at Pentecostal Assemblies of God - Ngungo Assembly Headquarters.', order: 6 },
  { _id: 'ldr-7', name: 'Michael Robert', role: 'Church Treasurer', department: 'Ngungo Assembly Leadership', initials: 'MR', color: '#2c3e50', bio: 'Church Treasurer overseeing financial administration at Ngungo Assembly Headquarters.', order: 7 },
  { _id: 'ldr-8', name: 'Rev Rose Nyamwaro', role: 'Pastor, Kiamachang\'a Assembly', department: 'District Pastoral Council', initials: 'RN', color: '#d35400', bio: 'Pastor in charge of Kiamachang\'a Assembly in Mbeere District.', order: 8 },
  { _id: 'ldr-9', name: 'Rev Samuel Nderitu', role: 'Pastor, Rwika Assembly', department: 'District Pastoral Council', initials: 'SN', color: '#2980b9', bio: 'Pastor in charge of Rwika Assembly in Mbeere District.', order: 9 },
  { _id: 'ldr-10', name: 'Rev Paul Nyaga', role: 'Pastor, Mugaari Assembly', department: 'District Pastoral Council', initials: 'PN', color: '#27ae60', bio: 'Pastor in charge of Mugaari Assembly in Mbeere District.', order: 10 },
  { _id: 'ldr-11', name: 'Rev David Kimanthi', role: 'Pastor, Gikuru Assembly', department: 'District Pastoral Council', initials: 'DK', color: '#8e44ad', bio: 'Pastor in charge of Gikuru Assembly in Mbeere District.', order: 11 },
];

const STATIC_IMAGES = {};

const resolveImage = (leader) => {
  if (!leader.image) return STATIC_IMAGES[leader.name] || null;
  if (leader.image.startsWith('http') || leader.image.startsWith('data:')) return leader.image;
  if (leader.image.startsWith('/assets/')) return STATIC_IMAGES[leader.name] || null;
  if (leader.image.startsWith('uploads/')) return `/${leader.image}`;
  return STATIC_IMAGES[leader.name] || null;
};

const Leadership = () => {
  const [leaders, setLeaders] = useState(fallbackLeadership);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await fetch('/api/leadership');
        const data = await res.json();
        if (data.success && data.leaders && data.leaders.length > 0) {
          setLeaders(data.leaders.sort((a, b) => (Number(a.order) || 99) - (Number(b.order) || 99)));
        }
      } catch (err) {
        console.warn('Leadership API unavailable, using fallback.', err);
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
            <span className="banner-tag">Mbeere District Council</span>
            <h1>Church &amp; District Leadership</h1>
            <p>Servant-leaders committed to shepherding the flock of God under Bishop Rev Clement Simba.</p>
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
            <h2>Connect With Church Leadership</h2>
            <p>Have a spiritual inquiry, prayer burden, or wish to partner with our district ministries? Reach out to Bishop Clement Simba and the leadership team.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Contact Church Office</Link>
              <Link to="/donate" className="btn btn-secondary"><i className="fas fa-hand-holding-dollar"></i> Support Ministry (Paybill: 4136387)</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Leadership;

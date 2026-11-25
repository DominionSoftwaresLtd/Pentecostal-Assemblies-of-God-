import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Users, Church, UserCheck, ChevronRight } from 'lucide-react';
import bishopPhoto from '../assets/Bishop Clement Simba Overseer.jpg';

const STATIC_LEADERS = [
  {
    _id: 'ldr-1',
    name: 'Rev. Clement Simba',
    role: 'Bishop & District Overseer',
    department: 'District Executive',
    category: 'District Executive',
    assembly: 'Ngangari & Muumoni Assemblies',
    email: 'bishop@pagngungo.org',
    phone: '+254 700 000 000',
    initials: 'CS',
    color: '#8e44ad',
    image: bishopPhoto,
    order: 1,
    status: 'Active Leadership',
    bio: 'Presiding Bishop and Overseer for Mbeere District and Assembly Pastor of Ngangari & Muumoni Assemblies, ministering with apostolic vision and spiritual authority.'
  },
  {
    _id: 'ldr-2',
    name: 'David Robert',
    role: 'Deacon',
    department: 'Ngungo Assembly Council',
    category: 'Assembly Leadership',
    assembly: 'Ngungo Assembly (HQ)',
    email: 'deacon@pagngungo.org',
    phone: '+254 700 000 000',
    initials: 'DR',
    color: '#2980b9',
    image: '',
    order: 2,
    status: 'Active Leadership',
    bio: 'Faithful Deacon at Pentecostal Assemblies of God - Ngungo Assembly, assisting in pastoral care, sanctuary administration, and spiritual order.'
  },
  {
    _id: 'ldr-3',
    name: 'Michael Robert',
    role: 'Treasurer',
    department: 'Ngungo Assembly Council',
    category: 'Assembly Leadership',
    assembly: 'Ngungo Assembly (HQ)',
    email: 'treasurer@pagngungo.org',
    phone: '+254 700 000 000',
    initials: 'MR',
    color: '#27ae60',
    image: '',
    order: 3,
    status: 'Active Leadership',
    bio: 'Assembly Treasurer stewarding church resources, financial accountability, and physical project developments at Ngungo Assembly.'
  },
  {
    _id: 'ldr-4',
    name: 'John Matu',
    role: 'District Layman',
    department: 'District Executive',
    category: 'District Executive',
    assembly: 'Mbeere District',
    email: 'layman@pagngungo.org',
    phone: '+254 700 000 000',
    initials: 'JM',
    color: '#e67e22',
    image: '',
    order: 4,
    status: 'Active Leadership',
    bio: 'District Layman representing and coordinating lay members, grassroots fellowship, and community ministry across all assemblies.'
  },
  {
    _id: 'ldr-5',
    name: 'Charles Njagi',
    role: 'District Clerk',
    department: 'District Executive',
    category: 'District Executive',
    assembly: 'Mbeere District',
    email: 'clerk@pagngungo.org',
    phone: '+254 700 000 000',
    initials: 'CN',
    color: '#16a085',
    image: '',
    order: 5,
    status: 'Active Leadership',
    bio: 'District Clerk responsible for district documentation, official registers, and administrative records across the circuit.'
  },
  {
    _id: 'ldr-6',
    name: 'Rev. John Ngochi',
    role: 'District Secretary & Pastor',
    department: 'District Executive',
    category: 'District Executive',
    assembly: 'Kathera Assembly',
    email: 'secretary@pagngungo.org',
    phone: '+254 700 000 000',
    initials: 'JN',
    color: '#e74c3c',
    image: '',
    order: 6,
    status: 'Active Leadership',
    bio: 'District Secretary for Mbeere District and Assembly Pastor at Kathera Assembly, providing executive secretarial guidance and pastoral ministry.'
  },
  {
    _id: 'ldr-7',
    name: 'Rev. Shem Mugo',
    role: 'District Treasurer',
    department: 'District Executive',
    category: 'District Executive',
    assembly: 'Mbeere District',
    email: 'districttreasurer@pagngungo.org',
    phone: '+254 700 000 000',
    initials: 'SM',
    color: '#d4ac0d',
    image: '',
    order: 7,
    status: 'Active Leadership',
    bio: 'District Treasurer overseeing district finances, mission treasury, and resource stewardship for all assemblies.'
  },
  {
    _id: 'ldr-8',
    name: 'Rev. Rose Nyamwaro',
    role: 'Pastor, Kiamachang\'a Assembly',
    department: 'District Pastors',
    category: 'District Pastors',
    assembly: "Kiamachang'a Assembly",
    email: 'pastor.kiamachanga@pagngungo.org',
    phone: '+254 700 000 000',
    initials: 'RN',
    color: '#9b59b6',
    image: '',
    order: 8,
    status: 'Active Leadership',
    bio: 'Resident Assembly Pastor guiding Kiamachang\'a Assembly in discipleship, evangelism, and community transformation.'
  },
  {
    _id: 'ldr-9',
    name: 'Rev. Samuel Nderitu',
    role: 'Pastor, Rwika Assembly',
    department: 'District Pastors',
    category: 'District Pastors',
    assembly: 'Rwika Assembly',
    email: 'pastor.rwika@pagngungo.org',
    phone: '+254 700 000 000',
    initials: 'SN',
    color: '#1abc9c',
    image: '',
    order: 9,
    status: 'Active Leadership',
    bio: 'Resident Assembly Pastor leading Rwika Assembly in dynamic worship, biblical teaching, and spiritual growth.'
  },
  {
    _id: 'ldr-10',
    name: 'Rev. Paul Nyaga',
    role: 'Pastor, Mugaari Assembly',
    department: 'District Pastors',
    category: 'District Pastors',
    assembly: 'Mugaari Assembly',
    email: 'pastor.mugaari@pagngungo.org',
    phone: '+254 700 000 000',
    initials: 'PN',
    color: '#34495e',
    image: '',
    order: 10,
    status: 'Active Leadership',
    bio: 'Resident Assembly Pastor shepherding Mugaari Assembly and community ministry in truth and grace.'
  },
  {
    _id: 'ldr-11',
    name: 'Rev. David Kimanthi',
    role: 'Pastor, Gikuru Assembly',
    department: 'District Pastors',
    category: 'District Pastors',
    assembly: 'Gikuru Assembly',
    email: 'pastor.gikuru@pagngungo.org',
    phone: '+254 700 000 000',
    initials: 'DK',
    color: '#e67e22',
    image: '',
    order: 11,
    status: 'Active Leadership',
    bio: 'Resident Assembly Pastor championing church outreach and spiritual revitalization in Gikuru Assembly.'
  }
];

const Leadership = () => {
  const [leaders, setLeaders] = useState(STATIC_LEADERS);
  const [categoryFilter, setCategoryFilter] = useState('all');
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

  const filteredLeaders = leaders.filter(person => {
    if (categoryFilter === 'district') {
      return (person.category === 'District Executive') || 
             (person.department && person.department.includes('District Executive'));
    }
    if (categoryFilter === 'assembly') {
      return (person.category === 'Assembly Leadership') || 
             (person.department && person.department.includes('Ngungo Assembly'));
    }
    if (categoryFilter === 'pastors') {
      return (person.category === 'District Pastors') || 
             (person.role && person.role.includes('Pastor'));
    }
    return true;
  });

  return (
    <main className="leadership-page">

      {/* Banner */}
      <section className="page-banner leadership-banner">
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">Servant Leaders</span>
            <h1>Church &amp; District Leadership</h1>
            <p>
              Pentecostal Assemblies of God - Ngungo Assembly &amp; Mbeere District leadership team, 
              shepherding God's flock with integrity, spiritual wisdom, and faithful devotion.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section style={{ background: '#f8fafc', padding: '28px 0 10px', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            background: '#ffffff',
            padding: '6px',
            borderRadius: '50px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            gap: '6px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {[
              { id: 'all', label: `All Leaders (${leaders.length})` },
              { id: 'district', label: 'District Executive' },
              { id: 'assembly', label: 'Ngungo Assembly Council' },
              { id: 'pastors', label: 'District Pastors' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                style={{
                  border: 'none',
                  padding: '9px 20px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: categoryFilter === tab.id ? '#e67e22' : 'transparent',
                  color: categoryFilter === tab.id ? '#ffffff' : '#475569'
                }}
              >
                {tab.label}
              </button>
            ))}
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
              {filteredLeaders.map((person, i) => {
                const initials = person.initials || (person.name ? person.name.slice(0, 2).toUpperCase() : 'LD');
                const roleColor = person.color || '#e67e22';

                return (
                  <div className="leader-card" key={person._id || i}>
                    <div
                      className="leader-photo"
                      style={{ background: `linear-gradient(145deg, ${roleColor}ee, ${roleColor}aa)` }}
                    >
                      {person.image ? (
                        <img
                          src={person.image}
                          alt={person.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                          onError={e => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : (
                        <span className="leader-initials" style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
                          {initials}
                        </span>
                      )}
                    </div>
                    <div className="leader-info">
                      <div style={{
                        display: 'inline-block',
                        background: '#f1f5f9',
                        color: '#475569',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        marginBottom: '6px'
                      }}>
                        {person.department || person.category || 'Leadership'}
                      </div>
                      <h3 className="leader-name">{person.name}</h3>
                      <p className="leader-role" style={{ color: roleColor, fontWeight: 700 }}>{person.role}</p>
                      
                      {person.assembly && (
                        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Church size={13} style={{ color: '#e67e22' }} />
                          <span>{person.assembly}</span>
                        </div>
                      )}

                      {person.bio && (
                        <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '8px', lineHeight: '1.5' }}>
                          {person.bio}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Assemblies CTA */}
      <section style={{ background: '#f8fafc', padding: '50px 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
          <span style={{ color: '#e67e22', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.85rem' }}>
            Connected in Fellowship
          </span>
          <h2 style={{ fontSize: '1.9rem', color: '#1e293b', fontWeight: 800, margin: '8px 0 12px' }}>
            Explore Mbeere District Assemblies
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '24px' }}>
            Learn more about the 8 assemblies in Mbeere District and our circuit assemblies in Kyuso, Kitui County, 
            along with service times and resident pastoral ministers.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/assemblies" className="btn btn-primary">
              View Assemblies Directory
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Leadership Office
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Leadership;

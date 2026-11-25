import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  Heart, 
  BookOpen, 
  ShieldCheck, 
  Music, 
  Search,
  Filter,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const churchPrograms = [
  {
    id: 1,
    name: 'Mbeere District Annual Convocation & Revival',
    category: 'District Gatherings',
    frequency: 'Annual • August',
    timing: '5 Days • Morning & Evening Sessions',
    location: 'Ngungo Assembly Grounds (District Headquarters)',
    leader: 'Bishop Rev. Clement Simba & District Executive',
    description: 'The premier annual gathering uniting all 8 Mbeere district assemblies and the Kyuso circuit for apostolic revival, spiritual impartation, powerful crusades, and district-wide fellowship.',
    highlights: ['All-Assemblies Combined Fellowship', 'Spiritual Revival Crusades', 'Pastoral Empowerment', 'Praise & Thanksgiving Concert'],
    icon: 'fas fa-church',
    color: '#E87D1E'
  },
  {
    id: 2,
    name: 'Sunday Main Celebration Service',
    category: 'Sanctuary Services',
    frequency: 'Every Sunday',
    timing: '10:30 AM – 1:30 PM',
    location: 'Ngungo Assembly Sanctuary',
    leader: 'Pastoral Team, Choir & Praise Team',
    description: 'Our primary weekly gathering featuring anointed praise and worship, vibrant choir anthems, deep expository preaching of the Word of God, and communal prayer.',
    highlights: ['Choir & Praise Ministration', 'Biblical Preaching', 'Holy Communion & Baby Dedications', 'Corporate Prayer'],
    icon: 'fas fa-sun',
    color: '#10b981'
  },
  {
    id: 3,
    name: 'Sunday English Service',
    category: 'Sanctuary Services',
    frequency: 'Every Sunday',
    timing: '8:00 AM – 10:00 AM',
    location: 'Ngungo Assembly Sanctuary',
    leader: 'Ministerial Team',
    description: 'An early-morning English worship service designed for professionals, students, and believers desiring an uplifting start to the Lord\'s Day in praise and systematic teaching.',
    highlights: ['English Preaching & Scripture Exposition', 'Quiet Contemplation & Worship', 'Interactive Discipleship'],
    icon: 'fas fa-book-bible',
    color: '#3b82f6'
  },
  {
    id: 4,
    name: 'Sunday School Department',
    category: 'Children & Family',
    frequency: 'Every Sunday',
    timing: '8:00 AM – 10:00 AM',
    location: 'Sunday School Classrooms, Ngungo Sanctuary',
    leader: 'Sunday School Teachers & Department Leadership',
    description: 'Graded Bible classes catering to toddlers, children, and young adolescents. Children learn foundational Christian doctrine, memorise Scripture, and build a lasting relationship with Jesus Christ.',
    highlights: ['Creative Bible Storytelling', 'Scripture Memorisation', 'Children\'s Choir & Drama', 'Loving Teachers'],
    icon: 'fas fa-child',
    color: '#f59e0b'
  },
  {
    id: 5,
    name: 'Youth Fellowship Explosion',
    category: 'Youth & Talents',
    frequency: 'Every Saturday',
    timing: '4:00 PM – 6:00 PM',
    location: 'Ngungo Assembly Main Hall',
    leader: 'Youth Department Leadership',
    description: 'An electrifying gathering for teens and young adults featuring contemporary gospel music, instrumental skill development, open discussion on modern life challenges, and spiritual mentorship.',
    highlights: ['Instrumentalist & Vocal Training', 'Mentorship & Career Advice', 'Sports & District Youth Rallies', 'Evangelistic Outreaches'],
    icon: 'fas fa-bolt',
    color: '#ef4444'
  },
  {
    id: 6,
    name: 'Friday Revival & Intercession Fellowship',
    category: 'Sanctuary Services',
    frequency: 'Every Friday',
    timing: '7:00 PM – 9:00 PM',
    location: 'Ngungo Assembly Sanctuary',
    leader: 'Intercessory Team & Pastoral Council',
    description: 'A powerful midweek prayer vigil and revival night dedicated to spiritual warfare, interceding for our community and nation, healing the sick, and seeking God\'s breakthroughs.',
    highlights: ['Fervent Intercession', 'Deliverance & Healing Prayers', 'Anointing & Testimony Times', 'Personal Prayer Ministry'],
    icon: 'fas fa-fire',
    color: '#8b5cf6'
  },
  {
    id: 7,
    name: 'Mbeere District Pastors & Leadership Summit',
    category: 'District Gatherings',
    frequency: 'Bi-Annual',
    timing: 'Weekend Seminar',
    location: 'Ngungo Assembly Secretariat',
    leader: 'Bishop Rev. Clement Simba, District Secretary Rev. John Ngochi',
    description: 'Strategic leadership alignment for resident reverends, deacons, treasurers, and department coordinators from all 8 Mbeere assemblies and the Kyuso circuit.',
    highlights: ['Pastoral Accountability', 'Church Governance & Financial Integrity', 'Church Planting Strategies', 'Doctrinal Alignment'],
    icon: 'fas fa-users-gear',
    color: '#0284c7'
  },
  {
    id: 8,
    name: 'Women Department Monthly Fellowship & Outreach',
    category: 'Women & Men',
    frequency: 'Monthly & Weekly Prayer',
    timing: 'Scheduled Weekdays / Saturdays',
    location: 'Ngungo Assembly & Home Fellowships',
    leader: 'Women Department Committee',
    description: 'Connecting Christian women across all walks of life for prayer, marriage enrichment, welfare support, hospital visits, and compassionate aid to the vulnerable.',
    highlights: ['Mother-to-Mother Mentorship', 'Welfare & Compassion Fund', 'District Women Conferences', 'Hospital Visitation'],
    icon: 'fas fa-heart',
    color: '#ec4899'
  },
  {
    id: 9,
    name: 'Men Department Fellowship & Brotherhood',
    category: 'Women & Men',
    frequency: 'Monthly Gathering',
    timing: 'Saturday Mornings',
    location: 'Ngungo Assembly Grounds',
    leader: 'Men Department Committee',
    description: 'Empowering Christian men, husbands, and fathers to stand firm in faith, mentor younger men, and lead church physical development projects with diligence.',
    highlights: ['Men\'s Breakfast & Word Session', 'Fatherhood & Integrity Seminars', 'Sanctuary Development Projects'],
    icon: 'fas fa-shield-alt',
    color: '#475569'
  },
  {
    id: 10,
    name: 'Sanctuary Choir & Instrumentalists Rehearsals',
    category: 'Youth & Talents',
    frequency: 'Weekly',
    timing: 'Saturdays 2:00 PM – 4:00 PM',
    location: 'Sanctuary Choir Gallery',
    leader: 'Music Director & Band Lead',
    description: 'Vocal training, harmonization, and band practice for keyboardists, bassists, guitarists, and drummers preparing musical arrangements for Sunday services and district conferences.',
    highlights: ['Four-Part Choral Harmony', 'Live Band Sound Balance', 'Vocal Coaching', 'New Song Composition'],
    icon: 'fas fa-music',
    color: '#d97706'
  }
];

const categoryOptions = [
  'All Programs',
  'Sanctuary Services',
  'District Gatherings',
  'Youth & Talents',
  'Women & Men',
  'Children & Family'
];

const Programs = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Programs');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrograms = useMemo(() => {
    return churchPrograms.filter((p) => {
      const matchesCategory = selectedCategory === 'All Programs' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q || 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        p.timing.toLowerCase().includes(q) || 
        p.location.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="programs-page">

      {/* Page Banner */}
      <section className="page-banner" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #292524 100%)' }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">Weekly Schedule &amp; District Calendar</span>
            <h1>Church Programs &amp; Gatherings</h1>
            <p>
              Pentecostal Assemblies of God - Ngungo Assembly (Mbeere District Headquarters) — Transforming lives through regular worship, Spirit-filled fellowships, and district-wide revivals.
            </p>
          </div>
        </div>
      </section>

      {/* Official Order of Services Section */}
      <section style={{ background: '#f8fafc', padding: '48px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-subtitle">Weekly Order of Services</span>
            <h2 className="section-title">Sanctuary Timetable</h2>
            <p className="section-description" style={{ maxWidth: '680px', margin: '0 auto' }}>
              Join us weekly at Ngungo Assembly Sanctuary for life-changing worship, systematic Bible teaching, and fervent prayer.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '16px'
          }}>
            <div style={{ background: '#ffffff', borderRadius: '14px', padding: '24px 20px', borderTop: '4px solid #f59e0b', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <div style={{ color: '#b45309', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sunday 8:00 AM – 10:00 AM</div>
              <h3 style={{ fontSize: '1.2rem', color: '#1e293b', margin: '8px 0 6px', fontWeight: 800 }}>Sunday School</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>Children &amp; youth classes with solid biblical foundations &amp; memory verses.</p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '14px', padding: '24px 20px', borderTop: '4px solid #3b82f6', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <div style={{ color: '#1d4ed8', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sunday 8:00 AM – 10:00 AM</div>
              <h3 style={{ fontSize: '1.2rem', color: '#1e293b', margin: '8px 0 6px', fontWeight: 800 }}>English Service</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>Early morning worship, Scripture exposition, and spiritual teaching.</p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '14px', padding: '24px 20px', borderTop: '4px solid #10b981', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <div style={{ color: '#15803d', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sunday 10:30 AM – 1:30 PM</div>
              <h3 style={{ fontSize: '1.2rem', color: '#1e293b', margin: '8px 0 6px', fontWeight: 800 }}>Main Service</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>Our main celebration service with Choir, Praise &amp; Worship, and preaching.</p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '14px', padding: '24px 20px', borderTop: '4px solid #8b5cf6', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <div style={{ color: '#6d28d9', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Friday 7:00 PM – 9:00 PM</div>
              <h3 style={{ fontSize: '1.2rem', color: '#1e293b', margin: '8px 0 6px', fontWeight: 800 }}>Friday Fellowship</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>Midweek fervent prayer, intercession, healing, and spiritual renewal.</p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '14px', padding: '24px 20px', borderTop: '4px solid #f43f5e', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <div style={{ color: '#be123c', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Saturday 4:00 PM – 6:00 PM</div>
              <h3 style={{ fontSize: '1.2rem', color: '#1e293b', margin: '8px 0 6px', fontWeight: 800 }}>Youth Fellowship</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>Youth-led praise, instrumental sessions, discussions &amp; talent mentorship.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Programs Directory */}
      <section className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="section-subtitle">Calendar of Activities</span>
            <h2 className="section-title">Church &amp; District Programs</h2>
            <p className="section-description" style={{ maxWidth: '640px', margin: '0 auto' }}>
              Explore the diverse spiritual and ministerial programs coordinated through Ngungo Assembly across Mbeere District.
            </p>
          </div>

          {/* Search and Category Filter */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '16px', 
            marginBottom: '32px',
            background: '#ffffff',
            padding: '16px 20px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categoryOptions.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: selectedCategory === cat ? '1.5px solid #E87D1E' : '1px solid #cbd5e1',
                    background: selectedCategory === cat ? '#E87D1E' : '#f8fafc',
                    color: selectedCategory === cat ? '#ffffff' : '#475569',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', minWidth: '240px' }}>
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 14px 9px 36px',
                  borderRadius: '20px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Programs Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px'
          }}>
            {filteredPrograms.map((prog) => (
              <div 
                key={prog.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    background: `${prog.color}15`,
                    color: prog.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem'
                  }}>
                    <i className={prog.icon}></i>
                  </div>
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    background: '#f1f5f9',
                    color: '#475569'
                  }}>
                    {prog.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: '0 0 10px', lineHeight: 1.35 }}>
                  {prog.name}
                </h3>

                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, margin: '0 0 18px', flex: 1 }}>
                  {prog.description}
                </p>

                <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', marginBottom: '18px', fontSize: '0.82rem', color: '#334155' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Clock size={15} color={prog.color} />
                    <strong>{prog.timing}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={15} color="#64748b" />
                    <span>{prog.location}</span>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>
                    {prog.frequency}
                  </span>
                  <Link 
                    to="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#E87D1E',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      textDecoration: 'none'
                    }}
                  >
                    Inquire / Attend <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>
              <p style={{ fontSize: '1.1rem', margin: '0 0 12px' }}>No programs found matching your search.</p>
              <button 
                onClick={() => { setSelectedCategory('All Programs'); setSearchQuery(''); }}
                style={{ padding: '8px 18px', borderRadius: '8px', background: '#E87D1E', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* District Assemblies Link Banner */}
      <section style={{ background: '#0f172a', padding: '60px 0', color: '#ffffff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ color: '#E87D1E', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800, fontSize: '0.82rem' }}>
            Episcopal Network
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '10px 0 16px', color: '#ffffff' }}>
            Explore All 8 Mbeere District &amp; Kyuso Circuit Assemblies
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 28px', color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Connect with your local assembly, reverend pastor, and fellowship timetable across the district.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/assemblies" className="btn btn-primary">
              View Assemblies Directory
            </Link>
            <Link to="/leadership" className="btn btn-secondary">
              District Leadership Council
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Programs;

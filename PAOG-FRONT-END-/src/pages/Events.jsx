import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';

const pastEvents = [
  {
    id: 1,
    name: 'Mbeere District Annual Convocation & Revival',
    dates: '12th – 16th August 2026',
    location: 'PAG Ngungo Assembly Grounds (District HQ)',
    type: 'District Convocation',
    souls: null,
    description: 'Pentecostal Assemblies of God - Ngungo Assembly convened all 8 Mbeere assemblies and the Kyuso circuit for our annual spiritual convocation under Bishop Rev. Clement Simba, featuring apostolic revival, healing, and spiritual renewal.',
    highlights: ['District-Wide Fellowship', 'Revival Crusades', 'Leadership Empowerment', 'Praise & Thanksgiving'],
  },
  {
    id: 2,
    name: 'Mbeere District Pastors & Leadership Summit',
    dates: '15th – 17th May 2026',
    location: 'Ngungo Assembly Sanctuary',
    type: 'Leadership Summit',
    souls: null,
    description: 'Gathering of resident reverends, deacons, treasurers, and district officials to strengthen administrative excellence, doctrine, and church planting strategies.',
    highlights: ['Pastoral Alignment', 'District Secretariat Planning', 'Discipleship Training', 'Prayer Vigils'],
  },
  {
    id: 3,
    name: 'Youth Fellowship Regional Rally & Talent Explosion',
    dates: '18th – 19th April 2026',
    location: 'PAG Ngungo Assembly',
    type: 'Youth Gathering',
    souls: null,
    description: 'A vibrant gathering of youths across Mbeere assemblies featuring contemporary gospel music, instrumental workshops, and life mentorship.',
    highlights: ['Instrumentalist Showcase', 'Worship Ministry', 'Biblical Mentorship', 'Fellowship'],
  },
  {
    id: 4,
    name: 'District Women Department Prayer Conference',
    dates: '6th – 8th March 2026',
    location: 'Ngungo Assembly',
    type: 'Department Conference',
    souls: null,
    description: 'Women from all district assemblies united for intercession, family stability workshops, and compassionate community outreach.',
    highlights: ['Intercessory Prayer', 'Family Mentorship', 'Community Compassion', 'Word Exposition'],
  },
  {
    id: 5,
    name: 'All-Assemblies Easter Resurrection Celebration',
    dates: '3rd – 5th April 2026',
    location: 'PAG Ngungo Assembly (Mbeere District HQ)',
    type: 'Resurrection Celebration',
    souls: null,
    description: 'Combined worship celebration marking the victory of our Lord Jesus Christ, uniting believers from all regional circuits in communion and praise.',
    highlights: ['Holy Communion', 'Choir Presentations', 'Water Baptism', 'Gospel Preaching'],
  },
];

const Events = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
          localStorage.setItem('kemt_events_cache', JSON.stringify(data));
        } else {
          throw new Error('Could not load events');
        }
      } catch {
        const cached = localStorage.getItem('kemt_events_cache');
        if (cached) {
          try {
            setEvents(JSON.parse(cached));
          } catch {}
        } else {
          // Default upcoming event if fresh
          setEvents([
            {
              _id: 'sample-event-1',
              title: 'Kingdom Outreach Revival & Leadership Conference',
              date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
              location: 'Methodist Church Grounds, Meru Central',
              description: 'A powerful gathering of believers, youths, and community leaders for spiritual renewal, prayer vigils, and missionary training.',
              posterUrl: ''
            }
          ]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <main className="events-page">

      {/* Banner */}
      <section className="page-banner" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #292524 100%)' }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">What's Happening</span>
            <h1>Events</h1>
            <p>Stay connected with what God is doing across Pentecostal Assemblies of God - Ngungo Assembly and Mbeere District.</p>
          </div>
        </div>
      </section>



      {/* Past Events */}
      <section className="dept-section past-events-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">2025 – 2026</span>
            <h2 className="section-title">Completed Missions &amp; Conferences</h2>
            <p className="section-description">A record of church conferences, district rallies, and spiritual milestones across our assemblies.</p>
          </div>
          <div className="past-events-list">
            {pastEvents.map((event, i) => (
              <div key={event.id} className="past-event-item">
                {/* Left Column: Date & Impact */}
                <div className="pe-left">
                  <div className="pe-dates">{event.dates}</div>
                  {event.souls ? (
                    <div className="pe-souls">
                      {event.souls}
                      <span>Souls Won</span>
                    </div>
                  ) : (
                    <div className="pe-ongoing">Ongoing Impact</div>
                  )}
                </div>
                
                {/* Right Column: Details */}
                <div className="pe-right">
                  <h3 className="pe-title">{event.name}</h3>
                  <div className="pe-location">
                    {event.location}, {event.type}
                  </div>
                  
                  {event.description && (
                    <p className="pe-desc" style={{ fontSize: '0.9rem', color: '#5a5a6a', margin: '12px 0 16px', lineHeight: '1.6' }}>
                      {event.description}
                    </p>
                  )}
                  
                  <div className="pe-highlights">
                    {event.highlights.map((h, j) => (
                      <span key={j} className="pe-highlight-pill">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/programs" className="btn btn-primary">View Full Outreach Reports</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Want to Participate in the Next Mission?</h2>
            <p>Join us in taking the Gospel to communities across Kenya. Reach out and we will connect you.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Get Involved</Link>
              <Link to="/donate" className="btn btn-secondary">Support a Mission</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Events;

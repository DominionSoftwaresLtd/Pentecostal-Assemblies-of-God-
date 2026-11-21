import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Heart, 
  BookOpen, 
  Tv, 
  Music, 
  Compass, 
  GraduationCap 
} from 'lucide-react';
import bannerPhoto from '../assets/Emali mission4.jpg';

const deptConfig = {
  women: {
    tag: 'Women Department',
    title: 'Women Department',
    subtitle: 'Connecting women in prayer, family life, mutual fellowship, and welfare.',
    category: 'Women Department',
    subjectPlaceholder: 'e.g. Women Fellowship / Welfare / Prayer Inquiry',
    messagePlaceholder: 'Share how we can connect with you or support you in prayer...',
    icon: Heart
  },
  men: {
    tag: 'Men Department',
    title: 'Men Department',
    subtitle: 'Building men of integrity and spiritual leadership in home and church.',
    category: 'Men Department',
    subjectPlaceholder: 'e.g. Men Fellowship / Discipleship / Project Inquiry',
    messagePlaceholder: 'Share your background or how you would like to participate...',
    icon: BookOpen
  },
  youth: {
    tag: 'Youth Fellowship',
    title: 'Youth Department',
    subtitle: 'Youth Fellowship every Saturday 4:00 PM – 6:00 PM at Ngungo Sanctuary.',
    category: 'Youth Department',
    subjectPlaceholder: 'e.g. Youth Fellowship / Music / Youth Activities',
    messagePlaceholder: 'Tell us a bit about yourself and your questions for the youth leadership...',
    icon: Heart
  },
  sundayschool: {
    tag: 'Children Ministry',
    title: 'Sunday School Department',
    subtitle: 'Nurturing children in scripture and praise every Sunday (8:00 AM – 10:00 AM).',
    category: 'Sunday School Department',
    subjectPlaceholder: 'e.g. Child Enrollment / Teacher Volunteer Inquiry',
    messagePlaceholder: 'Tell us about your children or interest in children ministry...',
    icon: GraduationCap
  },
  worship: {
    tag: 'Praise & Worship',
    title: 'Praise & Worship Team',
    subtitle: 'Leading the congregation in anointed praise and authentic adoration.',
    category: 'Praise and Worship',
    subjectPlaceholder: 'e.g. Praise Team / Vocalist Application',
    messagePlaceholder: 'Share your vocal experience and spiritual journey...',
    icon: Music
  },
  instrumentalists: {
    tag: 'Instrumentalists',
    title: 'Instrumentalist Ministry',
    subtitle: 'Keyboards, drums, guitars, and sound management for worship services.',
    category: 'Instrumentalist',
    subjectPlaceholder: 'e.g. Keyboardist / Drummer / Sound Tech Application',
    messagePlaceholder: 'Tell us about the instruments you play or sound skills...',
    icon: Tv
  },
  choir: {
    tag: 'Church Choir',
    title: 'Church Choir Ministry',
    subtitle: 'Harmonious choral anthems and spiritual hymns for divine worship.',
    category: 'Choir',
    subjectPlaceholder: 'e.g. Choir Membership Inquiry',
    messagePlaceholder: 'Share your singing background or interest in joining the choir...',
    icon: Music
  },
  ushering: {
    tag: 'Ushering',
    title: 'Ushering Ministry',
    subtitle: 'Warm Christian hospitality, welcoming worshippers, and sanctuary decorum.',
    category: 'Ushering',
    subjectPlaceholder: 'e.g. Ushering Volunteer Application',
    messagePlaceholder: 'Share your heart and willingness to serve as an usher...',
    icon: Compass
  },
  prayer: {
    tag: 'Prayer Burdens',
    title: 'Submit a Prayer Request',
    subtitle: 'Our pastorate and intercessors stand with you in faith and prayer.',
    category: 'Prayer Request',
    subjectPlaceholder: 'e.g. Healing, Family Breakthrough, Spiritual Guidance',
    messagePlaceholder: 'Detail your prayer points or thanksgiving testimony...',
    icon: Heart
  }
};

const Contact = () => {
  const [searchParams] = useSearchParams();
  const deptParam = searchParams.get('dept') || searchParams.get('type');
  const currentDept = deptConfig[deptParam] || null;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    residence: '',
    skills: '',
    institution: '',
    message: '',
    isUrgent: false,
    category: currentDept ? currentDept.category : 'General Inquiry'
  });

  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Sync form category when query param changes — DO NOT pre-fill subject
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      category: currentDept ? currentDept.category : 'General Inquiry',
      subject: '',
      residence: '',
      skills: '',
      institution: '',
    }));
  }, [deptParam]);

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          category: currentDept ? currentDept.category : 'General Inquiry'
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setForm({
          name: '',
          email: '',
          phone: '',
          subject: '',
          residence: '',
          skills: '',
          institution: '',
          message: '',
          isUrgent: false,
          category: currentDept ? currentDept.category : 'General Inquiry'
        });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Unable to deliver message right now.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Connection paused. Direct email is available at info@kingdomenlightenment.org.');
    }
  };

  return (
    <main className="contact-page">
      {/* Banner */}
      <section className="page-banner" style={{ backgroundImage: `url(${bannerPhoto})` }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">{currentDept ? currentDept.tag : 'Reach Out'}</span>
            <h1>{currentDept ? currentDept.title : 'Contact Us'}</h1>
            <p>{currentDept ? currentDept.subtitle : 'We would love to hear from you — whether you want to partner, volunteer, or connect.'}</p>
          </div>
        </div>
      </section>

      {/* Contact Body */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Info Column */}
            <div className="contact-info-col">
              <h2 className="section-title">
                {currentDept ? currentDept.title : 'Connect With Us'}
              </h2>
              <p className="lead">
                {currentDept 
                  ? `Your message will be directed to the ${currentDept.category} leadership and pastoral council at Ngungo Assembly.`
                  : 'Have a question, need pastoral support, or want to connect with Pentecostal Assemblies of God - Ngungo Assembly (Mbeere District HQ)? We welcome you.'}
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4>Phone &amp; WhatsApp</h4>
                    <a href="tel:0720140213">+254 720 140 213 / 0720140213</a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4>Church Email</h4>
                    <a href="mailto:info@paogngungo.org">info@paogngungo.org</a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4>Postal &amp; Sanctuary Address</h4>
                    <span style={{ color: '#475569', fontSize: '0.92rem' }}>P.O. Box 213-60113 Kiritiri Mbeere, Kenya<br />Ngungo Assembly (District Headquarters)</span>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <div>
                    <h4>District Overseer</h4>
                    <span style={{ color: '#1e293b', fontWeight: 700, fontSize: '0.95rem' }}>Bishop Rev Clement Simba</span>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <i className="fas fa-hand-holding-dollar"></i>
                  </div>
                  <div>
                    <h4>Giving &amp; Support</h4>
                    <span style={{ color: '#1e293b', fontWeight: 700, fontSize: '0.95rem' }}>Paybill: 4136387 &bull; Acc: YOUR NAME</span>
                  </div>
                </div>
              </div>

              {/* Order of Services Box */}
              <div style={{ marginTop: '22px', padding: '16px 18px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 8px', color: '#1e293b', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fas fa-clock" style={{ color: '#E87D1E' }}></i> Order of Services
                </h4>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.84rem', color: '#475569', lineHeight: '1.7' }}>
                  <li><strong>Sunday English Service:</strong> 8:00 AM – 10:00 AM</li>
                  <li><strong>Sunday Main Service:</strong> 10:30 AM – 1:30 PM</li>
                  <li><strong>Sunday School:</strong> 8:00 AM – 10:00 AM</li>
                  <li><strong>Friday Fellowship:</strong> 7:00 PM – 9:00 PM</li>
                  <li><strong>Youth Fellowship:</strong> Saturday 4:00 PM – 6:00 PM</li>
                </ul>
              </div>

              {/* Department Shortcut Chips */}
              {!currentDept && (
                <div style={{ marginTop: '20px', padding: '16px', background: '#fff9f0', borderRadius: '12px', border: '1px solid #fed7aa' }}>
                  <h4 style={{ margin: '0 0 10px', color: '#1e293b', fontSize: '0.9rem', fontWeight: 700 }}>Select a Department or Ministry:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    <Link to="/contact?dept=prayer" style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>🙏 Prayer Request</Link>
                    <Link to="/contact?dept=women" style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>👩 Women Dept</Link>
                    <Link to="/contact?dept=men" style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>👨 Men Dept</Link>
                    <Link to="/contact?dept=youth" style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>⚡ Youth Dept</Link>
                    <Link to="/contact?dept=sundayschool" style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>🧒 Sunday School</Link>
                    <Link to="/contact?dept=worship" style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>🎵 Praise &amp; Worship</Link>
                    <Link to="/contact?dept=instrumentalists" style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>🎸 Instrumentalists</Link>
                    <Link to="/contact?dept=choir" style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>🎤 Choir</Link>
                    <Link to="/contact?dept=ushering" style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>🤝 Ushering</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Form Column */}
            <div className="contact-form-col">
              <div className="contact-form-card" style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.3rem', fontWeight: 700 }}>
                    {currentDept ? currentDept.title : 'Send Us a Message'}
                  </h3>
                  {currentDept && (
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(232, 125, 30, 0.12)',
                      color: '#E87D1E',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}>
                      {currentDept.category}
                    </span>
                  )}
                </div>

                {status === 'success' ? (
                  <div className="form-success" style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: '#f0fdf4',
                        color: '#16a34a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                      }}
                    >
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 style={{ color: '#166534', margin: '0 0 8px', fontSize: '1.3rem', fontWeight: 700 }}>
                      {deptParam === 'prayer' ? 'Prayer Request Received!' : 'Submission Received!'}
                    </h4>
                    <p style={{ color: '#4b5563', fontSize: '0.95rem', margin: '0 0 20px' }}>
                      Thank you for reaching out. We have sent your details to{' '}
                      <strong>info@kingdomenlightenment.org</strong> and recorded them in the ministry dashboard.
                    </p>
                    <button
                      onClick={() => setStatus(null)}
                      className="btn btn-primary"
                      style={{ padding: '0.55rem 1.4rem', fontSize: '0.88rem' }}
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Your Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handle}
                          placeholder="e.g. Everylne Mukami"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handle}
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Phone Number (Optional / WhatsApp)</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handle}
                          placeholder="e.g. +254 700 000 000"
                        />
                      </div>

                      {/* Customized Field based on Department */}
                      {deptParam === 'discipleship' && (
                        <div className="form-group">
                          <label>Residence / Area *</label>
                          <input
                            type="text"
                            name="residence"
                            value={form.residence}
                            onChange={handle}
                            placeholder="e.g. Meru Central / Nairobi / Machakos"
                            required
                          />
                        </div>
                      )}

                      {deptParam === 'digital' && (
                        <div className="form-group">
                          <label>Primary Skill / Interest *</label>
                          <select
                            name="skills"
                            value={form.skills}
                            onChange={handle}
                            required
                            style={{
                              width: '100%',
                              padding: '12px 14px',
                              borderRadius: '8px',
                              border: '1.5px solid #cbd5e1',
                              backgroundColor: 'white'
                            }}
                          >
                            <option value="">Select skill area...</option>
                            <option value="Video Editing & Livestream">Video Editing &amp; Livestream</option>
                            <option value="Photography & Graphics">Photography &amp; Graphics</option>
                            <option value="Audio & Sound Engineering">Audio &amp; Sound Engineering</option>
                            <option value="Social Media & Content">Social Media &amp; Content</option>
                            <option value="IT, Web & Infrastructure">IT, Web &amp; Infrastructure</option>
                          </select>
                        </div>
                      )}

                      {deptParam === 'worship' && (
                        <div className="form-group">
                          <label>Vocal Part / Instrument *</label>
                          <input
                            type="text"
                            name="skills"
                            value={form.skills}
                            onChange={handle}
                            placeholder="e.g. Soprano, Alto, Keyboard, Guitar, Drums"
                            required
                          />
                        </div>
                      )}

                      {deptParam === 'highschool' && (
                        <div className="form-group">
                          <label>School / Institution Name *</label>
                          <input
                            type="text"
                            name="institution"
                            value={form.institution}
                            onChange={handle}
                            placeholder="e.g. St. Kitheo Senior School"
                            required
                          />
                        </div>
                      )}

                      {deptParam === 'outreach' && (
                        <div className="form-group">
                          <label>Home County / Residence *</label>
                          <input
                            type="text"
                            name="residence"
                            value={form.residence}
                            onChange={handle}
                            placeholder="e.g. Meru, Nairobi, Makueni"
                            required
                          />
                        </div>
                      )}

                      {!deptParam && (
                        <div className="form-group">
                          <label>Inquiry Category</label>
                          <select
                            name="category"
                            value={form.category}
                            onChange={handle}
                            style={{
                              width: '100%',
                              padding: '12px 14px',
                              borderRadius: '8px',
                              border: '1.5px solid #cbd5e1',
                              backgroundColor: 'white'
                            }}
                          >
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Prayer Request">Prayer Request</option>
                            <option value="Bible Study">Bible Study Discipleship</option>
                            <option value="Media & Tech">Media &amp; Tech Volunteer</option>
                            <option value="Praise & Worship">Praise &amp; Worship</option>
                            <option value="Outreach">Mission Outreach</option>
                            <option value="High School">High School Ministry</option>
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Subject / Purpose *</label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handle}
                        placeholder={
                          deptParam === 'prayer'       ? 'e.g. Healing, Family Breakthrough, Guidance' :
                          deptParam === 'discipleship' ? 'e.g. Request to join weekly Bible study group' :
                          deptParam === 'digital'      ? 'e.g. Volunteer for Video Editing / Social Media / Sound' :
                          deptParam === 'worship'      ? 'e.g. Vocalist / Keyboardist / Instrumentalist Application' :
                          deptParam === 'outreach'     ? 'e.g. Volunteer for upcoming rural mission outreach' :
                          deptParam === 'highschool'   ? 'e.g. Invitation for Weekend Challenge / Student Mentorship' :
                          'How can we help?'
                        }
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>{deptParam === 'prayer' ? 'Prayer Points / Needs *' : 'Detailed Message *'}</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handle}
                        rows={5}
                        placeholder={currentDept ? currentDept.messagePlaceholder : 'Write your message here...'}
                        required
                      ></textarea>
                    </div>

                    {deptParam === 'prayer' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <input
                          type="checkbox"
                          id="isUrgent"
                          name="isUrgent"
                          checked={form.isUrgent}
                          onChange={handle}
                          style={{ width: '18px', height: '18px', accentColor: '#E87D1E' }}
                        />
                        <label htmlFor="isUrgent" style={{ color: '#c2410c', fontWeight: 600, fontSize: '0.88rem', margin: 0 }}>
                          Flag as Urgent Prayer Request
                        </label>
                      </div>
                    )}

                    {status === 'error' && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 14px',
                          marginBottom: '16px',
                          borderRadius: '8px',
                          backgroundColor: '#fff7ed',
                          border: '1px solid #fed7aa',
                          color: '#c2410c',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                        }}
                      >
                        <AlertCircle size={18} style={{ flexShrink: 0 }} />
                        <span style={{ flex: 1 }}>{errorMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary btn-full"
                      disabled={status === 'sending'}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '13px',
                        fontWeight: 700
                      }}
                    >
                      {status === 'sending' ? (
                        <>
                          <RefreshCw size={16} className="fa-spin" />
                          <span>Delivering...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>{deptParam === 'prayer' ? 'Submit Prayer Request' : 'Send Submission'}</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

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

const deptConfig = {
  women: {
    tag: 'Women Department',
    title: 'Connect with Women Department',
    subtitle: 'Join the mothers and sisters of PAG Ngungo Assembly for prayer, family fellowship, and community ministry.',
    category: 'Women Department',
    subjectPlaceholder: 'e.g. Women Department Membership / Outreach',
    messagePlaceholder: 'Share your background or how you would love to get involved with the Women Department...',
    icon: Heart
  },
  men: {
    tag: 'Men Department',
    title: 'Join Men Fellowship',
    subtitle: 'Connecting Christian men, husbands, and fathers to build spiritual strength, brotherhood, and church development.',
    category: 'Men Department',
    subjectPlaceholder: 'e.g. Men Fellowship Enrollment / Projects',
    messagePlaceholder: 'Tell us a bit about yourself and your desire to fellowship with Christian brothers...',
    icon: BookOpen
  },
  youth: {
    tag: 'Youth Department',
    title: 'Connect with Youth Fellowship',
    subtitle: 'Every Saturday 4:00 PM – 6:00 PM. Worship, talent discovery, life skills, and spiritual mentorship for young people.',
    category: 'Youth Department',
    subjectPlaceholder: 'e.g. Saturday Youth Fellowship / Talent Ministry',
    messagePlaceholder: 'Tell us your age, interests (music, preaching, media, sports), or questions...',
    icon: Compass
  },
  sundayschool: {
    tag: 'Sunday School',
    title: 'Sunday School Department',
    subtitle: 'Sundays 8:00 AM – 10:00 AM. Inquire about enrolling your children or volunteering as a Sunday School teacher.',
    category: 'Sunday School Department',
    subjectPlaceholder: 'e.g. Child Enrollment / Teacher Volunteer',
    messagePlaceholder: 'Please specify your child\'s age or your teaching/ministry experience...',
    icon: GraduationCap
  },
  worship: {
    tag: 'Praise & Worship',
    title: 'Join Praise & Worship Team',
    subtitle: 'Serve the Lord through anointed vocals and leading the church family into worship in Spirit and Truth.',
    category: 'Praise and Worship',
    subjectPlaceholder: 'e.g. Vocalist Application (Soprano, Alto, Tenor, Bass)',
    messagePlaceholder: 'Share your singing experience, vocal range, and spiritual journey in worship...',
    icon: Music
  },
  instrumentalists: {
    tag: 'Instrumentalists Band',
    title: 'Join Instrumentalist Ministry',
    subtitle: 'Serve God on keyboards, drums, acoustic or electric guitars, bass, and audio sound engineering.',
    category: 'Instrumentalist',
    subjectPlaceholder: 'e.g. Keyboardist / Drummer / Guitarist / Sound Tech',
    messagePlaceholder: 'Specify the instruments you play, experience level, and availability for rehearsals...',
    icon: Tv
  },
  choir: {
    tag: 'Sanctuary Choir',
    title: 'Join Sanctuary Choir',
    subtitle: 'Lift up the name of Jesus through choral harmonies, anthems, and special ministry presentations.',
    category: 'Choir',
    subjectPlaceholder: 'e.g. Choir Member Application',
    messagePlaceholder: 'Tell us your vocal part and your heart for choral praise ministry...',
    icon: Music
  },
  ushering: {
    tag: 'Ushering & Protocol',
    title: 'Volunteer as an Usher',
    subtitle: 'Serve on the front line with hospitality, guest reception, and maintaining order and reverence in sanctuary services.',
    category: 'Ushering',
    subjectPlaceholder: 'e.g. Ushering & Protocol Team Application',
    messagePlaceholder: 'Tell us about your heart to serve God\'s people with warmth and dignity...',
    icon: Heart
  },
  prayer: {
    tag: 'Prayer Intercession',
    title: 'Submit a Prayer Request',
    subtitle: 'Our pastoral team and intercessors pray for every burden. Share your prayer request with us in confidence.',
    category: 'Prayer Request',
    subjectPlaceholder: 'e.g. Healing, Family Breakthrough, Guidance, Thanksgiving',
    messagePlaceholder: 'Detail your prayer request or praise report so we can stand in faith with you...',
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
      <section className="page-banner" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #292524 100%)' }}>
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
                  ? `Your submission will be immediately routed to the ${currentDept.category} coordinator and the PAG Ngungo Assembly administration.`
                  : 'Have a question, want to get involved, or need to reach our team? We are happy to connect with you.'}
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4>Phone &amp; WhatsApp</h4>
                    <a href="tel:+254720140213">+254 720 140 213</a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4>Ministry Email</h4>
                    <a href="mailto:info@pagngungo.co.ke">info@pagngungo.co.ke</a>
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
                <div style={{ marginTop: '28px', padding: '18px', background: '#fff9f0', borderRadius: '12px', border: '1px solid #fed7aa' }}>
                  <h4 style={{ margin: '0 0 10px', color: '#1e293b', fontSize: '0.95rem', fontWeight: 700 }}>Looking for a specific department or ministry?</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <Link to="/contact?dept=women" style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>👩 Women Dept</Link>
                    <Link to="/contact?dept=men" style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>👨 Men Dept</Link>
                    <Link to="/contact?dept=youth" style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>⚡ Youth Dept</Link>
                    <Link to="/contact?dept=sundayschool" style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>🧒 Sunday School</Link>
                    <Link to="/contact?dept=worship" style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>🎵 Praise &amp; Worship</Link>
                    <Link to="/contact?dept=instrumentalists" style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>🎸 Instrumentalists</Link>
                    <Link to="/contact?dept=choir" style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>👥 Choir</Link>
                    <Link to="/contact?dept=ushering" style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>🚪 Ushering</Link>
                    <Link to="/contact?dept=prayer" style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>🙏 Prayer Request</Link>
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
                      <strong>info@pagngungo.co.ke</strong> and recorded them in the ministry dashboard.
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

                      {deptParam === 'instrumentalists' && (
                        <div className="form-group">
                          <label>Primary Instrument / Audio Skill *</label>
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
                            <option value="">Select instrument or technical role...</option>
                            <option value="Keyboard / Piano">Keyboard / Piano</option>
                            <option value="Lead Guitar">Lead Guitar</option>
                            <option value="Bass Guitar">Bass Guitar</option>
                            <option value="Drums & Percussion">Drums &amp; Percussion</option>
                            <option value="Acoustic Guitar">Acoustic Guitar</option>
                            <option value="Audio & Sound Engineering">Audio &amp; Sound Engineering</option>
                          </select>
                        </div>
                      )}

                      {deptParam === 'worship' && (
                        <div className="form-group">
                          <label>Vocal Part / Worship Ministry Experience *</label>
                          <input
                            type="text"
                            name="skills"
                            value={form.skills}
                            onChange={handle}
                            placeholder="e.g. Soprano, Alto, Tenor, Song Leader"
                            required
                          />
                        </div>
                      )}

                      {deptParam === 'choir' && (
                        <div className="form-group">
                          <label>Choir Vocal Part *</label>
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
                            <option value="">Select vocal section...</option>
                            <option value="Soprano">Soprano</option>
                            <option value="Alto">Alto</option>
                            <option value="Tenor">Tenor</option>
                            <option value="Bass">Bass</option>
                          </select>
                        </div>
                      )}

                      {deptParam === 'ushering' && (
                        <div className="form-group">
                          <label>Service Availability *</label>
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
                            <option value="">Select service...</option>
                            <option value="English Service (8:00 AM - 10:00 AM)">English Service (8:00 AM - 10:00 AM)</option>
                            <option value="Main Service (10:30 AM - 1:30 PM)">Main Service (10:30 AM - 1:30 PM)</option>
                            <option value="Both Sunday Services">Both Sunday Services</option>
                            <option value="Special Convocations & District Rallies">Special Convocations &amp; District Rallies</option>
                          </select>
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
                            <option value="Women Department">Women Department</option>
                            <option value="Men Department">Men Department</option>
                            <option value="Youth Department">Youth Department</option>
                            <option value="Sunday School Department">Sunday School Department</option>
                            <option value="Praise and Worship">Praise and Worship Ministry</option>
                            <option value="Instrumentalist">Instrumentalist Ministry</option>
                            <option value="Choir">Choir Ministry</option>
                            <option value="Ushering">Ushering Ministry</option>
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
                          deptParam === 'prayer'           ? 'e.g. Healing, Family Breakthrough, Guidance' :
                          deptParam === 'women'            ? 'e.g. Women Fellowship / Welfare Outreach' :
                          deptParam === 'men'              ? 'e.g. Men Brotherhood / Sanctuary Projects' :
                          deptParam === 'youth'            ? 'e.g. Saturday Youth Fellowship (4-6 PM)' :
                          deptParam === 'sundayschool'     ? 'e.g. Child Enrollment / Teacher Volunteer' :
                          deptParam === 'worship'          ? 'e.g. Vocalist Application (Soprano, Alto, Tenor, Bass)' :
                          deptParam === 'instrumentalists' ? 'e.g. Keyboardist / Guitarist / Drummer / Sound Tech' :
                          deptParam === 'choir'            ? 'e.g. Choir Application / Choral Part' :
                          deptParam === 'ushering'         ? 'e.g. Sanctuary Ushering & Protocol Team' :
                          'How can we help you at PAG Ngungo?'
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

            {/* Info */}
            <div className="contact-info-col">
              <h2 className="section-title">Get in Touch</h2>
              <p className="lead">
                Have a question, need pastoral guidance, prayer, or want to get involved in our church departments and ministries? Connect with our ministerial team.
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <i className="fas fa-church"></i>
                  </div>
                  <div>
                    <h4>Sanctuary Location</h4>
                    <p style={{ margin: 0, color: '#475569', fontSize: '0.92rem' }}>
                      Pentecostal Assemblies of God - Ngungo Assembly<br />
                      Mbeere District Headquarters, Embu County, Kenya
                    </p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h4>Order of Services</h4>
                    <p style={{ margin: 0, color: '#475569', fontSize: '0.86rem', lineHeight: 1.5 }}>
                      <strong>Sunday School:</strong> 8:00 AM – 10:00 AM<br />
                      <strong>English Service:</strong> 8:00 AM – 10:00 AM<br />
                      <strong>Main Service:</strong> 10:30 AM – 1:30 PM<br />
                      <strong>Friday Fellowship:</strong> 7:00 PM – 9:00 PM<br />
                      <strong>Youth Fellowship:</strong> Saturday 4:00 PM – 6:00 PM
                    </p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:info@pagngungo.org">info@pagngungo.org</a>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <h4>Follow Us</h4>
                <div className="contact-social-links">
                  <a
                    href="https://www.youtube.com/@KingdomEnlightenmentMinistries"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn youtube"
                  >
                    <i className="fab fa-youtube"></i> YouTube
                  </a>
                  <a
                    href="https://www.tiktok.com/@kingdom_enlightment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn tiktok"
                  >
                    <i className="fab fa-tiktok"></i> TikTok
                  </a>
                  <a href="https://www.facebook.com/share/1EXQmKx4QE/" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
                    <i className="fab fa-facebook-f"></i> Facebook
                  </a>
                  <a href="#" className="social-btn instagram">
                    <i className="fab fa-instagram"></i> Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

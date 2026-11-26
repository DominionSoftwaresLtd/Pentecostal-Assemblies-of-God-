import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

const deptConfig = {
  women: {
    tag: 'Women Department',
    title: 'Connect with Women Department',
    subtitle: 'Join the mothers and sisters of PAG Ngungo Assembly for prayer, family fellowship, and community ministry.',
    category: 'Women Department',
    messagePlaceholder: 'Share your background or how you would love to get involved with the Women Department...',
  },
  men: {
    tag: 'Men Department',
    title: 'Join Men Fellowship',
    subtitle: 'Connecting Christian men, husbands, and fathers to build spiritual strength, brotherhood, and church development.',
    category: 'Men Department',
    messagePlaceholder: 'Tell us a bit about yourself and your desire to fellowship with Christian brothers...',
  },
  youth: {
    tag: 'Youth Department',
    title: 'Connect with Youth Fellowship',
    subtitle: 'Every Saturday 4:00 PM – 6:00 PM. Worship, talent discovery, life skills, and spiritual mentorship for young people.',
    category: 'Youth Department',
    messagePlaceholder: 'Tell us your age, interests (music, preaching, media, sports), or questions...',
  },
  sundayschool: {
    tag: 'Sunday School',
    title: 'Sunday School Department',
    subtitle: 'Sundays 8:00 AM – 10:00 AM. Inquire about enrolling your children or volunteering as a Sunday School teacher.',
    category: 'Sunday School Department',
    messagePlaceholder: "Please specify your child's age or your teaching/ministry experience...",
  },
  worship: {
    tag: 'Praise & Worship',
    title: 'Join Praise & Worship Team',
    subtitle: 'Serve the Lord through anointed vocals and leading the church family into worship in Spirit and Truth.',
    category: 'Praise and Worship',
    messagePlaceholder: 'Share your singing experience, vocal range, and spiritual journey in worship...',
  },
  instrumentalists: {
    tag: 'Instrumentalists Band',
    title: 'Join Instrumentalist Ministry',
    subtitle: 'Serve God on keyboards, drums, acoustic or electric guitars, bass, and audio sound engineering.',
    category: 'Instrumentalist',
    messagePlaceholder: 'Specify the instruments you play, experience level, and availability for rehearsals...',
  },
  choir: {
    tag: 'Sanctuary Choir',
    title: 'Join Sanctuary Choir',
    subtitle: 'Lift up the name of Jesus through choral harmonies, anthems, and special ministry presentations.',
    category: 'Choir',
    messagePlaceholder: 'Tell us your vocal part and your heart for choral praise ministry...',
  },
  ushering: {
    tag: 'Ushering & Protocol',
    title: 'Volunteer as an Usher',
    subtitle: 'Serve on the front line with hospitality, guest reception, and maintaining order and reverence in sanctuary services.',
    category: 'Ushering',
    messagePlaceholder: "Tell us about your heart to serve God's people with warmth and dignity...",
  },
  prayer: {
    tag: 'Prayer Intercession',
    title: 'Submit a Prayer Request',
    subtitle: 'Our pastoral team and intercessors pray for every burden. Share your prayer request with us in confidence.',
    category: 'Prayer Request',
    messagePlaceholder: 'Detail your prayer request or praise report so we can stand in faith with you...',
  },
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
    category: currentDept ? currentDept.category : 'General Inquiry',
  });

  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setForm(prev => ({
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
          category: currentDept ? currentDept.category : 'General Inquiry',
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setForm({
          name: '', email: '', phone: '', subject: '', residence: '',
          skills: '', institution: '', message: '', isUrgent: false,
          category: currentDept ? currentDept.category : 'General Inquiry',
        });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Unable to deliver message right now.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Connection paused. Direct email is available at info@pagngungo.org.');
    }
  };

  return (
    <main className="contact-page contact-page-v2">

      {/* ── Banner ── */}
      <section className="page-banner" style={{ background: 'linear-gradient(155deg, #000066 0%, #000045 55%, #1a1a4a 100%)' }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">{currentDept ? currentDept.tag : 'Get in Touch'}</span>
            <h1>{currentDept ? currentDept.title : 'Contact Us'}</h1>
            <p>{currentDept ? currentDept.subtitle : 'We\'d love to hear from you — connect with our pastoral team, join a ministry, or submit a prayer request.'}</p>
          </div>
        </div>
      </section>

      {/* ── Contact Body ── */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">

            {/* ── Left: Info Column ── */}
            <div className="contact-info-stack">

              {/* Connect / Department Context */}
              <div className="contact-info-block">
                <p className="contact-block-label"><i className="fas fa-church"></i> PAG Ngungo Assembly</p>
                <div className="contact-reach-row">
                  <div className="contact-reach-icon"><i className="fas fa-location-dot"></i></div>
                  <div className="contact-reach-text">
                    <h5>Sanctuary Location</h5>
                    <p>Mbeere District Headquarters, Embu County, Kenya</p>
                  </div>
                </div>
                <div className="contact-reach-row">
                  <div className="contact-reach-icon"><i className="fas fa-phone"></i></div>
                  <div className="contact-reach-text">
                    <h5>Phone &amp; WhatsApp</h5>
                    <a href="tel:+254720140213">+254 720 140 213</a>
                  </div>
                </div>
                <div className="contact-reach-row">
                  <div className="contact-reach-icon"><i className="fas fa-envelope"></i></div>
                  <div className="contact-reach-text">
                    <h5>Ministry Email</h5>
                    <a href="mailto:info@pagngungo.org">info@pagngungo.org</a>
                  </div>
                </div>
              </div>

              {/* Order of Services */}
              <div className="contact-info-block">
                <p className="contact-block-label"><i className="fas fa-clock"></i> Order of Services</p>
                <div className="contact-service-item">
                  <span>Sunday English Service</span>
                  <span>8:00 AM – 10:00 AM</span>
                </div>
                <div className="contact-service-item">
                  <span>Sunday School</span>
                  <span>8:00 AM – 10:00 AM</span>
                </div>
                <div className="contact-service-item">
                  <span>Sunday Main Service</span>
                  <span>10:30 AM – 1:30 PM</span>
                </div>
                <div className="contact-service-item">
                  <span>Friday Fellowship</span>
                  <span>7:00 PM – 9:00 PM</span>
                </div>
                <div className="contact-service-item">
                  <span>Youth Fellowship</span>
                  <span>Saturday 4:00 PM – 6:00 PM</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="contact-info-block">
                <p className="contact-block-label"><i className="fas fa-share-nodes"></i> Follow Us</p>
                <div className="contact-social-links">
                  <a href="https://www.youtube.com/@KingdomEnlightenmentMinistries" target="_blank" rel="noopener noreferrer" className="social-btn youtube">
                    <i className="fab fa-youtube"></i> YouTube
                  </a>
                  <a href="https://www.tiktok.com/@kingdom_enlightment" target="_blank" rel="noopener noreferrer" className="social-btn tiktok">
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

              {/* Department Chips (only on general contact) */}
              {!currentDept && (
                <div className="contact-info-block">
                  <p className="contact-block-label"><i className="fas fa-users"></i> Contact a Specific Department</p>
                  <div className="contact-dept-chips-wrap">
                    <Link to="/contact?dept=women" className="cdept-chip">&#128105; Women Dept</Link>
                    <Link to="/contact?dept=men" className="cdept-chip">&#128104; Men Dept</Link>
                    <Link to="/contact?dept=youth" className="cdept-chip">&#9889; Youth Dept</Link>
                    <Link to="/contact?dept=sundayschool" className="cdept-chip">&#128102; Sunday School</Link>
                    <Link to="/contact?dept=worship" className="cdept-chip">&#127925; Praise &amp; Worship</Link>
                    <Link to="/contact?dept=instrumentalists" className="cdept-chip">&#127928; Instrumentalists</Link>
                    <Link to="/contact?dept=choir" className="cdept-chip">&#127908; Choir</Link>
                    <Link to="/contact?dept=ushering" className="cdept-chip">&#128682; Ushering</Link>
                    <Link to="/contact?dept=prayer" className="cdept-chip">&#128591; Prayer Request</Link>
                  </div>
                </div>
              )}

              {/* When a dept is selected, show context message */}
              {currentDept && (
                <div className="contact-info-block" style={{ background: '#fff9f0', borderColor: '#fed7aa' }}>
                  <p className="contact-block-label" style={{ color: '#d97706' }}><i className="fas fa-circle-info"></i> Routing Information</p>
                  <p style={{ fontSize: '0.86rem', color: '#475569', margin: 0, fontFamily: 'var(--font-primary)', lineHeight: 1.6 }}>
                    Your submission will be immediately routed to the <strong>{currentDept.category}</strong> coordinator
                    and the PAG Ngungo Assembly administration team.
                  </p>
                  <div style={{ marginTop: '0.75rem' }}>
                    <Link to="/contact" style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: 600, fontFamily: 'var(--font-primary)' }}>
                      &#8592; Send a General Inquiry instead
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* ── Right: Contact Form ── */}
            <div className="contact-form-col">
              <div className="contact-form-card" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem' }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-primary)' }}>
                    {currentDept ? currentDept.title : 'Send Us a Message'}
                  </h3>
                  {currentDept && (
                    <span style={{ padding: '3px 10px', borderRadius: '16px', backgroundColor: 'rgba(0,0,102,0.08)', color: '#000066', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-primary)' }}>
                      {currentDept.category}
                    </span>
                  )}
                </div>

                {status === 'success' ? (
                  <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 style={{ color: '#166534', margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-primary)' }}>
                      {deptParam === 'prayer' ? 'Prayer Request Received!' : 'Submission Received!'}
                    </h4>
                    <p style={{ color: '#4b5563', fontSize: '0.9rem', margin: '0 0 1.25rem', fontFamily: 'var(--font-primary)' }}>
                      Thank you for reaching out. We've sent your details to <strong>info@pagngungo.org</strong> and recorded them in the ministry dashboard.
                    </p>
                    <button onClick={() => setStatus(null)} className="btn btn-primary" style={{ padding: '0.55rem 1.4rem', fontSize: '0.88rem' }}>
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Your Full Name *</label>
                        <input type="text" name="name" value={form.name} onChange={handle} placeholder="e.g. Everylne Mukami" required />
                      </div>
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input type="email" name="email" value={form.email} onChange={handle} placeholder="you@example.com" required />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Phone Number (WhatsApp)</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handle} placeholder="e.g. +254 700 000 000" />
                      </div>

                      {deptParam === 'instrumentalists' && (
                        <div className="form-group">
                          <label>Primary Instrument / Audio Skill *</label>
                          <select name="skills" value={form.skills} onChange={handle} required style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', backgroundColor: 'white' }}>
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
                          <label>Vocal Part / Worship Experience *</label>
                          <input type="text" name="skills" value={form.skills} onChange={handle} placeholder="e.g. Soprano, Alto, Tenor, Song Leader" required />
                        </div>
                      )}

                      {deptParam === 'choir' && (
                        <div className="form-group">
                          <label>Choir Vocal Part *</label>
                          <select name="skills" value={form.skills} onChange={handle} required style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', backgroundColor: 'white' }}>
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
                          <select name="skills" value={form.skills} onChange={handle} required style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', backgroundColor: 'white' }}>
                            <option value="">Select service...</option>
                            <option value="English Service (8:00 AM - 10:00 AM)">English Service (8:00 AM – 10:00 AM)</option>
                            <option value="Main Service (10:30 AM - 1:30 PM)">Main Service (10:30 AM – 1:30 PM)</option>
                            <option value="Both Sunday Services">Both Sunday Services</option>
                            <option value="Special Convocations & District Rallies">Special Convocations &amp; District Rallies</option>
                          </select>
                        </div>
                      )}

                      {!deptParam && (
                        <div className="form-group">
                          <label>Inquiry Category</label>
                          <select name="category" value={form.category} onChange={handle} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', backgroundColor: 'white' }}>
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
                        type="text" name="subject" value={form.subject} onChange={handle}
                        placeholder={
                          deptParam === 'prayer'           ? 'e.g. Healing, Family Breakthrough, Guidance' :
                          deptParam === 'women'            ? 'e.g. Women Fellowship / Welfare Outreach' :
                          deptParam === 'men'              ? 'e.g. Men Brotherhood / Sanctuary Projects' :
                          deptParam === 'youth'            ? 'e.g. Saturday Youth Fellowship (4–6 PM)' :
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
                        name="message" value={form.message} onChange={handle} rows={5}
                        placeholder={currentDept ? currentDept.messagePlaceholder : 'Write your message here...'}
                        required
                      ></textarea>
                    </div>

                    {deptParam === 'prayer' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                        <input
                          type="checkbox" id="isUrgent" name="isUrgent"
                          checked={form.isUrgent} onChange={handle}
                          style={{ width: '18px', height: '18px', accentColor: '#000066' }}
                        />
                        <label htmlFor="isUrgent" style={{ color: '#c2410c', fontWeight: 600, fontSize: '0.88rem', margin: 0, fontFamily: 'var(--font-primary)', cursor: 'pointer' }}>
                          Flag as Urgent Prayer Request
                        </label>
                      </div>
                    )}

                    {status === 'error' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', marginBottom: '1rem', borderRadius: '8px', backgroundColor: '#fff7ed', border: '1px solid #fed7aa', color: '#c2410c', fontSize: '0.85rem', fontWeight: 500 }}>
                        <AlertCircle size={18} style={{ flexShrink: 0 }} />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary btn-full"
                      disabled={status === 'sending'}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', fontWeight: 700 }}
                    >
                      {status === 'sending' ? (
                        <><RefreshCw size={16} className="fa-spin" /><span>Delivering...</span></>
                      ) : (
                        <><Send size={16} /><span>{deptParam === 'prayer' ? 'Submit Prayer Request' : 'Send Message'}</span></>
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

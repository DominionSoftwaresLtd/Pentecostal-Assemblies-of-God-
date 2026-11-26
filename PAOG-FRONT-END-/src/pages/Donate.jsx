import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PRESETS = [100, 500, 1000, 2500, 5000];

const GIVING_CATEGORIES = [
  {
    id: 'tithe',
    icon: '🙌',
    title: 'Tithe',
    desc: 'Return the first 10% of your income to the Lord as an act of faith and obedience.',
  },
  {
    id: 'offering',
    icon: '🫶',
    title: 'Sunday Offering',
    desc: 'Freewill offering to support weekly church operations, worship, and ministry.',
  },
  {
    id: 'building',
    icon: '🏛️',
    title: 'Building Fund',
    desc: 'Contribute to expanding and maintaining God\'s house for future generations.',
  },
  {
    id: 'missions',
    icon: '🌍',
    title: 'Missions & Outreach',
    desc: 'Support evangelism, Mbeere District assemblies, and community transformation.',
  },
];

const Donate = () => {
  const [amount, setAmount] = useState('500');
  const [custom, setCustom] = useState(false);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('offering');

  const selectPreset = (val) => {
    setAmount(String(val));
    setCustom(false);
  };

  const handleCustom = (e) => {
    setAmount(e.target.value);
    setCustom(true);
  };

  const handlePhoneChange = (e) => {
    let raw = e.target.value.replace(/[^\d\+]/g, '');
    if (raw.startsWith('+254')) {
      raw = '+254' + raw.slice(4).replace(/\D/g, '').slice(0, 9);
    } else if (raw.startsWith('254')) {
      raw = '254' + raw.slice(3).replace(/\D/g, '').slice(0, 9);
    } else if (raw.startsWith('0')) {
      raw = '0' + raw.slice(1).replace(/\D/g, '').slice(0, 9);
    } else {
      raw = raw.replace(/\D/g, '').slice(0, 9);
    }
    setPhone(raw);
    if (status === 'error') setStatus(null);
  };

  const isPhoneValid = (val) => {
    if (!val) return false;
    const clean = val.replace(/[\s\+]/g, '');
    return /^0[71]\d{8}$/.test(clean) || /^[71]\d{8}$/.test(clean) || /^254[71]\d{8}$/.test(clean);
  };

  const formatDisplayPhone = (val) => {
    if (!val) return '';
    if (val.startsWith('+254')) return val;
    if (val.startsWith('254')) return `+${val}`;
    if (val.startsWith('0')) return `+254 ${val.slice(1)}`;
    return `+254 ${val}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !phone || !isPhoneValid(phone)) return;
    setLoading(true);
    setStatus(null);
    try {
      const rawApiUrl = import.meta.env.VITE_API_URL;
      const baseUrl = (rawApiUrl && !rawApiUrl.includes('your-backend-url.com'))
        ? rawApiUrl.replace(/\/$/, '') : '';
      const res = await fetch(`${baseUrl}/api/donate/mpesa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, phone }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'An M-Pesa STK push prompt has been sent to your phone. Enter your PIN to complete your gift.');
      } else {
        setStatus('error');
        setMessage(data.message || 'Payment initiation failed. Please check your phone number and try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Unable to connect to the payment gateway. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setStatus(null); setAmount('500'); setPhone(''); setCustom(false); };

  const numAmount = Number(amount);
  const isValidAmount = !isNaN(numAmount) && numAmount >= 10;
  const isFormValid = isValidAmount && isPhoneValid(phone);

  return (
    <main className="donate-page-v2">

      {/* ── Hero Section ── */}
      <section className="give-hero">
        <span className="give-hero-tag">Support God's Kingdom Work</span>
        <h1 className="give-hero-title">Give to PAG Ngungo Assembly</h1>
        <p className="give-hero-verse">
          "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion,
          for God loves a cheerful giver."
        </p>
        <span className="give-hero-ref">— 2 Corinthians 9:7</span>
      </section>

      {/* ── Giving Categories ── */}
      <section className="give-categories-wrap">
        <div className="container">
          <div className="give-section-header">
            <h2>Ways to Give</h2>
            <p>Select the type of giving that reflects your heart of worship</p>
          </div>
          <div className="give-cards-row">
            {GIVING_CATEGORIES.map(cat => (
              <div
                key={cat.id}
                className={`give-category-card${selectedCategory === cat.id ? ' gcard-active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSelectedCategory(cat.id)}
              >
                <span className="gcard-icon">{cat.icon}</span>
                <span className="gcard-title">{cat.title}</span>
                <span className="gcard-desc">{cat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Giving Section ── */}
      <section className="give-main-section">
        <div className="container">
          <div className="give-main-grid">

            {/* Left: Info Panels */}
            <div className="give-info-col">

              {/* M-Pesa Paybill Details */}
              <div className="give-panel-card">
                <h3><i className="fas fa-mobile-screen-button"></i> M-Pesa Paybill Details</h3>
                <div className="paybill-row">
                  <span className="paybill-label">Business Number</span>
                  <span className="paybill-value">400200</span>
                </div>
                <div className="paybill-row">
                  <span className="paybill-label">Account Name</span>
                  <span className="paybill-value" style={{ fontFamily: 'var(--font-primary)', fontSize: '0.9rem' }}>PAG Ngungo</span>
                </div>
                <div className="paybill-row">
                  <span className="paybill-label">Account Number</span>
                  <span className="paybill-value">PAOGNGUNGO</span>
                </div>

                <div className="mpesa-steps-box">
                  <p className="mpesa-steps-title"><i className="fas fa-list-ol"></i> Manual Steps (if STK Push fails)</p>
                  <ol>
                    <li>Open <strong>M-Pesa</strong> on your phone</li>
                    <li>Select <strong>Lipa na M-Pesa</strong> → <strong>Pay Bill</strong></li>
                    <li>Enter Business No. <strong>400200</strong></li>
                    <li>Account No.: <strong>PAOGNGUNGO</strong></li>
                    <li>Enter amount &amp; your M-Pesa PIN to confirm</li>
                  </ol>
                </div>
              </div>

              {/* Bank Transfer Details */}
              <div className="give-panel-card">
                <h3><i className="fas fa-building-columns"></i> Bank Transfer Details</h3>
                <div className="bank-row">
                  <span className="bank-row-label">Account Name</span>
                  <span className="bank-row-value">PAG Ngungo Assembly</span>
                </div>
                <div className="bank-row">
                  <span className="bank-row-label">Bank</span>
                  <span className="bank-row-value">Cooperative Bank of Kenya</span>
                </div>
                <div className="bank-row">
                  <span className="bank-row-label">Branch</span>
                  <span className="bank-row-value">Siakago Branch</span>
                </div>
                <div className="bank-row">
                  <span className="bank-row-label">Account Number</span>
                  <span className="bank-row-value" style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>01200010000XXX</span>
                </div>
                <div className="bank-row">
                  <span className="bank-row-label">SWIFT / BIC</span>
                  <span className="bank-row-value" style={{ fontFamily: 'monospace' }}>KCOOKENA</span>
                </div>
                <p style={{ margin: '0.75rem 0 0', fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-primary)' }}>
                  <i className="fas fa-circle-info" style={{ marginRight: '5px' }}></i>
                  For international giving, please contact <a href="mailto:info@pagngungo.org" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>info@pagngungo.org</a>
                </p>
              </div>

              {/* In-Person */}
              <div className="give-panel-card" style={{ background: 'linear-gradient(135deg, #fff9f0, #fff)', borderColor: '#fed7aa' }}>
                <h3 style={{ color: '#c2410c' }}><i className="fas fa-church" style={{ color: '#d97706' }}></i> Give In Person</h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 0.75rem', fontFamily: 'var(--font-primary)', lineHeight: 1.6 }}>
                  You are always welcome to give your tithes and offerings during our Sunday services at the PAG Ngungo Sanctuary.
                </p>
                <div style={{ fontSize: '0.82rem', color: '#64748b', fontFamily: 'var(--font-primary)', lineHeight: 1.7 }}>
                  <div><i className="fas fa-clock" style={{ color: '#d97706', marginRight: '6px', width: '16px' }}></i> <strong>Sunday Main Service:</strong> 10:30 AM – 1:30 PM</div>
                  <div><i className="fas fa-clock" style={{ color: '#d97706', marginRight: '6px', width: '16px' }}></i> <strong>English Service:</strong> 8:00 AM – 10:00 AM</div>
                  <div><i className="fas fa-location-dot" style={{ color: '#d97706', marginRight: '6px', width: '16px' }}></i> Mbeere District HQ, Embu County, Kenya</div>
                </div>
              </div>
            </div>

            {/* Right: M-Pesa STK Push Form */}
            <div className="give-form-col">
              <div className="give-form-card">
                <div className="give-form-card-header">
                  <i className="fas fa-mobile-screen-button"></i>
                  <h3>Give via M-Pesa STK Push</h3>
                  <p>We'll send a prompt directly to your phone &mdash; just enter your PIN</p>
                </div>

                {/* Selected Category Badge */}
                {selectedCategory && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#f0f4ff', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #c7d7fe' }}>
                    <span style={{ fontSize: '1.1rem' }}>{GIVING_CATEGORIES.find(c => c.id === selectedCategory)?.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6366f1', fontWeight: 700, fontFamily: 'var(--font-primary)' }}>Giving as</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', fontFamily: 'var(--font-primary)' }}>
                        {GIVING_CATEGORIES.find(c => c.id === selectedCategory)?.title}
                      </div>
                    </div>
                  </div>
                )}

                {status === 'success' ? (
                  <div className="donate-success" style={{ textAlign: 'center', padding: '1rem 0' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                      <i className="fas fa-mobile-screen-button" style={{ fontSize: '1.8rem', color: 'var(--primary-color)' }}></i>
                    </div>
                    <h3 style={{ fontSize: '1.2rem', color: '#1e293b', margin: '0 0 0.5rem', fontFamily: 'var(--font-primary)', fontWeight: 700 }}>Check Your Phone!</h3>
                    <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1rem', fontFamily: 'var(--font-primary)' }}>
                      M-Pesa prompt sent to <strong>{formatDisplayPhone(phone)}</strong>
                    </p>

                    <div className="stk-steps-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                      {[
                        'Unlock your phone screen',
                        `Enter your M-Pesa PIN to authorize KES ${numAmount.toLocaleString()}`,
                        'You will receive an M-Pesa SMS confirmation receipt'
                      ].map((step, i) => (
                        <div key={i} className="stk-step-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ width: '22px', height: '22px', minWidth: '22px', background: 'var(--primary-color)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-primary)' }}>{i + 1}</span>
                          <span style={{ fontSize: '0.84rem', color: '#475569', fontFamily: 'var(--font-primary)' }} dangerouslySetInnerHTML={{ __html: step }}></span>
                        </div>
                      ))}
                    </div>

                    <button className="btn btn-primary btn-full" onClick={reset} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <i className="fas fa-redo-alt"></i> Done / Give Again
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="donate-form">
                    <div className="form-group">
                      <label>Amount (KES)</label>
                      <div className="amount-presets">
                        {PRESETS.map(val => (
                          <button
                            type="button" key={val}
                            className={`amount-btn${amount === String(val) && !custom ? ' amount-btn--active' : ''}`}
                            onClick={() => selectPreset(val)}
                          >
                            {val.toLocaleString()}
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        className={`amount-custom-input${custom ? ' active' : ''}`}
                        placeholder="Or enter custom amount (e.g. 200)"
                        min="10"
                        value={custom ? amount : ''}
                        onChange={handleCustom}
                        onClick={() => setCustom(true)}
                      />
                    </div>

                    <div className="form-group">
                      <label>M-Pesa Phone Number</label>
                      <div className={`phone-input-wrap${phone && !isPhoneValid(phone) ? ' phone-invalid' : ''}`}>
                        <span className="phone-prefix">+254</span>
                        <input
                          type="tel"
                          placeholder="7XX XXX XXX or 07XX XXX XXX"
                          value={phone}
                          onChange={handlePhoneChange}
                          maxLength={13}
                          required
                        />
                      </div>
                      <div className="phone-guidance-note">
                        <i className="fas fa-info-circle"></i>
                        <span>Enter <strong>07XX...</strong> or <strong>7XX...</strong>. An M-Pesa PIN prompt will appear on your screen.</span>
                      </div>
                    </div>

                    {status === 'error' && (
                      <div className="form-error">
                        <i className="fas fa-exclamation-circle"></i> {message}
                      </div>
                    )}

                    {loading && (
                      <div className="stk-guidance-box">
                        <div className="stk-spinner-wrap">
                          <i className="fas fa-circle-notch fa-spin"></i>
                        </div>
                        <div className="stk-guidance-text">
                          <strong>Sending M-Pesa Prompt...</strong>
                          <p>Unlock your phone and enter your M-Pesa PIN when requested.</p>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary btn-full donate-btn"
                      disabled={loading || !isFormValid}
                    >
                      {loading ? (
                        <><i className="fas fa-spinner fa-spin"></i> Sending Prompt to Phone...</>
                      ) : (
                        <><i className="fas fa-heart"></i> Give KES {isValidAmount ? numAmount.toLocaleString() : '—'}</>
                      )}
                    </button>

                    <p className="donate-security">
                      <i className="fas fa-lock"></i> Secured by Safaricom M-Pesa API
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact Section ── */}
      <section className="give-impact-section">
        <div className="container">
          <h2 className="give-impact-title">Your Giving Makes a Difference</h2>
          <p className="give-impact-sub">
            Every gift, big or small, advances the work of God in Mbeere District and beyond.
            Thank you for your faithful generosity.
          </p>

          <div className="give-impact-grid">
            <div className="give-impact-card">
              <span className="give-impact-num">3+</span>
              <span className="give-impact-label">Decades of Ministry in Mbeere</span>
            </div>
            <div className="give-impact-card">
              <span className="give-impact-num">40+</span>
              <span className="give-impact-label">District Assemblies Supported</span>
            </div>
            <div className="give-impact-card">
              <span className="give-impact-num">1000s</span>
              <span className="give-impact-label">Lives Transformed by the Gospel</span>
            </div>
          </div>

          <div className="give-donate-cta-row">
            <Link to="/contact?type=prayer" className="btn btn-secondary" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.1)' }}>
              <i className="fas fa-hands-praying" style={{ marginRight: '7px' }}></i> Submit Prayer Request
            </Link>
            <Link to="/contact" className="btn btn-secondary" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.1)' }}>
              <i className="fas fa-envelope" style={{ marginRight: '7px' }}></i> Contact the Church
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Donate;

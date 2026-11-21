import React, { useState } from 'react';

const PRESETS = [100, 500, 1000, 2500, 5000];

const Donate = () => {
  const [amount, setAmount] = useState('500');
  const [custom, setCustom] = useState(false);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const selectPreset = (val) => {
    setAmount(String(val));
    setCustom(false);
  };

  const handleCustom = (e) => {
    setAmount(e.target.value);
    setCustom(true);
  };

  // Enforce valid digit lengths and strip excess numbers
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

  // Validate phone format for Safaricom / M-Pesa numbers
  const isPhoneValid = (val) => {
    if (!val) return false;
    const clean = val.replace(/[\s\+]/g, '');
    return /^0[71]\d{8}$/.test(clean) ||
           /^[71]\d{8}$/.test(clean) ||
           /^254[71]\d{8}$/.test(clean);
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
        ? rawApiUrl.replace(/\/$/, '')
        : '';
      const endpoint = `${baseUrl}/api/donate/mpesa`;

      const res = await fetch(endpoint, {
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
    } catch (err) {
      setStatus('error');
      setMessage('Unable to connect to the payment gateway. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { 
    setStatus(null); 
    setAmount('500'); 
    setPhone(''); 
    setCustom(false); 
  };

  const numAmount = Number(amount);
  const isValidAmount = !isNaN(numAmount) && numAmount >= 10;
  const isFormValid = isValidAmount && isPhoneValid(phone);

  return (
    <main className="donate-page">
      <div className="donate-centered">
        <div className="donate-form-card">
          <div className="donate-form-header">
            <i className="fas fa-hand-holding-dollar" style={{ fontSize: '2.4rem', color: '#E87D1E', marginBottom: '8px' }}></i>
            <h2 style={{ fontSize: '1.45rem', margin: '4px 0 6px', color: '#1e293b' }}>Give via M-Pesa</h2>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.92rem' }}>
              Pentecostal Assemblies of God &bull; Ngungo Assembly (Mbeere District HQ)
            </p>
          </div>

          {/* Paybill Showcase Banner */}
          <div style={{ background: '#fff7ed', border: '2px solid #fed7aa', borderRadius: '12px', padding: '18px 20px', marginBottom: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#c2410c', fontWeight: 800 }}>M-Pesa Paybill Number</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#c2410c', letterSpacing: '1px' }}>4136387</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b', fontWeight: 800 }}>Account Name</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>YOUR NAME</div>
              </div>
            </div>
            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #fed7aa', fontSize: '0.82rem', color: '#9a3412', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
              <span><i className="fas fa-user-tie"></i> Bishop Clement Simba (Overseer)</span>
              <span><i className="fas fa-map-marker-alt"></i> P.O. Box 213-60113 Kiritiri Mbeere</span>
            </div>
          </div>

          {/* Manual Paybill Instructions Collapsible / Visible */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 16px', marginBottom: '20px', fontSize: '0.85rem' }}>
            <strong style={{ color: '#1e293b', display: 'block', marginBottom: '8px' }}>
              <i className="fas fa-list-ol" style={{ color: '#E87D1E' }}></i> Manual Paybill Steps:
            </strong>
            <ol style={{ margin: 0, paddingLeft: '18px', color: '#475569', lineHeight: '1.6' }}>
              <li>Go to <strong>M-PESA</strong> on your phone &rarr; <strong>Lipa na M-PESA</strong> &rarr; <strong>Paybill</strong></li>
              <li>Enter Business Number: <strong>4136387</strong></li>
              <li>Enter Account Number: <strong>YOUR NAME</strong> (or e.g. <em>Tithe / Your Name</em>)</li>
              <li>Enter the Amount and your <strong>M-PESA PIN</strong> to confirm</li>
            </ol>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              — OR Send Instant STK Push to Phone —
            </span>
          </div>

          {status === 'success' ? (
            <div className="donate-success">
              <div className="donate-success-icon">
                <i className="fas fa-mobile-screen-button pulse-icon"></i>
              </div>
              <h3>Check Your Phone Screen!</h3>
              <p className="donate-success-highlight">
                An M-Pesa payment prompt has been sent to <strong>{formatDisplayPhone(phone)}</strong>.
              </p>

              <div className="stk-steps-list">
                <div className="stk-step-item">
                  <span className="step-num">1</span>
                  <span>Unlock your phone screen</span>
                </div>
                <div className="stk-step-item">
                  <span className="step-num">2</span>
                  <span>Enter your <strong>M-Pesa PIN</strong> to authorize <strong>KES {numAmount.toLocaleString()}</strong></span>
                </div>
                <div className="stk-step-item">
                  <span className="step-num">3</span>
                  <span>You will receive an M-Pesa confirmation SMS receipt</span>
                </div>
              </div>

              <button className="btn btn-primary btn-full" onClick={reset}>
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
                      type="button"
                      key={val}
                      className={`amount-btn ${amount === String(val) && !custom ? 'amount-btn--active' : ''}`}
                      onClick={() => selectPreset(val)}
                    >
                      {val.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  className={`amount-custom-input ${custom ? 'active' : ''}`}
                  placeholder="Or enter custom amount (e.g. 200)"
                  min="10"
                  value={custom ? amount : ''}
                  onChange={handleCustom}
                  onClick={() => setCustom(true)}
                />
              </div>

              <div className="form-group">
                <label>M-Pesa Phone Number</label>
                <div className={`phone-input-wrap ${phone && !isPhoneValid(phone) ? 'phone-invalid' : ''}`}>
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
                  <span>Enter <strong>07XX...</strong> or <strong>7XX...</strong>. An M-Pesa PIN prompt will pop up on your phone screen.</span>
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
    </main>
  );
};

export default Donate;

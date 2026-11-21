import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CreativeSlider.css';

import carousel1 from '../assets/carousel1.JPG';
import carousel2 from '../assets/carousel2.JPG';
import carousel3 from '../assets/carousel3.JPG'; 
import carousel4 from '../assets/carousel4.JPG';
import carousel5 from '../assets/carousel5.JPG';
import carousel6 from '../assets/carousel6.jpg';
import carousel7 from '../assets/carousel7.jpg';
import handsTogether from '../assets/HANDS TOGETHER.jpg';

const slides = [
  {
    image: carousel1,
    subtitle: "Welcome to",
    title: "P.A.O.G NGUNGO ASSEMBLY",
    text: "Mbeere District Headquarter Church — Bishop Clement Simba, Overseer",
    btn1: { text: "About Our Church", link: "/about" },
    btn2: { text: "Order of Services", link: "/about#order-of-services" }
  },
  {
    image: carousel4,
    subtitle: "Worship With Us",
    title: "ORDER OF SERVICES",
    text: "Sunday English: 8:00 AM–10:00 AM | Main Service: 10:30 AM–1:30 PM",
    btn1: { text: "Service Schedule", link: "/about#order-of-services" },
    btn2: { text: "Sunday School", link: "/ministries#sundayschool" }
  },
  {
    image: carousel3,
    subtitle: "Weekly Fellowships",
    title: "PRAYER & YOUTH FELLOWSHIP",
    text: "Friday Fellowship: 7:00 PM–9:00 PM | Youth: Saturday 4:00 PM–6:00 PM",
    btn1: { text: "Youth Department", link: "/ministries#youth" },
    btn2: { text: "Contact Pastor", link: "/contact" }
  },
  {
    image: carousel2,
    subtitle: "Mbeere District HQ",
    title: "DISTRICT ASSEMBLIES",
    text: "Kiamachang'a, Rwika, Kathera, Ngangari, Mugaari, Muumoni, Gikuru & Kyuso Kitui",
    btn1: { text: "View Assemblies", link: "/about#assemblies" },
    btn2: { text: "District Leadership", link: "/leadership" }
  },
  {
    image: carousel5,
    subtitle: "Active Departments",
    title: "WOMEN, MEN & YOUTH",
    text: "Equipping Every Believer for Kingdom Impact & Family Growth",
    btn1: { text: "Our Departments", link: "/ministries" },
    btn2: { text: "Join a Ministry", link: "/contact" }
  },
  {
    image: carousel6,
    subtitle: "Anointed Music",
    title: "PRAISE & INSTRUMENTS",
    text: "Praise & Worship, Dedicated Instrumentalists, Church Choir & Ushering",
    btn1: { text: "Ministries", link: "/ministries#worship" },
    btn2: { text: "Gallery", link: "/gallery" }
  },
  {
    image: carousel7,
    subtitle: "Giving & Stewardship",
    title: "PAYBILL: 4136387",
    text: "Support God's Work — Account: YOUR NAME | Overseer Bishop Clement Simba",
    btn1: { text: "Give via M-Pesa", link: "/donate" },
    btn2: { text: "Contact Us", link: "/contact" }
  }
];

// Words that rotate across fingers
const FINGER_WORDS = ['PENTECOSTAL', 'ASSEMBLIES', 'OF GOD'];
const CHAR_SPEED = 110; // ms per character typed

const CreativeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Typewriter state — how many chars are visible on each finger
  const [typed1, setTyped1] = useState(0);
  const [typed2, setTyped2] = useState(0);
  const [typed3, setTyped3] = useState(0);
  
  // Touch variables
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Authenticated state & active session for hero CTAs
  const [currentUser, setCurrentUser] = useState(null);
  const [hasActiveSession, setHasActiveSession] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const u = localStorage.getItem('kemt_current_user') || localStorage.getItem('kemt_admin_user');
      if (u) {
        try { setCurrentUser(JSON.parse(u)); } catch { setCurrentUser(null); }
      } else {
        setCurrentUser(null);
      }
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    window.addEventListener('kemt_auth_change', checkAuth);

    const checkActiveSession = async () => {
      try {
        const res = await fetch('/api/attendance/active');
        if (res.ok) {
          const data = await res.json();
          setHasActiveSession(Boolean(data.hasActiveSession));
        }
      } catch {}
    };
    checkActiveSession();

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('kemt_auth_change', checkAuth);
    };
  }, []);

  // Auto-advance every 8s (gives time for full typing sequence + ~4s view)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000); 
    return () => clearInterval(interval);
  }, []); // Run constantly

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      // Swipe left - next slide
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -75) {
      // Swipe right - prev slide
      prevSlide();
    }
  };

  const safeSlide = currentSlide >= slides.length ? 0 : currentSlide;
  const finger1Img = slides[safeSlide]?.image;
  const finger2Img = slides[(safeSlide + 1) % slides.length]?.image;
  const finger3Img = slides[(safeSlide + 2) % slides.length]?.image;

  // Compute which word goes on which finger for this slide
  const wordOffset = currentSlide % 3;
  const word1 = FINGER_WORDS[wordOffset % 3];
  const word2 = FINGER_WORDS[(wordOffset + 1) % 3];
  const word3 = FINGER_WORDS[(wordOffset + 2) % 3];

  // Typewriter: chain finger1 → finger2 → finger3 on every slide change
  useEffect(() => {
    let i2 = null;
    let i3 = null;

    // Reset all to empty
    setTyped1(0);
    setTyped2(0);
    setTyped3(0);

    // --- Finger 1 types immediately ---
    let pos1 = 0;
    const i1 = setInterval(() => {
      pos1++;
      setTyped1(pos1);
      if (pos1 >= word1.length) clearInterval(i1);
    }, CHAR_SPEED);

    // --- Finger 2 starts after finger 1 finishes + 250ms pause ---
    const t2 = setTimeout(() => {
      let pos2 = 0;
      i2 = setInterval(() => {
        pos2++;
        setTyped2(pos2);
        if (pos2 >= word2.length) clearInterval(i2);
      }, CHAR_SPEED);
    }, word1.length * CHAR_SPEED + 250);

    // --- Finger 3 starts after finger 2 finishes + 250ms pause ---
    const t3 = setTimeout(() => {
      let pos3 = 0;
      i3 = setInterval(() => {
        pos3++;
        setTyped3(pos3);
        if (pos3 >= word3.length) clearInterval(i3);
      }, CHAR_SPEED);
    }, (word1.length + word2.length) * CHAR_SPEED + 500);

    return () => {
      clearInterval(i1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (i2) clearInterval(i2);
      if (i3) clearInterval(i3);
    };
  }, [currentSlide]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section 
      className="creative-hero"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic Background Image (Full screen, but covered on the right) */}
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`creative-bg-image ${index === safeSlide ? 'active' : ''}`}
        >
          <div 
            className="ken-burns-img"
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
          <div className="bg-overlay"></div>
        </div>
      ))}

      {/* Static Background Image (Right half with diagonal split) */}
      <div className="creative-bg-right">
        <div 
          className="bg-right-img"
          style={{ backgroundImage: `url(${handsTogether})` }}
        ></div>
        <div className="bg-right-overlay"></div>
      </div>

      <div className="creative-container">
        {/* Left Side: Text Content */}
        <div className="creative-text-col">
          <div className="text-wrapper">
            {slides.map((slide, index) => (
              <div 
                key={index} 
                className={`text-slide ${index === safeSlide ? 'active' : ''}`}
              >
                <div className="text-content-clean">
                  <h1 className="slide-title">{slide.title}</h1>
                  <p className="slide-desc">{slide.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="slider-controls-modern">
            <button className="ctrl-btn prev" onClick={prevSlide}>
               <i className="fas fa-chevron-left"></i>
            </button>
            <div className="dots-modern">
              {slides.map((_, i) => (
                <div 
                  key={i} 
                  className={`dot-m ${i === safeSlide ? 'active' : ''}`}
                  onClick={() => {
                    if (!isTransitioning) {
                      setCurrentSlide(i);
                    }
                  }}
                >
                  <div className="dot-progress"></div>
                </div>
              ))}
            </div>
            <button className="ctrl-btn next" onClick={nextSlide}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: The Visual "Fingers" Queue */}
      <div className="fingers-container">
        {/* Finger 1 */}
        <div className="finger finger-1">
          <div className="finger-img" key={finger1Img} style={{ backgroundImage: `url(${finger1Img})` }}></div>
          <div className="finger-word">{word1.slice(0, typed1)}</div>
        </div>
        {/* Finger 2 */}
        <div className="finger finger-2">
          <div className="finger-img" key={finger2Img} style={{ backgroundImage: `url(${finger2Img})` }}></div>
          <div className="finger-word finger-word-center">{word2.slice(0, typed2)}</div>
        </div>
        {/* Finger 3 */}
        <div className="finger finger-3">
          <div className="finger-img" key={finger3Img} style={{ backgroundImage: `url(${finger3Img})` }}></div>
          <div className="finger-word">{word3.slice(0, typed3)}</div>
        </div>
      </div>
    </section>
  );
};

export default CreativeSlider;

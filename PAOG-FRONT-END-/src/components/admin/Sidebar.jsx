import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  Images,
  Heart,
  DollarSign,
  MessageSquare,
  Settings,
  PieChart,
  Newspaper,
  Shield
} from 'lucide-react';
import logoImg from '../../assets/logo ngungo.png';

const Sidebar = () => {
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.unreadMessages || 0);
        }
      } catch { }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  const isCurrentPath = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="admin-sidebar-logo-icon">
          <img src={logoImg} alt="PAG Ngungo" />
        </div>
        <span>PAG Ngungo Admin</span>
      </div>

      <div className="admin-nav">
        <div className="admin-nav-category">Main Menu</div>

        <Link to="/admin" className={`admin-nav-item ${isCurrentPath('/admin') && location.pathname === '/admin' ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <LayoutDashboard size={19} />
            Dashboard
          </div>
        </Link>

        <Link to="/admin/members" className={`admin-nav-item ${isCurrentPath('/admin/members') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <UserCheck size={19} />
            Member Management
          </div>
        </Link>

        <Link to="/admin/attendance" className={`admin-nav-item ${isCurrentPath('/admin/attendance') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <Calendar size={19} />
            Attendance
          </div>
        </Link>

        <Link to="/admin/news" className={`admin-nav-item ${isCurrentPath('/admin/news') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <Newspaper size={19} />
            News &amp; Updates
          </div>
        </Link>

        <Link to="/admin/events" className={`admin-nav-item ${isCurrentPath('/admin/events') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <Calendar size={19} />
            Events &amp; Missions
          </div>
        </Link>

        <Link to="/admin/gallery" className={`admin-nav-item ${isCurrentPath('/admin/gallery') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <Images size={19} />
            Gallery &amp; Albums
          </div>
        </Link>

        <Link to="/admin/messages" className={`admin-nav-item ${isCurrentPath('/admin/messages') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <MessageSquare size={19} />
            Contact Messages
          </div>
          {unreadCount > 0 && (
            <span className="admin-nav-badge">
              {unreadCount}
            </span>
          )}
        </Link>

        <Link to="/admin/leadership" className={`admin-nav-item ${isCurrentPath('/admin/leadership') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <Shield size={19} />
            Leadership Council
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;

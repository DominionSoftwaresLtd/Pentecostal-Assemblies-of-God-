import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Departments from './pages/Departments';
import Ministries from './pages/Ministries';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Leadership from './pages/Leadership';
import Assemblies from './pages/Assemblies';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import QuickCheckIn from './pages/QuickCheckIn';
import MemberDashboard from './pages/MemberDashboard';

// Admin imports
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMembers from './pages/admin/AdminMembers';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminNews from './pages/admin/AdminNews';
import AdminUsers from './pages/admin/AdminUsers';
import AdminEvents from './pages/admin/AdminEvents';
import AdminMessages from './pages/admin/AdminMessages';
import AdminGallery from './pages/admin/AdminGallery';
import AdminBibleGroups from './pages/admin/AdminBibleGroups';
import AdminLeadership from './pages/admin/AdminLeadership';

// Layout for the main website
const MainLayout = () => (
  <div className="app">
    <ScrollToTop />
    <Navbar />
    <Outlet />
    <Footer />
    <BackToTop />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="members" element={<AdminMembers />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="bible-groups" element={<AdminBibleGroups />} />
          <Route path="leadership" element={<AdminLeadership />} />
          <Route path="donations" element={<div style={{padding: '30px', color: 'var(--admin-text-main)'}}><h1 className="admin-page-title">Donations</h1><p>Donations management coming soon...</p></div>} />
          <Route path="prayer-requests" element={<div style={{padding: '30px', color: 'var(--admin-text-main)'}}><h1 className="admin-page-title">Prayer Requests</h1><p>Prayer requests queue coming soon...</p></div>} />
          <Route path="analytics" element={<div style={{padding: '30px', color: 'var(--admin-text-main)'}}><h1 className="admin-page-title">Analytics</h1><p>Advanced system analytics coming soon...</p></div>} />
          <Route path="settings" element={<div style={{padding: '30px', color: 'var(--admin-text-main)'}}><h1 className="admin-page-title">Settings</h1><p>Settings coming soon...</p></div>} />
        </Route>

        {/* Main Site Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/assemblies" element={<Assemblies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/check-in" element={<QuickCheckIn />} />
          <Route path="/dashboard" element={<MemberDashboard />} />
          <Route path="/member-dashboard" element={<MemberDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

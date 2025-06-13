import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footlong from './components/Footlong';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticleList from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import WelcomePage from './pages/WelcomePage';
import NotFoundPage from './pages/NotFoundPage';

import DashLayout from './components/DashLayout';
import DashboardPage from './pages/DashPage/DashboardPage';
import ReportsPage from './pages/DashPage/ReportsPage';
import UsersPage from './pages/DashPage/UsersPage';
import DashArticleListPage from './pages/DashPage/DashArticleListPage';

import './styles/Layout.css';

function App() {
  return (
    <div className="app-container">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}

      <main>
        <Routes>
          {/* Redirect root to /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/welcome" element={<WelcomePage />} />

          {/* Public Routes */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard/*" element={<DashLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="articles" element={<DashArticleListPage />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isDashboard && <Footlong />}
    </>
  );
}

export default App;
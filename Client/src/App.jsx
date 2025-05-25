import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticleList from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import Footlong from './components/Footlong';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import WelcomePage from './pages/WelcomePage';
import './styles/Layout.css';

// Dashboard Layout & Pages
import DashLayout from './components/DashLayout';
import DashboardPage from './pages/DashPage/DashboardPage';
import ReportsPage from './pages/DashPage/ReportsPage';
import UsersPage from './pages/DashPage/UsersPage';
import DashArticleListPage from './pages/DashPage/DashArticleListPage';

function App() {
  return (
    <div className="app-container">
      <Router>
        <AppWithNavbar />
      </Router>
    </div>
  );
}

function AppWithNavbar() {
  const location = useLocation();

  // Hide navbar on login, register, welcome, AND dashboard pages (handled inside DashLayout)
  const hideNavbarPaths = ['/', '/register', '/welcome'];
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && !isDashboard && <Navbar />}

      <main>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/welcome" element={<WelcomePage />} />

          {/* Public Routes */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Dashboard Routes (with DashLayout) */}
          <Route path="/dashboard/*" element={<DashLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="articles" element={<DashArticleListPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footlong />
    </>
  );
}

export default App;
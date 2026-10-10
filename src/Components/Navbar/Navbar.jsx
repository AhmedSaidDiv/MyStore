import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useCart } from '../CartContext/CartContext';
import { useTheme } from '../Theme/Theme';

export default function Navbar() {
  const { cartCount } = useCart();
  const { darkMode, toggleTheme } = useTheme();
  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    if (selectedTheme === `dark` && !darkMode) {
      toggleTheme();
    }else if (selectedTheme === `light` && darkMode) {
      toggleTheme();
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm ${
        darkMode ? 'navbar-dark' : 'navbar-light'
      } ${styles.navbar}`}
      style={{
        backgroundColor: darkMode ? '#212529' : '#ffffff',
      }}
    >
      <div className="container">
        <NavLink
          className={`navbar-brand fw-bold fs-3 ${styles.brand}`}
          to="/"
          style={{ color: darkMode ? '#ffffff' : '#212529' }}
        >
          MyStore<span>.</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>

            <NavLink className="nav-link" to="/products">
              Products
            </NavLink>

            <NavLink className="nav-link" to="/about">
              About
            </NavLink>

            <NavLink to="/cart" className="nav-link">
              Cart
              <span className="badge bg-danger ms-1">
                {cartCount}
              </span>
            </NavLink>

            <select
               className="form-select theme-select"
               value={darkMode ? 'dark' : 'light'}
               onChange={handleThemeChange}
               aria-label="Choose theme"
>
               <option value="light">☀️ Light Mode</option>
               <option value="dark">🌙 Dark Mode</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
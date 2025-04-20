import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import styles from './Navbar.module.css';
import logowImage from '/assets/logows.png'; // Adjust the path based on the image location

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
      <Link to="/" className={styles.logoLink}>
  <img src={logowImage} alt="FACTS Logo" className={styles.logoImage} />
</Link>
      </div>

      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input type="text" placeholder="Search for article" className={styles.search} />
      </div>

      <ul className={styles.navLinks}>
        <li><Link to="/articles">Articles</Link></li>
        <li><Link to="/detector">Text-Detector</Link></li>
        <li className={styles.userMenu}>
          <span className={styles.userInfo}>Anon#666</span>
          <ul className={styles.dropdown}>
            <li><Link to="/investigation">InvestigationWeb</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

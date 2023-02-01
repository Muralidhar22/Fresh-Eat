import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import styles from './Footer.styles.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footerNav}>
        <p className="text-uppercase">get help</p>
        <Link to="#">Frequently Asked Questions</Link>
        <Link to="orders">Orders Status</Link>
        <Link to="#">Returns</Link>
        <Link to="#">Feedback</Link>
      </section>
      <section className={styles.footerContact}>
        <p className="text-uppercase">connect with us</p>
        <div className={styles.footerContactIcons}>
          <a href="https://www.linkedin.com/in/muralidhar-akkireddy-91b673158/" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Muralidhar22" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
        </div>
      </section>
      <div className={styles['footer-note']}>
        &#169;
        <div className="logo-container">
          <span className={`text-uppercase logo-text`}>Game</span>
          <span className="logo-x"></span>
        </div>
        2000 - 2022
        <span>Online store of digital goods. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;

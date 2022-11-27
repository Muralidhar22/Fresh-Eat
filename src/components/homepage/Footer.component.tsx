import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import styles from "./Footer.styles.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <section className={styles.footerNav}>
                <p className="text-uppercase">get help</p>
                <Link to="faq">Frequently Asked Questions</Link>
                <Link to="orders">Orders Status</Link>
                <Link to="#">Returns</Link>
                <Link to="feedback">Feedback</Link>
            </section>
            <section className={styles.footerContact}>
                <p className="text-uppercase">connect with us</p>
                <div className={styles.footerContactIcons}>
                    <a href="#" target="_blank"><FaLinkedin /></a>
                    <a href="#" target="_blank"><FaGithub /></a>
                </div>
            </section>
            <div>
                &#169; 2000 - 2022
                <span className="logoContainer">
                    <span className="text-uppercase logoText">Game</span>
                    <span className="logo-x"></span>
                </span>
            </div>
        </footer>
    )
}

export default Footer;
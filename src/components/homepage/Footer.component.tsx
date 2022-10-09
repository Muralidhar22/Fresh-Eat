import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer>
            <section>
                <p className="text-uppercase">get help</p>
                <Link to="faq">Frequently Asked Questions</Link>
                <Link to="orders">Orders Status</Link>
                <Link to="#">Returns</Link>
                <Link to="feedback">Feedback</Link>
            </section>
            <section>
                <p className="text-uppercase">connect with us</p>
                <a href="#" target="_blank"><FaLinkedin /></a>
                <a href="#" target="_blank"><FaGithub /></a>
            </section>
            &#169; 2000 - 2022 Game <span className="logo-x">X</span>
        </footer>
    )
}

export default Footer;
import { Link, Outlet, useLocation } from "react-router-dom";

import Header from "../homepage/Header.component";

import styles from "./Nav.module.css";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";

const Nav = () => {
    let location = useLocation();

    return (
        <>
            {location.pathname === '/' && <Header />}
            <nav>
                <Link to="/">Game <span className="logo-x">X</span></Link>
                <input type="search" placeholder="Search games, consoles & more" />
                <Link to="/signin">
                    Sign In
                </Link>
                <Link to="/wishlist" title="wish list"><FaRegHeart /></Link>
                <Link to="/cart" title="shopping cart"><FaShoppingCart /></Link>
            </nav>

            <Outlet />
        </>
    )
}

export default Nav;
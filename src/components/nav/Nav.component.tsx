import { Link, Outlet, useLocation } from "react-router-dom";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";

import { UserContext } from "../../contexts/user.context";
import Header from "../homepage/Header.component";
import styles from "./Nav.module.css";


const Nav = () => {
    let location = useLocation();
    const { signedIn, userSignoutHandler } = useContext(UserContext);

    return (
        <>
            {location.pathname === '/' && <Header />}
            <nav>
                <Link to="/">Game <span className="logo-x">X</span></Link>
                {location.pathname === '/shop' && <input type="search" placeholder="Search games, consoles & more" />}
                <Link to="/shop">Shop</Link>
                {
                    signedIn ?
                        <button onClick={userSignoutHandler}>Logout</button>
                        : (
                            <Link to="/signin">
                                Sign In
                            </Link>
                        )
                }

                <Link to="/wishlist" title="wish list"><FaRegHeart /></Link>
                <Link to="/cart" title="shopping cart"><FaShoppingCart /></Link>
            </nav>

            <Outlet />
        </>
    )
}

export default Nav;
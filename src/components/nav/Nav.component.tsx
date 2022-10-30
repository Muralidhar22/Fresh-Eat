import { Link, Outlet, useLocation } from "react-router-dom";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";

import { UserContext } from "../../contexts/user.context";
import HeaderDealsTag from "../homepage/HeaderDealsTag.component";
import styles from "./Nav.styles.module.css";

const Nav = () => {
    let location = useLocation();
    const { userSignoutHandler, accessToken } = useContext(UserContext)

    return (
        <>
            <header>
                {location.pathname === '/' && <HeaderDealsTag />}
            </header>
            <nav className={styles.nav}>
                <h1>
                    <Link to="/">Game <span className="logo-x">X</span></Link>
                </h1>


                {location.pathname === '/shop' && <input type="search" placeholder="Search games, consoles & more" />}
                <Link to="/products">Shop</Link>
                {
                    accessToken ?
                        <button onClick={userSignoutHandler}>Logout</button>
                        : (
                            <Link to="/signin">
                                Sign In
                            </Link>
                        )
                }

                <Link to={accessToken ? "/wishlist" : "/signin"} ><FaRegHeart /></Link>
                <Link to={accessToken ? "/cart" : "/signin"}><FaShoppingCart /></Link>
            </nav>

            <Outlet />
        </>
    )
}

export default Nav;
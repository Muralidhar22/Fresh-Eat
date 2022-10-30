import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../contexts/user.context";
import { WishlistContext } from "contexts/wishlist.context";
import HeaderDealsTag from "../homepage/HeaderDealsTag.component";
import styles from "./Nav.styles.module.css";
import WishlistButton from "components/wishlist-button/WishlistButton.component";
import CartButton from "components/cart-button/cartButton.component";


const Nav = () => {
    let location = useLocation();
    const { userSignoutHandler, accessToken } = useContext(UserContext)
    const { wishlistInitialState } = useContext(WishlistContext)

    const handleLogout = () => {
        wishlistInitialState()
        userSignoutHandler()
    }

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
                        <button onClick={handleLogout}>Logout</button>
                        : (
                            <Link to="/signin">
                                Sign In
                            </Link>
                        )
                }

                <Link to={accessToken ? "/wishlist" : "/signin"} >
                    <WishlistButton
                        wishlistElementType="nav-icon"
                    />
                </Link>
                <Link to={accessToken ? "/cart" : "/signin"} >
                    <CartButton
                        wishlistElementType="nav-icon"
                    />
                </Link>
            </nav>

            <Outlet />
        </>
    )
}

export default Nav;
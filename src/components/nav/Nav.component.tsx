import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../contexts/user.context";
import { WishlistContext } from "contexts/wishlist.context";
import { CartContext } from "contexts/cart.context";
import styles from "./Nav.styles.module.css";
import WishlistButton from "components/wishlist-button/WishlistButton.component";
import CartButton from "components/cart-button/cartButton.component";

import { FaSignOutAlt } from "react-icons/fa";

const Nav = () => {
    let location = useLocation();
    const { userSignOutHandler, signedIn } = useContext(UserContext)
    const { wishlistInitialState } = useContext(WishlistContext)
    const { cartInitialState } = useContext(CartContext)

    const handleLogout = () => {
        userSignOutHandler()
        wishlistInitialState()
        cartInitialState()
    }
    return (
        <>
            {location.pathname === '/' &&
                <header className={styles.header}>
                    <Link to="">
                        Free 1-3 Day Shipping Over &#8377;5000
                    </Link>
                </header>
            }
            <nav className={styles.nav}>
                <Link to="/">
                    <span className="logoContainer">
                        <span className="text-uppercase logoText">Game</span>
                        <span className="logo-x"></span>
                    </span>
                </Link>
                <div className={styles.navMenu}>
                    {location.pathname === '/products' && <input type="search" placeholder="Search games, consoles & more" />}
                    <Link to="/products">Shop</Link>
                    {
                        signedIn ?
                            <button className={styles.logoutBtn} onClick={handleLogout}>
                                <FaSignOutAlt
                                    color="white"
                                />
                            </button>
                            : (
                                <Link to="/signin">
                                    Sign In
                                </Link>
                            )
                    }

                    <Link to={signedIn ? "/wishlist" : "/signin"} >
                        <WishlistButton
                            wishlistElementType="nav-icon"
                        />
                    </Link>
                    <Link to={signedIn ? "/cart" : "/signin"} >
                        <CartButton
                            wishlistElementType="nav-icon"
                        />
                    </Link>
                </div>
            </nav>

            <Outlet />
        </>
    )
}

export default Nav;
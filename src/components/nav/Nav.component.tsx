import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import { UserContext } from "../../contexts/user.context";
import { WishlistContext } from "contexts/wishlist.context";
import { CartContext } from "contexts/cart.context";
import styles from "./Nav.styles.module.css";
import WishlistButton from "components/wishlist-button/WishlistButton.component";
import CartButton from "components/cart-button/cartButton.component";

import { FaSignOutAlt, FaUserAlt, FaSearch } from "react-icons/fa";

const Navbar = () => {
    let location = useLocation();
    const { userSignOutHandler, signedIn, userInfo } = useContext(UserContext)
    const { wishlistInitialState } = useContext(WishlistContext)
    const { cartInitialState } = useContext(CartContext)
    const [searchBarFocus, setSearchBarFocus] = useState(false)

    const handleLogout = () => {
        userSignOutHandler()
        wishlistInitialState()
        cartInitialState()
    }

    const handleDropdown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, state: boolean) => {
        if (state) {
            event.currentTarget.setAttribute("aria-expanded", `${state}`)
        } else if (!state) {
            event.currentTarget.setAttribute("aria-expanded", `${state}`)
        }
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
                    <span className="logo-container">
                        <span className="text-uppercase logo-text">Game</span>
                        <span className="logo-x"></span>
                    </span>
                </Link>
                {location.pathname === '/products' &&
                    <form className={`${styles['search-wrapper']} ${searchBarFocus && styles['active']}`}>
                        <input
                            className={styles['search-input']}
                            type="search"
                            placeholder="Search games, consoles & more"
                            onFocus={() => setSearchBarFocus(true)}
                            onBlur={() => setSearchBarFocus(false)} />
                        <button className={styles['search-submit-button']} type="submit"><span className="sr-only">search</span><span> <FaSearch /> </span></button>
                    </form>}
                <div className={styles['nav-menu']}>
                    <Link to="/products">Shop</Link>
                    {
                        signedIn ?
                            <div className={styles['sign-in-component']}
                                aria-expanded={false}
                                onMouseEnter={(e) => handleDropdown(e, true)}
                                onMouseLeave={(e) => handleDropdown(e, false)}>
                                <span className={`fw-500 ${styles['username']}`}>{userInfo?.firstName}</span>
                                <FaUserAlt className={styles['user-icon']} />
                                <div className={styles['drop-down-menu']}>
                                    <Link to="/orders">Orders</Link>
                                    <Link to="/address">Addresses</Link>
                                    <button className={styles['logout-button']} onClick={handleLogout}>
                                        Signout
                                        <FaSignOutAlt />
                                    </button>
                                </div>
                            </div>
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
        </>
    )
}

export default Navbar;
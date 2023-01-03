import { useState, useContext } from "react";

import { UserContext } from "contexts/user.context";
import NewAddressForm from "components/new-address-form/NewAddressForm.component";
import Navbar from "components/nav/Nav.component";

import styles from "./AddressPage.styles.module.css";
import { FaLocationArrow } from "react-icons/fa";

const AddressPage = () => {
    const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false)
    const { userInfo } = useContext(UserContext)

    return (
        <>
            {isNewAddressModalOpen &&
                <NewAddressForm setIsNewAddressModalOpen={setIsNewAddressModalOpen} />
            }
            <Navbar />
            <div className={styles['address-page-content']}>
                <span className="fw-500 heading">Manage Addresses <FaLocationArrow /></span>
                <button className={styles['add-new-address-button']} onClick={() => setIsNewAddressModalOpen(prev => !prev)}>+ Add new address</button>
                {userInfo?.address.map(option => (
                    <div className={styles['address-container']}>
                        <div className={styles['address-content']}>
                            Deliver To: <span>{userInfo?.firstName}, {option.postalCode}</span> <span className={styles['address-type']}>{option.name}</span>
                            <div>{option.line1}, {option.city}, {option.state}</div>
                        </div>
                        <button className={styles['address-options']}>&#10247;</button>

                    </div>
                ))}
            </div>
        </>
    )
}

export default AddressPage;
import { useState, useContext } from "react";

import { UserContext } from "contexts/user.context";
import NewAddressForm from "components/new-address-form/NewAddressForm.component";

import styles from "./AddressPage.styles.module.css";
import { FaLocationArrow } from "react-icons/fa";

const AddressPage = () => {
    const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false)
    const { userInfo } = useContext(UserContext)

    return (
        <>
            <div>
                <span className="fw-500 heading">Manage Addresses <FaLocationArrow /></span>
            </div>
            <button className={styles['add-new-address-button']}>+ Add new address</button>
            {userInfo?.address.map(address => (
                <div>
                    {address.name}
                </div>
            ))}
            {isNewAddressModalOpen &&
                <NewAddressForm setIsNewAddressModalOpen={setIsNewAddressModalOpen} />
            }
        </>
    )
}

export default AddressPage;
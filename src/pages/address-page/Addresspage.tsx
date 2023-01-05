import { useState } from "react";

import { useUserContext } from "contexts/user.context";
import AddressForm from "components/address-form/AddressForm.component";
import Navbar from "components/nav/Nav.component";

import styles from "./AddressPage.styles.module.css";
import { FaLocationArrow } from "react-icons/fa";

const AddressPage = () => {
    const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false)
    const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false)
    const [displayAddressOptions, setDisplayAddressOptions] = useState(false)
    const { userInfo, deleteAddress } = useUserContext()

    return (
        <>
            {isNewAddressModalOpen &&
                <AddressForm editMode={false} setIsAddressModalOpen={setIsNewAddressModalOpen} />
            }

            <Navbar />
            <div className={styles['address-page-content']}>
                <span className="fw-500 heading">Manage Addresses <FaLocationArrow /></span>
                <button className={styles['add-new-address-button']} onClick={() => setIsNewAddressModalOpen(prev => !prev)}>+ Add new address</button>
                {userInfo?.address.map((option, idx) => (
                    <div className={styles['address-container']}>
                        <div className={styles['address-content']}>
                            Deliver To: <span>{userInfo?.firstName}, {option.postalCode}</span> <span className={styles['address-type']}>{option.name}</span>
                            <div>{option.line1}, {option.city}, {option.state}</div>
                        </div>
                        <button
                            className={styles['address-options']}
                            onClick={() => setDisplayAddressOptions(prev => !prev)}>
                            &#10247;</button>
                        {displayAddressOptions &&
                            <div className={styles['address-options']}>
                                <button onClick={() => setIsEditAddressModalOpen(true)}>Edit</button>
                                <button onClick={() => deleteAddress(option._id)}>Delete</button>
                            </div>
                        }
                        {
                            isEditAddressModalOpen &&
                            <AddressForm editMode={true} setIsAddressModalOpen={setIsEditAddressModalOpen} initialValues={userInfo.address[idx]} />
                        }
                    </div>
                ))}
            </div>
        </>
    )
}

export default AddressPage;
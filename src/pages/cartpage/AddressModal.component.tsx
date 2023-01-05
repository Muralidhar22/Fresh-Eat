import styles from "./AddressModal.styles.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";

import { useUserContext } from "contexts/user.context";

type AddressModalType = {
    setIsAddressesModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsNewAddressModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddressModal = ({ setIsAddressesModalOpen, setIsNewAddressModalOpen }: AddressModalType) => {
    const { userInfo } = useUserContext()

    return (
        <div className={styles['addresses-modal-container']} onClick={() => setIsAddressesModalOpen(prev => !prev)}>
            <div className={styles['addresses-modal']} onClick={(e) => e.stopPropagation()}>
                <span className={styles['addresses-modal-heading']}>Select Delivery Address</span>
                <FaMapMarkerAlt />
                <button onClick={() => setIsAddressesModalOpen(prev => !prev)}>close</button>
                <button onClick={() => setIsNewAddressModalOpen(prev => !prev)}>+ Add new Address</button>
                <form>
                    {userInfo?.address.map((option, idx) => (
                        <div className={styles['address-container']}>
                            <input type="radio" name="address" id={option.name + idx} />
                            <label htmlFor={option.name + idx}>
                                <div className={styles['address-details']}>
                                    <span className="fw-500 heading-3">{option.name}, {option.postalCode}
                                        <span className={styles['address-type']}>{option.addressType}</span></span>
                                    <span>{option.line1}, {option.city}</span>
                                </div>
                            </label>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}

export default AddressModal;
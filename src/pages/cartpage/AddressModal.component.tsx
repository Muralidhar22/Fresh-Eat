import styles from "./AddressModal.styles.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";

type AddressModalType = {
    setIsAddressesModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsNewAddressModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddressModal = ({ setIsAddressesModalOpen, setIsNewAddressModalOpen }: AddressModalType) => {
    return (
        <div className={styles['addresses-modal-container']} onClick={() => setIsAddressesModalOpen(prev => !prev)}>
            <div className={styles['addresses-modal']} onClick={(e) => e.stopPropagation()}>
                <span className={styles['addresses-modal-heading']}>Select Delivery Address</span>
                <FaMapMarkerAlt />
                <button onClick={() => setIsAddressesModalOpen(prev => !prev)}>close</button>
                <button onClick={() => setIsNewAddressModalOpen(prev => !prev)}>+ Add new Address</button>
            </div>
        </div>
    )
}

export default AddressModal;
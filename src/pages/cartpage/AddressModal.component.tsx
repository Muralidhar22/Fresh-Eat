import React, { useEffect, useState } from "react";
import styles from "./AddressModal.styles.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";

import { useUserContext } from "contexts/user.context";
import { useAuthContext } from "contexts/auth.context";
import { handleError } from "utils/displayError";
import { showToastErrorMessage } from "utils/toastMessage";

type AddressModalType = {
    setIsAddressesModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsNewAddressModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    deliveryAddressId: string
}

const AddressModal = ({ setIsAddressesModalOpen, setIsNewAddressModalOpen, deliveryAddressId }: AddressModalType) => {
    const { userInfo, setUserInfo } = useUserContext()
    const { useAxiosPrivate } = useAuthContext()
    const { axiosPrivate, requestInterceptor, responseInterceptor } = useAxiosPrivate()
    const [deliveryAddress, setDeliveryAddress] = useState<string>(deliveryAddressId)

    useEffect(() => {
        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }
    }, [responseInterceptor, requestInterceptor])

    const handleChange = async (newDeliveryAddress: string) => {
        try {
            const { data, status } = await axiosPrivate({
                url: 'user/address',
                method: 'PATCH',
                params: { delivery: newDeliveryAddress }
            })
            if (data.data.error) {
                showToastErrorMessage(data.message)
            }
            if (status === 200) {
                setDeliveryAddress(data.data.updatedItem)
                setIsAddressesModalOpen(prev => !prev)
                setUserInfo(prev => (
                    prev ?
                        {
                            ...prev,
                            address: prev.address.map((option) => (
                                option._id === data.data.updatedItem
                                    ? { ...option, isDeliveryAddress: true }
                                    : { ...option, isDeliveryAddress: false }
                            ))
                        } :
                        prev
                ))
            }
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <div className={styles['addresses-modal-container']} onClick={() => setIsAddressesModalOpen(prev => !prev)}>
            <div className={styles['addresses-modal']} onClick={(e) => e.stopPropagation()}>
                <span className={styles['addresses-modal-heading']}>Select Delivery Address</span>
                <FaMapMarkerAlt />
                <button onClick={() => setIsAddressesModalOpen(prev => !prev)}>close</button>
                <button onClick={() => setIsNewAddressModalOpen(prev => !prev)}>+ Add new Address</button>
                <form>
                    {userInfo?.address.map((option, idx) => (
                        <div className={styles['address-container']} key={option.name + idx}>
                            <input type="radio" checked={option._id === deliveryAddress} className="custom-input" onChange={() => handleChange(option._id)} name="address" id={option.name + idx} />
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
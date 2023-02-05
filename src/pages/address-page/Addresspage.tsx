import { useState, useRef } from 'react';

import { useUserContext } from 'contexts/user.context';
import AddressForm from 'components/address-form/AddressForm.component';
import Navbar from 'components/nav/Nav.component';

import styles from './AddressPage.styles.module.css';
import { FaLocationArrow } from 'react-icons/fa';
import { AddressType } from 'types/AddressType';

const AddressPage = () => {
  const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [displayAddressOptions, setDisplayAddressOptions] = useState(false);
  const initialValuesRef = useRef<AddressType | null>(null);
  const { userInfo, deleteAddress } = useUserContext();

  return (
    <>
      {isNewAddressModalOpen && <AddressForm editMode={false} setIsAddressModalOpen={setIsNewAddressModalOpen} />}
      {isEditAddressModalOpen && initialValuesRef.current && (
        <AddressForm
          editMode={true}
          setIsAddressModalOpen={setIsEditAddressModalOpen}
          initialValues={initialValuesRef.current}
        />
      )}
      <Navbar />
      <div className={styles['address-page-content']}>
        <span className="fw-500 heading">
          Manage Addresses <FaLocationArrow />
        </span>
        <button className={styles['add-new-address-button']} onClick={() => setIsNewAddressModalOpen((prev) => !prev)}>
          + Add new address
        </button>
        {userInfo?.address.map((option, idx) => (
          <div className={styles['address-container']} key={option._id}>
            <div className={styles['address-content']}>
              Deliver To:{' '}
              <span>
                {option.name}, {option.postalCode}
              </span>{' '}
              <span className={styles['address-type']}>{option.addressType}</span>
              <div>
                {option.line1}, {option.city}, {option.state}
              </div>
            </div>
            <button className={styles['address-options']} onClick={() => setDisplayAddressOptions((prev) => !prev)}>
              &#10247;
            </button>
            {displayAddressOptions && (
              <div className={styles['address-options']}>
                <button
                  onClick={() => {
                    initialValuesRef.current = userInfo.address[idx];
                    setIsEditAddressModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteAddress(option._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AddressPage;

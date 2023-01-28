import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCartContext } from 'contexts/cart.context';
import { useUserContext } from 'contexts/user.context';
import Navbar from 'components/nav/Nav.component';
import AddressModal from './AddressModal.component';
import AddressForm from 'components/address-form/AddressForm.component';

import { FaPlusCircle, FaTrashAlt, FaMinusCircle } from 'react-icons/fa';
import Loader from 'components/loader/Loader.component';
import styles from './CartPage.styles.module.css';

const CartPage = () => {
  const { cartList, increaseItemQty, decreaseItemQty, removeFromCart, cartLoader, getCartTotal } = useCartContext();
  const cartTotal = getCartTotal();
  const { userInfo } = useUserContext();
  const navigate = useNavigate();
  const [isAddressesModalOpen, setIsAddressesModalOpen] = useState(false);
  const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);
  const deliveryAddress = userInfo?.address.find((el) => el.isDeliveryAddress);
  let deliveryAddressContent = null;

  if (cartList && cartList.length > 0) {
    if (deliveryAddress) {
      deliveryAddressContent = (
        <div className={styles['address-container']}>
          {userInfo?.address.map((option, idx) =>
            option._id === deliveryAddress._id ? (
              <div key={option.name + idx} className={styles['address-content']}>
                Deliver To:{' '}
                <span>
                  {option.name}, {option.postalCode}
                </span>{' '}
                <span className={styles['address-type']}>{option.addressType}</span>
                <div>
                  {option.line1}, {option.city}, {option.state}
                </div>
              </div>
            ) : null,
          )}
          <button
            className={styles['change-address-button']}
            onClick={() => {
              setIsAddressesModalOpen((prev) => !prev);
            }}
          >
            Change
          </button>
        </div>
      );
    } else if (userInfo?.address) {
      deliveryAddressContent = (
        <div className={styles['address-container']}>
          Select a delivery address
          <button
            className={styles['change-address-button']}
            onClick={() => {
              setIsAddressesModalOpen((prev) => !prev);
            }}
          >
            Select
          </button>
        </div>
      );
    } else {
      deliveryAddressContent = (
        <div className={styles['address-container']}>
          Add a delivery address
          <button
            className={styles['change-address-button']}
            onClick={() => {
              setIsAddressesModalOpen((prev) => !prev);
            }}
          >
            Select
          </button>
        </div>
      );
    }

    return (
      <>
        {cartLoader && <Loader />}
        {isAddressesModalOpen && (
          <AddressModal
            setIsAddressesModalOpen={setIsAddressesModalOpen}
            setIsNewAddressModalOpen={setIsNewAddressModalOpen}
            deliveryAddressId={deliveryAddress ? deliveryAddress._id : null}
          />
        )}
        {isNewAddressModalOpen && <AddressForm editMode={false} setIsAddressModalOpen={setIsNewAddressModalOpen} />}
        <Navbar />
        <div className={styles['cart-list-container']}>
          {deliveryAddressContent}
          {cartList.map((item) => (
            <div className={styles['cart-list-item']} key={item.product._id}>
              <div className={styles['cart-list-item-image-container']}>
                <img className={styles['product-image']} src={item.product.media[0].source} alt={item.product.name} />
              </div>
              <p>{item.product.name}</p>
              <p>
                <span>Price:</span> {item.product.discountPrice}
              </p>
              <div>
                <button onClick={() => decreaseItemQty(item._id)}>
                  <FaMinusCircle />
                </button>
                <span>{item.count}</span>
                <button onClick={() => increaseItemQty(item._id)}>
                  <FaPlusCircle />
                </button>
              </div>
              <button onClick={() => removeFromCart(item._id)}>
                <FaTrashAlt />
              </button>
            </div>
          ))}
          <div className={styles['price-container']}>
            <h2 className="text-uppercase">price details</h2>
            <ul>
              <li>
                Price items: <span>{cartTotal}</span>
              </li>
              <li>
                Delivery Charges: <span style={{ color: 'rgb(101, 183, 101)', fontWeight: '500' }}>FREE</span>
              </li>
            </ul>
            <p className="text-uppercase">total price</p>
            <span>{cartTotal}</span>
            <button onClick={() => navigate('/checkout')}>Checkout</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <span>Cartlist is empty!</span>
      <img src="/assets/empty_cart.svg" alt="A Man with an empty cart holding a list" />
    </div>
  );
};

export default CartPage;

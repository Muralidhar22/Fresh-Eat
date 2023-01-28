import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuthContext } from 'contexts/auth.context';
import Navbar from 'components/nav/Nav.component';
import { OrderType } from 'types/OrderType';

import { showToastErrorMessage } from 'utils/toastMessage';
import styles from './OrderPage.styles.module.css';

const OrderPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderType>();
  const { useAxiosPrivate, signedIn, clearAxiosInterceptors } = useAuthContext();
  const { axiosPrivate, requestInterceptor, responseInterceptor } = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearAxiosInterceptors(responseInterceptor, requestInterceptor);
    };
  }, [clearAxiosInterceptors, requestInterceptor, responseInterceptor]);

  useEffect(() => {
    if (signedIn) {
      (async function getProduct() {
        try {
          const { data, status } = await axiosPrivate.get(`orders/${orderId}`);
          if (status === 200) {
            setOrder(data.data.orders);
          }
        } catch (error) {
          console.log(error);
          showToastErrorMessage(`Sorry! couldn't load order details`);
        }
      })();
    } else if (!signedIn) {
      navigate('/signin');
    }
  }, [signedIn, navigate, orderId]);

  return (
    <>
      <Navbar />
      {order ? (
        <>
          <h1>Order details</h1>
          <div className={styles['order-container']}>
            <div className={styles['order-status']}>
              {order.orderStatus === 'placed' && (
                <h2 className="text-uppercase" style={{ color: 'var(--success)' }}>
                  order confirmed
                </h2>
              )}
              {order.orderStatus === 'pending' && (
                <h2 className="text-uppercase" style={{ color: 'var(--clr-cta)' }}>
                  order pending
                </h2>
              )}
              <div className={styles['order-date']}>{order.createdAt.date}</div>
              <div>
                <span className="fw-500">Order ID:</span>
                {order._id}
              </div>
            </div>
            <div className={styles['products-container']}>
              {order.items.map((item) => (
                <div key={item._id} className={styles['product-container']}>
                  <div className={styles['product-image']}>
                    <img src={item.product.media[0].source} alt={item.product.name} />
                  </div>
                  <div className={styles['product-info']}>
                    <span className="fw-500">{item.product.name}</span>
                    <span>
                      Item Price: <span>{item.product.discountPrice}</span>
                    </span>
                    <span title="quantity">
                      Qty: <span>{item.count}</span>
                    </span>
                    <span>
                      <span>{item.product.fastDelivery ? <span>Fast delivery</span> : <span>Free delivery</span>}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles['order-delivery-address-container']}>
              <h3 className="text-uppercase">delivery address</h3>
              <div className={styles['order-address']}>
                <div className="fw-500">{order.shippingAddress.name}</div>
                <p>{order.shippingAddress.line1}</p>
                <p>{order.shippingAddress.postalCode}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-uppercase">price details</h3>
              <div className={styles['order-total']}>
                <span className="text-uppercase">total:</span>
                <span>{order.amount / 100}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="error">Something went wrong!</div>
        </>
      )}
    </>
  );
};

export default OrderPage;

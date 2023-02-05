import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from 'contexts/auth.context';
import { useOrdersContext } from 'contexts/orders.context';
import Navbar from 'components/nav/Nav.component';
import styles from './OrdersPage.styles.module.css';

import { FcSynchronize, FcOk } from 'react-icons/fc';

const OrdersPage = () => {
  const { signedIn, accessToken } = useAuthContext();
  const { getOrders, orders, setOrders } = useOrdersContext();

  useEffect(() => {
    if (accessToken && !orders) {
      getOrders();
    } else if (!signedIn) {
      setOrders(null);
    }
  }, [signedIn, orders, getOrders, setOrders, accessToken]);

  return (
    <>
      <Navbar />
      {orders ? (
        <>
          <h1>My Orders</h1>
          {orders.map((order) => {
            return (
              <Link className={styles['order-link-wrapper']} key={order._id} to={`/orders/${order._id}`}>
                <div className={styles['order-container']}>
                  <div className={styles['order-status']}>
                    <div>
                      {order.orderStatus === 'pending' && <FcSynchronize />}
                      {order.orderStatus === 'placed' && <FcOk />}
                      &nbsp; Your order is {order.orderStatus}
                      <div className={styles['order-date']}>{order.createdAt.date}</div>
                    </div>
                    <div>
                      <span className="fw-500">Order id :</span> {order._id}
                    </div>
                  </div>
                  {order.items.map((item) => (
                    <div key={item._id} className={styles['order-item']}>
                      <div className={styles['product-image']}>
                        <img src={item.product.media.imageSrc[0]} alt={item.product.name} />
                      </div>
                      <div>
                        <div className={styles['product-name']}>{item.product.name}</div>
                        <div className={styles['product-count']}>Quantity: {item.count}</div>
                        <div className={styles['product-price']}>&#8377;{item.product.discountPrice}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Link>
            );
          })}
        </>
      ) : (
        <div>
          No orders, <Link to="/products">Visit Shop!</Link>
        </div>
      )}
    </>
  );
};

export default OrdersPage;

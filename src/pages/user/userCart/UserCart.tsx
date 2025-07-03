/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector, useDispatch } from "react-redux";
import styles from "./userCart.module.scss";
import { userCartActions } from "../../../redux/userStore/user-cart-slice";
import { Link } from "react-router-dom";

function UserCart() {
  const userCart = useSelector((state: any) => state.userCart.cart);
  const cartTotalAmount = useSelector(
    (state: any) => state.userCart.totalAmount
  );
  const dispatch = useDispatch();

  const addItemQuantity = (itemId: string) => {
    dispatch(userCartActions.addItemQuantity(itemId));
  };

  const removeItemQuantity = (itemId: string) => {
    dispatch(userCartActions.removeItemQuantity(itemId));
  };
  const getItemQuantity = (itemId: string) => {
    return userCart.find((item: any) => item.id === itemId)?.quantity || 0;
  };

  const calculateTotal = () => {
    return cartTotalAmount.toFixed(2);
  };

  const getTotalItems = () => {
    return userCart.length;
  };

  const removeItem = (itemId: string) => {
    dispatch(userCartActions.removeItemFromCart(itemId));
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <h1 className={styles.cartTitle}>Shopping Cart</h1>
        {userCart.length > 0 && (
          <span className={styles.itemCount}>
            {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
          </span>
        )}
      </div>

      {userCart.length > 0 ? (
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {userCart.map((item: any) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <img src={item.image} alt={item.name} />
                </div>

                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>

                  <div className={styles.itemActions}>
                    <div className={styles.quantityControls}>
                      <button
                        className={styles.quantityBtn}
                        onClick={() => removeItemQuantity(item.id)}
                      >
                        −
                      </button>
                      <span className={styles.quantityDisplay}>
                        {getItemQuantity(item.id)}
                      </span>
                      <button
                        className={styles.quantityBtn}
                        onClick={() => addItemQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.itemPrice}>
                      $
                      {((item.price || 0) * getItemQuantity(item.id)).toFixed(
                        2
                      )}
                    </div>
                  </div>
                </div>

                <button
                  className={styles.removeBtn}
                  onClick={() => removeItem(item.id)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M3 6h18l-2 13H5L3 6z"></path>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>

              <div className={styles.summaryRow}>
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>${calculateTotal()}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Tax</span>
                <span>$0.00</span>
              </div>

              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>

              <button className={styles.checkoutBtn}>
                Proceed to Checkout
              </button>

              <button className={styles.continueBtn}>Continue Shopping</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.emptyCart}>
          <div className={styles.emptyCartIcon}>
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
          <p className={styles.emptyCartText}>
            Looks like you haven't added anything to your cart yet. Start
            shopping to fill it up!
          </p>
          <Link to="/student-home/marketplace" className={styles.shopNowBtn}>
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserCart;

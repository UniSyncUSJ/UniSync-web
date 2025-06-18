import React from "react";
import styles from "./marketPlaceCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { userCartActions } from "../../../redux/userStore/user-cart-slice";

interface MarketPlaceCardProps {
  filteredItem: {
    id: string;
    title: string;
    description: string;
    image: string;
    price?: number; // Optional if you plan to use it
    category?: string; // Optional if you plan to use it
    quantity?: number; // Optional if you plan to use it
  };
}

function MarketPlaceCard({ filteredItem }: MarketPlaceCardProps) {
  const dispatch = useDispatch();

  const userCart = useSelector(
    (state: {
      userCart: {
        cart: Array<{
          id: string;
          name: string;
          price: number;
          quantity: number;
          description: string;
          image: string;
          category?: string; // Optional if you plan to use it
        }>;
      };
    }) => state.userCart.cart
  );

  const isInCart = userCart.some((item) => item.id === filteredItem.id);

  const handleClick = () => {
    if (isInCart) {
      dispatch(userCartActions.removeItemFromCart(filteredItem.id));
    } else {
      dispatch(
        userCartActions.addItemsToCart({
          id: filteredItem.id,
          name: filteredItem.title,
          price: filteredItem.price ?? 0,
          description: filteredItem.description,
          image: filteredItem.image,
          quantity: 1, // Default quantity to 1 when adding to cart
          category: filteredItem.category, // Optional if you plan to use it
        })
      );
    }
    //console the cart array
    console.log("Current Cart:", userCart);
  };

  return (
    <div className={styles.itemsGrid}>
      <div key={filteredItem.id} className={styles.itemCard}>
        <div className={styles.itemImage}>
          <img src={filteredItem.image} alt={filteredItem.title} />
        </div>
        <div className={styles.itemContent}>
          <h3 className={styles.itemTitle}>{filteredItem.title}</h3>
          <p className={styles.itemDescription}>{filteredItem.description}</p>
          {filteredItem.price && (
            <p className={styles.itemPrice}>
              Price: ${filteredItem.price.toFixed(2)}
            </p>
          )}
          <p className={styles.itemQuantity}>
            Quantity: {filteredItem.quantity}
          </p>
          <button
            className={`${styles.addButton} ${isInCart ? styles.remove : ""}`}
            onClick={handleClick}
          >
            {isInCart ? "Remove Item" : "Add Item"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MarketPlaceCard;

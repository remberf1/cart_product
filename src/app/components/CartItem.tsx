'use client';
import { useCart } from "../context/CartContext";
import styles from "../styles/cartItem.module.scss";
import Image from "next/image";

interface CartItemProps {
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

const CartItem: React.FC<CartItemProps> = ({ name, quantity, price, subtotal }) => {
  const { removeFromCart } = useCart();

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemDetails}>
        <h3 className={styles.itemName}>{name}</h3>
        <div className={styles.itemInfo}>
          <span className={styles.quantity}>{quantity}x</span>
          <span className={styles.price}>@ ${price.toFixed(2)}</span>
          <span className={styles.subtotal}>${subtotal.toFixed(2)}</span>
        </div>
      </div>
      <button 
        onClick={() => removeFromCart(name)}
        className={styles.removeBtn}
        aria-label="Remove item"
      >
      {/* <Image
      className={styles.removeIcon}
      src="/assets/images/icon-remove-item.svg"
      alt="Remove"
      width={16}
      height={16}
    /> */}
     <svg
    className={styles.removeIcon}
    width="16"
    height="16"
    viewBox="0 0 10 10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
  </svg>

      </button>
    </div>
  );
};

export default CartItem;
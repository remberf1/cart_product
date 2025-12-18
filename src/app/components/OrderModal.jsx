'use client';
import Image from "next/image";
import styles from "../styles/orderModal.module.scss";
import { useEffect } from "react";

const OrderModal = ({ cart, totalPrice, onClose,clearCart }) => {

  // close on ESC
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.tickWrapper}>

        <Image
          src="/assets/images/icon-order-confirmed.svg"
          alt="Order confirmed"
          width={48}
          height={48}
          />
          </div>

        <h2 className={styles.title}>Order Confirmed</h2>
        <p className={styles.subtitle}>
          We hope you enjoy your food!
        </p>

        <div className={styles.summary}>
          {cart.map(item => (
            <div key={item.name} className={styles.item}>
              <div className={styles.itemImage}>
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  width={50}
                  height={50}
                />
              </div>
              <div className={styles.itemDetails}>
              <p className={styles.itemName}>{item.name}</p>
              <div className={styles.itemQtyPrice}>
              <p className={styles.itemQty}>{item.quantity}x</p>
              <p className={styles.itemPrice}>@ $ {item.price}</p>
              </div>
              </div>
              <p className={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}

          <div className={styles.total}>
            <p className={styles.totalLabel}>Order Total</p>
            <p className={styles.totalPrice}>${totalPrice?.toFixed(2)}</p>
          </div>
        </div>

        <button className={styles.closeBtn} onClick={() => {onClose();clearCart();}}>
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default OrderModal;

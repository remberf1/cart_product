'use client';
import Image from "next/image";
import styles from "../styles/cartPanel.module.scss";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import OrderModal from "./OrderModal";
import { useState,useEffect } from "react";




const CartPanel = () => {
    const { cart,totalPrice,clearCart } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);
  return (
    <>
    <div className={styles.cartPanel}>
      <h2 className={styles.title}>Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h2>
      <div className={styles.cartContent}>
      {cart.length === 0 && (
        <div className={styles.emptyState}>
          <Image
            src="/assets/images/illustration-empty-cart.svg"
            alt="Empty cart"
            width={150}
            height={150}
            />
          <p>Your added items will appear here</p>
        </div>
      )}

      {/* FILLED CART */}
      {cart.length > 0 && (
        <>
          {cart.map(item => (
            <CartItem
              key={item.name}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              subtotal={item.price * item.quantity}
            />
          ))}

          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Order Total</span>
            <strong>${totalPrice?.toFixed(2)}</strong>
          </div>
            <div className={styles.neutralWrapper}>
              <Image
                src="/assets/images/icon-carbon-neutral.svg"
                alt="rere"
                width={20}
                height={20}
                />
                <p className={styles.deliveryText}>This is a <span className={styles.neutralText}>carbon-neutral</span> delivery</p>
            </div>
          <button onClick={()=>setIsModalOpen(true)} className={styles.confirmBtn}>Confirm Order</button>
        </>
      )}
      </div>
    </div>
    {isModalOpen && (
        <OrderModal
          cart={cart}
          totalPrice={totalPrice}
          onClose={() => setIsModalOpen(false)}
          clearCart={clearCart}
        />
      )}
      </>
  );
};

export default CartPanel;
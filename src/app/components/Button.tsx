'use client';
import Image from "next/image";
import style from '../styles/productCard.module.scss';
import { useCart, Product } from "../context/CartContext"; // Import Product type

interface ButtonProps {
  item: Product; // Use Product instead of Item
}

const Button: React.FC<ButtonProps> = ({ item }) => {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();

  const cartitem = cart.find(cartItem => cartItem.name === item.name);
  const quantity = cartitem ? cartitem.quantity : 0;

  const increment = () => {
    addToCart(item); // Now this works!
  };

  const decrement = () => { 
    if (quantity <= 1) {
      removeFromCart(item.name);
    } else {
      decreaseQuantity(item.name);
    }
  };

  return (
    <>
      {quantity === 0 ? ( 
        <div className={style.cartButton}>
          <Image 
            src="/assets/images/icon-add-to-cart.svg"
            alt="Cart Icon"
            width={32}
            height={32}
          />
          <p onClick={increment} className={style.name}>Add to Cart</p>
        </div>
      ) : (
        <div className={style.cartButton__active}>
          <button onClick={decrement} className={style.decreaseBtn}>-</button>
          <p className={style.count}>{quantity}</p>
          <button onClick={increment} className={style.increaseBtn}>+</button>
        </div>
      )}
    </>
  );
};

export default Button;
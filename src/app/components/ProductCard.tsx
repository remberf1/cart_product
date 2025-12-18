'use client';
import styles from "../styles/productCard.module.scss";
import ImageComp from "./ImageComp";
import Text from "./Text";
import Button from "./Button";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  item: {
    name: string;
    price: number;
    category: string;
    image: {
      thumbnail: string;
      mobile: string;
      tablet: string;
      desktop: string;
    };
  };
}

export default function ProductCard({ item }: ProductCardProps) {
  const { cart} = useCart();
  const isInCart = cart.some(
    (cartItem) => cartItem.name === item.name && cartItem.quantity > 0
  );
  return (
    <div className={styles.card}>
      <div className={`${styles.imageWrapper} ${isInCart ? styles.active : ""}`}>
        <ImageComp image={item.image} name={item.name} />
        <div className={styles.btnWrapper}>
        <Button item={item} />
      </div>
      </div>
      <div className={styles.textWrapper}>
      <Text name={item.name} category={item.category} price={item.price}/>      
      </div>
    </div>
  );
}

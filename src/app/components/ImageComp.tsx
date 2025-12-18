'use client'
import Image from 'next/image'
import style from'../styles/productCard.module.scss'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext';
interface ImageCompProps {
  name:string,
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}
const cleanPath = (path: string) => path.replace(/^\.\/+/, '/'); // remove leading './' and replace with '/'

const useScreenWidth = () => {
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    
    
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

const ImageComp : React.FC<ImageCompProps> = ({ name,image }) => {
   const { cart } = useCart();
  const cartitem = cart.find((item) => item.name  ===  name);
  const quantity = cartitem ? cartitem.quantity : 0;

  const width = useScreenWidth();
  const mobile = cleanPath(image.mobile);
  const tablet = cleanPath(image.tablet);
  const desktop = cleanPath(image.desktop);

   let src = desktop; // default
  if (width < 768) {
    src = mobile;
  } else if (width < 1024) {
    src = tablet;
  }
  return (
    <div className={`${style.wrapper} ${quantity > 0 ? style.activeBorder : ''}`}>
        <Image className={style.image}alt={name} src={src} fill sizes='(min-width: 768px) 10vw,
  (min-width: 1024px) 20vw,
  70vw'/>
    </div>
  )
}

export default ImageComp;
import React from "react";
import style from '../styles/productCard.module.scss'

 interface TextProps {
    name:string;
    category:string;
    price:number;
}

const Text:React.FC<TextProps> = ({name, category, price}) => {
  return(
    <div>
        
                <div  key={name}>
                    <p className={style.cat}>{category}</p>
                    <h2 className={style.name}>{name}</h2>
                    <p className={style.price}>${price.toFixed(2)}</p>
                </div>
  
    </div>
  );
}

export default Text;
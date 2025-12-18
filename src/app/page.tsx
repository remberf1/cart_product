import ProductCard from './components/ProductCard';
import data from './data.json';
import CartPanel from './components/CartPanel';


export default function Home() {
  return (
    <main className="home">
      <div className='parentWrapper'>
        <div>
          <p className='title'>Desserts</p>
      <div className="contentWrapper">
        {data.map((item) => (
          <ProductCard key={item.name} item={item} />
        ))}
      </div>
        </div>
      <div className='cartWrapper'>
      <CartPanel />
      </div>
        </div>
    </main>
  );
}
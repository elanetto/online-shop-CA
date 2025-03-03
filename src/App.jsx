import './index.css'
import './App.css'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const url = "https://v2.api.noroff.dev/online-shop";

const StarRating = ({ rating }) => {
  const maxStars = 5;
  return (
    <div className="flex text-yellow-500">
      {Array.from({ length: maxStars }, (_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
}; 

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.data);
      setProducts(data.data);
    }
    getProducts();
  }, []);
  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        {products.map((product) => {
          return (
            <Link
              to={"/product/" + product.id}
              key={product.id}
              className="max-w-64 hover:shadow-xl rounded-lg p-2"
            >
              <img
                src={product.image.url}
                alt={product.image.alt}
                className="h-64"
              />
              <h2 className="font-bold text-2xl">{product.title}</h2>
              <p>{product.description}</p>
              <StarRating rating={Math.round(product.rating)} />
              {product.onSale ? (
                <>
                  <p className="line-through">{product.price}</p>
                  <p>{product.discountedPrice}</p>
                </>
              ) : (
                <p>{product.price}</p>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default App

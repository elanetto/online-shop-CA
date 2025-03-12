import './index.css'
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from './api.js';
import { Card } from './components/card';

const { ALLPRODUCTS } = API_ENDPOINTS;

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch(ALLPRODUCTS);
        const data = await res.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, []);

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <h1 className='text-blue-700 text-3xl font-bold pb-4'>View all products</h1>
      <div className="w-full max-w-screen-xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

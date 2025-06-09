import "./index.css";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "./api.js";
import { Card } from "./components/card";

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
    <div className="py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-screen-xl mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-800 tracking-tight">
          Explore our products
        </h1>
        <p className="text-neutral-500 mt-2">
          These are the products available right now
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;

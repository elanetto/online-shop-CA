import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from '../stores/store.js';
import { API_ENDPOINTS } from '../api.js';

const { ALLPRODUCTS } = API_ENDPOINTS;

export function SpecificProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const url = ALLPRODUCTS;

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch(url + id);
        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    getProduct();
  }, [url, id]);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ 
      id: product.id, 
      title: product.title, 
      price: product.price, 
      discountedPrice: product.discountedPrice, 
      image: product.image,
    });
    setShowPopup(true);
  };

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

  return (
    <div className="flex flex-col justify-center mx-auto items-center max-w-2xl p-6">
      {product ? (
        <div className="flex flex-row gap-4">
          <img
            src={product.image.url}
            alt={product.image.alt || "Product image"}
            className="h-[350px] object-cover w-[350px]"
          />
          <div className="flex flex-col text-end items-end object-center">
            <h1 className="font-bold text-blue-800 text-3xl">{product.title}</h1>
            <h2 className="text-gray-500 italic">{product.tags.join(", ")}</h2>
            <p className="py-8">{product.description}</p>
            <StarRating rating={Math.round(product.rating)} />
            {product.price !== product.discountedPrice ? (
              <>
                <p className="line-through">${product.price.toFixed(2)}</p>
                <p className="text-red-600 font-bold pb-6">${product.discountedPrice.toFixed(2)}</p>
              </>
            ) : (
              <p className="font-bold pb-6">${product.price.toFixed(2)}</p>
            )}
            <button
                className="rounded-lg py-2 px-4 bg-blue-600 text-white hover:bg-blue-950 w-40 cursor-pointer"
                onClick={handleAddToCart}
            >
                Buy now
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div className="mt-6 w-full max-w-2xl">
        <h2 className="text-gray-500 text-center text-2xl font-bold">Product Reviews</h2>
        {product?.reviews?.length > 0 ? (
          product.reviews.map((review) => (
            <div key={review.id} className="border p-4 my-2 rounded-lg shadow">
              <p className="font-semibold">{review.username}</p>
              <StarRating rating={Math.round(review.rating)} />
              <p className="italic">"{review.description}"</p>
            </div>
          ))
        ) : (
          <p className="text-center">No reviews available.</p>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 w-80">
            <img
              src={product.image.url}
              alt={product.image.alt || "Product image"}
              className="h-32 w-32 object-cover rounded"
            />
            <h2 className="text-xl font-bold">Congrats!</h2>
            <p>{product.title} has been added to your cart.</p>
            <div className="flex gap-4">
              <button
                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-950"
                onClick={() => setShowPopup(false)}
              >
                Continue Shopping
              </button>
              <button
                className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-800"
                onClick={() => navigate('/cart')}
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 

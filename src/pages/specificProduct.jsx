import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from '../stores/store.js';

export function SpecificProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Initialize as null
  const url = "https://v2.api.noroff.dev/online-shop/";

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
  }, [id]);

  const { addToCart } = useCart();

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
          <div>
            <h1 className="font-bold text-blue-800 text-3xl">{product.title}</h1>
            <h2 className="text-gray-500 italic">{product.tags.join(", ")}</h2>
            <p>{product.description}</p>
            <StarRating rating={Math.round(product.rating)} />
            {product.price !== product.discountedPrice ? (
              <>
                <p className="line-through">${product.price.toFixed(2)}</p>
                <p className="text-red-600">${product.discountedPrice.toFixed(2)}</p>
              </>
            ) : (
              <p>${product.price.toFixed(2)}</p>
            )}
            <button
              className="rounded-lg py-2 px-4 bg-blue-600 text-white hover:bg-blue-950"
              onClick={() => addToCart(product)}
            >
              Buy now
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Reviews Section */}
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
    </div>
  );
}

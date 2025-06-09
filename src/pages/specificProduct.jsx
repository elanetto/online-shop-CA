import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../stores/store.js";
import { API_ENDPOINTS } from "../api.js";

const { ALLPRODUCTS } = API_ENDPOINTS;

export function SpecificProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch(`${ALLPRODUCTS}${id}`);
        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    getProduct();
  }, [id]);

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
      <div className="flex text-yellow-500 mb-2">
        {Array.from({ length: maxStars }, (_, i) => (
          <span key={i}>{i < rating ? "★" : "☆"}</span>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Fullscreen Image Modal */}
      {isImageOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          onClick={() => setIsImageOpen(false)}
        >
          <div className="relative max-w-4xl w-full p-4">
            <button
              onClick={() => setIsImageOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl font-bold hover:scale-110 transition"
              aria-label="Close image viewer"
            >
              ×
            </button>
            <img
              src={product.image.url}
              alt={product.image.alt || "Product full view"}
              className="w-full h-auto object-contain rounded shadow-lg"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col items-center max-w-screen-lg mx-auto px-4 py-10">
        {product ? (
          <div className="flex flex-col lg:flex-row gap-10 w-full items-start">
            {/* Product Image - 2/3 width */}
            <div
              className="w-full lg:w-2/3 cursor-pointer"
              onClick={() => setIsImageOpen(true)}
            >
              <img
                src={product.image.url}
                alt={product.image.alt || "Product image"}
                className="w-full max-h-[500px] object-cover rounded-lg shadow"
              />
            </div>

            {/* Product Info - 1/3 width */}
            <div className="w-full lg:w-1/3 flex flex-col justify-between text-left lg:text-end lg:items-end">
              <h1 className="text-3xl font-extrabold text-neutral-800 mb-1">
                {product.title}
              </h1>
              <h2 className="text-sm italic text-neutral-500 mb-6">
                {product.tags.join(", ")}
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-6">
                {product.description}
              </p>
              <StarRating rating={Math.round(product.rating)} />

              {product.price !== product.discountedPrice ? (
                <div className="mb-6">
                  <p className="line-through text-neutral-400">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-red-600 font-bold text-lg">
                    ${product.discountedPrice.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="font-bold text-lg mb-6">
                  ${product.price.toFixed(2)}
                </p>
              )}

              <button
                onClick={handleAddToCart}
                className="rounded-md bg-neutral-800 hover:bg-neutral-950 text-white px-6 py-2 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        {/* Reviews */}
        <div className="mt-12 w-full">
          <h2 className="text-2xl font-bold text-center text-neutral-800 mb-4">
            Product Reviews
          </h2>
          {product?.reviews?.length > 0 ? (
            product.reviews.map((review) => (
              <div
                key={review.id}
                className="border border-neutral-200 bg-white p-4 rounded-lg shadow mb-4"
              >
                <p className="font-semibold text-neutral-800">
                  {review.username}
                </p>
                <StarRating rating={Math.round(review.rating)} />
                <p className="italic text-neutral-600">
                  "{review.description}"
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-neutral-500">
              No reviews available.
            </p>
          )}
        </div>

        {/* Popup confirmation */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-sm text-center">
              <img
                src={product.image.url}
                alt={product.image.alt || "Product image"}
                className="w-full lg:w-[500px] h-auto max-h-[600px] object-contain rounded-lg shadow cursor-pointer"
                onClick={() => setIsImageOpen(true)}
              />
              <h2 className="text-xl font-bold text-neutral-800 mt-4">
                Added to Cart
              </h2>
              <p className="text-neutral-600 mb-4">
                {product.title} has been added to your cart.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-950"
                  onClick={() => setShowPopup(false)}
                >
                  Continue Shopping
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => navigate("/cart")}
                >
                  Go to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

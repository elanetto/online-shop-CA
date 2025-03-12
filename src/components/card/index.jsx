import { Link } from "react-router-dom";

export const Card = ({ product }) => {
  const descriptionSnippet = product.description.split(" ").slice(0, 6).join(" ") + "...";
  const isOnSale = product.price !== product.discountedPrice;

  return (
    <div className="rounded-lg shadow-md p-4 flex flex-col gap-2 bg-gray-50 hover:brightness-80 h-full">
      <Link to={`/product/${product.id}`} className="cursor-pointer">
        <img
          src={product.image.url}
          alt={product.image.alt || "Product image"}
          className="w-full h-48 object-cover rounded"
        />
        <h2 className="text-xl font-bold text-blue-800 mt-2">{product.title}</h2>
      </Link>

      <p className="text-gray-600 italic">{descriptionSnippet}</p>

      <div>
        {isOnSale ? (
          <>
            <p className="line-through text-gray-500">${product.price.toFixed(2)}</p>
            <p className="text-red-600 font-bold">${product.discountedPrice.toFixed(2)}</p>
          </>
        ) : (
          <p className="font-bold">${product.price.toFixed(2)}</p>
        )}
      </div>

      {/* Align Stars to Bottom */}
      <div className="flex text-yellow-500 justify-center mt-auto">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>{i < Math.round(product.rating) ? "★" : "☆"}</span>
        ))}
      </div>
    </div>
  );
};

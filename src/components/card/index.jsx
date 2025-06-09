import { Link } from "react-router-dom";

export const Card = ({ product }) => {
  const descriptionSnippet = product.description.split(" ").slice(0, 6).join(" ") + "...";
  const isOnSale = product.price !== product.discountedPrice;

  return (
    <div className="rounded-xl shadow-lg p-4 flex flex-col gap-3 bg-white hover:shadow-xl hover:scale-[1.02] transition-transform duration-200 h-full">
      <Link to={`/product/${product.id}`} className="cursor-pointer group">
        <img
          src={product.image.url}
          alt={product.image.alt || "Product image"}
          className="w-full h-48 object-cover rounded-lg group-hover:brightness-90 transition duration-200"
        />
        <h2 className="text-lg font-semibold text-neutral-800 mt-2 group-hover:text-yellow-600">
          {product.title}
        </h2>
      </Link>

      <p className="text-sm text-neutral-600 italic">{descriptionSnippet}</p>

      <div className="flex items-baseline gap-2">
        {isOnSale ? (
          <>
            <span className="line-through text-neutral-400 text-sm">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-red-600 font-semibold">
              ${product.discountedPrice.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="font-semibold text-neutral-800">
            ${product.price.toFixed(2)}
          </span>
        )}
      </div>

      <div className="flex justify-center text-yellow-400 mt-auto text-sm">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>{i < Math.round(product.rating) ? "★" : "☆"}</span>
        ))}
      </div>
    </div>
  );
};

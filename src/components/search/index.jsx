import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../api";

const { ALLPRODUCTS } = API_ENDPOINTS;

export function Search() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(ALLPRODUCTS);
                const data = await response.json();
                setProducts(data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, []);

    useEffect(() => {
        if (!searchQuery) {
            setFilteredProducts([]);
            return;
        }

        const results = products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchQuery, products]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setFilteredProducts([]);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <input
                type="text"
                placeholder="Search here..."
                aria-label="Search bar"
                className="px-4 py-2 rounded-lg text-black bg-white w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredProducts.length > 0 && (
                <ul className="absolute bg-white text-black w-full mt-2 rounded-lg shadow-lg">
                    {filteredProducts.map((product) => (
                        <li key={product.id} className="px-4 py-2 hover:bg-gray-200">
                            <Link to={`/product/${product.id}`}>{product.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

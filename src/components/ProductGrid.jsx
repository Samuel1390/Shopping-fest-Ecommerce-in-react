import React from "react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";
import { OrderContext } from "./context/OrderContext";
import { useContext } from "react";

const ProductGrid = ({ products }) => {
  const { order } = useContext(OrderContext);
  let prices = [];
  products.forEach((product) => {
    const finalPrice = product.price * (1 - product.discountPercentage / 100);
    if (finalPrice !== prices[0]) {
      prices.push(finalPrice);
    }
  });
  prices.sort((a, b) => a - b);

  const assignOrder = (product) => {
    if (order === "none") return 0;
    const priceIndex = prices.findIndex(
      (price) =>
        price === product.price * (1 - product.discountPercentage / 100),
    );
    if (order === "from cheapest to most expensive") {
      return priceIndex + 1;
    } else if (order === "from most expensive to cheapnest") {
      return prices.length - priceIndex + 1;
    } else {
      console.log("el orden no se recibió correctamente");
      return 0;
    }
  };
  return (
    <div className="product-grid">
      <h2 className="product-grid-title">Products</h2>
      {!products.length && (
        <h2 className="text-center text-xl font-bold text-gray-600">
          Products not found
        </h2>
      )}
      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            order={assignOrder(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

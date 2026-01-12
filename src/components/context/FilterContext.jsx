"use client";
import { createContext, useState } from "react";
import { UseFetch } from "../hooks/UseFetch";
import { GlobalContext } from "./GlobalContext";
import { useContext } from "react";

export const filterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { cart, isOnCart } = useContext(GlobalContext);
  const products = UseFetch("https://dummyjson.com/products");
  const [filter, setFilter] = useState({
    price: 0,
    category: "all",
    inputValue: "",
    onlyInStock: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const filterProducts = (products) => {
    return products.filter((product) => {
      const { title, price, category } = product;
      let quantity = 0;
      const isOnCartIndex = isOnCart(product.id);
      if (isOnCartIndex >= 0) {
        quantity = cart[isOnCartIndex].quantity;
      }
      return (
        (title
          .toLowerCase()
          .trim()
          .includes(filter.inputValue.toLowerCase().trim()) ||
          filter.inputValue.trim().length === 0) &&
        (category === filter.category || filter.category === "all") &&
        price >= filter.price &&
        (!filter.onlyInStock || product.stock - quantity > 0)
      );
    });
  };
  const filteredProducts = filterProducts(products);
  return (
    <filterContext.Provider
      value={{
        filter,
        setFilter,
        filteredProducts,
        products,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </filterContext.Provider>
  );
};

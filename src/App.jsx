import React, { useState, useContext, useRef } from "react";
import "./App.css";
import "./globals.css";
import ProductGrid from "./components/ProductGrid";
import CartSidebar from "./components/CartSidebar";
//import products from "./products.json";
import { GlobalContext } from "./components/context/GlobalContext";
import { Controls } from "./components/Controls";
import { filterContext } from "./components/context/FilterContext";
import { ProductNotification } from "./components/ProductNotification";

import { CartIcon, BagIcon } from "./components/Svgs";
import MobileFiltersMenu from "./components/MobileFiltersMenu";

export function App() {
  const { cart, handleUpdateQuantity, handleAddToCart, handleRemoveFromCart } =
    useContext(GlobalContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { filteredProducts, isLoading, setIsLoading } =
    useContext(filterContext);

  const [openMobileFiltersMenu, setOpenMobileFiltersMenu] = useState(true);
  const mobileFiltersBg = useRef(null);

  const handleOpenMobileFilters = () => {
    if (mobileFiltersBg && mobileFiltersBg.current.id === "filter-bg") {
      setOpenMobileFiltersMenu((open) => !open);
    }
  };
  if (filteredProducts) setIsLoading(false);
  return (
    <div className="app">
      <ProductNotification />
      <header className="app-header px-8 py-4">
        <div className="hidden sm:flex items-center">
          <BagIcon />
          <h1 className="sm:text-2xl text-[1rem]">Shopping Fest</h1>
        </div>
        <Controls
          rangeClasses="header-secundary-controls"
          categoryClasses="header-secundary-controls max-w-50 ml-3.5 bg-neutral-50/30 text-neutral-50 border-neutral-100/30 rounded-[5px] border-4"
        />
        <button
          className="mobile-filters-button px-2.5 cursor-pointer"
          onClick={handleOpenMobileFilters}
        >
          <svg
            className="shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M12.9 7c-.4-1.7-2-3-3.9-3S5.6 5.3 5.1 7H2v2h3.1c.4 1.7 2 3 3.9 3s3.4-1.3 3.9-3H30V7zM9 10c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m14 2c-1.9 0-3.4 1.3-3.9 3H2v2h17.1c.4 1.7 2 3 3.9 3s3.4-1.3 3.9-3H30v-2h-3.1c-.4-1.7-2-3-3.9-3m0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m-9 2c-1.9 0-3.4 1.3-3.9 3H2v2h8.1c.4 1.7 2 3 3.9 3s3.4-1.3 3.9-3H30v-2H17.9c-.4-1.7-2-3-3.9-3m0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2"
            />
          </svg>
        </button>
        <button
          className="cart-toggle-btn"
          onClick={() => setIsCartOpen((open) => !open)}
        >
          <CartIcon /> <span className="cart-length">({cart.length})</span>
        </button>
      </header>

      <div
        className={` z-1000 bg-black/70 top-0 left-0 min-w-screen min-h-screen fixed grid place-content-center`}
        onClick={handleOpenMobileFilters}
        id="filter-bg"
        ref={mobileFiltersBg}
        hidden={openMobileFiltersMenu}
      >
        <MobileFiltersMenu hidden={openMobileFiltersMenu} />
      </div>
      <main className="app-main">
        {isLoading && (
          <h2 className="is-loading absolute top-[50%] left-[50%] text-(--text) text-3xl font-bold">
            Loading products...
          </h2>
        )}
        <ProductGrid
          setHidden={setOpenMobileFiltersMenu}
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />
        <h2 className="w-screen fixed z-100 bottom-0 left-0 border-t text-gray-950 py-1 bg-yellow-200/70 border-t-yellow-300">
          ⚠️ Important: This application is still under development.
        </h2>
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
}

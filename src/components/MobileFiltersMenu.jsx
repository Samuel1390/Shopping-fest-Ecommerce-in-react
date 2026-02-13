import { RangeControl, CategoryControl } from "./Controls";
import { useContext } from "react";
import { filterContext } from "./context/FilterContext";
import { OrderContext } from "./context/OrderContext";

const PROFILE_IMG_URL =
  "https://media.licdn.com/dms/image/v2/D4E03AQHqNEd3HidT-Q/profile-displayphoto-scale_200_200/B4EZv20QsTHUB0-/0/1769372455364?e=1772064000&v=beta&t=b7MO6X3m85FUPm8eUXYScLEbpt-k3p2BN8Xc6sdnv5w";

function MobileFiltersMenu({ className }) {
  const { filter, setFilter, products } = useContext(filterContext);
  const { setOrder } = useContext(OrderContext);
  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className={`${className} w-full max-w-100 bg-(--background-gray) flex flex-col justify-center items-center px-4 py-6 rounded-xl`}
    >
      <div className="w-full py-3 flex justify-start border-b-2 border-(--subtitle)">
        <h2 className="text-(--text) text-3xl">Filters</h2>
      </div>
      <div className="flex flex-col gap-3.5 p-4">
        <RangeControl
          filter={filter}
          setFilter={setFilter}
          className="flex-row"
        />
        <div className="flex justify-between w-full items-center">
          Category:
          <CategoryControl
            filter={filter}
            setFilter={setFilter}
            products={products}
            categoryClasses="ml-4 max-w-50 bg-(--background) text-(--text) p-2"
          />
        </div>
        <div className="flex items-center justify-between w-full">
          Sort:
          <select
            className="ml-4 max-w-50 p-2 bg-(--background) text-(--text)"
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="none">Default order</option>
            <option
              className="bg-(--background-gray) text-(--text)"
              value="from cheapest to most expensive"
            >
              From cheapest to most expensive
            </option>
            <option
              className="bg-(--background-gray) text-(--text)"
              value="from most expensive to cheapnest"
            >
              From most expensive to most cheapest
            </option>
          </select>
        </div>
        <label
          htmlFor="show-only-stock"
          className="flex items-center justify-between gap-4 transition-colors cursor-pointer group hover:bg-purple-700/45 p-4 border-purple-600 border-2 rounded-xl bg-purple-700/20"
        >
          <h2 className="group-hover:underline group-hover:text-sky-500/50 text-white text-md">
            Show only in stock products
          </h2>
          <input id="show-only-stock" type="checkbox" />
        </label>
      </div>
      <div className="w-full  flex items-center justify-evenly p-3 hover:bg-gray-800 rounded-md transition-colors">
        <img
          src={PROFILE_IMG_URL}
          alt="Samuel nelo"
          className="rounded-full w-10"
        />
        <h2 className="font-bold">
          Made by{" "}
          <a
            className="text-sky-600 hover:underline "
            href="https://samuel-nelo-portfolio.vercel.app"
          >
            Samuel Nelo
          </a>
          <p className="font-bold text-sm text-gray-500">
            App in development yet
          </p>
        </h2>
      </div>
    </section>
  );
}
export default MobileFiltersMenu;

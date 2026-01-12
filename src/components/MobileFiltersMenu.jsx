import { RangeControl, CategoryControl } from "./Controls";
import { useContext } from "react";
import { filterContext } from "./context/FilterContext";
import { OrderContext } from "./context/OrderContext";

function MobileFiltersMenu({ className }) {
  const { filter, setFilter, products } = useContext(filterContext);
  const { setOrder } = useContext(OrderContext);
  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className={`${className} w-full max-w-100 bg-(--background-gray) flex flex-col justify-center items-center px-4 py-6 rounded-xl`}
    >
      <div className="w-full py-3 flex justify-start border-b-2 border-(--subtitle)">
        <h2 className="text-(--text) text-3xl">Filtros</h2>
      </div>
      <div className="flex flex-col gap-3.5 p-4">
        <RangeControl
          filter={filter}
          setFilter={setFilter}
          className="flex-row"
        />
        <div className="flex justify-between w-full items-center">
          Categoría:
          <CategoryControl
            filter={filter}
            setFilter={setFilter}
            products={products}
            categoryClasses="ml-4 max-w-50 bg-(--background) text-(--text) p-2"
          />
        </div>
        <div className="flex items-center justify-between w-full">
          Ordenar:
          <select
            className="ml-4 max-w-50 p-2 bg-(--background) text-(--text)"
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="none">Orden predeterminado</option>
            <option
              className="bg-(--background-gray) text-(--text)"
              value="from cheapest to most expensive"
            >
              Del más barato al más caro
            </option>
            <option
              className="bg-(--background-gray) text-(--text)"
              value="from most expensive to cheapnest"
            >
              Del más caro al mas barato
            </option>
          </select>
        </div>
        <label
          htmlFor="show-only-stock"
          className="flex items-center justify-between gap-4 cursor-pointer group hover:bg-purple-700/45 p-4 border-purple-600 border-2 rounded-xl bg-purple-700/20"
        >
          <h2 className="group-hover:underline group-hover:text-sky-500/50 text-white text-md">
            Mostrar solo los productos en stock
          </h2>
          <input id="show-only-stock" type="checkbox" />
        </label>
      </div>
    </section>
  );
}
export default MobileFiltersMenu;

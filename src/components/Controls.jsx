import { useContext } from "react";
import { filterContext } from "./context/FilterContext";

export function Controls({ rangeClasses, categoryClasses }) {
  const { filter, setFilter, products } = useContext(filterContext);

  return (
    <div className="w-[70%] max-w-250 controls flex items-center gap-2.5">
      <RangeControl
        filter={filter}
        setFilter={setFilter}
        className={rangeClasses}
      />
      <TextControl filter={filter} setFilter={setFilter} />
      <CategoryControl
        filter={filter}
        setFilter={setFilter}
        categoryClasses={categoryClasses}
        products={products}
      />
    </div>
  );
}
const SearchIcon = ({ labelFor }) => {
  return (
    <label
      htmlFor={labelFor}
      style={{ padding: "9px" }}
      className="grid place-content-center w-[10%]"
    >
      <svg
        className="size-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </label>
  );
};
export function RangeControl({ filter, setFilter, className }) {
  const handlePrice = (event) => {
    const value = event.target.value;
    let newFilter = { ...filter };
    newFilter.price = value;
    return setFilter(newFilter);
  };
  return (
    <div
      className={`${className}  cursor-text controls flex-col grow items-center justify-baseline gap-0.5 `}
    >
      <div className="flex items-center gap-3">
        <label htmlFor="price">Precio</label>
        <span className="">${filter.price}</span>
      </div>
      <input
        className="input-range accent-neutral-50"
        type="range"
        min={0}
        max={1500}
        value={filter.price}
        onChange={(e) => handlePrice(e)}
        name=""
        id="price"
      />
    </div>
  );
}
export function TextControl({ filter, setFilter, className }) {
  const handleText = (value) => {
    const cleanValue = value.toLowerCase().trim(); // toLower y trim ya estan en la funcion filteredProducts pero por si acaso
    let newFilter = { ...filter };
    newFilter.inputValue = cleanValue;
    return setFilter(newFilter);
  };

  return (
    <div className="flex justify-start shrink overflow-hidden grow-20 h-12 text-neutral-50 bg-neutral-50/30 border-neutral-50 border-2 rounded-full">
      <SearchIcon labelFor="search-bar" />
      <input
        className={`${className} h-full mx-4 focus:outline-none grow-15`}
        type="text"
        id="search-bar"
        onChange={(e) => handleText(e.target.value)}
        placeholder="Buscar"
      />
    </div>
  );
}
export function CategoryControl({
  filter,
  setFilter,
  categoryClasses,
  products,
}) {
  const handleCategory = (event) => {
    const value = event.target.value;
    let newFilter = { ...filter };
    newFilter.category = value;
    return setFilter(newFilter);
  };
  const getCategorys = (products) => {
    let categorys = [];
    products.forEach((item, i) => {
      if (item.category !== categorys[i]) {
        categorys.push(item.category);
      }
    });
    categorys = categorys.filter(
      (category, i) => category !== categorys[i - 1]
    );
    return categorys;
  };
  const categorys = getCategorys(products);
  return (
    <select
      name="select"
      className={`${categoryClasses} cursor-pointer`}
      onChange={(e) => handleCategory(e)}
    >
      <option className="text-(--text) bg-(--background-gray)" value="all">
        Todos
      </option>
      {categorys.map((category) => {
        return (
          <option
            className="text-(--text) bg-(--background)"
            key={`${category}_category`}
          >
            {category}
          </option>
        );
      })}
    </select>
  );
}

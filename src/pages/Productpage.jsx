import React, { useContext, useState, useMemo } from 'react';
import { Context1main } from '../context/Maincontext';
import { useNavigate } from 'react-router-dom';
 
const Productpage = () => {
  const tonavigate = useNavigate()
  const {
    products,
    SKIN_TYPES, PRICE_RANGES, SORT_OPTIONS,
    searchdatavalue,
    addToCart,
    setCartOpen,
  } = useContext(Context1main);
 
  const allProducts = products || [];
 
  const [wishlist, setWishlist] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyBestSeller, setOnlyBestSeller] = useState(false);
  const [sortBy, setSortBy] = useState("Default Sorting");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
 
  const dynamicCategories = useMemo(() => {
    if (!allProducts.length) return [];
    return [...new Set(allProducts.map(p => p.category))];
  }, [allProducts]);
 
  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedSkinTypes([]);
    setSelectedPriceRange(null);
    setOnlyInStock(false);
    setOnlyBestSeller(false);
  };
 
  const removeFilter = (label) => {
    if (label.startsWith("Price")) setSelectedPriceRange(null);
    else if (label === "Best Seller") setOnlyBestSeller(false);
    else if (label === "In Stock") setOnlyInStock(false);
    else if (dynamicCategories.includes(label)) setSelectedCategories(prev => prev.filter(c => c !== label));
    else setSelectedSkinTypes(prev => prev.filter(s => s !== label));
  };
 
  const toggleCategory = (cat) =>
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
 
  const toggleSkinType = (st) =>
    setSelectedSkinTypes(prev =>
      prev.includes(st) ? prev.filter(s => s !== st) : [...prev, st]
    );
 
  const toggleWishlist = (id) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
 
  const handleCart = (product) => {
    addToCart(product)
    setAddedToCart(prev => [...prev, product.id])
    setTimeout(() => setAddedToCart(prev => prev.filter(id => id !== product.id)), 1800)
  };
 
  const activeFilters = [
    selectedPriceRange && `Price: $${selectedPriceRange.min}${selectedPriceRange.max === Infinity ? "+" : " – $" + selectedPriceRange.max}`,
    onlyBestSeller && "Best Seller",
    onlyInStock && "In Stock",
    ...selectedCategories,
    ...selectedSkinTypes,
  ].filter(Boolean);
 
  const filtered = allProducts
    .filter(p => {
      // Search filter
      if (searchdatavalue) {
        const q = searchdatavalue.toLowerCase()
        return (
          p.title?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
        )
      }
      return true
    })
    .filter(p => selectedCategories.length === 0 || selectedCategories.includes(p.category))
    .filter(p => !selectedPriceRange || (p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max))
    .filter(p => !onlyInStock || p.stock > 0)
    .filter(p => !onlyBestSeller || p.badge === "Best Seller")
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      if (sortBy === "Rating") return b.rating - a.rating;
      if (sortBy === "Discount") return b.discountPercentage - a.discountPercentage;
      return 0;
    });
 
  const FilterPanel = () => (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Filter Options</h2>
 
      <div className="mb-7">
        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">By Categories</h3>
        <div className="flex flex-col gap-2">
          {dynamicCategories.map(cat => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggleCategory(cat)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer
                  ${selectedCategories.includes(cat) ? "bg-[#003D29] border-[#003D29]" : "border-gray-300 group-hover:border-[#003D29]"}`}
              >
                {selectedCategories.includes(cat) && <i className="ri-check-line text-white text-xs"></i>}
              </div>
              <span
                onClick={() => toggleCategory(cat)}
                className={`text-sm cursor-pointer transition-colors ${selectedCategories.includes(cat) ? "text-[#003D29] font-semibold" : "text-gray-600 group-hover:text-gray-900"}`}
              >
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>
 
      <div className="h-px bg-gray-100 mb-6"></div>
 
      <div className="mb-7">
        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">By Skin Type</h3>
        <div className="flex flex-col gap-2">
          {SKIN_TYPES.map(st => (
            <label key={st} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggleSkinType(st)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer
                  ${selectedSkinTypes.includes(st) ? "bg-[#003D29] border-[#003D29]" : "border-gray-300 group-hover:border-[#003D29]"}`}
              >
                {selectedSkinTypes.includes(st) && <i className="ri-check-line text-white text-xs"></i>}
              </div>
              <span
                onClick={() => toggleSkinType(st)}
                className={`text-sm cursor-pointer transition-colors ${selectedSkinTypes.includes(st) ? "text-[#003D29] font-semibold" : "text-gray-600 group-hover:text-gray-900"}`}
              >
                {st}
              </span>
            </label>
          ))}
        </div>
      </div>
 
      <div className="h-px bg-gray-100 mb-6"></div>
 
      <div className="mb-7">
        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">By Price</h3>
        <div className="flex flex-col gap-2">
          {PRICE_RANGES.map((range, i) => (
            <label key={i} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => setSelectedPriceRange(selectedPriceRange?.label === range.label ? null : range)}
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer
                  ${selectedPriceRange?.min === range.min ? "border-[#003D29]" : "border-gray-300 group-hover:border-[#003D29]"}`}
              >
                {selectedPriceRange?.min === range.min && <div className="w-2 h-2 rounded-full bg-[#003D29]"></div>}
              </div>
              <span
                onClick={() => setSelectedPriceRange(selectedPriceRange?.min === range.min ? null : range)}
                className={`text-sm cursor-pointer ${selectedPriceRange?.min === range.min ? "text-[#003D29] font-semibold" : "text-gray-600 group-hover:text-gray-900"}`}
              >
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>
 
      <div className="h-px bg-gray-100 mb-6"></div>
 
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Quick Filters</h3>
        <div className="flex flex-col gap-2">
          {[
            { label: 'Best Seller', state: onlyBestSeller, toggle: () => setOnlyBestSeller(!onlyBestSeller) },
            { label: 'In Stock Only', state: onlyInStock, toggle: () => setOnlyInStock(!onlyInStock) },
          ].map(({ label, state, toggle }) => (
            <label key={label} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={toggle}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer
                  ${state ? "bg-[#003D29] border-[#003D29]" : "border-gray-300 group-hover:border-[#003D29]"}`}
              >
                {state && <i className="ri-check-line text-white text-xs"></i>}
              </div>
              <span className={`text-sm cursor-pointer ${state ? "text-[#003D29] font-semibold" : "text-gray-600"}`} onClick={toggle}>{label}</span>
            </label>
          ))}
        </div>
      </div>
 
      {activeFilters.length > 0 && (
        <button
          onClick={clearAll}
          className="mt-4 w-full py-2 border border-red-200 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors cursor-pointer"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
 
  const ProductCard = ({ p }) => {
    const inStock = p.stock > 0;
    const originalPrice = Math.round(p.price / (1 - p.discountPercentage / 100));
 
    return (
      <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 ${viewMode === "list" ? "flex gap-0 sm:gap-4" : ""}`}>
        <div className={`relative bg-[#F5F4F0] flex items-center justify-center overflow-hidden flex-shrink-0
          ${viewMode === "list" ? "w-40 sm:w-48 h-40 sm:h-48" : "w-full h-56 sm:h-60"}`}>
 
          {p.discountPercentage > 0 && (
            <span className="absolute top-3 left-3 bg-[#003D29] text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
              {Math.round(p.discountPercentage)}% off
            </span>
          )}
 
          <button
            onClick={() => toggleWishlist(p.id)}
            className="absolute top-2 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10 cursor-pointer"
          >
            <i className={`text-base ${wishlist.includes(p.id) ? "ri-heart-3-fill text-[#C34482]" : "ri-heart-3-line text-gray-400"}`}></i>
          </button>
 
          {!inStock && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
              <span className="bg-gray-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full">Out of Stock</span>
            </div>
          )}
 
          <img
            onClick={() => tonavigate(`/products/${p.id}`)}
            src={p.thumbnail}
            alt={p.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          />
        </div>
 
        <div className={`p-4 flex flex-col justify-between flex-1 ${viewMode === "list" ? "py-4" : ""}`}>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#003D29] font-semibold uppercase tracking-wide">{p.category}</span>
              <div className="flex items-center gap-1">
                <i className="ri-star-fill text-yellow-400 text-xs"></i>
                <span className="text-xs font-semibold text-gray-700">{p.rating.toFixed(1)}</span>
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-900 mt-1 leading-snug">{p.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-bold text-[#003D29]">${p.price}.00</span>
              <span className="text-sm text-gray-400 line-through">${originalPrice}.00</span>
            </div>
          </div>
 
          <button
            onClick={() => inStock && handleCart(p)}
            disabled={!inStock}
            className={`mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer
              ${!inStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : addedToCart.includes(p.id)
                  ? "bg-[#003D29] text-white"
                  : "border border-[#003D29] text-[#003D29] hover:bg-[#003D29] hover:text-white"
              }`}
          >
            {!inStock ? "Out of Stock" : addedToCart.includes(p.id) ? "✓ Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    );
  };
 
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
 
        {/* Search result indicator */}
        {searchdatavalue && (
          <div className='mb-4 flex items-center gap-2'>
            <p className='text-sm text-gray-500'>
              Showing results for <span className='font-semibold text-gray-800'>"{searchdatavalue}"</span>
            </p>
            <span className='text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full'>{filtered.length} found</span>
          </div>
        )}
 
        <div className="lg:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-[#003D29] text-white rounded-full text-sm font-medium cursor-pointer"
          >
            <i className="ri-equalizer-line"></i>
            Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </button>
          <p className="text-sm text-gray-500">Showing {filtered.length} of {allProducts.length} results</p>
        </div>
 
        {filterOpen && (
          <div className="lg:hidden bg-white rounded-2xl shadow-lg p-5 mb-5 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Filter Options</h2>
              <button onClick={() => setFilterOpen(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <FilterPanel />
          </div>
        )}
 
        <div className="flex gap-7">
          <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24 border border-gray-100">
              <FilterPanel />
            </div>
          </aside>
 
          <main className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <p className="text-sm text-gray-500 hidden lg:block">
                Showing <span className="font-semibold text-gray-800">1–{filtered.length}</span> of <span className="font-semibold text-gray-800">{allProducts.length}</span> results
              </p>
 
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex gap-1 bg-white border border-gray-200 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-2 py-1 rounded text-sm cursor-pointer transition-colors ${viewMode === "grid" ? "bg-[#003D29] text-white" : "text-gray-400 hover:text-gray-700"}`}
                  >
                    <i className="ri-grid-line"></i>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-2 py-1 rounded text-sm cursor-pointer transition-colors ${viewMode === "list" ? "bg-[#003D29] text-white" : "text-gray-400 hover:text-gray-700"}`}
                  >
                    <i className="ri-list-check"></i>
                  </button>
                </div>
 
                <div className="relative">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 font-medium hover:border-[#003D29] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span className="text-gray-400">Sort by:</span>
                    {sortBy}
                    <i className={`ri-arrow-down-s-line transition-transform ${sortOpen ? "rotate-180" : ""}`}></i>
                  </button>
                  {sortOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-30 overflow-hidden min-w-[200px]">
                      {SORT_OPTIONS.map(opt => (
                        <button
                          key={opt}
                          onClick={() => { setSortBy(opt); setSortOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors hover:bg-[#003D29]/5
                            ${sortBy === opt ? "text-[#003D29] font-semibold bg-[#003D29]/5" : "text-gray-600"}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
 
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-xs text-gray-500 font-medium">Active Filter</span>
                {activeFilters.map((f, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 bg-[#003D29] text-white text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {f}
                    <button onClick={() => removeFilter(f)} className="hover:opacity-70 cursor-pointer ml-0.5">
                      <i className="ri-close-line text-xs"></i>
                    </button>
                  </span>
                ))}
                <button onClick={clearAll} className="text-xs text-[#C34482] font-semibold hover:underline cursor-pointer ml-1">
                  Clear All
                </button>
              </div>
            )}
 
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <i className="ri-search-line text-5xl text-gray-300 mb-4"></i>
                <h3 className="text-lg font-semibold text-gray-500">No products found</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {searchdatavalue ? `No results for "${searchdatavalue}"` : 'Try adjusting your filters'}
                </p>
                <button onClick={clearAll} className="mt-4 px-6 py-2 bg-[#003D29] text-white rounded-full text-sm font-medium cursor-pointer hover:bg-[#002a1c] transition-colors">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                  : "flex flex-col gap-4"
              }>
                {filtered.map(p => <ProductCard key={p.id} p={p} />)}
              </div>
            )}
 
            {filtered.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-[#003D29] hover:text-[#003D29] transition-colors cursor-pointer">
                  <i className="ri-arrow-left-s-line"></i>
                </button>
                {[1, 2, 3, "...", 8].map((pg, i) => (
                  <button
                    key={i}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer
                      ${pg === 1 ? "bg-[#003D29] text-white" : pg === "..." ? "text-gray-400 cursor-default pointer-events-none" : "border border-gray-200 text-gray-600 hover:border-[#003D29] hover:text-[#003D29]"}`}
                  >
                    {pg}
                  </button>
                ))}
                <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-[#003D29] hover:text-[#003D29] transition-colors cursor-pointer">
                  <i className="ri-arrow-right-s-line"></i>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Productpage
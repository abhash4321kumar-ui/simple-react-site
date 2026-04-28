import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context1main } from '../context/Maincontext';
 
const Productdetailpage = () => {
  const { urlvalue } = useParams();
  const contextData = useContext(Context1main);
 
  if (!contextData || !contextData.products || contextData.products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#003D29] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">Loading product...</p>
        </div>
      </div>
    );
  }
 
  const productIndex = parseInt(urlvalue) - 1;
  const product = contextData.products[productIndex];
  const { addToCart, setCartOpen } = contextData;
 
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="ri-error-warning-line text-5xl text-gray-300"></i>
          <h2 className="mt-3 text-lg font-semibold text-gray-600">Product Not Found</h2>
        </div>
      </div>
    );
  }
 
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
 
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
 
  const handleBuyNow = () => {
    addToCart(product, quantity);
    setCartOpen(true);
  };
 
  const originalPrice = Math.round(product.price / (1 - product.discountPercentage / 100));
 
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
 
          {/* LEFT: Images */}
          <div className="w-full md:w-1/2 bg-gray-50 p-6 flex flex-col items-center">
            <div className="w-full h-80 flex items-center justify-center mb-5 rounded-xl overflow-hidden bg-[#F5F4F0]">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
 
            {/* Thumbnails */}
            <div className="flex gap-2 flex-wrap justify-center">
              {product.images.map((src, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer
                    ${selectedImage === index ? 'border-[#003D29] shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <img src={src} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
 
          {/* RIGHT: Details */}
          <div className="w-full md:w-1/2 p-8 flex flex-col">
 
            {/* Category & Brand */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-[#003D29]/10 text-[#003D29] px-2 py-0.5 rounded-full font-medium capitalize">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-xs text-gray-400 font-semibold tracking-widest uppercase">{product.brand}</span>
              )}
            </div>
 
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">{product.title}</h1>
 
            {/* Rating & Stock */}
            <div className="flex items-center gap-3 mt-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`text-sm ${i < Math.round(product.rating) ? 'ri-star-fill text-yellow-400' : 'ri-star-line text-gray-300'}`}></i>
                ))}
                <span className="text-sm text-gray-500 ml-1">({product.rating.toFixed(1)})</span>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>
 
            <hr className="border-gray-100 mb-4" />
 
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>
 
            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-gray-900">${product.price}</span>
              <span className="text-lg text-gray-400 line-through">${originalPrice}</span>
              <span className="text-sm bg-[#003D29] text-white px-2 py-0.5 rounded-full font-semibold">
                -{Math.round(product.discountPercentage)}% off
              </span>
            </div>
 
            {/* Quantity + Actions */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {/* Quantity Picker */}
              <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2.5 hover:bg-gray-100 transition-colors text-gray-700 font-medium cursor-pointer"
                >-</button>
                <span className="px-4 py-2.5 font-bold flex items-center text-gray-900 bg-gray-50">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-2.5 hover:bg-gray-100 transition-colors text-gray-700 font-medium cursor-pointer"
                >+</button>
              </div>
 
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer
                  ${product.stock === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isAdded
                      ? 'bg-[#003D29] text-white'
                      : 'border-2 border-[#003D29] text-[#003D29] hover:bg-[#003D29] hover:text-white'
                  }`}
              >
                {product.stock === 0 ? 'Out of Stock' : isAdded ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
 
              {/* Wishlist */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-11 h-11 border rounded-xl flex items-center justify-center transition-all cursor-pointer
                  ${isWishlisted ? 'border-[#C34482] bg-[#C34482]/5 text-[#C34482]' : 'border-gray-200 text-gray-400 hover:border-[#C34482] hover:text-[#C34482]'}`}
              >
                <i className={isWishlisted ? 'ri-heart-3-fill' : 'ri-heart-3-line'}></i>
              </button>
            </div>
 
            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="w-full py-3 bg-[#003D29] text-white rounded-xl font-semibold text-sm hover:bg-[#002a1c] transition-colors cursor-pointer disabled:opacity-50"
            >
              Buy Now
            </button>
 
            {/* Meta info */}
            {(product.sku || product.warrantyInformation || product.shippingInformation) && (
              <div className="mt-5 pt-5 border-t border-gray-100 flex flex-col gap-1.5">
                {product.sku && <p className="text-xs text-gray-400">SKU: <span className="text-gray-600">{product.sku}</span></p>}
                {product.warrantyInformation && <p className="text-xs text-gray-400">Warranty: <span className="text-gray-600">{product.warrantyInformation}</span></p>}
                {product.shippingInformation && <p className="text-xs text-gray-400">Shipping: <span className="text-gray-600">{product.shippingInformation}</span></p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
 

export default Productdetailpage
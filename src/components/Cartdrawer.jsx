import React, { useContext } from 'react'
import { Context1main } from '../context/Maincontext'
 
const Cartdrawer = () => {
    const { cart, cartOpen, setCartOpen, cartTotal, removeFromCart, updateCartQty, clearCart } = useContext(Context1main)
 
    if (!cartOpen) return null
 
    return (
        <>
            {/* Backdrop */}
            <div
                className='fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm'
                onClick={() => setCartOpen(false)}
            />
 
            {/* Drawer */}
            <div className='fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] flex flex-col shadow-2xl'>
 
                {/* Header */}
                <div className='flex justify-between items-center px-5 py-4 border-b border-gray-100'>
                    <div className='flex items-center gap-2'>
                        <i className='ri-shopping-cart-2-line text-xl text-[#003D29]'></i>
                        <h2 className='text-lg font-bold text-gray-900'>Your Cart</h2>
                        {cart.length > 0 && (
                            <span className='text-xs bg-[#003D29] text-white px-2 py-0.5 rounded-full font-medium'>
                                {cart.length}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => setCartOpen(false)}
                        className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer'
                    >
                        <i className='ri-close-line text-xl text-gray-500'></i>
                    </button>
                </div>
 
                {/* Items */}
                {cart.length === 0 ? (
                    <div className='flex-1 flex flex-col items-center justify-center gap-3 text-center px-6'>
                        <div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center'>
                            <i className='ri-shopping-cart-line text-4xl text-gray-300'></i>
                        </div>
                        <h3 className='text-base font-semibold text-gray-500'>Your cart is empty</h3>
                        <p className='text-sm text-gray-400'>Add items to get started</p>
                        <button
                            onClick={() => setCartOpen(false)}
                            className='mt-2 px-6 py-2.5 bg-[#003D29] text-white rounded-full text-sm font-medium cursor-pointer hover:bg-[#002a1c] transition-colors'
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div className='flex-1 overflow-y-auto px-5 py-3 flex flex-col gap-4'>
                            {cart.map(item => (
                                <div key={item.id} className='flex gap-3 bg-gray-50 rounded-xl p-3'>
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className='w-16 h-16 object-cover rounded-lg flex-shrink-0'
                                    />
                                    <div className='flex-1 min-w-0'>
                                        <h4 className='text-sm font-semibold text-gray-800 truncate'>{item.title}</h4>
                                        <p className='text-xs text-gray-400 mt-0.5'>{item.brand}</p>
                                        <p className='text-sm font-bold text-[#003D29] mt-1'>${item.price}</p>
                                    </div>
                                    <div className='flex flex-col items-end justify-between'>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className='text-gray-300 hover:text-red-400 transition-colors cursor-pointer'
                                        >
                                            <i className='ri-delete-bin-line text-base'></i>
                                        </button>
                                        <div className='flex items-center gap-1 bg-white border border-gray-200 rounded-lg overflow-hidden'>
                                            <button
                                                onClick={() => updateCartQty(item.id, item.quantity - 1)}
                                                className='w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer text-sm'
                                            >-</button>
                                            <span className='w-6 text-center text-xs font-bold'>{item.quantity}</span>
                                            <button
                                                onClick={() => updateCartQty(item.id, item.quantity + 1)}
                                                className='w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer text-sm'
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
 
                        {/* Footer */}
                        <div className='border-t border-gray-100 px-5 py-4 flex flex-col gap-3'>
                            <div className='flex justify-between items-center'>
                                <span className='text-sm text-gray-500'>Subtotal</span>
                                <span className='text-lg font-bold text-gray-900'>${cartTotal.toFixed(2)}</span>
                            </div>
                            <p className='text-xs text-gray-400 text-center'>Taxes & shipping calculated at checkout</p>
                            <button className='w-full py-3 bg-[#003D29] text-white rounded-full font-semibold text-sm hover:bg-[#002a1c] transition-colors cursor-pointer'>
                                Checkout →
                            </button>
                            <button
                                onClick={clearCart}
                                className='w-full py-2 border border-gray-200 text-gray-500 rounded-full text-sm hover:border-red-300 hover:text-red-400 transition-colors cursor-pointer'
                            >
                                Clear Cart
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Cartdrawer
 
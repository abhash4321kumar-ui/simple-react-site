import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context1main } from '../context/Maincontext'
 
const Navbar = () => {
    const tonavigate = useNavigate()
 
    const [inputvalue, setinputvalue] = useState('')
    const [changeicon, setchangeicon] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [newcategory, setnewcategory] = useState([])
 
    const { products, inputvaluefnc, cartCount, setCartOpen } = useContext(Context1main)
 
    useEffect(() => {
        if (products.length) {
            setnewcategory(products.slice(0, 6))
        }
    }, [products])
 
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
 
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('#category-dropdown') && !e.target.closest('#category-btn')) {
                setchangeicon(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])
 
    const handleSearch = (val) => {
        setinputvalue(val)
        inputvaluefnc(val)
        tonavigate('/products')
    }
 
    const handleSearchClick = () => {
        tonavigate('/products')
    }
 
    return (
        <div className={`sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
 
            {/* Top announcement bar */}
            <div className='bg-[#003D29] font-medium flex justify-between items-center py-2 px-4 sm:px-10 text-white'>
                <div className='hidden sm:flex items-center'>
                    <p className='text-sm'><i className="ri-phone-line text-lg"></i> +001234567890</p>
                </div>
                <div className='w-full sm:w-auto text-center'>
                    <p className='text-xs sm:text-sm'>Get 50% Off on Selected Items
                        <span className='hidden sm:inline px-5'>|</span>
                        <span className='text-yellow-300 font-semibold ml-1 sm:ml-0 cursor-pointer hover:underline'>Shop Now</span>
                    </p>
                </div>
                <div className='hidden sm:flex items-center gap-4'>
                    <p className='text-sm capitalize cursor-pointer hover:opacity-80'>ENG <i className="ri-arrow-down-s-line"></i></p>
                    <p className='text-sm capitalize cursor-pointer hover:opacity-80'>Location <i className="ri-map-pin-line"></i></p>
                </div>
            </div>
 
            {/* Main navbar */}
            <div className='bg-white flex justify-between items-center gap-4 py-4 px-4 sm:px-10 border-b border-gray-100'>
 
                {/* Logo */}
                <Link to='/' className='flex items-center gap-2 flex-shrink-0'>
                    <div className='w-9 h-9 bg-[#003D29] rounded-full flex items-center justify-center text-white text-base'>
                        🛒
                    </div>
                    <span className='text-xl font-bold text-[#003D29] hidden sm:block'>Shopcart</span>
                </Link>
 
                {/* Desktop nav links */}
                <div className='hidden lg:flex gap-6 items-center flex-shrink-0'>
                    <div
                        id='category-btn'
                        onClick={() => setchangeicon(!changeicon)}
                        className='flex items-center gap-1 cursor-pointer group'
                    >
                        <h4 className='text-base font-medium capitalize text-gray-700 group-hover:text-[#003D29] transition-colors'>Category</h4>
                        <i className={`text-lg transition-transform duration-200 text-gray-500 ${changeicon ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
                    </div>
                    {["What's New", "Delivery"].map((item, i) => (
                        <h4 key={i} className='text-base font-medium capitalize text-gray-700 hover:text-[#003D29] transition-colors cursor-pointer'>{item}</h4>
                    ))}
                    <h4
                        onClick={() => tonavigate('/products')}
                        className='text-base font-medium capitalize text-gray-700 hover:text-[#003D29] cursor-pointer transition-colors'
                    >
                        Products
                    </h4>
                </div>
 
                {/* Search bar */}
                <div className='flex-1 max-w-xs sm:max-w-sm hidden sm:flex'>
                    <div className='w-full py-2 px-4 rounded-full flex gap-3 justify-between items-center border border-gray-300 hover:border-[#003D29] transition-colors focus-within:border-[#003D29] focus-within:ring-2 focus-within:ring-[#003D29]/10'>
                        <input
                            onClick={handleSearchClick}
                            value={inputvalue}
                            onChange={(e) => handleSearch(e.target.value)}
                            className='text-sm w-full outline-none bg-transparent placeholder-gray-400'
                            type="text"
                            placeholder='Search products...'
                        />
                        <i className="ri-search-line text-gray-400 flex-shrink-0 cursor-pointer" onClick={handleSearchClick}></i>
                    </div>
                </div>
 
                {/* Icons */}
                <div className='flex gap-3 sm:gap-5 items-center'>
                    {/* Mobile search icon */}
                    <button
                        className='sm:hidden text-gray-700 text-xl hover:text-[#003D29] transition-colors'
                        onClick={handleSearchClick}
                    >
                        <i className="ri-search-line"></i>
                    </button>
 
                    <div className='hidden sm:flex items-center gap-2 cursor-pointer hover:text-[#003D29] transition-colors text-gray-700'>
                        <i className="ri-user-3-line text-xl"></i>
                        <p className='text-sm font-medium capitalize hidden md:block'>Account</p>
                    </div>
 
                    {/* Cart button with live count */}
                    <div
                        onClick={() => setCartOpen(true)}
                        className='relative flex items-center gap-2 cursor-pointer hover:text-[#003D29] transition-colors text-gray-700'
                    >
                        <i className="ri-shopping-cart-line text-xl"></i>
                        <p className='text-sm font-medium capitalize hidden md:block'>Cart</p>
                        {cartCount > 0 && (
                            <span className='absolute -top-2 -right-2 md:-top-2 md:-right-6 w-5 h-5 bg-[#C34482] text-white text-xs rounded-full flex items-center justify-center font-bold'>
                                {cartCount}
                            </span>
                        )}
                    </div>
 
                    {/* Hamburger */}
                    <button
                        className='lg:hidden text-gray-700 text-xl hover:text-[#003D29] transition-colors ml-1'
                        onClick={() => setMobileMenu(!mobileMenu)}
                    >
                        <i className={mobileMenu ? 'ri-close-line' : 'ri-menu-line'}></i>
                    </button>
                </div>
            </div>
 
            {/* Desktop Category Dropdown */}
            {changeicon && (
                <div id='category-dropdown' className='hidden lg:block w-full absolute bg-white shadow-xl border-t border-gray-100 z-40'>
                    <div className='max-w-2xl mx-auto py-6 px-6'>
                        <h2 className='text-xl font-semibold text-gray-800 mb-4'>Popular Categories</h2>
                        <div className='grid grid-cols-2 gap-3'>
                            {newcategory.map((val, index) => (
                                <div
                                    key={index}
                                    onClick={() => tonavigate('/products')}
                                    className='bg-gray-50 hover:bg-[#003D29]/5 flex gap-3 p-3 rounded-lg cursor-pointer transition-colors group'
                                >
                                    <img className='w-14 h-14 rounded-lg object-cover flex-shrink-0' src={val.thumbnail} alt={val.brand} />
                                    <div>
                                        <h2 className='text-base font-semibold text-gray-800 group-hover:text-[#003D29] transition-colors'>{val.brand}</h2>
                                        <p className='text-xs text-gray-500'>{val.availabilityStatus}</p>
                                        <p className='text-xs text-[#C34482] mt-1'>${val.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
 
            {/* Mobile Menu */}
            {mobileMenu && (
                <div className='lg:hidden bg-white border-t border-gray-100 shadow-lg'>
                    {/* Mobile search */}
                    <div className='px-4 py-3 sm:hidden'>
                        <div className='w-full py-2 px-4 rounded-full flex gap-2 items-center border border-gray-300 focus-within:border-[#003D29]'>
                            <i className="ri-search-line text-gray-400"></i>
                            <input
                                onClick={handleSearchClick}
                                value={inputvalue}
                                onChange={(e) => handleSearch(e.target.value)}
                                className='text-sm w-full outline-none bg-transparent placeholder-gray-400'
                                type="text"
                                placeholder='Search products...'
                            />
                        </div>
                    </div>
 
                    <nav className='px-4 py-2 flex flex-col'>
                        {["Category", "What's New", "Delivery"].map((item, i) => (
                            <a key={i} href='#' className='py-3 border-b border-gray-100 text-base font-medium text-gray-700 hover:text-[#003D29] transition-colors flex justify-between items-center'>
                                {item}
                                <i className="ri-arrow-right-s-line text-gray-400"></i>
                            </a>
                        ))}
                        <span
                            onClick={() => { setMobileMenu(false); tonavigate('/products') }}
                            className='py-3 border-b border-gray-100 text-base font-medium text-gray-700 hover:text-[#003D29] transition-colors cursor-pointer flex items-center gap-2 capitalize'
                        >
                            Products
                        </span>
                        <a href='#' className='py-3 border-b border-gray-100 text-base font-medium text-gray-700 hover:text-[#003D29] transition-colors flex items-center gap-2'>
                            <i className="ri-user-3-line"></i> Account
                        </a>
                        <span
                            onClick={() => { setMobileMenu(false); setCartOpen(true) }}
                            className='py-3 text-base font-medium text-gray-700 hover:text-[#003D29] transition-colors flex items-center gap-2 cursor-pointer'
                        >
                            <i className="ri-shopping-cart-line"></i> Cart
                            {cartCount > 0 && (
                                <span className='ml-auto bg-[#C34482] text-white text-xs px-2 py-0.5 rounded-full'>{cartCount} items</span>
                            )}
                        </span>
                    </nav>
                </div>
            )}
        </div>
    )
}
 

export default Navbar
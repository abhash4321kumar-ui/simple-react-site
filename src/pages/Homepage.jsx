import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context1main } from '../context/Maincontext';
 
const Homepage = () => {
    const tonavigate = useNavigate()
 
    const [topcategories, settopcategories] = useState([])
    const [displayproduct, setdisplayproduct] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [addedToCart, setAddedToCart] = useState([])
    const [activeTab, setActiveTab] = useState('all')
 
    const { products, storevalue, lastcoloumvalue, features, tabs, addToCart } = useContext(Context1main)
 
    useEffect(() => {
        if (products.length) {
            settopcategories(products.slice(24, 30))
            setdisplayproduct(products.slice(0, 6))
        }
    }, [products])
 
    const toggleWishlist = (id) =>
        setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
 
    const handleAddToCart = (product) => {
        addToCart(product)
        setAddedToCart(prev => [...prev, product.id])
        setTimeout(() => setAddedToCart(prev => prev.filter(i => i !== product.id)), 1500)
    }
 
    return (
        <div className='bg-gray-50'>
 
            {/* Hero Banner */}
            <div
                id='home-banner'
                className='w-full min-h-[60vh] sm:min-h-[75vh] lg:h-[90vh] flex items-center'
            >
                <div className='w-full sm:w-3/4 lg:w-1/2 flex flex-col justify-center items-start gap-6 px-6 sm:px-10 lg:px-16 py-16'>
                    <span className='text-xs sm:text-sm font-semibold tracking-widest text-[#003D29] uppercase bg-[#003D29]/10 px-3 py-1.5 rounded-full'>
                        New Collection
                    </span>
                    <h2 className='text-4xl sm:text-5xl lg:text-6xl text-[#003D29] capitalize font-bold leading-tight'>
                        shopping and<br />department store.
                    </h2>
                    <p className='text-base sm:text-xl font-medium text-[#231f1e]/70 max-w-md'>
                        Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
                    </p>
                    <div className='flex gap-4 flex-wrap'>
                        <button
                            onClick={() => tonavigate('/products')}
                            className='text-base sm:text-lg bg-[#003D29] text-white py-3 sm:py-4 capitalize px-8 sm:px-10 cursor-pointer rounded-full hover:bg-[#002a1c] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
                        >
                            Explore More
                        </button>
                        <button className='text-base sm:text-lg border-2 border-[#003D29] text-[#003D29] py-3 sm:py-4 capitalize px-8 sm:px-10 cursor-pointer rounded-full hover:bg-[#003D29] hover:text-white transition-all duration-300'>
                            View Deals
                        </button>
                    </div>
                </div>
            </div>
 
            {/* Feature Badges */}
            <div className='bg-white border-y border-gray-100'>
                <div className='max-w-screen-xl mx-auto px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4'>
                    {features.map((f, i) => (
                        <div key={i} className='flex items-center gap-3 group'>
                            <div className='w-10 h-10 bg-[#003D29]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#003D29] transition-colors duration-300'>
                                <i className={`${f.icon} text-lg text-[#003D29] group-hover:text-white transition-colors duration-300`}></i>
                            </div>
                            <div>
                                <p className='text-sm font-semibold text-gray-800'>{f.title}</p>
                                <p className='text-xs text-gray-400'>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
 
            {/* Top Categories */}
            <div className='py-12 px-6 sm:px-10 bg-white mt-2'>
                <div className='max-w-screen-xl mx-auto'>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className='text-2xl sm:text-3xl capitalize font-semibold text-gray-900'>Shop our top categories</h2>
                        <a href='#' className='text-sm text-[#003D29] font-medium hover:underline flex items-center gap-1'>
                            View all <i className="ri-arrow-right-line"></i>
                        </a>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3'>
                        {topcategories.map((val, index) => (
                            <div
                                key={index}
                                onClick={() => tonavigate('/products')}
                                className="relative h-52 sm:h-60 rounded-2xl overflow-hidden flex justify-center py-4 group cursor-pointer"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                                    style={{ backgroundImage: `url(${val.images[0]})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                                <div className='absolute bottom-3 left-0 right-0 text-center px-2'>
                                    <h2 className="relative z-10 text-sm sm:text-base text-white capitalize font-semibold">{val.category}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
 
            {/* Today's Best Deals */}
            <div className='py-12 px-6 sm:px-10 bg-gray-50'>
                <div className='max-w-screen-xl mx-auto'>
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
                        <div>
                            <h2 className='text-2xl sm:text-3xl capitalize font-semibold text-gray-900'>Today's Best Deals</h2>
                            <p className='text-sm text-gray-500 mt-1'>Limited time offers — grab them fast!</p>
                        </div>
                        <div className='flex gap-2 bg-white rounded-full p-1 border border-gray-200 flex-wrap'>
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium capitalize transition-all duration-200 ${activeTab === tab ? 'bg-[#003D29] text-white' : 'text-gray-500 hover:text-gray-800'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
 
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                        {displayproduct.map((val, index) => (
                            <div key={index} className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1'>
                                <div className='relative w-full h-56 bg-[#F5F6F6] flex items-center justify-center p-4'>
                                    <span className='absolute top-3 left-3 bg-[#003D29] text-white text-xs font-bold px-2 py-1 rounded-full'>
                                        -{val.discountPercentage?.toFixed(0)}%
                                    </span>
                                    <button
                                        onClick={() => toggleWishlist(val.id)}
                                        className='absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200 cursor-pointer'
                                    >
                                        <i className={`text-lg ${wishlist.includes(val.id) ? 'ri-heart-3-fill text-[#C34482]' : 'ri-heart-3-line text-gray-400'}`}></i>
                                    </button>
                                    <img
                                        onClick={() => tonavigate(`/products/${val.id}`)}
                                        className='w-44 h-44 object-contain group-hover:scale-105 transition-transform duration-300 cursor-pointer'
                                        src={val.images?.[0]}
                                        alt={val.title}
                                    />
                                </div>
 
                                <div className='p-4'>
                                    <div className='flex justify-between items-start mb-1'>
                                        <h2 className='text-base font-semibold text-gray-800 truncate flex-1'>{val.brand || 'Brand'}</h2>
                                        <div className='flex flex-col items-end ml-2'>
                                            <span className='text-base font-bold text-[#003D29]'>${val.price}</span>
                                            <span className='text-xs text-gray-400 line-through'>${(val.price * 1.2).toFixed(0)}</span>
                                        </div>
                                    </div>
                                    <p className='text-sm text-gray-500 truncate mb-2'>{val.title}</p>
 
                                    <div className='flex items-center gap-1 mb-3'>
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className={`text-xs ${i < Math.round(val.rating) ? 'ri-star-fill text-yellow-400' : 'ri-star-line text-gray-300'}`}></i>
                                        ))}
                                        <span className='text-xs text-gray-400 ml-1'>({val.rating})</span>
                                    </div>
 
                                    <button
                                        onClick={() => handleAddToCart(val)}
                                        className={`w-full py-2.5 rounded-full text-sm font-medium transition-all duration-300 border cursor-pointer
                                            ${addedToCart.includes(val.id)
                                                ? 'bg-[#003D29] text-white border-[#003D29]'
                                                : 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
                                            }`}
                                    >
                                        {addedToCart.includes(val.id) ? '✓ Added to Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
 
                    <div className='mt-8'>
                        <div className='flex justify-between text-xs text-gray-500 mb-2'>
                            <span>Showing 6 of 30 products</span>
                            <span>20% explored</span>
                        </div>
                        <div className='w-full h-1.5 bg-gray-200 rounded-full overflow-hidden'>
                            <div className='w-1/5 bg-[#231F1E] h-full rounded-full transition-all duration-500'></div>
                        </div>
                        <div className='text-center mt-5'>
                            <button
                                onClick={() => tonavigate('/products')}
                                className='px-8 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:border-[#003D29] hover:text-[#003D29] transition-colors cursor-pointer'
                            >
                                Load More Products
                            </button>
                        </div>
                    </div>
                </div>
            </div>
 
            {/* Trending Products */}
            <div className='py-12 px-6 sm:px-10 bg-white'>
                <div className='max-w-screen-xl mx-auto'>
                    <h2 className='text-2xl sm:text-3xl capitalize font-semibold text-gray-900 mb-8'>Trending Products</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        {[
                            { img: 'https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e6cd3678e82164f755_furniture%20village-min.png', title: 'Furniture Village', sub: 'Delivery within 24 hours', badge: 'HOT' },
                            { img: 'https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e6037f3b456acf2024_Fashion%20world-min.png', title: 'Fashion World', sub: 'Delivery within 24 hours', badge: 'NEW' }
                        ].map((item, i) => (
                            <div key={i} className='bg-[#F5F6F6] rounded-2xl overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300'>
                                <div className='relative w-full h-64 sm:h-72 overflow-hidden'>
                                    <span className={`absolute top-4 left-4 z-10 text-xs font-bold px-2 py-1 rounded-full text-white ${item.badge === 'HOT' ? 'bg-red-500' : 'bg-[#003D29]'}`}>
                                        {item.badge}
                                    </span>
                                    <img className='w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105' src={item.img} alt={item.title} />
                                </div>
                                <div className='flex justify-between items-center px-6 py-5'>
                                    <div>
                                        <h2 className='text-xl font-semibold capitalize text-gray-800'>{item.title}</h2>
                                        <p className='text-sm text-gray-500 mt-1'>{item.sub}</p>
                                    </div>
                                    <button className='py-2.5 px-5 capitalize bg-[#231F1E] text-white rounded-full cursor-pointer hover:bg-[#003D29] transition-colors duration-300 text-sm font-medium flex-shrink-0'>
                                        Shop Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
 
            {/* Promo Banner */}
            <div className='px-6 sm:px-10 py-6'>
                <div className='max-w-screen-xl mx-auto bg-[#003D29] rounded-2xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-white'>
                    <div>
                        <p className='text-sm tracking-widest uppercase text-green-300 font-medium mb-2'>Limited Offer</p>
                        <h3 className='text-2xl sm:text-3xl font-bold'>Get 30% off your first order</h3>
                        <p className='text-white/70 mt-2 text-sm'>Use code <span className='font-bold text-yellow-300 bg-yellow-300/10 px-2 py-0.5 rounded'>FIRST30</span> at checkout</p>
                    </div>
                    <button className='bg-white text-[#003D29] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 cursor-pointer'>
                        Shop Now
                    </button>
                </div>
            </div>
 
            {/* Best Selling Stores */}
            <div className='py-12 px-6 sm:px-10 bg-white'>
                <div className='max-w-screen-xl mx-auto'>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className='text-2xl sm:text-3xl capitalize font-semibold text-gray-900'>Best Selling Stores</h2>
                        <a href='#' className='text-sm text-[#003D29] font-medium hover:underline flex items-center gap-1'>
                            All stores <i className="ri-arrow-right-line"></i>
                        </a>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                        {storevalue.map((val, index) => (
                            <div key={index} className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1'>
                                <div className='w-full h-48 relative overflow-hidden'>
                                    <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' src={val.mainurl} alt={val.textmain} />
                                    <div className='absolute -bottom-5 left-4 w-14 h-14 bg-white rounded-full flex justify-center items-center border-2 border-[#C34482] z-10 shadow-md'>
                                        <img className='w-8 h-8 object-contain' src={val.thumburl} alt="" />
                                    </div>
                                </div>
                                <div className='px-4 pt-8 pb-4'>
                                    <h2 className='text-base font-semibold capitalize text-gray-800'>{val.textmain}</h2>
                                    <p className='text-sm text-gray-500 mt-0.5'>{val.textsub}</p>
                                    <p className='text-xs text-[#C34482] mt-2 flex items-center gap-1'>
                                        <i className="ri-send-plane-fill text-xs"></i>{val.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
 
            {/* Services */}
            <div className='py-12 px-6 sm:px-10 bg-gray-50'>
                <div className='max-w-screen-xl mx-auto'>
                    <h2 className='text-2xl sm:text-3xl capitalize font-semibold text-gray-900 mb-8'>Services to help you shop</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {lastcoloumvalue.map((val, index) => (
                            <div key={index} className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer'>
                                <div className='p-6 flex flex-col gap-3'>
                                    <h2 className='text-xl font-semibold text-gray-800 capitalize'>{val.maintext}</h2>
                                    <p className='text-sm text-gray-500 capitalize'>{val.desc}</p>
                                    <a href='#' className='text-sm text-[#003D29] font-medium flex items-center gap-1 hover:gap-2 transition-all'>
                                        Learn more <i className="ri-arrow-right-line"></i>
                                    </a>
                                </div>
                                <div className='w-full overflow-hidden h-52'>
                                    <img className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500' src={val.imageurl} alt={val.maintext} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
 
            {/* Newsletter */}
            <div className='px-6 sm:px-10 py-12 bg-white border-t border-gray-100'>
                <div className='max-w-xl mx-auto text-center'>
                    <i className='ri-mail-line text-4xl text-[#003D29]'></i>
                    <h3 className='text-2xl font-semibold text-gray-900 mt-3 mb-2'>Stay in the loop</h3>
                    <p className='text-sm text-gray-500 mb-6'>Subscribe to get exclusive deals, new arrivals and insider updates.</p>
                    <div className='flex flex-col sm:flex-row gap-3'>
                        <input
                            type="email"
                            placeholder='Enter your email address'
                            className='flex-1 border border-gray-300 rounded-full px-5 py-3 text-sm outline-none focus:border-[#003D29] focus:ring-2 focus:ring-[#003D29]/10 transition-all'
                        />
                        <button className='bg-[#003D29] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#002a1c] transition-colors cursor-pointer flex-shrink-0'>
                            Subscribe
                        </button>
                    </div>
                    <p className='text-xs text-gray-400 mt-3'>No spam, ever. Unsubscribe at any time.</p>
                </div>
            </div>
        </div>
    )
}

export default Homepage
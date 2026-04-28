import React from 'react'

const Footer = () => {
    const departments = [
        'Fashion', 'Education Product', 'Frozen Food', 'Beverages',
        'Organic Grocery', 'Office Supplies', 'Beauty Products', 'Books',
        'Electronics & Gadget', 'Travel Accessories', 'Fitness', 'Sneakers',
        'Toys', 'Furniture'
    ]

    const aboutUs = [
        'About Shopcart', 'Careers', 'News & Blog', 'Help',
        'Press Center', 'Shop By Location', 'Shopcart Brands',
        'Affiliate & Partners', 'Ideas & Guides'
    ]

    const services = [
        'Gift Card', 'Mobile App', 'Shipping & Delivery',
        'Order Pickup', 'Account Signup'
    ]

    const help = [
        'Shopcart Help', 'Returns', 'Track Orders',
        'Contact Us', 'Feedback', 'Security & Fraud'
    ]

    const payments = [
        { name: 'stripe', bg: '#635BFF', color: 'white', text: 'stripe' },
        { name: 'visa', bg: '#1A1F71', color: 'white', text: 'VISA' },
        { name: 'mastercard', bg: 'white', color: '#EB001B', text: '●●' },
        { name: 'amazon', bg: '#FF9900', color: '#232F3E', text: 'amazon' },
        { name: 'klarna', bg: '#FFB3C7', color: '#17120E', text: 'Klarna' },
        { name: 'paypal', bg: '#003087', color: '#009CDE', text: 'PayPal' },
        { name: 'applepay', bg: '#000', color: 'white', text: '⌘Pay' },
        { name: 'googlepay', bg: 'white', color: '#4285F4', text: 'GPay' },
    ]

    return (
        <footer className='bg-white border-t border-gray-200'>
            {/* Main Footer */}
            <div className='max-w-screen-xl mx-auto px-6 py-12'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10'>

                    {/* Brand Column */}
                    <div className='lg:col-span-1 flex flex-col gap-5'>
                        {/* Logo */}
                        <div className='flex items-center gap-2'>
                            <div className='w-10 h-10 bg-[#003D29] rounded-full flex items-center justify-center text-white text-lg'>
                                🛒
                            </div>
                            <span className='text-2xl font-bold text-[#003D29]'>Shopcart</span>
                        </div>

                        <p className='text-sm text-gray-500 leading-relaxed'>
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
                        </p>

                        <div>
                            <h3 className='text-base font-semibold text-gray-800 mb-4'>Accepted Payments</h3>
                            <div className='grid grid-cols-4 gap-2'>
                                {payments.map((p, i) => (
                                    <div
                                        key={i}
                                        className='h-9 rounded-md flex items-center justify-center text-xs font-bold border border-gray-200 overflow-hidden'
                                        style={{ backgroundColor: p.bg, color: p.color }}
                                    >
                                        {p.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Department */}
                    <div>
                        <h3 className='text-base font-semibold text-gray-900 mb-5'>Department</h3>
                        <ul className='flex flex-col gap-2'>
                            {departments.map((item, i) => (
                                <li key={i}>
                                    <a href='#' className='text-sm text-gray-500 hover:text-[#003D29] transition-colors duration-200'>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About Us */}
                    <div>
                        <h3 className='text-base font-semibold text-gray-900 mb-5'>About Us</h3>
                        <ul className='flex flex-col gap-2'>
                            {aboutUs.map((item, i) => (
                                <li key={i}>
                                    <a href='#' className='text-sm text-gray-500 hover:text-[#003D29] transition-colors duration-200'>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className='text-base font-semibold text-gray-900 mb-5'>Services</h3>
                        <ul className='flex flex-col gap-2'>
                            {services.map((item, i) => (
                                <li key={i}>
                                    <a href='#' className='text-sm text-gray-500 hover:text-[#003D29] transition-colors duration-200'>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h3 className='text-base font-semibold text-gray-900 mb-5'>Help</h3>
                        <ul className='flex flex-col gap-2'>
                            {help.map((item, i) => (
                                <li key={i}>
                                    <a href='#' className='text-sm text-gray-500 hover:text-[#003D29] transition-colors duration-200'>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='border-t border-gray-200'>
                <div className='max-w-screen-xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4'>

                    {/* Left links */}
                    <div className='flex flex-wrap gap-5'>
                        <a href='#' className='flex items-center gap-2 text-sm text-gray-600 hover:text-[#003D29] transition-colors'>
                            <i className='ri-store-2-line'></i>
                            <span>Become Seller</span>
                        </a>
                        <a href='#' className='flex items-center gap-2 text-sm text-gray-600 hover:text-[#003D29] transition-colors'>
                            <i className='ri-gift-line'></i>
                            <span>Gift Cards</span>
                        </a>
                        <a href='#' className='flex items-center gap-2 text-sm text-gray-600 hover:text-[#003D29] transition-colors'>
                            <i className='ri-question-line'></i>
                            <span>Help Center</span>
                        </a>
                    </div>

                    {/* Center policy links */}
                    <div className='flex flex-wrap gap-5'>
                        <a href='#' className='text-sm text-gray-500 hover:text-[#003D29] transition-colors'>Terms of Service</a>
                        <a href='#' className='text-sm text-gray-500 hover:text-[#003D29] transition-colors'>Privacy & Policy</a>
                    </div>

                    {/* Right copyright */}
                    <p className='text-xs text-gray-400 text-center sm:text-right'>
                        All Right reserved by Shopcart ui/ux design agency | {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
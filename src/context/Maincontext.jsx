import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const Context1main = createContext()

const Maincontext = ({ children }) => {

    const [products, setproducts] = useState([])
    const [searchdatavalue, setsearchdatavalue] = useState('')
    const [cart, setCart] = useState([])
    const [cartOpen, setCartOpen] = useState(false)

    useEffect(() => {
        async function fetchProducts() {
            try {
                let res = await axios.get('https://dummyjson.com/products?limit=100')
                setproducts(res.data.products)
            } catch (err) {
                console.error('Products fetch error:', err)
            }
        }
        fetchProducts()
    }, [])

    // ── Search ──────────────────────────────────────────────
    function inputvaluefnc(val) {
        setsearchdatavalue(val)
    }

    // ── Cart helpers ─────────────────────────────────────────
    function addToCart(product, qty = 1) {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id)
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                )
            }
            return [...prev, { ...product, quantity: qty }]
        })
    }

    function removeFromCart(id) {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    function updateCartQty(id, qty) {
        if (qty < 1) { removeFromCart(id); return }
        setCart(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: qty } : item
        ))
    }

    function clearCart() {
        setCart([])
    }

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)
    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

    // ── Static data (moved here so all pages share it) ───────
    const features = [
        { icon: 'ri-truck-line', title: 'Free Delivery', desc: 'On orders over $50' },
        { icon: 'ri-shield-check-line', title: 'Secure Payment', desc: '100% protected' },
        { icon: 'ri-refresh-line', title: 'Easy Returns', desc: '30-day policy' },
        { icon: 'ri-headphone-line', title: '24/7 Support', desc: 'Always here for you' },
    ]

    const tabs = ['all', 'electronics', 'beauty', 'fashion', 'groceries']

    const storevalue = [
        {
            mainurl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400',
            thumburl: 'https://logo.clearbit.com/zara.com',
            textmain: 'Zara Fashion',
            textsub: '320+ Products',
            desc: 'Ships in 1-2 days'
        },
        {
            mainurl: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400',
            thumburl: 'https://logo.clearbit.com/nike.com',
            textmain: 'Nike Sports',
            textsub: '180+ Products',
            desc: 'Ships in 24 hours'
        },
        {
            mainurl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
            thumburl: 'https://logo.clearbit.com/apple.com',
            textmain: 'Apple Store',
            textsub: '90+ Products',
            desc: 'Express delivery'
        },
        {
            mainurl: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=400',
            thumburl: 'https://logo.clearbit.com/ikea.com',
            textmain: 'IKEA Home',
            textsub: '450+ Products',
            desc: 'Ships in 3-5 days'
        },
    ]

    const lastcoloumvalue = [
        {
            maintext: 'Same Day Delivery',
            desc: 'Order before 12pm for same-day delivery to your door',
            imageurl: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=400',
        },
        {
            maintext: 'Easy Returns',
            desc: 'Not satisfied? Return within 30 days, no questions asked',
            imageurl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
        },
        {
            maintext: 'Gift Wrapping',
            desc: 'Make it special with our premium gift wrapping service',
            imageurl: 'https://images.unsplash.com/photo-1513201099705-a9746072f579?w=400',
        },
    ]

    const SKIN_TYPES = ['Normal', 'Oily', 'Dry', 'Combination', 'Sensitive']
    const PRICE_RANGES = [
        { label: 'Under $25', min: 0, max: 25 },
        { label: '$25 – $50', min: 25, max: 50 },
        { label: '$50 – $100', min: 50, max: 100 },
        { label: '$100 – $200', min: 100, max: 200 },
        { label: 'Over $200', min: 200, max: Infinity },
    ]
    const SORT_OPTIONS = ['Default Sorting', 'Price: Low to High', 'Price: High to Low', 'Rating', 'Discount']

    return (
        <Context1main.Provider value={{
            products,
            searchdatavalue,
            inputvaluefnc,
            cart,
            cartCount,
            cartTotal,
            cartOpen,
            setCartOpen,
            addToCart,
            removeFromCart,
            updateCartQty,
            clearCart,
            features,
            tabs,
            storevalue,
            lastcoloumvalue,
            SKIN_TYPES,
            PRICE_RANGES,
            SORT_OPTIONS,
        }}>
            {children}
        </Context1main.Provider>
    )
}

export default Maincontext
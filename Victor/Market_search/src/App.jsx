import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Camry from './assets/Camry.png'
import Corolla from './assets/Corolla.png'
import Break from './assets/Break.png'
import Location from './assets/location_Icon.png'
import Workshop from './assets/workShop_Icon.png'
import './App.css'
import { 
  Grid, Compass, Cpu, Car, Layers, Sliders, 
  Heart, MessageSquare, ArrowRight, Search, ShoppingBag, User 
} from 'lucide-react'; // Ensure lucide-react is installed
import { Menu, X } from 'lucide-react';


// Sample product data based on the UI
const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: 'Toyota Corolla 2014-2018 Engine Block',
    price: 450000,
    tag: 'Used',
    typo: 'Engine parts',
    tagColor: 'bg-orange-500',
    image: Corolla, // Placeholder engine block image
    location: 'Autoparts Lagos',
    city: 'Lagos',
  },
  {
    id: 2,
    title: 'OEM Ceramic Brake Pad Set Front Axle',
    price: 37000,
    tag: 'New',
    typo: 'Brakes',
    tagColor: 'bg-green-600',
    image: Break, // Placeholder auto part image
    location: 'Autoparts Lagos',
    city: 'Lagos',
  },
  {
    id: 3,
    title: 'Toyota Camry 2012 Alternator Assembly',
    price: 85000,
    tag: 'Used',
    typo: 'Electrical',
    tagColor: 'bg-orange-500',
    image: Camry, // Placeholder car parts image
    location: 'Abuja Auto Hub',
    city: 'Abuja',
  },
];

export default function AutoNaijaMart() {
  const [searchQuery, setSearchQuery] = useState('Toyota Camry 2012 Parts');
  const [selectedCondition, setSelectedCondition] = useState('Used');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
    const [isOpen, setIsOpen] = useState(false);

  // Format numbers to Nigerian Naira currency display
  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between w-full">
          {/* Logo / Brand Name */}
          <div className="flex sm:text-lg md:text-xl lg:text-2xl whitespace-nowrap items-center gap-2 text-blue-900 font-bold text-xl">
            Auto-Naija Mart
          </div>

          {/* Navigation Container */}
          <div className="flex items-center justify-end">
            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden text-gray-600 focus:outline-none z-50"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Navigation Menu */}
            <nav className={`
              fixed top-0 right-0 h-full w-64 bg-white shadow-2xl p-6 flex flex-col gap-6 text-base font-medium text-gray-600 z-45
              transform transition-transform duration-300 ease-in-out
              md:static md:h-auto md:w-auto md:bg-transparent md:shadow-none md:p-0 md:flex-row md:items-center md:gap-6 md:transform-none
              ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
            `}>
              {/* Add your nav links here */}
            <a href="#home" className="hover:text-blue-900">Home</a>
                    <a href="#search" className="text-blue-900 border-b-2 border-blue-900 pb-1">Search</a>
                    <a href="#sell" className="hover:text-blue-900">Chat</a>
                    <a href="#orders" className="hover:text-blue-900">Order</a>
                    <a href="#profile" className="hover:text-blue-900">Profile</a>
                  </nav>
          </div>
        </div>
      </header>

      {/* Main Body Layout */}
      <main className="mx-auto max-w-7xl px-6 py-4">
        {/* Search Bar Block */}
        <div>
          <div className="relative flex items-center mb-6 rounded-xl bg-white p-0 ">
            <svg
              className="absolute left-4 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-3 pl-12 pr-4 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Search for car parts, accessories, brands..."
            />
          </div>
        </div>
        <div className="w-full pl-0 md:pr-8">
          <div className="flex items-center justify-between mb-6">
           <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Header Title */}
          <span className="block text-sm font-semibold uppercase tracking-wider text-gray-900">
            All Parts
          </span>
          
          {/* Found Count Meta Text */}
          <p className="pl-2 text-xs text-gray-500 mt-1 lg:mt-0 lg:ml-4">
            <span className="font-semibold text-gray-900 mr-1.5">46</span> parts found
          </p>
        </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Sort by:</span>
              <select className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 outline-none focus:border-blue-500">
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
      </div>
        {/* Workspace Columns */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Side Control Panels: Filters */}
          <aside className="w-full lg:w-58 shrink-0 rounded-xl border border-gray-200 bg-white p-2.5 shadow-sm h-fit text-left">
          {/* Header: Scaled from text-base (16px) to text-xs (12px) */}
          <span className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5 pl-0.5">Filters</span>
          
          {/* Category Filter */}
          <div className="mb-3.5 mt-2.5">
            {/* Micro Labels: Scaled down to ultra-compact 9px text */}
            <span className="block text-[9px] font-bold gap-2 uppercase tracking-wider text-gray-600 mb-0">Category</span>
            
            {/* Main Category: Text scaled to extra-small (11px), layout gap optimized */}
            <label className="flex items-center space-x-2 cursor-pointer mb-1 pl-0.5">
              <input type="checkbox" defaultChecked className="rounded text-blue-900 focus:ring-blue-900 h-3 w-3 shrink-0" />
              <span className="text-[11px] font-bold text-gray-700 leading-none">Engine Parts</span>
            </label>
            
            {/* Subcategory 1 */}
            <label className="flex items-center space-x-2 cursor-pointer mb-1 pl-0.5">
              <input type="checkbox" className="rounded text-blue-900 focus:ring-blue-900 h-3 w-3 shrink-0" />
              <span className="text-[11px] font-bold text-gray-600 leading-none">Brakes</span>
            </label>
            
            {/* Subcategory 2 */}
            <label className="flex items-center space-x-2 cursor-pointer pl-0.5">
              <input type="checkbox" className="rounded text-blue-900 focus:ring-blue-900 h-3 w-3 shrink-0" />
              <span className="text-[11px] font-bold text-gray-600 leading-none">Electrical</span>
            </label>
          </div>

          {/* Condition Selection Toggle */}
          <div className="mb-3.5">
            <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-600 mb-2">Condition</span>
          
            <div className="flex w-1/2 gap-1.5"> 
          {['Used', 'New'].map((cond) => ( 
            <button 
              key={cond} 
              onClick={() => setSelectedCondition(cond)} 
              className={`flex-1 rounded-md py-0 text-[8px] font-bold border transition ${ 
                selectedCondition === cond 
                  ? 'bg-blue-900 text-white border-blue-900' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50' 
              }`} 
            > 
              {cond} 
            </button> 
          ))} 
         </div>

          </div>

          {/* Price Inputs */}
          <div>
            <span className="block text-[6px] font-bold uppercase tracking-wider text-gray-600 mb-0">Price Range (₦)</span>
            <div className="flex items-center gap-1.5 pb-1.5">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-md border border-gray-200 px-1.5 py-0.5 text-[10px] text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
                      {/* Sizing: Padding dropped to px-1.5 py-0.5, font to 10px */}
              <span className="text-gray-400 text-[10px]">—</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-md border border-gray-200 px-1.5 py-0.5 text-[10px] text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
         </aside>
                  {/* Catalog Listings Content */}
                  {/* Changed "flex-1" to "w-full pl-0 md:pl-[6in]" to enforce the 6-inch gap on desktop while keeping it mobile-friendly */}
         <section className="w-full pl-0 md:pr-68">
          {/* Context Heading bar */}
          

          {/* Grid Layout of items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {INITIAL_PRODUCTS.map((product) => (
              <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                
                {/* Badge Marker */}
                <span className={`absolute left-3 top-1 z-8 rounded px-2 py-0.5 text-[8px] font-bold text-white shadow-sm ${product.tagColor}`}>
                  {product.tag}
                </span>

                {/* Thumbnail Picture frame */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-100"
                  />
                </div>

                {/* Context body block */}
                <div className="flex flex-1 text-left items-start flex-col p-2">
                  <span className="text-xs tracking-wide text-gray-400 lowercase font-1 mb-1">{product.typo}</span>
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[20px] mb-1 group-hover:text-blue-900 transition-colors">
                    {product.title}
                  </h3>
                  
                  {/* Valuation Display */}
                  <div className="text-xl font-extrabold text-blue-900 mb-0">
                    {formatNaira(product.price)}
                  </div>

                  <div className="mt-auto border-t border-gray-100 pt-0 flex flex-col  items-start gap-1 text-[11px] text-gray-400 mb-2">
                    <span className="flex flex-row pl-2 gap-1"><img class="w-4 h-4 mt-1 shrink-0" src={Workshop} alt="location"/>  {product.location}</span>
                    <span className="flex flex-row pl-2 gap-1"><img class="w-4 h-4 mt-1 shrink-0" src={Location} alt="location"/>   {product.city}</span>
                  </div>

                  {/* Primary Engagement Button */}
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-900 py-2.5 text-xs font-bold text-white transition hover:bg-blue-950 focus:ring-4 focus:ring-blue-100">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Chat with seller
                  </button>
                </div>
              </div>
            ))}
          </div>
          </section>

        </div>
      </main>
    </div>
  );
}

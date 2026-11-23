import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import background from './assets/backgroundToolsAsoro.png'
import plug from './assets/plugs.png'
import cylinder from './assets/cylinger.png'
import engineplug from './assets/engineplug.png'

import './App.css'
import React from 'react';
import { 
  Grid, Compass, Cpu, Car, Layers, Sliders, 
  Heart, MessageSquare, ArrowRight, Search, ShoppingBag, User 
} from 'lucide-react'; // Ensure lucide-react is installed
import { Menu, X } from 'lucide-react';


export default function App() {
  // Category Mock Data
    const [isOpen, setIsOpen] = useState(false);
  const categories = [
    { id: 1, name: 'All Parts', icon: <Grid size={20} /> },
    { id: 2, name: 'Brakes', icon: <Compass size={20} /> },
    { id: 3, name: 'Electrical', icon: <Cpu size={20} /> },
    { id: 4, name: 'Body Parts', icon: <Car size={20} /> },
    { id: 5, name: 'Engine', icon: <Layers size={20} /> },
    { id: 6, name: 'Interiors', icon: <Sliders size={20} /> },
  ];

  // Featured Products Mock Data
  const products = [
    {
      id: 1,
      title: "Toyota Corolla 2014-2019 Engine Block",
      category: "Engine Parts",
      condition: "Used",
      fitment: "Fits: Honda CR-V 2012-2016",
      price: "₦450,000",
      image: engineplug,
      originalPrice: "₦520,000",
      seller: "Reliable Auto",
      rating: "4.8",
    },
    {
      id: 2,
      title: "Honda CR-V 2012-2016 Cylinder Head",
      category: "Engine Parts",
      condition: "Used",
      fitment: "Fits: Honda CR-V 2012-2016",
      price: "₦280,000",
      image: cylinder,
      seller: "AutoParts Lagos",
      rating: "4.8",
    },
    {
      id: 3,
      title: "Iridium Spark Plugs Set of 4",
      category: "Ignition",
      condition: "New",
      fitment: "Universal Fit",
      price: "₦12,500",
      image: plug,
      seller: "Speed Parts Co",
      rating: "4.9",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-12">
      
      {/* --- HEADER --- */}
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


      <main className="max-w-6xl mx-auto px-4 mt-6">
        
        {/* --- PROMO BANNER --- */}
        <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 text-white rounded-2xl p-8 md:p-12 overflow-hidden shadow-sm">
          {/* Subtle background placeholder overlay for engine tools grid */}
          <div className="absolute inset-y-0  w-9/10 opacity-40 opacity-10 bg-[url('./assets/backgroundToolsAsoro.png')] bg-cover bg-center mix-blend-overlay"></div>
          
          <div className="relative text-start z-10 max-w-lg">
            <span className="bg-orange-500 text-[10px] tracking-wider font-extrabold uppercase px-2.5 py-1 rounded text-white">
              Limited Offer
            </span>
            <h1 className="!text-white text-3xl md:text-4xl mt-4 ">
              Up to 20% off <br />Engine parts
            </h1>
            <p className="text-blue-200 text-sm mt-3 font-normal max-w-sm">
              Upgrade your vehicle's performance with premium parts from top brands.
            </p>
            <button className="mt-6 bg-white text-blue-900 hover:bg-gray-100 font-semibold text-xs px-6 py-3 rounded-lg transition-colors">
              Shop Now
            </button>
          </div>
          {/* Decorative gear logo placeholder */}
          <div className="absolute bottom-[-20px] right-[-20px] text-blue-700 opacity-20 hidden md:block">
            <svg width="200" height="200" fill="currentColor" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3-1.57-3-3.5s1.07-3.5 3-3.5 3 1.57 3 3.5-1.07 3.5-3 3.5z"/></svg>
          </div>
        </div>

        {/* --- CATEGORIES SECTION --- */}
        <section className="mt-10">
          <h3 className="text-sm flex-start font-bold text-gray-900 tracking-wide">Select Category</h3>
          <div className="lg:pr-54 grid grid-cols-3 sm:grid-cols-6 gap-4 mt-4">
            {categories.map((cat) => (
              <div key={cat.id} className="flex flex-col items-center group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-indigo-50/70 border border-transparent text-indigo-800 flex items-center justify-center transition-all group-hover:scale-105 group-hover:bg-indigo-100">
                  {cat.icon}
                </div>
                <span className="text-[11px] font-medium text-gray-500 mt-2 text-center group-hover:text-indigo-900">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* --- FEATURED PRODUCTS SECTION --- */}
        <section className="mt-12pr">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 tracking-wide">Featured Products</h3>
            <a href="#" className="text-xs font-semibold text-blue-700 flex items-center gap-1 hover:underline">
              See all <ArrowRight size={14} />
            </a>
          </div>

          <div className="lg:pr-54 grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex flex-col justify-between relative group hover:shadow-md transition-shadow">
                
                {/* Product Media Wrapper */}
                <div>
                  <div className="relative w-full h-44 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                    <span className="absolute top-2 left-2 z-10 bg-orange-500 text-[9px] font-bold text-white px-1.5 py-0.5 rounded">
                      Escrow Available
                    </span>
                    <button className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 rounded-full text-gray-400 hover:text-red-500 backdrop-blur-sm transition-colors shadow-sm">
                      <Heart size={14} />
                    </button>
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="object-cover w-full h-full mix-blend-multiply group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5 mt-3">
                    <span className="text-[10px] text-gray-400 font-medium">{product.category}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-[9px] bg-slate-100 font-bold px-1.5 py-0.5 rounded
                    ${product.condition === 'New' ? 'bg-slate-100 text-slate-600' 
                    : 'bg-red-100 text-red-700'}
                    ">
                      {product.condition}
                    </span>
                  </div>

                  {/* Title & Fitment */}
                  <h4 className="text-xs flex items-start font-bold text-gray-900 mt-1.5 line-clamp-2 leading-snug">
                    {product.title}
                  </h4>
                  <p className="text-[10px] flex items-start text-gray-400 mt-1 font-medium">
                    {product.fitment}
                  </p>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-sm font-extrabold text-gray-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-gray-300 line-through font-medium">{product.originalPrice}</span>
                    )}
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100 text-[10px] text-gray-400">
                    <span className="flex items-center gap-1">🏪 {product.seller}</span>
                    <span className="flex items-center gap-0.5 text-orange-500 font-bold">⭐ {product.rating}</span>
                  </div>
                </div>

                {/* Call To Action Button */}
                <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <MessageSquare size={14} />
                  Chat with Seller
                </button>

              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}


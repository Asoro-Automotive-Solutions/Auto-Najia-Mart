import bell from './assets/bell.png'
import quemark from './assets/quemark.jpg'
import philip from './assets/philip.jpg'
import machine from './assets/machineIcon.jpg'
import background from './assets/backgroundToolsAsoro.png'
import plug from './assets/plugs.png'
import cylinder from './assets/cylinger.png'
import engineplug from './assets/engineplug.png'

import './App.css'
import { 
  Grid, Compass, Cpu, Car, Layers, Sliders, 
  Heart, MessageSquare, ArrowRight, Search, ShoppingBag, User 
} from 'lucide-react'; // Ensure lucide-react is installed
import { Menu, X } from 'lucide-react';


import React, { useState } from 'react';

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Active');
  const [selectedOrder, setSelectedOrder] = useState('ORD-7829');

  const ordersData = [
    { id: '#ORD-7829', name: 'Brake Pads (Toyota)', date: 'Today, 10:45 AM', status: 'ACTIVE' },
    { id: '#ORD-7828', name: 'Suspension Strut Assembly', date: 'Yesterday, 2:15 PM', status: 'ACTIVE' },
    { id: '#ORD-7827', name: 'V6 Engine Block (Used)', date: 'Oct 24, 2023', status: 'DELIVERED' },
  ];
 const ordersData2 = [
    { id:'ORDER ID', name:"Part Name", date:"Date",
      status:"Status",
      action:"Action"}]

  return (
   <div className="flex flex-col lg:flex-row h-screen w-full bg-[#F3F2F7] font-sans antialiased text-gray-900 overflow-hidden relative">
  
  {/* 1. MOBILE BACKDROP OVERLAY (Dim background when menu opens) */}
  {isOpen && (
    <div 
      className="fixed inset-0 bg-black/40 z-40 md:hidden"
      onClick={() => setIsOpen(false)}
    />
  )}

  {/* 2. MOBILE-ONLY NAVIGATION DRAWER (Moved to layout root level) */}
  <nav className={`
    fixed top-0 left-0 h-full w-64 bg-white shadow-2xl p-6 flex flex-col gap-6 text-base font-medium text-gray-600 z-50
    transform transition-transform duration-300 ease-in-out md:hidden
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `}>
    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
      <span className="font-bold text-[#1A0066]">Auto-Naija Mart</span>
      <button onClick={() => setIsOpen(false)} className="text-gray-600 p-1">
        <X size={24} />
      </button>
    </div>

    {[
      { label: 'Dashboard', active: false },
      { label: 'Listings', active: false },
      { label: 'Chat', active: false },
      { label: 'Orders', active: true },
      { label: 'Profile', active: false },
      { label: 'Settings', active: false },
    ].map((item, idx) => (
      <button
        key={idx}
        className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          item.active
            ? 'bg-[#240090] text-white shadow-sm'
            : 'text-[#555566] hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <span className={`w-4 h-4 rounded mr-3 opacity-80 ${item.active ? 'bg-white' : 'bg-gray-400'}`}></span>
        {item.label}
      </button>
    ))}
  </nav>

  {/* 3. DESKTOP SIDEBAR - Kept clean for large screens */}
  <aside className="hidden md:flex md:w-60 bg-[#FAF9FF] border-b md:border-b-0 md:border-r border-[#E6E4EE] flex-col justify-between p-6 flex-shrink-0">
    <div>
      <div className="mb-8 p-0 flex flex-col items-start">
        <span className="text-xl text-start font-bold tracking-normal text-[#1A0066] leading-tight">
          Auto-Naija<br />Mart
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <div className="flex flex-col gap-3 w-full">
        {[
          { label: 'Dashboard', active: false },
          { label: 'Listings', active: false },
          { label: 'Chat', active: false },
          { label: 'Orders', active: true },
          { label: 'Profile', active: false },
          { label: 'Settings', active: false },
        ].map((item, idx) => (
          <button
            key={idx}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              item.active
                ? 'bg-[#240090] text-white shadow-sm'
                : 'text-[#555566] hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <span className={`w-4 h-4 rounded mr-3 opacity-80 ${item.active ? 'bg-white' : 'bg-gray-400'}`}></span>
            {item.label}
          </button>
        ))}
      </div>
    </div>

    <div className="flex items-center pt-4 border-t border-[#E6E4EE]">
      <div className="w-9 h-9 rounded-full bg-gray-300 flex-shrink-0">
         <img className="w-11 h-11 cursor-pointer" src={philip} alt="phillip" />
      </div>
      <div className="ml-3 overflow-hidden">
        <p className="text-xs font-semibold text-gray-900 truncate">Admin User</p>
        <p className="text-[10px] text-gray-500 truncate">admin@autonaija.com</p>
      </div>
    </div>
  </aside>

  {/* 4. MAIN BODY CONTAINER */}
  <div className="flex flex-1 flex-col overflow-hidden">
    <div className="flex flex-row bg-white py-4 m-0 px-6 mb-0 items-center border-b border-[#E6E4EE] shadow-sm">
      <div className="flex flex-row justify-between w-full items-center">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-gray-600 focus:outline-none z-50 p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="block md:hidden font-bold text-[#1A0066]">Auto-Naija Mart</div>
        <div className='flex flex-row items-center gap-4 md:ml-auto'>
          <img className="w-5 h-5 cursor-pointer" src={bell} alt="bell" />
          <img className="w-5 h-5 cursor-pointer" src={quemark} alt="quemark" />
        </div>
      </div>
    </div>

    {/* RESPONSIVE BODY CONTENT */}
    <div className="flex flex-col flex-1 p-8 px-0 gap-6 lg:flex-row overflow-scroll sm:p-4 pt-0 m-4">
    
      {/* 2. MAIN CENTER CONTENT: ORDERS LISTING */}
       <main className="flex-1 flex mt-5 flex-col bg-[#FAF9FF] border border-slate-100 p-6">
        <div className="flex flex-row justify-between m-4 items-center shrink-0 lg:initial">
          <h2 className="text-xl font-bold text-gray-900">Orders</h2>
          <button className="border border-gray-300 rounded-md px-4 py-1 text-xs font-medium bg-white hover:bg-gray-50 shadow-sm transition-all">
            Filter
          </button>
        </div>

        <div className="flex bg-[#EAE8F3] p-1 rounded-lg self-start mb-6">
          {['Active', 'Dispatch', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === tab
                  ? 'bg-[#240090] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table View */}
        <div className="flex flex-col min-w-full sm:min-w-0 lg:min-w-0">
          <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-[#E6E4EE] text-[11px] font-bold text-[#8A8A9E] tracking-wider uppercase">
            <div className="col-span-2">Order ID</div>
            <div className="col-span-4">Part Name</div>
            <div className="col-span-3">Date</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          <div className="divide-y divide-[#F0EFF5]">
            {ordersData.map((order, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedOrder(order.id.replace('#', ''))}
                className="grid grid-cols-12 gap-4 items-center px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="col-span-2 text-xs font-bold text-gray-700">{order.id}</div>
                <div className="col-span-4 text-xs font-semibold text-gray-900 truncate">{order.name}</div>
                <div className="col-span-3 text-xs text-gray-500">{order.date}</div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    order.status === 'ACTIVE' ? 'bg-[#ECE7FF] text-[#3F00B5]' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${order.status === 'ACTIVE' ? 'bg-[#3F00B5]' : 'bg-gray-400'}`}></span>
                    {order.status}
                  </span>
                </div>
                <div className="col-span-1 text-right text-gray-300 text-lg select-none">&rsaquo;</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 3. RIGHT DETAILS SIDEBAR - Shifts below main contents on tablet/mobile screens */}
  <section className="w-full lg:w-96 bg-white border border-[#E6E4EE] lg:border-none lg:bg-transparent rounded-xl p-5 flex flex-col justify-start h-auto flex-shrink-0 shadow-sm lg:shadow-none">
        <div className="space-y-4 pr-1">
          
          {/* Active Target Banner */}
          <div className="flex flex-col items-start bg-white py-4 px-4 rounded-xl border border-[#E6E4EE] shadow-sm">
            <h3 className="text-base font-extrabold text-[#240090]">#ANM-8821</h3>
          </div>

          {/* Buyer Metadata & Listing Breakdown */}
          <div className="bg-white p-4 rounded-xl border border-[#E6E4EE] shadow-sm space-y-4">
            {/* Profile Meta */}
            <div className="flex items-center">
              <div className="w-11 h-11 rounded-full bg-gray-300 flex-shrink-0">
                        <img className="w-11 h-11 cursor-pointer" src={philip} alt="phillip" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-bold text-gray-900 leading-tight">Trevor Philip</p>
              </div>
            </div>

            <hr className="border-[#E6E4EE]" />

            {/* Product Meta */}
            <div className="flex items-start justify-between gap-3">
              <div className="w-12 h-12 bg-zinc-800 rounded-md flex-shrink-0">
                <img className="w-11 h-11 cursor-pointer" src={machine} alt="machine" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[12px] font-bold text-gray-900 line-clamp-2 leading-tight">
                  Toyota Corolla 2016 Suspension
                </h4>
                <p className="text-[11px] text-gray-500 mt-0.5">₦70,000.00</p>
              </div>
              <div className="text-xs font-bold text-gray-900">₦70,000.00</div>
            </div>

            <hr className="border-[#E6E4EE]" />

            {/* Logistics Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-start">
                <span className="text-gray-500">Pickup Option</span>
                <span className="font-semibold text-gray-900 text-right">GIG Courier</span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <span className="text-gray-500">Address</span>
                <span className="font-semibold text-gray-900 text-right flex-1">
                  12, Oba Akran Ave. Ikeja, Lagos State
                </span>
              </div>
              <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Phone Number</span>
                  <span className="font-semibold text-slate-800 font-mono">+234 2323 23232 2323</span>
              </div>
            </div>
          </div>
          {/* Escrow Status Activity Info Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block bg-[#F5EFFF] text-[#8A56F6] text-xs font-bold px-3 py-1 rounded-lg">
                    Locked Escrow
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-slate-900">₦70,000.00</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Dec 12</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-medium text-slate-400">Status</span>
                <span className="bg-[#2B00A4] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Needs Dispatch
                </span>
              </div>
            </div>
            <button className="w-full bg-[#FF7A1A] hover:bg-[#e66a12] active:scale-[0.99] text-white font-bold text-sm py-4 rounded-xl shadow-md transition-all mt-2">
              Mark Shipped
            </button>
        </div>
      </section>

    </div>
  </div>
</div>

  );
}


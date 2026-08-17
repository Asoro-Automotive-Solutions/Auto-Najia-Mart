import React, { useState } from "react";
import {
  Search,
  ArrowLeft,
  Phone,
  MoreVertical,
  ShieldCheck,
  Lock,
  Info,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";

const DEFAULT_ACTIVE_SELLERS = [
  { id: "s1", name: "Reliable Autos", avatar: "https://i.pravatar.cc/80?img=12" },
  { id: "s2", name: "German Parts", avatar: "https://i.pravatar.cc/80?img=33" },
  { id: "s3", name: "Autopart Lagos", avatar: "https://i.pravatar.cc/80?img=5" },
];

const DEFAULT_RECENT_CHATS = [
  {
    id: "c1",
    name: "Reliable Autos",
    avatar: "https://i.pravatar.cc/80?img=12",
    preview: "Okay, I look forward to seeing you this afternoon for pickup.",
    time: "10:42 AM",
    unread: 2,
    active: true,
  },
  {
    id: "c2",
    name: "German Parts",
    avatar: "https://i.pravatar.cc/80?img=33",
    preview: "The brake pads are in stock. Let me know when you want them.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "c3",
    name: "Mike's Garage",
    avatar: "https://i.pravatar.cc/80?img=51",
    preview: "Thanks for the quick confirmation. See...",
    time: "Monday",
    unread: 0,
  },
];

const DEFAULT_MESSAGES = [
  { id: "m1", from: "them", text: "Yes! OEM set in stock - 450,000", time: "10:42 AM" },
  { id: "m2", from: "me", text: "Is it compatible with the 2018 2.5L engine?", time: "10:45 AM" },
  { id: "m3", from: "them", text: "Yes, confirmed compatible. I can also deliver to Ikeja by Friday.", time: "10:48 AM" },
  { id: "m4", from: "me", text: "I would like to negotiate the price a bit. Can you do 420,000?", time: "10:51 AM" },
];

const DEFAULT_PRODUCT = {
  image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=200&auto=format&fit=crop",
  name: "Toyota Corolla Engine Block (2.5L)",
  ref: "REQ-0392",
  price: "₦450,000",
};

const DEFAULT_NEGOTIATION = {
  status: "Pending",
  originalPrice: "₦450,000",
  agreedPrice: "₦420,000",
  delivery: { label: "Delivery (Ikeja)", amount: "₦5,000" },
  escrowFee: { label: "Escrow Fee (1.5%)", amount: "₦6,300" },
  total: "₦431,300",
};

export default function ChatPage({
  activeSellers = DEFAULT_ACTIVE_SELLERS,
  recentChats = DEFAULT_RECENT_CHATS,
  messages = DEFAULT_MESSAGES,
  product = DEFAULT_PRODUCT,
  seller = { name: "Autoparts Lagos", avatar: "https://i.pravatar.cc/80?img=5", online: true },
  negotiation = DEFAULT_NEGOTIATION,
  onNavigate = () => {},
  onPayEscrow = () => {},
  onSendMessage = () => {},
}) {
  // Below the `lg` breakpoint there's only room for one pane at a time.
  const [mobileView, setMobileView] = useState("list"); // "list" | "thread" | "details"
  const [draft, setDraft] = useState("");

  const openThread = () => setMobileView("thread");
  const closeThread = () => setMobileView("list");
  const openDetails = () => setMobileView("details");
  const closeDetails = () => setMobileView("thread");

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    onSendMessage(text);
    setDraft("");
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar activeKey="chat" onNavigate={onNavigate} />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar — chat list */}
        <aside
          className={[
            "w-full lg:w-80 xl:w-96 border-r border-slate-200 flex-col overflow-y-auto flex-shrink-0",
            mobileView === "list" ? "flex" : "hidden lg:flex",
          ].join(" ")}
        >
          <div className="p-4">
            <h1 className="text-xl font-bold text-slate-900">Chats</h1>

            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0F2C52] focus:border-[#0F2C52] transition-colors"
              />
            </div>
          </div>

          {/* Active sellers */}
          <div className="px-4 pb-2">
            <p className="text-xs font-semibold text-slate-500 mb-2.5">
              Active Sellers
            </p>
            <div className="flex gap-4">
              {activeSellers.map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-1.5 w-16">
                  <div className="relative">
                    <img
                      src={s.avatar}
                      alt=""
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <span className="text-[11px] text-slate-600 text-center leading-tight truncate w-full">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent messages */}
          <div className="px-4 pt-3 pb-4 flex-1">
            <p className="text-xs font-semibold text-slate-500 mb-2">
              Recent Messages
            </p>
            <div className="flex flex-col gap-1">
              {recentChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={openThread}
                  className={[
                    "flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors",
                    chat.active
                      ? "border border-[#0F2C52] bg-slate-50"
                      : "border border-transparent hover:bg-slate-50",
                  ].join(" ")}
                >
                  <img
                    src={chat.avatar}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-800 truncate">
                        {chat.name}
                      </span>
                      <span className="text-[11px] text-slate-400 whitespace-nowrap">
                        {chat.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {chat.preview}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-[#0F2C52] text-white text-[10px] font-semibold flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Chat thread */}
        <section
          className={[
            "flex-1 flex-col min-w-0",
            mobileView === "thread" ? "flex" : "hidden lg:flex",
          ].join(" ")}
        >
          {/* Thread header */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-slate-200">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={closeThread}
                aria-label="Back to chat list"
                className="md:hidden text-slate-500 hover:text-slate-700 flex-shrink-0"
              >
                <ArrowLeft className="h-4.5 w-4.5" />
              </button>
              <img
                src={seller.avatar}
                alt=""
                className="h-9 w-9 rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0F2C52] truncate">
                  {seller.name}
                </p>
                {seller.online && (
                  <p className="text-[11px] text-emerald-500 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Online
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-400 flex-shrink-0">
              <button aria-label="Call" className="hover:text-slate-600 transition-colors">
                <Phone className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={openDetails}
                aria-label="View negotiation details"
                className="lg:hidden hover:text-slate-600 transition-colors"
              >
                <Info className="h-4.5 w-4.5" />
              </button>
              <button aria-label="More options" className="hover:text-slate-600 transition-colors">
                <MoreVertical className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Product card */}
          <div className="mx-4 md:mx-6 mt-4 flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={product.image}
                alt=""
                className="h-12 w-12 rounded-lg object-cover flex-shrink-0 bg-slate-100"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {product.name}
                </p>
                <p className="text-[11px] text-amber-600 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="h-3 w-3" />
                  Escrow Protected
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400">Ref: {product.ref}</span>
                </p>
              </div>
            </div>
            <span className="text-sm font-bold text-[#0F2C52] whitespace-nowrap">
              {product.price}
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
            <div className="flex justify-center mb-4">
              <span className="text-[11px] text-slate-400 bg-slate-100 rounded-full px-3 py-1">
                Today
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={[
                    "flex",
                    msg.from === "me" ? "justify-end" : "justify-start",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "max-w-[85%] sm:max-w-[70%] rounded-2xl px-3.5 py-2.5",
                      msg.from === "me"
                        ? "bg-[#0F2C52] text-white rounded-br-sm"
                        : "bg-slate-100 text-slate-700 rounded-bl-sm",
                    ].join(" ")}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p
                      className={[
                        "text-[10px] mt-1",
                        msg.from === "me" ? "text-white/60" : "text-slate-400",
                      ].join(" ")}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Composer */}
          <div className="px-4 md:px-6 py-3 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 h-10 px-3 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0F2C52] focus:border-[#0F2C52] transition-colors"
              />
              <Button variant="primary" size="md" onClick={handleSend}>
                Send
              </Button>
            </div>
          </div>
        </section>

        {/* Negotiation details panel */}
        <aside
          className={[
            "w-full lg:w-80 xl:w-96 border-l border-slate-200 flex-col overflow-y-auto flex-shrink-0",
            mobileView === "details" ? "flex" : "hidden lg:flex",
          ].join(" ")}
        >
          <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <button
                onClick={closeDetails}
                aria-label="Back to chat"
                className="lg:hidden text-slate-500 hover:text-slate-700"
              >
                <ArrowLeft className="h-4.5 w-4.5" />
              </button>
              <h2 className="text-sm font-semibold text-slate-900">
                Negotiation Details
              </h2>
            </div>
            <span className="text-[11px] font-medium text-amber-600 bg-amber-50 rounded-full px-2.5 py-1">
              {negotiation.status}
            </span>
          </div>

          <div className="p-4 md:p-5 flex flex-col gap-4">
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <p className="text-[11px] font-semibold tracking-wide text-slate-400 px-4 pt-3.5">
                ORDER SUMMARY
              </p>
              <div className="px-4 pt-2.5 pb-3 flex items-center justify-between text-sm">
                <span className="text-slate-500">Original Price</span>
                <span className="text-slate-400 line-through">
                  {negotiation.originalPrice}
                </span>
              </div>
              <div className="px-4 py-3 flex items-center justify-between text-sm bg-slate-50">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
                  Agreed Price
                </span>
                <span className="font-bold text-[#0F2C52]">
                  {negotiation.agreedPrice}
                </span>
              </div>
              <div className="px-4 pt-3 flex items-center justify-between text-sm">
                <span className="text-slate-500">{negotiation.delivery.label}</span>
                <span className="text-slate-700">{negotiation.delivery.amount}</span>
              </div>
              <div className="px-4 pt-2 pb-3.5 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-slate-500">
                  {negotiation.escrowFee.label}
                  <Info className="h-3 w-3 text-slate-300" />
                </span>
                <span className="text-slate-700">{negotiation.escrowFee.amount}</span>
              </div>
              <div className="px-4 py-3.5 flex items-center justify-between border-t border-slate-200">
                <span className="text-sm font-semibold text-slate-800">
                  Total to Pay
                </span>
                <span className="text-lg font-bold text-[#0F2C52]">
                  {negotiation.total}
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-[#F1EEFB] p-4 flex items-start gap-2.5">
              <Lock className="h-4 w-4 text-[#241947] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Secure Escrow Payment
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Funds are held securely and only released to the seller once
                  you receive and verify the item.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto px-4 md:px-5 pb-5 pt-2">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              icon={<Lock className="h-4 w-4" />}
              onClick={onPayEscrow}
            >
              Pay via Escrow
            </Button>
            <p className="mt-2 text-[11px] text-slate-400 text-center">
              By proceeding, you agree to our terms.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
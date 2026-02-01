import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsCartCheck, BsSearch, BsPlusLg, BsDashLg,
    BsTrash3Fill, BsLightningFill, BsShieldCheck, BsTruck,
    BsCloudUploadFill, BsStars, BsInfoCircleFill, BsBagCheckFill,
    BsCapsule, BsDropletFill, BsHeartPulseFill, BsMagic,
    BsXLg, BsArrowRightShort, BsChevronRight, BsCreditCard2BackFill,
    BsWallet2, BsBank2, BsGeoAltFill, BsTelephoneFill, BsPersonFill,
    BsActivity, BsHandIndexThumb
} from 'react-icons/bs';
import { pharmacyMedicines } from '../utils/pharmacyData';

const PharmacyHub = () => {
    const [cart, setCart] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isOrdering, setIsOrdering] = useState(false);
    const [orderStep, setOrderStep] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const [checkoutStep, setCheckoutStep] = useState(0); // 0: Cart, 1: Address, 2: Payment
    const [shippingData, setShippingData] = useState({ name: '', phone: '', address: '', city: '', pincode: '' });
    const [paymentMethod, setPaymentMethod] = useState('');
    const orderTimeoutRef = useRef(null);

    const medicines = pharmacyMedicines;
    const categories = ['All', 'Pain Relief', 'Wellness', 'Antibiotics', 'Chronic Care', 'Skin Care', 'Cough & Cold', 'Muscle Care'];

    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            if (orderTimeoutRef.current) clearTimeout(orderTimeoutRef.current);
        };
    }, []);

    const filteredMedicines = useMemo(() => {
        return medicines.filter(m =>
            (activeCategory === 'All' || m.category === activeCategory) &&
            m.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [activeCategory, searchQuery, medicines]);

    const addToCart = (med) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === med.id);
            if (existing) {
                return prev.map(item => item.id === med.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...med, qty: 1 }];
        });
        setShowCart(true);
        setCheckoutStep(0); // Reset to cart view when adding new item
    };

    const updateQty = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.qty + delta);
                return { ...item, qty: newQty };
            }
            return item;
        }));
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    const handlePlaceOrder = () => {
        if (!paymentMethod) {
            alert("Please select a payment method first!");
            return;
        }
        setIsOrdering(true);
        setOrderStep(1);

        orderTimeoutRef.current = setTimeout(() => {
            setOrderStep(2);
            orderTimeoutRef.current = setTimeout(() => {
                setOrderStep(3);
                orderTimeoutRef.current = setTimeout(() => {
                    setIsOrdering(false);
                    setCart([]);
                    setShowCart(false);
                    setCheckoutStep(0);
                    setOrderStep(0);
                    setPaymentMethod('');
                    setShippingData({ name: '', phone: '', address: '', city: '', pincode: '' });
                }, 3000);
            }, 3000);
        }, 2000);
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        if (shippingData.name && shippingData.phone && shippingData.address) {
            setCheckoutStep(2);
        } else {
            alert("Please fill all required fields!");
        }
    };

    return (
        <div className="min-h-screen bg-[#05080a] text-slate-100 font-inter overflow-hidden selection:bg-emerald-500/30">

            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-3xl border-b border-white/5 py-5 px-8">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-3 text-slate-500 hover:text-white transition-all group font-black uppercase text-[10px] tracking-[0.3em]">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-all" /> Smart Hub
                    </Link>
                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => { setShowCart(!showCart); setCheckoutStep(0); }}
                            className="relative p-2 text-2xl text-slate-300 hover:text-emerald-400 transition-all"
                        >
                            <BsCartCheck />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                        <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Inventory Live</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-8 relative z-10 h-screen overflow-y-auto custom-scrollbar">
                <div className="container mx-auto max-w-7xl">

                    {/* Hero Area */}
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 animate-slide-up">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-8">
                                <BsCapsule className="animate-spin-slow" />
                                <span className="text-xs font-black uppercase tracking-[0.4em]">Sehaat Pharma v4.0</span>
                            </div>
                            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-8">
                                PREMIER <span className="text-emerald-500 italic">PHARMACY</span>
                            </h1>
                            <p className="text-slate-400 text-xl font-medium italic">
                                "Skip the pharmacy lines. Get authentic medicines at your doorstep with <span className="text-white font-bold">Express Neural Delivery</span>."
                            </p>
                        </div>
                        <div className="relative w-full md:w-96">
                            <BsSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 text-xl" />
                            <input
                                type="text"
                                placeholder="Search medicine, salt, symptoms..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border-2 border-white/5 rounded-[2rem] py-6 pl-16 pr-8 text-lg font-bold outline-none focus:border-emerald-500/40 transition-all placeholder:text-slate-600"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-10 py-4 rounded-full border-2 font-black uppercase text-[10px] tracking-widest transition-all ${activeCategory === cat ? 'bg-emerald-600 border-emerald-500 text-white shadow-xl shadow-emerald-900/40' : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20 hover:text-white'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Medicine Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20 text-blue-50">
                        {filteredMedicines.map((med, i) => (
                            <div
                                key={med.id}
                                className="bg-slate-900/40 backdrop-blur-3xl border-2 border-white/5 rounded-[3.5rem] p-10 group hover:border-emerald-500/30 transition-all duration-500 animate-slide-up"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-20 h-20 rounded-3xl bg-emerald-600/10 border-2 border-emerald-600/20 flex items-center justify-center text-3xl text-emerald-500 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-700">
                                        {med.image === 'BsCapsule' ? <BsCapsule /> :
                                            med.image === 'BsDropletFill' ? <BsDropletFill /> :
                                                med.image === 'BsLightningFill' ? <BsLightningFill /> :
                                                    med.image === 'BsHeartPulseFill' ? <BsHeartPulseFill /> :
                                                        med.image === 'BsActivity' ? <BsActivity /> :
                                                            med.image === 'BsHandIndexThumb' ? <BsHandIndexThumb /> :
                                                                <BsMagic />}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{med.dose}</p>
                                        <p className="text-2xl font-black text-emerald-400">₹{med.price}</p>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{med.name}</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 h-12 overflow-hidden italic line-clamp-2">
                                    {med.desc}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-10 h-14 overflow-hidden">
                                    {med.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-slate-400">{tag}</span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => addToCart(med)}
                                    className="w-full py-6 rounded-3xl bg-emerald-600 text-white font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-emerald-500 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-emerald-900/20"
                                >
                                    Add to Cart <BsPlusLg />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Prescription Section Tip */}
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-[4rem] p-12 md:p-20 flex flex-col md:flex-row justify-between items-center gap-10 shadow-3xl mb-20">
                        <div className="max-w-2xl">
                            <h2 className="text-5xl font-black tracking-tighter uppercase mb-6 leading-none text-white">Have a prescription?</h2>
                            <p className="text-emerald-100/80 text-xl font-medium italic">
                                "Upload your doctor's slip. Our AI will automatically map the medicines and add them to your cart for direct checkout."
                            </p>
                        </div>
                        <button className="px-12 py-8 rounded-[3rem] bg-black/20 backdrop-blur-3xl border-2 border-white/20 text-white font-black uppercase text-xs tracking-[0.4em] flex items-center gap-6 hover:bg-black/40 transition-all group">
                            <BsCloudUploadFill className="text-3xl group-hover:scale-125 transition-transform" /> Upload Script
                        </button>
                    </div>

                </div>
            </main>

            {/* Smart Checkout Sidebar Overlay */}
            {showCart && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
                    <div className="relative w-full max-w-xl bg-[#0a0f0d] border-l border-white/10 h-full p-12 flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)] animate-slide-left">

                        {/* Progress Stepper */}
                        <div className="flex justify-between items-center mb-12 gap-2">
                            {[0, 1, 2].map((step) => (
                                <div key={step} className="flex-1 flex flex-col gap-2">
                                    <div className={`h-1.5 rounded-full transition-all duration-500 ${checkoutStep >= step ? 'bg-emerald-500' : 'bg-white/5'}`}></div>
                                    <span className={`text-[8px] font-black uppercase tracking-widest text-center ${checkoutStep >= step ? 'text-emerald-500' : 'text-slate-600'}`}>
                                        {step === 0 ? 'Cart' : step === 1 ? 'Shipping' : 'Payment'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center mb-10">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-xl text-white shadow-2xl">
                                    {checkoutStep === 0 ? <BsBagCheckFill /> : checkoutStep === 1 ? <BsGeoAltFill /> : <BsCreditCard2BackFill />}
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter">
                                    {checkoutStep === 0 ? 'My Sehaat Cart' : checkoutStep === 1 ? 'Shipping Info' : 'Payment Method'}
                                </h3>
                            </div>
                            <button onClick={() => setShowCart(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all">
                                <BsXLg />
                            </button>
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 -mr-4">

                            {/* STEP 0: CART VIEW */}
                            {checkoutStep === 0 && (
                                <div className="space-y-8 animate-fade-in">
                                    {cart.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40 mt-20">
                                            <BsCartCheck className="text-8xl mb-8" />
                                            <p className="text-2xl font-black uppercase">Cart is Empty!</p>
                                            <p className="italic font-medium mt-2">Browse the marketplace and add some health gear.</p>
                                        </div>
                                    ) : (
                                        cart.map(item => (
                                            <div key={item.id} className="p-8 rounded-[3rem] bg-white/5 border border-white/5 flex gap-8 items-center group">
                                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex-shrink-0 flex items-center justify-center text-2xl text-emerald-500">
                                                    {item.image === 'BsCapsule' ? <BsCapsule /> : item.image === 'BsDropletFill' ? <BsDropletFill /> : <BsLightningFill />}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-black uppercase tracking-tight">{item.name}</h4>
                                                    <p className="text-emerald-500 font-black">₹{item.price}</p>
                                                </div>
                                                <div className="flex items-center gap-4 bg-black/40 rounded-full px-4 py-2 border border-white/10">
                                                    <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:text-emerald-500"><BsDashLg /></button>
                                                    <span className="w-6 text-center font-black text-lg">{item.qty}</span>
                                                    <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:text-emerald-500"><BsPlusLg /></button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="p-4 text-slate-600 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100">
                                                    <BsTrash3Fill />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            {/* STEP 1: SHIPPING DETAILS FORM */}
                            {checkoutStep === 1 && (
                                <form onSubmit={handleAddressSubmit} className="space-y-6 animate-slide-left">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Full Name</label>
                                        <div className="relative">
                                            <BsPersonFill className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500" />
                                            <input
                                                type="text" required
                                                placeholder="Enter Name"
                                                className="w-full bg-white/5 border-2 border-white/5 rounded-3xl py-5 pl-14 pr-6 text-white font-bold outline-none focus:border-emerald-500/30 transition-all"
                                                value={shippingData.name}
                                                onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Phone Number</label>
                                        <div className="relative">
                                            <BsTelephoneFill className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500" />
                                            <input
                                                type="tel" required
                                                placeholder="Mobile Number"
                                                className="w-full bg-white/5 border-2 border-white/5 rounded-3xl py-5 pl-14 pr-6 text-white font-bold outline-none focus:border-emerald-500/30 transition-all"
                                                value={shippingData.phone}
                                                onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Complete Address</label>
                                        <textarea
                                            required rows="4"
                                            placeholder="House No, Street, Area..."
                                            className="w-full bg-white/5 border-2 border-white/5 rounded-3xl py-5 px-6 text-white font-bold outline-none focus:border-emerald-500/30 transition-all resize-none"
                                            value={shippingData.address}
                                            onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text" placeholder="City"
                                            className="w-full bg-white/5 border-2 border-white/5 rounded-3xl py-5 px-6 text-white font-bold outline-none focus:border-emerald-500/30"
                                            value={shippingData.city}
                                            onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                                        />
                                        <input
                                            type="text" placeholder="Pincode"
                                            className="w-full bg-white/5 border-2 border-white/5 rounded-3xl py-5 px-6 text-white font-bold outline-none focus:border-emerald-500/30"
                                            value={shippingData.pincode}
                                            onChange={(e) => setShippingData({ ...shippingData, pincode: e.target.value })}
                                        />
                                    </div>
                                    <div className="p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold italic leading-relaxed">
                                        "Ensure the address is correct for Express Neural Delivery."
                                    </div>
                                </form>
                            )}

                            {/* STEP 2: PAYMENT METHOD SELECTION */}
                            {checkoutStep === 2 && (
                                <div className="space-y-6 animate-slide-left">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 px-4">Select Payment Gear</p>
                                    {[
                                        { id: 'cod', label: 'Cash on Delivery', sub: 'Pay when meds arrive', icon: <BsTruck /> },
                                        { id: 'upi', label: 'UPI / GPay / PhonePe', sub: 'Instant & Secure', icon: <BsStars /> },
                                        { id: 'card', label: 'Credit / Debit Card', sub: 'All major banks supported', icon: <BsCreditCard2BackFill /> },
                                        { id: 'netBanking', label: 'Net Banking', sub: 'Direct from bank', icon: <BsBank2 /> },
                                        { id: 'wallet', label: 'Sehaat Wallet', sub: 'Use your reward credits', icon: <BsWallet2 /> }
                                    ].map(method => (
                                        <div
                                            key={method.id}
                                            onClick={() => setPaymentMethod(method.id)}
                                            className={`p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer flex items-center justify-between group ${paymentMethod === method.id ? 'bg-emerald-600 border-emerald-500 shadow-xl shadow-emerald-900/40' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${paymentMethod === method.id ? 'bg-white/20 text-white' : 'bg-white/5 text-emerald-500'}`}>
                                                    {method.icon}
                                                </div>
                                                <div>
                                                    <p className="font-black uppercase tracking-tight text-sm">{method.label}</p>
                                                    <p className={`text-[9px] font-bold uppercase ${paymentMethod === method.id ? 'text-emerald-100' : 'text-slate-600'}`}>{method.sub}</p>
                                                </div>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === method.id ? 'border-white bg-white' : 'border-white/10'}`}>
                                                {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                        {/* Footer / Action Section */}
                        {cart.length > 0 && (
                            <div className="mt-12 pt-10 border-t border-white/10">
                                <div className="flex justify-between items-center mb-10">
                                    <div className="flex flex-col">
                                        <p className="text-slate-500 font-black uppercase tracking-widest text-[9px]">Grand Total</p>
                                        <p className="text-5xl font-black text-white tracking-tighter">₹{cartTotal}</p>
                                    </div>
                                    {checkoutStep > 0 && (
                                        <button
                                            onClick={() => setCheckoutStep(prev => prev - 1)}
                                            className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all underline underline-offset-4"
                                        >
                                            Go Back
                                        </button>
                                    )}
                                </div>

                                {checkoutStep === 0 && (
                                    <button
                                        onClick={() => setCheckoutStep(1)}
                                        className="w-full py-8 rounded-[2rem] bg-emerald-600 text-white font-black uppercase text-xs tracking-[0.4em] flex items-center justify-center gap-6 hover:bg-emerald-500 hover:scale-[1.02] shadow-2xl transition-all"
                                    >
                                        Proceed to Address <BsChevronRight className="text-xl" />
                                    </button>
                                )}

                                {checkoutStep === 1 && (
                                    <button
                                        onClick={handleAddressSubmit}
                                        className="w-full py-8 rounded-[2rem] bg-blue-600 text-white font-black uppercase text-xs tracking-[0.4em] flex items-center justify-center gap-6 hover:bg-blue-500 hover:scale-[1.02] shadow-2xl transition-all"
                                    >
                                        Select Payment <BsChevronRight className="text-xl" />
                                    </button>
                                )}

                                {checkoutStep === 2 && (
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={!paymentMethod}
                                        className={`w-full py-10 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.5em] flex items-center justify-center gap-6 shadow-2xl transition-all ${paymentMethod ? 'bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-[1.03]' : 'bg-white/5 text-slate-700 cursor-not-allowed'}`}
                                    >
                                        Confirm & Place Order <BsArrowRightShort className="text-3xl" />
                                    </button>
                                )}

                                <div className="mt-8 flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-600 italic">
                                    <BsShieldCheck className="text-emerald-500 text-lg" /> 256-Bit SSL Encrypted Healthcare Gear
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Delivery Simulator Model */}
            {isOrdering && (
                <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-12">
                    <div className="max-w-4xl w-full text-center">
                        <div className="relative mb-20 animate-fade-in">
                            {/* Delivery Path Simulator */}
                            <div className="w-full h-1.5 bg-white/5 rounded-full relative overflow-hidden">
                                <div className="absolute h-full bg-emerald-500 transition-all duration-[3000ms] shadow-[0_0_20px_rgba(16,185,129,0.5)]" style={{ width: `${(orderStep / 3) * 100}%` }}></div>
                            </div>
                            <div className="flex justify-between mt-8 relative">
                                {[
                                    { step: 1, label: 'Order Processing', icon: <BsStars /> },
                                    { step: 2, label: 'Packed & Dispatched', icon: <BsBagCheckFill /> },
                                    { step: 3, label: 'Live Delivery Tracker', icon: <BsTruck /> }
                                ].map(s => (
                                    <div key={s.step} className={`flex flex-col items-center gap-4 transition-all duration-1000 ${orderStep >= s.step ? 'text-emerald-400 scale-110' : 'text-slate-700 opacity-40'}`}>
                                        <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center text-4xl border-2 transition-all duration-700 ${orderStep >= s.step ? 'bg-emerald-600/20 border-emerald-500 shadow-2xl shadow-emerald-900/40 animate-pulse' : 'bg-white/5 border-white/5'}`}>
                                            {s.icon}
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="animate-slide-up">
                            <h3 className="text-7xl font-black mb-6 uppercase tracking-tighter leading-none">
                                {orderStep === 1 ? 'Securing Stock' : orderStep === 2 ? 'In-Flight Dispatch' : 'Approaching Location'}
                            </h3>
                            <p className="text-slate-500 text-2xl font-medium italic max-w-2xl mx-auto leading-relaxed h-16">
                                {orderStep === 1 ? "Our Neural Warehouse is picking the freshest batch for you..." : orderStep === 2 ? "Payment verified. Shipping partner is on the way to dispatch." : "Sehaat Express partner is 2km away from your address. Get ready!"}
                            </p>

                            {/* Success UI when finished */}
                            {orderStep === 0 && !isOrdering && (
                                <div className="animate-bounce mt-10 text-emerald-500 text-8xl">
                                    <BsHeartPulseFill />
                                </div>
                            )}

                            <div className="mt-20 flex justify-center gap-4">
                                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-1.5 h-12 rounded-full bg-emerald-600 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>)}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slide-up { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slide-left { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
                .animate-slide-up { animation: slide-up 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
                .animate-fade-in { animation: fade-in 1.2s ease-out forwards; }
                .animate-slide-left { animation: slide-left 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
                .animate-spin-slow { animation: spin 15s linear infinite; }
                .font-inter { font-family: 'Inter', sans-serif; }
                .shadow-3xl { box-shadow: 0 50px 120px -30px rgba(0,0,0,0.7); }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16,185,129,0.1); border-radius: 20px; }
                input::placeholder, textarea::placeholder { opacity: 0.3; }
            `}</style>
        </div>
    );
};

export default PharmacyHub;

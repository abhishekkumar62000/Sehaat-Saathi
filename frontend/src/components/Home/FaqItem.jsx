import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const FaqItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-5 lg:p-6 rounded-[2rem] border border-solid transition-all duration-300 mb-4 cursor-pointer overflow-hidden ${isOpen
                    ? "bg-white border-orange-200 shadow-xl"
                    : "bg-slate-50/50 border-slate-100 hover:bg-white hover:border-green-200 hover:shadow-md"
                }`}
            onClick={toggleAccordion}
        >
            <div className="flex items-center justify-between gap-5">
                <h4 className={`text-lg lg:text-xl font-black uppercase tracking-tighter transition-colors duration-300 ${isOpen ? "text-orange-600" : "text-slate-900 group-hover:text-green-600"
                    }`}>
                    {item.question}
                </h4>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors duration-300 shrink-0 ${isOpen
                            ? "bg-orange-500 text-white shadow-lg"
                            : "bg-white text-slate-900 border border-slate-100 shadow-sm"
                        }`}
                >
                    {isOpen ? <AiOutlineMinus className="text-xl" /> : <AiOutlinePlus className="text-xl" />}
                </motion.div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="pt-6 border-t border-slate-100 mt-6">
                            <p
                                className="text-base lg:text-lg font-medium text-slate-600 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: item.answer }}
                            />
                        </div>
                        <div className="mt-4 flex items-center gap-2 opacity-30">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                            <span className="w-10 h-0.5 bg-slate-400 rounded-full"></span>
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FaqItem;

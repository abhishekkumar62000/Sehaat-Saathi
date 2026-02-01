import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const FaqItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="p-3 lg:p-5 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer bg-white/40 backdrop-blur-md hover:bg-white/60 transition-all duration-300 shadow-sm hover:shadow-md group">
            <div
                className="flex items-center justify-between gap-5"
                onClick={toggleAccordion}
            >
                <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-[700] group-hover:text-teal-600 transition-colors duration-300">
                    {item.question}
                </h4>
                <div
                    className={`${isOpen && "bg-teal-600 text-white border-none"
                        } w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#181A1E] rounded flex items-center justify-center transition-all duration-300 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                >
                    {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </div>
            </div>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[1000px] mt-4 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <p className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                    {item.answer}
                </p>
            </div>
        </div>
    );
};

export default FaqItem;

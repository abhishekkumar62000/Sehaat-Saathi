import call from "../../assets/images/home/card/call.png";
import clock from "../../assets/images/home/card/clock.png";
import location from "../../assets/images/home/card/location.png";

const BestCard = () => {
  const cardData = [
    {
      id: 1,
      title: "Our Location ",
      desc: "Bara Bazar, Madhubani, Bihar, India - 847211",
      bgColor: "bg-gradient-to-r from-[#009E60] to-[#007F4D]",
      icon: location,
    },
    {
      id: 2,
      title: "Opening Hours",
      desc: "24/7 Every day, every time.",
      bgColor: "bg-gradient-to-r from-[#FF8C00] to-[#FFAA00]",
      icon: clock,
    },

    {
      id: 3,
      title: "Contact Us Now",
      desc: "(+91) 6200087830",
      bgColor: "bg-gradient-to-r from-[#009E60] to-[#007F4D]",
      icon: call,
    },
  ];
  return (
    <section className="container mb-10 w-full md:w-[90%] lg:w-[85%]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {cardData.map((data, id) => (
          <div
            className={`flex flex-col md:flex-row items-center justify-center lg:gap-4 gap-2 ${data.bgColor} rounded-xl py-6 shadow-lg transform hover:-translate-y-2 transition-transform duration-300`}
            key={id}
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm p-3">
              <img src={data.icon} alt={data?.title} className="w-10 h-10 object-contain drop-shadow-md filter brightness-0 invert" />
            </div>
            <div className="text-center md:text-left text-white">
              <h3 className="text-[22px] font-black tracking-tight">{data?.title}</h3>
              <p className="text-sm font-medium text-white/90">{data?.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestCard;

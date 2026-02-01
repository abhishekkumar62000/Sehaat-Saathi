import { AiFillStar } from "react-icons/ai";
import { FaQuoteRight } from "react-icons/fa";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { testimonials } from "../../assets/data/testimonialData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Testimonial = () => {
  return (
    <section className="container mx-auto px-4 py-20 mb-10 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-100 rounded-full blur-[100px] -z-10 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-[100px] -z-10 opacity-50"></div>

      {/* Enhanced Header Section */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-violet-600 uppercase bg-violet-50 rounded-full">
          Patient Stories
        </span>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Patients Say</span>
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-violet-400 to-indigo-500 mx-auto rounded-full mb-6"></div>
        <p className="max-w-2xl mx-auto text-gray-500 text-lg font-medium">
          Trusted by thousands of families for our accuracy, compassion, and
          digital-first healthcare approach in 2026.
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop={true}
        className="testimonial-swiper pb-16"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="py-10">
            <div className="group relative bg-white/70 backdrop-blur-xl border border-white rounded-[40px] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-4">

              {/* Floating Avatar */}
              <div className="absolute -top-10 left-10 transition-transform duration-500 group-hover:scale-110">
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-500 rounded-full blur-lg opacity-20 group-hover:opacity-40"></div>
                  <img
                    src={testimonial.image}
                    alt={testimonial.patient}
                    className="w-20 h-20 rounded-full border-4 border-white shadow-xl relative z-10 object-cover"
                  />
                </div>
              </div>

              {/* Quote Icon */}
              <div className="absolute top-8 right-8 text-violet-100 transition-colors duration-300 group-hover:text-violet-200">
                <FaQuoteRight size={40} />
              </div>

              <div className="mt-10 flex-grow">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <AiFillStar
                      key={i}
                      className={i < testimonial.rating ? "text-amber-400" : "text-gray-200"}
                    />
                  ))}
                </div>

                <p className="text-gray-600 leading-relaxed italic text-lg mb-8 line-clamp-4">
                  "{testimonial.description}"
                </p>
              </div>

              {/* Patient Info */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-xl font-bold text-slate-800">
                  {testimonial.patient}
                </h3>
                <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mt-1">
                  Verified Patient
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #7c3aed !important;
          width: 24px !important;
          border-radius: 4px !important;
        }
        .testimonial-swiper .swiper-pagination {
          bottom: 0px !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonial;

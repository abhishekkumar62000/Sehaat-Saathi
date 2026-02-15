import { motion } from "framer-motion";
import CountdownBg from "../../assets/images/home/CountdownBg.png";

const stats = [
  {
    label: "Year of Innovation",
    value: "1+",
    color: "#FF9933", // Saffron
  },
  {
    label: "Patients Satisfaction",
    value: "99%",
    color: "#FFFFFF", // White
  },
  {
    label: "Happy Patients",
    value: "1,000+",
    color: "#138808", // Green
  },
  {
    label: "Strategic Partners",
    value: "5+",
    color: "#FF9933", // Saffron
  },
  {
    label: "Specialized Doctors",
    value: "50+",
    color: "#138808", // Green
  },
];

const Countdown = () => {
  return (
    <section className="w-full flex justify-center items-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-7xl bg-cover bg-center py-12 rounded-2xl shadow-2xl relative overflow-hidden"
        style={{
          backgroundImage: `url(${CountdownBg})`,
        }}
      >
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

        <div className="relative z-10 container mx-auto text-center px-4">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl lg:text-4xl font-extrabold mb-10 font-mono tracking-tight"
          >
            <span className="text-gray-800">Why Choose </span>
            <span style={{ color: "#FF9933" }} className="drop-shadow-sm">Sehaat</span>{" "}
            <span style={{ color: "#138808" }} className="drop-shadow-sm">Saathi</span>?
          </motion.h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  transition: { duration: 0.2 }
                }}
                className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md shadow-lg flex flex-col items-center justify-center transition-all duration-300 group cursor-default"
              >
                <motion.h3
                  className="text-5xl font-black mb-2 drop-shadow-md"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-900 font-semibold text-lg text-center leading-tight group-hover:text-gray-700 transition-colors">
                  {stat.label}
                </p>
                {/* Visual underline accent */}
                <div
                  className="h-1 w-10 mt-3 rounded-full opacity-50 group-hover:w-16 group-hover:opacity-100 transition-all duration-300"
                  style={{ backgroundColor: stat.color }}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Countdown;

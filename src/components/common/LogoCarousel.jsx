import { motion } from "framer-motion";
import { partnerLogos } from "../../../public/data";

//  Infinite Logo Carousel
const LogoCarousel = () => {
  const doubled = [...partnerLogos, ...partnerLogos];
  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-theme-secondary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-theme-secondary to-transparent z-10 pointer-events-none" />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 w-max py-1"
      >
        {doubled.map((logo, i) => (
          <div
            key={i}
            className={`flex-shrink-0 flex items-center justify-center h-16 w-40 rounded-2xl hover:-translate-y-1 transition-all duration-300 cursor-default`}
          >
            <img
              src={logo.image}
              alt={logo.name}
              className="h-10 w-full object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
export default LogoCarousel;

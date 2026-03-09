import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";
import { testimonials } from "../../../public/data";

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);
  const total = testimonials.length;

  const go = (dir) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + total) % total);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => go(1), 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  const resetTimer = (dir) => {
    clearInterval(timerRef.current);
    go(dir);
    timerRef.current = setInterval(() => go(1), 4500);
  };

  const visible = [0, 1, 2].map(
    (offset) => testimonials[(current + offset) % total],
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visible.map((t, idx) => (
          <motion.div
            key={`${current}-${idx}`}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.42,
              delay: idx * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`card-theme border rounded-2xl p-6 transition-all duration-300
              ${idx === 0 ? "border-purple-500/30 shadow-lg shadow-purple-500/5" : ""}
              ${idx > 0 ? "hidden md:block" : ""}`}
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <FaStar
                  key={i}
                  className="w-3 h-3 text-amber-400 fill-current"
                />
              ))}
            </div>
            <FaQuoteLeft className="text-purple-500/20 w-6 h-6 mb-3" />
            <p className="text-theme-secondary text-sm leading-relaxed mb-5">
              "{t.text}"
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-theme">
              <div
                className={`w-10 h-10 rounded-full flex-shrink-0 overflow-hidden border-2 border-purple-500/30 ${!t.image ? `bg-gradient-to-br ${t.color}` : ""}`}
              >
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {t.avatar}
                  </div>
                )}
              </div>
              <div>
                <p className="text-theme-primary font-semibold text-sm">
                  {t.name}
                </p>
                <p className="text-theme-muted text-xs">
                  {t.role} @ {t.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => resetTimer(-1)}
          className="w-9 h-9 rounded-full border border-theme text-theme-muted hover:text-purple-400 hover:border-purple-500/50 flex items-center justify-center transition"
        >
          <FaChevronLeft className="w-3.5 h-3.5" />
        </button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
                clearInterval(timerRef.current);
              }}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-purple-500" : "w-2 h-2 bg-theme-muted/30 hover:bg-purple-400/50"}`}
            />
          ))}
        </div>
        <button
          onClick={() => resetTimer(1)}
          className="w-9 h-9 rounded-full border border-theme text-theme-muted hover:text-purple-400 hover:border-purple-500/50 flex items-center justify-center transition"
        >
          <FaChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
export default TestimonialCarousel;

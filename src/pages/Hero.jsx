import { Calendar, Clock, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useConfig } from "@/hooks/useConfig";
import { formatEventDate } from "@/lib/formatEventDate";
import { getGuestName } from "@/lib/invitationStorage";

export default function Hero() {
  const config = useConfig(); // Use hook to get config from API or fallback to static
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    // Get guest name from localStorage
    const storedGuestName = getGuestName();
    if (storedGuestName) {
      setGuestName(storedGuestName);
    }
  }, []);

  const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    function calculateTimeLeft() {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    }
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearInterval(timer);
    }, [targetDate]);

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 w-full max-w-sm sm:max-w-none">
        {Object.keys(timeLeft).map((interval, i) => (
          <motion.div
            key={interval}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.05 * i }}
            className="flex flex-col items-center justify-center min-h-[72px] sm:min-h-0 sm:py-4 py-4 px-3 bg-white rounded-2xl border border-sand-200 shadow-sm active:bg-sand-50"
          >
            <span className="text-2xl sm:text-3xl font-semibold font-serif text-terracotta-600 tabular-nums">
              {timeLeft[interval]}
            </span>
            <span className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-widest mt-1">{interval}</span>
          </motion.div>
        ))}
      </div>
    );
  };

  const FloatingHearts = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: window.innerHeight,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.5],
              x: Math.random() * window.innerWidth,
              y: -100,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut",
            }}
            className="absolute"
          >
            <Heart
              className={`w-${Math.floor(Math.random() * 2) + 8} h-${Math.floor(Math.random() * 2) + 8} ${
                i % 4 === 0
                  ? "text-sage-400"
                  : i % 4 === 1
                    ? "text-terracotta-400"
                    : i % 4 === 2
                      ? "text-lavender-400"
                      : "text-amber-400"
              }`}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <>
      <section
        id="home"
        className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center relative overflow-hidden bg-gradient-to-b from-white via-sand-50/50 to-sage-50/50"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-8 relative z-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block"
          >
            <span className="px-4 py-1.5 text-xs font-medium tracking-[0.2em] uppercase text-terracotta-600 rounded-full border border-terracotta-300/60 bg-terracotta-400/5">
              Save the date
            </span>
          </motion.div>

          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-stone-500 font-serif italic text-base sm:text-lg text-terracotta-600/90"
            >
              We're getting married
            </motion.p>
            <motion.h2
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-3xl sm:text-5xl font-serif font-medium text-stone-800 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-stone-800 via-terracotta-600 to-stone-800"
            >
              {config.groomName} & {config.brideName}
            </motion.h2>
          </div>

          {/* Guest card */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="relative max-w-sm mx-auto"
          >
            <div className="relative px-5 sm:px-8 py-6 sm:py-10 rounded-2xl bg-white border border-sand-200 shadow-sm">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-sage-300/50 to-transparent" />
              <div className="space-y-5 text-center">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-center gap-2 text-stone-600">
                    <Calendar className="w-4 h-4 text-sage-500" strokeWidth={2} />
                    <span className="font-medium text-sm">{formatEventDate(config.date, "full")}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-stone-600">
                    <Clock className="w-4 h-4 text-sage-500" strokeWidth={2} />
                    <span className="font-medium text-sm">{config.time}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 py-1">
                  <div className="h-px flex-1 max-w-8 bg-sage-200/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-sage-400/70" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
                  <div className="h-px flex-1 max-w-8 bg-terracotta-200/50" />
                </div>
                <div className="space-y-1">
                  <p className="text-stone-500 font-serif italic text-sm">To</p>
                  <p className="text-stone-600 text-sm font-medium">Mr. / Mrs. / Ms.</p>
                  <p className="text-terracotta-600 font-semibold text-lg tracking-wide">
                    {guestName || "Our Guest"}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-sage-300/50 to-transparent" />
            </div>
          </motion.div>

          <CountdownTimer targetDate={config.date} />

          <div className="pt-4 relative">
            <FloatingHearts />
            <motion.div
              animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-10 sm:w-12 h-10 sm:h-12 text-terracotta-500 mx-auto" fill="currentColor" />
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

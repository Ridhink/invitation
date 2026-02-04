// src/pages/LandingPage.jsx
import { useConfig } from '@/hooks/useConfig';
import { formatEventDate } from '@/lib/formatEventDate';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

const LandingPage = ({ onOpenInvitation }) => {
  const config = useConfig(); // Use hook to get config from API or fallback to static

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
    className="min-h-[100dvh] relative overflow-hidden bg-gradient-to-br from-sage-50 via-sand-50 to-lavender-50"
  >
    {/* Animated gradient orbs */}
    <div className="absolute inset-0 bg-gradient-radial-soft" />
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 right-0 w-96 h-96 md:w-[28rem] md:h-[28rem] rounded-full blur-3xl bg-gradient-to-br from-sage-300/40 to-amber-200/30 -translate-y-1/4 translate-x-1/4"
    />
    <motion.div
      animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-0 left-0 w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-full blur-3xl bg-gradient-to-tr from-terracotta-200/40 to-lavender-300/30 -translate-x-1/4 translate-y-1/4"
    />
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full blur-3xl bg-amber-200/25 -translate-x-1/2 -translate-y-1/2"
    />
    <motion.div
      animate={{ y: [0, 12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full blur-3xl bg-lavender-300/25"
    />

    <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-4 py-6 sm:px-5 sm:py-8">
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-md"
      >
        {/* Card with gradient border effect */}
        <div className="relative rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-br from-sage-300 via-amber-200 to-lavender-300 shadow-lg sm:shadow-elegant">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[22px] bg-white/95 backdrop-blur-sm p-6 sm:p-10">
            {/* Top ornament - animated dots */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <div className="h-px flex-1 max-w-[4rem] bg-gradient-to-r from-transparent to-terracotta-400/70" />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-gradient-to-br from-sage-400 to-sage-600"
              />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="w-2 h-2 rounded-full bg-gradient-to-br from-amber-400 to-amber-600"
              />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                className="w-2 h-2 rounded-full bg-gradient-to-br from-lavender-400 to-lavender-500"
              />
              <div className="h-px flex-1 max-w-[4rem] bg-gradient-to-l from-transparent to-terracotta-400/70" />
            </motion.div>

            {/* Date & time pills - staggered */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-3 mb-8 items-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-sage-50 to-sage-100 border border-sage-200/80 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-sage-500" strokeWidth={2} />
                <p className="text-stone-700 font-medium text-sm tracking-wide">
                  {formatEventDate(config.date)}
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200/80 shadow-sm"
              >
                <Clock className="w-4 h-4 text-amber-500" strokeWidth={2} />
                <p className="text-stone-700 font-medium text-sm tracking-wide">{config.time}</p>
              </motion.div>
            </motion.div>

            {/* Names with gradient text accent */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-center space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-medium leading-tight tracking-tight">
                <span className="text-stone-800">{config.groomName}</span>
                <span className="mx-2 font-light italic bg-gradient-to-r from-sage-500 to-amber-500 bg-clip-text text-transparent">&</span>
                <span className="text-stone-800">{config.brideName}</span>
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-sage-400/80 to-transparent origin-center"
              />
            </motion.div>

            {/* CTA - gradient button with shine */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-6 sm:mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenInvitation}
                className="relative w-full min-h-[52px] sm:min-h-[48px] flex items-center justify-center gap-2 rounded-2xl overflow-hidden bg-gradient-to-r from-terracotta-500 via-terracotta-600 to-amber-600 text-white px-6 py-4 sm:py-3.5 text-base font-semibold shadow-lg active:brightness-95 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Open Invitation</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]" style={{ backgroundSize: '200% 100%' }} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
  );
};

export default LandingPage;

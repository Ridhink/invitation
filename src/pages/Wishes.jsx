import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import Marquee from "@/components/ui/marquee";
import {
  Calendar,
  Clock,
  ChevronDown,
  User,
  MessageCircle,
  Send,
  CheckCircle,
  XCircle,
  HelpCircle,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { formatEventDate } from "@/lib/formatEventDate";
import { getGuestName } from "@/lib/invitationStorage";

const WISHES_STORAGE_KEY = "sakeenah_wishes";

function getWishesFromStorage() {
  try {
    const raw = localStorage.getItem(WISHES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveWishesToStorage(wishes) {
  try {
    localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(wishes));
  } catch (e) {
    console.error("Failed to save wishes:", e);
  }
}

export default function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newWish, setNewWish] = useState("");
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load wishes from localStorage
  useEffect(() => {
    setWishes(getWishesFromStorage());
  }, []);

  // Get guest name from localStorage
  useEffect(() => {
    const storedGuestName = getGuestName();
    if (storedGuestName) {
      setGuestName(storedGuestName);
    }
  }, []);

  const options = [
    { value: "ATTENDING", label: "Yes, I will attend" },
    { value: "NOT_ATTENDING", label: "No, I cannot attend" },
    { value: "MAYBE", label: "Maybe, I will confirm later" },
  ];

  const handleSubmitWish = (e) => {
    e.preventDefault();
    if (!newWish.trim() || !guestName.trim()) return;

    setIsSubmitting(true);
    const wish = {
      id: crypto.randomUUID?.() ?? `wish-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: guestName.trim(),
      message: newWish.trim(),
      attendance: attendance || "MAYBE",
      created_at: new Date().toISOString(),
    };
    const nextWishes = [wish, ...wishes];
    setWishes(nextWishes);
    saveWishesToStorage(nextWishes);
    setNewWish("");
    setGuestName("");
    setAttendance("");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    setIsSubmitting(false);
  };
  const getAttendanceIcon = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case "attending":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "not_attending":
      case "not-attending":
        return <XCircle className="w-4 h-4 text-sage-500" />;
      case "maybe":
        return <HelpCircle className="w-4 h-4 text-amber-500" />;
      default:
        return null;
    }
  };
  return (
    <>
      <section id="wishes" className="min-h-[100dvh] relative overflow-hidden bg-gradient-to-b from-white via-lavender-50/40 to-sage-50/50 py-12 sm:py-20">
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <span className="inline-block text-lavender-500 text-xs font-medium tracking-[0.2em] uppercase">
              Send Your Best Wishes
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-800 leading-tight tracking-tight">
              Messages & Wishes
            </h2>
            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="h-px w-12 bg-lavender-300/60" />
              <MessageCircle className="w-5 h-5 text-sage-500" />
              <div className="h-px w-12 bg-terracotta-200/60" />
            </div>
          </motion.div>

          {/* Wishes List */}
          <div className="max-w-2xl mx-auto space-y-6">
            {(!wishes || wishes.length === 0) && (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  No messages yet. Be the first!
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  (Messages are saved locally on your device)
                </p>
              </div>
            )}

            {wishes && wishes.length > 0 && (
              <AnimatePresence>
                <Marquee
                  pauseOnHover={true}
                  repeat={2}
                  className="[--duration:40s] [--gap:1rem] py-2"
                >
                  {wishes.map((wish, index) => (
                    <motion.div
                      key={wish.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative w-[300px] h-[160px] flex-shrink-0"
                    >
                      {/* Background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-sand-100/80 to-white rounded-2xl transform transition-transform group-hover:scale-[1.02] duration-300" />

                      {/* Card content */}
                      <div className="relative h-full backdrop-blur-sm bg-white/95 p-4 rounded-2xl border border-sand-200/60 shadow-soft flex flex-col">
                        {/* Header */}
                        <div className="flex items-center space-x-3 mb-3">
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center text-white text-sm font-semibold shadow-soft">
                              {wish.name[0].toUpperCase()}
                            </div>
                          </div>

                          {/* Name, Time, and Attendance */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-gray-800 text-sm truncate max-w-[140px]">
                                {wish.name}
                              </h4>
                              {getAttendanceIcon(wish.attendance)}
                            </div>
                            <div className="flex items-center space-x-1 text-gray-400 text-xs mt-0.5">
                              <Clock className="w-3 h-3 flex-shrink-0" />
                              <time className="truncate">
                                {formatEventDate(
                                  wish.created_at,
                                  "short",
                                  true,
                                )}
                              </time>
                            </div>
                          </div>

                          {/* New badge */}
                          {Date.now() - new Date(wish.created_at).getTime() <
                            3600000 && (
                            <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-sage-400/15 text-sage-600 text-xs font-medium">
                              New
                            </span>
                          )}
                        </div>

                        {/* Message */}
                        <div className="flex-1 overflow-hidden">
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {wish.message}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </Marquee>
              </AnimatePresence>
            )}
          </div>
          {/* Wishes Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <form onSubmit={handleSubmitWish} className="relative">
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-sand-200 shadow-sm">
                <div className="space-y-2">
                  {/* Name Input - Pre-filled from URL or editable */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <User className="w-4 h-4" />
                      <span>Your Name</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your name..."
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-sand-50 border border-sand-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200/50 text-base text-stone-700 placeholder-stone-400"
                      required
                    />
                    {guestName && (
                      <p className="text-xs text-gray-500 italic">
                        Pre-filled from your invitation. You can change it if needed.
                      </p>
                    )}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2 relative"
                  >
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Will you be attending?</span>
                    </div>

                    {/* Custom Select Button */}
                    <button
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-sand-50 border border-sand-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200/50 text-left flex items-center justify-between text-base"
                    >
                      <span
                        className={
                          attendance ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        {attendance
                          ? options.find((opt) => opt.value === attendance)
                              ?.label
                          : "Select attendance..."}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          isOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Options */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-soft border border-sand-200 overflow-hidden"
                        >
                          {options.map((option) => (
                            <motion.button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setAttendance(option.value);
                                setIsOpen(false);
                              }}
                              whileHover={{
                                backgroundColor: "rgb(255, 241, 242)",
                              }}
                              className={`w-full px-4 py-2.5 text-left transition-colors
                                        ${
                                          attendance === option.value
                                            ? "bg-sage-400/10 text-sage-600"
                                            : "text-stone-700 hover:bg-sand-100"
                                        }`}
                            >
                              {option.label}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  {/* Wish Textarea */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>Your message</span>
                    </div>
                    <textarea
                      placeholder="Share your wishes for the couple..."
                      value={newWish}
                      onChange={(e) => setNewWish(e.target.value)}
                      className="w-full min-h-[120px] p-4 rounded-xl bg-sand-50 border border-sand-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200/50 resize-none text-base"
                      required
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Messages are saved locally on your device.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{
                      scale: isSubmitting ? 1 : 1.02,
                    }}
                    whileTap={{
                      scale: isSubmitting ? 1 : 0.98,
                    }}
                    className={`w-full min-h-[52px] flex items-center justify-center space-x-2 px-6 py-4 rounded-xl text-white text-base font-semibold transition-all duration-200
                    ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-terracotta-500 active:brightness-95"
                    }`}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>
                      {isSubmitting
                        ? "Sending..."
                        : "Send Wishes"}
                    </span>
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// src/components/bottom-bar/BottomBar.jsx
import React, { useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  CalendarHeart,
  MapPin,
  MessageCircleHeart
} from 'lucide-react';
import { cn } from "@/lib/utils";

const baseMenuItems = [
  { icon: Home, label: 'Home', href: '#home', id: 'home' },
  { icon: CalendarHeart, label: 'Events', href: '#event', id: 'event' },
  { icon: MapPin, label: 'Location', href: '#location', id: 'location' },
  { icon: MessageCircleHeart, label: 'Wishes', href: '#wishes', id: 'wishes' },
];

/**
 * BottomBar is a React functional component that renders a fixed bottom navigation bar
 * with automatic section detection based on scroll position.
 *
 * This component uses Framer Motion to animate its entrance and the Intersection Observer API
 * to automatically detect which section is currently in view. It provides smooth transitions
 * for opacity and vertical movement, and highlights the active section based on scroll position.
 * The component also supports manual navigation by clicking on menu items.
 *
 * @component
 * @example
 * // Basic usage:
 * <BottomBar />
 *
 * @returns {JSX.Element} A JSX element containing the animated bottom navigation bar with auto-detection.
 */
const BottomBar = () => {
  const [active, setActive] = React.useState('home');
  const menuItems = baseMenuItems;

  // Function to handle smooth scrolling when clicking menu items
  const handleMenuClick = useCallback((e, href, id) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // Temporarily set active state for immediate feedback
      setActive(id);

      // Smooth scroll to element
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Set up Intersection Observer for automatic section detection
  useEffect(() => {
    const observerOptions = {
      root: null, // Use viewport as root
      rootMargin: '-20% 0px -80% 0px', // Trigger when section is 20% visible from top
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          // Only update if it's a valid menu section
          const validSection = menuItems.find(item => item.id === sectionId);
          if (validSection) {
            setActive(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections that correspond to menu items
    menuItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, [menuItems]);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-sand-200 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] md:bottom-4 md:left-1/2 md:right-auto md:w-auto md:max-w-[400px] md:-translate-x-1/2 md:rounded-2xl md:border md:border-sand-200/80 md:shadow-soft md:mx-4"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-stretch justify-around md:justify-center md:gap-0 h-14 md:h-auto md:py-2.5 md:px-2">
        {menuItems.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 min-w-0 min-h-[44px] md:min-w-[64px] md:min-h-[52px] rounded-lg md:rounded-xl transition-colors duration-200 active:bg-sand-100/80",
              active === item.id
                ? "text-sage-600 bg-sage-100/80"
                : "text-stone-500"
            )}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => handleMenuClick(e, item.href, item.id)}
          >
            <item.icon
              className={cn(
                "w-6 h-6 md:w-5 md:h-5 shrink-0 mb-0.5 transition-all duration-200",
                active === item.id
                  ? "stroke-sage-600 stroke-[2.5px]"
                  : "stroke-stone-400 stroke-2"
              )}
            />
            <span
              className={cn(
                "text-[11px] md:text-xs font-medium line-clamp-1",
                active === item.id ? "text-sage-600" : "text-stone-500"
              )}
            >
              {item.label}
            </span>
          </motion.a>
        ))}
      </div>
    </nav>
  );
};

export default BottomBar;
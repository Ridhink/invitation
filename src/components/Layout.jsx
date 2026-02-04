import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, PauseCircle, PlayCircle } from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';
import BottomBar from '@/components/BottomBar';

const Layout = ({ children }) => {
  const config = useConfig();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef(null);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio(config.audio?.src || '/audio/fulfilling-humming.mp3');
    audioRef.current.loop = config.audio?.loop !== false;

    const attemptAutoplay = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        wasPlayingRef.current = true;
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } catch (error) {
        console.log('Autoplay failed, waiting for user interaction');
        const handleFirstInteraction = async () => {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
            wasPlayingRef.current = true;
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            document.removeEventListener('click', handleFirstInteraction);
          } catch (err) {
            console.error('Playback failed after interaction:', err);
          }
        };
        document.addEventListener('click', handleFirstInteraction);
      }
    };

    attemptAutoplay();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        wasPlayingRef.current = isPlaying;
        if (audioRef.current && isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        if (audioRef.current && wasPlayingRef.current) {
          audioRef.current.play().catch(console.error);
          setIsPlaying(true);
        }
      }
    };

    const handleWindowBlur = () => {
      wasPlayingRef.current = isPlaying;
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleWindowFocus = () => {
      if (audioRef.current && wasPlayingRef.current) {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), config.audio?.toastDuration ?? 3000);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowToast(false);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);

      if (audioRef.current) {
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
      }
    };
  }, [isPlaying]);

  const toggleMusic = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          wasPlayingRef.current = false;
        } else {
          await audioRef.current.play();
          wasPlayingRef.current = true;
        }
      } catch (error) {
        console.error('Playback error:', error);
      }
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full bg-sand-50 md:bg-gradient-to-br md:from-sand-100 md:via-lavender-50/50 md:to-amber-50/50 flex md:items-center md:justify-center md:py-6 md:px-2">
      <motion.div
        className="w-full max-w-[430px] min-h-[100dvh] md:min-h-[calc(100dvh-3rem)] bg-white relative overflow-hidden md:rounded-[2rem] md:shadow-elegant md:ring-1 md:ring-black/5 mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="fixed top-[max(0.75rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-50 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white shadow-md border border-sand-200 active:bg-sand-100 md:bg-white/90 md:backdrop-blur-md"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <PauseCircle className="w-6 h-6 text-sage-600" strokeWidth={2} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse ring-2 ring-white" />
            </div>
          ) : (
            <PlayCircle className="w-6 h-6 text-sage-500" strokeWidth={2} />
          )}
        </motion.button>

        <main className="relative w-full min-h-[100dvh]" style={{ paddingBottom: 'calc(4.5rem + env(safe-area-inset-bottom))' }}>
          {children}
        </main>
        <BottomBar />
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="fixed left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 md:w-auto"
              style={{ bottom: 'max(5.5rem, calc(5.5rem + env(safe-area-inset-bottom)))' }}
            >
              <div className="bg-stone-800/95 text-sand-50 md:-translate-x-1/2 px-4 py-3 rounded-2xl md:rounded-full backdrop-blur-md flex items-center justify-center gap-2 shadow-lg text-sm font-medium">
                <Music className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="whitespace-nowrap">{config.audio?.title || 'Background Music'}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Layout;

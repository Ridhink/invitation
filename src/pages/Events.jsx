import EventCards from '@/components/EventsCard'
import { useConfig } from '@/hooks/useConfig'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Events() {
    const config = useConfig();

    return (
        <>
            <section id="event" className="min-h-[100dvh] relative overflow-hidden bg-gradient-to-b from-lavender-100/40 via-white to-sand-50/50 py-12 sm:py-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 container mx-auto px-4"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-4 mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-block text-lavender-500 text-xs font-medium tracking-[0.2em] uppercase"
                        >
                            Save the Date
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-serif font-medium text-stone-800 leading-tight tracking-tight"
                        >
                            Wedding Events
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-stone-500 max-w-md mx-auto text-sm leading-relaxed"
                        >
                            We invite you to celebrate our special day as the beginning of our journey together
                        </motion.p>

                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center gap-4 mt-6"
                        >
                            <div className="h-px w-12 bg-lavender-300/60" />
                            <Heart className="w-4 h-4 text-terracotta-400" fill="currentColor" />
                            <div className="h-px w-12 bg-amber-200/60" />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="max-w-2xl mx-auto"
                    >
                        <EventCards events={config.agenda} />
                    </motion.div>
                </motion.div>
            </section>
        </>
    )
}

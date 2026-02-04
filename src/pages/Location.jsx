import { useConfig } from "@/hooks/useConfig";
import { Clock, MapPin, CalendarCheck, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion';
import { formatEventDate } from "@/lib/formatEventDate";

export default function Location() {
  const config = useConfig();

  return (<>
    <section id="location" className="min-h-[100dvh] relative overflow-hidden bg-gradient-to-b from-white via-amber-50/30 to-sand-50/50 py-12 sm:py-20">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <span className="inline-block text-amber-600 text-xs font-medium tracking-[0.2em] uppercase">
            Event Location
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-800 leading-tight tracking-tight">
            Location
          </h2>
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="h-px w-12 bg-amber-200/60" />
            <MapPin className="w-5 h-5 text-moss-500" />
            <div className="h-px w-12 bg-slate-300/60" />
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-row-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border-8 border-white"
          >
            <iframe
              src={config.maps_embed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-sand-200">
              <h3 className="text-2xl font-serif text-gray-800 mb-6">{config.location}</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-moss-500 mt-1" />
                  <p className="text-gray-600 flex-1">{config.address}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <CalendarCheck className="w-5 h-5 text-amber-500" />
                  <p className="text-gray-600">{formatEventDate(config.date)}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <Clock className="w-5 h-5 text-slate-500" />
                  <p className="text-gray-600">{config.time}</p>
                </div>

                <div className="pt-4">
                  <motion.a
                    href={config.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    viewport={{ once: true }}
                    className="w-full min-h-[48px] flex items-center justify-center gap-1.5 bg-sand-50 text-stone-600 px-4 py-3 rounded-xl border border-sand-200 active:bg-sand-100 transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="font-semibold">View Map</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </>)
}

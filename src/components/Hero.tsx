import { motion } from "framer-motion"

interface HeroProps {
  onAddResident: () => void
}

const Hero = ({ onAddResident }: HeroProps) => {
  return (
    <section className="pt-24 pb-16 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 leading-tight">
              A Digital Book of
              <br />
              <span className="font-normal">Ambitious Residents</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 font-light mb-12 max-w-2xl mx-auto">
              Join our community of innovators, creators, and dreamers. Share your story and connect with like-minded
              individuals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <motion.button
                onClick={onAddResident}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors duration-300"
              >
                Add Yourself as Resident
              </motion.button>

              <motion.a
                href="#residents"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-medium hover:border-black hover:text-black transition-colors duration-300"
              >
                View Community
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
          ].map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img
                src={src || "/placeholder.svg"}
                alt={`Location ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

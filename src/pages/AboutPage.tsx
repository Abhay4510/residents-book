import { motion } from "framer-motion"

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-20 px-4 sm:px-6"
    >
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        About The Residents Book
      </h1>

      <div className="prose prose-lg mx-auto">
        <p className="text-lg text-gray-700 mb-6">
          The Residents Book is a community platform designed to showcase ambitious individuals from all walks of life.
          Our mission is to create a beautifully minimal digital book of "residents" to highlight the diverse talents
          and backgrounds of our growing community.
        </p>

        <p className="text-lg text-gray-700 mb-6">
          Whether you're an entrepreneur, artist, developer, designer, or any other professional, The Residents Book
          provides a space for you to be seen and connect with like-minded individuals.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Our Vision</h2>
        <p className="text-lg text-gray-700 mb-6">
          We believe in the power of community and connection. By bringing together ambitious individuals on a single
          platform, we aim to foster collaboration, inspiration, and growth.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Join Us</h2>
        <p className="text-lg text-gray-700 mb-6">
          Becoming a resident is simple. Just fill out our form with your details and join our growing community today!
        </p>
      </div>
    </motion.div>
  )
}

export default AboutPage

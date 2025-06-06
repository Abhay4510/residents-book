import { motion } from "framer-motion"
import { Linkedin, Twitter } from "lucide-react"
import type { Resident } from "../types/resident"

interface ResidentCardProps {
  resident: Resident
  onClick: () => void
}

const ResidentCard = ({ resident, onClick }: ResidentCardProps) => {
  const getInitials = (firstName: string) => {
    return firstName.charAt(0).toUpperCase()
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="p-8 h-full flex flex-col">
        <div className="text-center mb-6 flex-grow">
          <div className="relative inline-block mb-6">
            {resident.profileImage ? (
              <img
                src={resident.profileImage || "/placeholder.svg"}
                alt={`${resident.firstName} ${resident.lastName}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-50"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-gray-50">
                <span className="text-2xl font-semibold text-white">{getInitials(resident.firstName)}</span>
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <h3 className="text-xl font-medium text-gray-900 mb-2">
            {resident.firstName} {resident.lastName}
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed min-h-[2.5rem] flex items-center justify-center">
            {resident.title}
          </p>
        </div>

        {(resident.linkedIn || resident.twitter) && (
          <div className="flex justify-center space-x-3 pt-6 border-t border-gray-50">
            {resident.linkedIn && (
              <motion.a
                href={resident.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            )}

            {resident.twitter && (
              <motion.a
                href={resident.twitter}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-sky-50 text-sky-600 rounded-full hover:bg-sky-100 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ResidentCard

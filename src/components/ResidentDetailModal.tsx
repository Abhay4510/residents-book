import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Linkedin, Twitter, Calendar, Loader2 } from "lucide-react"
import { getResidentById } from "../services/api"
import type { Resident } from "../types/resident"
import toast from "react-hot-toast"

interface ResidentDetailModalProps {
  isOpen: boolean
  onClose: () => void
  residentId: string | null
}

const ResidentDetailModal = ({ isOpen, onClose, residentId }: ResidentDetailModalProps) => {
  const [resident, setResident] = useState<Resident | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && residentId) {
      fetchResidentDetails()
    }
  }, [isOpen, residentId])

  const fetchResidentDetails = async () => {
    if (!residentId) return

    setLoading(true)
    try {
      const response = await getResidentById(residentId)
      setResident(response.data.resident)
    } catch (error: any) {
      toast.error("Failed to load resident details")
      onClose()
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (firstName: string) => {
    return firstName.charAt(0).toUpperCase()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
                <span className="ml-2 text-gray-600">Loading...</span>
              </div>
            ) : resident ? (
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-light text-gray-900">Resident Profile</h2>
                  <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center mb-8">
                  <div className="relative inline-block mb-6">
                    {resident.profileImage ? (
                      <img
                        src={resident.profileImage || "/placeholder.svg"}
                        alt={`${resident.firstName} ${resident.lastName}`}
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-gray-100">
                        <span className="text-4xl font-semibold text-white">{getInitials(resident.firstName)}</span>
                      </div>
                    )}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                  </div>

                  <h3 className="text-3xl font-light text-gray-900 mb-2">
                    {resident.firstName} {resident.lastName}
                  </h3>

                  <p className="text-lg text-gray-600 mb-6">{resident.title}</p>

                  <div className="flex items-center justify-center text-sm text-gray-500 mb-8">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {formatDate(resident.createdAt)}
                  </div>
                </div>

                {(resident.linkedIn || resident.twitter) && (
                  <div className="border-t border-gray-100 pt-8">
                    <h4 className="text-lg font-medium text-gray-900 mb-4 text-center">Connect</h4>
                    <div className="flex justify-center space-x-4">
                      {resident.linkedIn && (
                        <motion.a
                          href={resident.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </motion.a>
                      )}

                      {resident.twitter && (
                        <motion.a
                          href={resident.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center px-4 py-2 bg-sky-50 text-sky-600 rounded-full hover:bg-sky-100 transition-colors"
                        >
                          <Twitter className="w-4 h-4 mr-2" />
                          Twitter
                        </motion.a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ResidentDetailModal

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, Loader2 } from "lucide-react"
import { createResident } from "../services/api"
import type { Resident } from "../types/resident"
import toast from "react-hot-toast"

interface ResidentModalProps {
  isOpen: boolean
  onClose: () => void
  onResidentAdded: (resident: Resident) => void
}

interface FormData {
  firstName: string
  lastName: string
  title: string
  linkedIn: string
  twitter: string
  profileImage: File | null
}

const ResidentModal = ({ isOpen, onClose, onResidentAdded }: ResidentModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    title: "",
    linkedIn: "",
    twitter: "",
    profileImage: null,
  })
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB")
        return
      }

      setFormData((prev) => ({ ...prev, profileImage: file }))

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.title.trim()) newErrors.title = "Title/Role is required"

    if (formData.linkedIn && !formData.linkedIn.includes("linkedin.com")) {
      newErrors.linkedIn = "Please enter a valid LinkedIn URL"
    }

    if (formData.twitter && !formData.twitter.includes("twitter.com") && !formData.twitter.includes("x.com")) {
      newErrors.twitter = "Please enter a valid Twitter/X URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("firstName", formData.firstName)
      formDataToSend.append("lastName", formData.lastName)
      formDataToSend.append("title", formData.title)
      formDataToSend.append("linkedIn", formData.linkedIn)
      formDataToSend.append("twitter", formData.twitter)

      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage)
      }

      const response = await createResident(formDataToSend)

      toast.success("Welcome to the community! 🎉")
      onResidentAdded(response.data.resident)

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        title: "",
        linkedIn: "",
        twitter: "",
        profileImage: null,
      })
      setImagePreview(null)
      setErrors({})
      onClose()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      onClose()
      setErrors({})
    }
  }

  const getInitials = () => {
    if (formData.firstName) {
      return formData.firstName.charAt(0).toUpperCase()
    }
    return "?"
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
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-light text-gray-900">Join Our Community</h2>
                <button
                  onClick={handleClose}
                  disabled={loading}
                  className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Image Upload */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-xl font-semibold text-white">{getInitials()}</span>
                        </div>
                      )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 bg-black text-white rounded-full p-2 cursor-pointer hover:bg-gray-800 transition-colors">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={loading}
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">Upload your profile photo</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={loading}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-colors ${
                        errors.firstName ? "border-red-500" : "border-gray-200 focus:border-black"
                      }`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={loading}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-colors ${
                        errors.lastName ? "border-red-500" : "border-gray-200 focus:border-black"
                      }`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title/Role *
                  </label>
                  <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    // placeholder="e.g., Software Engineer, Designer, Entrepreneur"
                    disabled={loading}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-colors ${
                      errors.title ? "border-red-500" : "border-gray-200 focus:border-black"
                    }`}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                {/* Social Links */}
                <div>
                  <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn (Optional)
                  </label>
                  <input
                    id="linkedIn"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    disabled={loading}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-colors ${
                      errors.linkedIn ? "border-red-500" : "border-gray-200 focus:border-black"
                    }`}
                  />
                  {errors.linkedIn && <p className="text-red-500 text-sm mt-1">{errors.linkedIn}</p>}
                </div>

                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter/X (Optional)
                  </label>
                  <input
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/yourusername"
                    disabled={loading}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-colors ${
                      errors.twitter ? "border-red-500" : "border-gray-200 focus:border-black"
                    }`}
                  />
                  {errors.twitter && <p className="text-red-500 text-sm mt-1">{errors.twitter}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-xl font-medium transition-colors duration-300 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Joining community...
                    </>
                  ) : (
                    "Join the Community"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ResidentModal

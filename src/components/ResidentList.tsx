import { useState } from "react"
import { motion } from "framer-motion"
import ResidentCard from "./ResidentCard"
import type { Resident } from "../types/resident"
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react"

interface ResidentListProps {
  residents: Resident[]
  loading: boolean
  onResidentClick: (residentId: string) => void
}

const ResidentList = ({ residents, loading, onResidentClick }: ResidentListProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const residentsPerPage = 12

  const totalPages = Math.ceil(residents.length / residentsPerPage)
  const startIndex = (currentPage - 1) * residentsPerPage
  const endIndex = startIndex + residentsPerPage
  const currentResidents = residents.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    document.getElementById("residents")?.scrollIntoView({ behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
        <span className="ml-2 text-gray-600">Loading residents...</span>
      </div>
    )
  }

  if (residents.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">👥</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No residents yet</h3>
        <p className="text-gray-600">Be the first to join our community!</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {currentResidents.map((resident, index) => (
          <motion.div
            key={resident._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ResidentCard resident={resident} onClick={() => onResidentClick(resident._id)} />
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                currentPage === page ? "bg-black text-white" : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="text-center mt-6 text-sm text-gray-500">
        Showing {startIndex + 1}-{Math.min(endIndex, residents.length)} of {residents.length} residents
      </div>
    </div>
  )
}

export default ResidentList

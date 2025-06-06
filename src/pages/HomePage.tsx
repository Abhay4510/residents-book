import { useState } from "react"
import { motion } from "framer-motion"
import Hero from "../components/Hero"
import ResidentList from "../components/ResidentList"
import ResidentModal from "../components/ResidentModal"
import ResidentDetailModal from "../components/ResidentDetailModal"
import type { Resident } from "../types/resident"

interface HomePageProps {
  residents: Resident[]
  loading: boolean
  onResidentAdded: (resident: Resident) => void
}

const HomePage = ({ residents, loading, onResidentAdded }: HomePageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedResidentId, setSelectedResidentId] = useState<string | null>(null)

  const handleResidentClick = (residentId: string) => {
    setSelectedResidentId(residentId)
    setIsDetailModalOpen(true)
  }

  return (
    <main className="bg-white">
      <Hero onAddResident={() => setIsModalOpen(true)} />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="py-20 px-6 lg:px-8"
        id="residents"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              meet our
              <br />
              <span className="font-normal">community</span>
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Discover the amazing individuals who are part of our growing community of ambitious residents.
            </p>
          </div>

          <ResidentList residents={residents} loading={loading} onResidentClick={handleResidentClick} />
        </div>
      </motion.section>

      <ResidentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onResidentAdded={onResidentAdded} />

      <ResidentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        residentId={selectedResidentId}
      />
    </main>
  )
}

export default HomePage

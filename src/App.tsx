"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import type { Resident } from "./types/resident"
import { getResidents } from "./services/api"

function App() {
  const [residents, setResidents] = useState<Resident[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchResidents = async () => {
    try {
      setLoading(true)
      const data = await getResidents()
      setResidents(data.residents)
    } catch (error) {
      console.error("Error fetching residents:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResidents()
  }, [])

  const handleResidentAdded = (newResident: Resident) => {
    setResidents((prev) => [newResident, ...prev])
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <Navbar />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#10b981",
              color: "#fff",
            },
          }}
        />
        <Routes>
          <Route
            path="/"
            element={<HomePage residents={residents} loading={loading} onResidentAdded={handleResidentAdded} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: "home", href: "/" },
    { name: "about us", href: "/about" },
    { name: "apply now", href: "/", isHighlighted: true },
    { name: "contact", href: "/contact" },
    { name: "inspire", href: "#residents" },
  ]

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      item.isHighlighted
                        ? "bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
                        : isActive(item.href)
                          ? "text-black"
                          : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:hidden absolute right-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-black focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-100"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  item.isHighlighted
                    ? "bg-black text-white"
                    : isActive(item.href)
                      ? "text-black"
                      : "text-gray-600 hover:text-black"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar

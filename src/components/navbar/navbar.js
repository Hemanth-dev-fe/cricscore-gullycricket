'use client'
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 shadow-md">
        {/* Desktop and top nav bar */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold pr-8">HemanthDev</div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 gap-4">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <Link href="/contact" className="hover:text-gray-300">Contact Us</Link>
            
          </div>
<button
              className="bg-blue-600 rounded px-4 py-2 hover:bg-blue-700 ml-auto hidden md:flex"
              onClick={toggleLogin}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          {/* Mobile Menu Icon */}
          <div className="md:hidden ml-auto" onClick={toggleMenu}>
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col items-start gap-4 px-2">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <Link href="/contact" className="hover:text-gray-300">Contact Us</Link>
            <button
              className="bg-blue-600 rounded px-4 py-2 hover:bg-blue-700"
              onClick={toggleLogin}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>
        )}
      </nav>
    </>
  )
}

export default NavBar

import { useState } from "react"
import { Outlet } from "react-router-dom"
import {
  Menu,
  Stethoscope,
} from "lucide-react"

import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />


      {/* Main Content */}
      <div className="lg:ml-64">

        {/* Mobile Header */}
        <div className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-30">

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
            aria-label="Open menu"
          >
            <Menu size={23} />
          </button>


          {/* Mobile Brand */}
          <div className="flex items-center gap-2">

            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">

              <Stethoscope
                size={19}
                className="text-white"
              />

            </div>

            <div>

              <p className="text-sm font-bold text-slate-800">
                MediCase AI
              </p>

              <p className="text-[10px] text-slate-400">
                Clinical Documentation
              </p>

            </div>

          </div>


          {/* Spacer */}
          <div className="w-10" />

        </div>


        {/* Desktop Navbar */}
        <div className="hidden lg:block">
          <Navbar />
        </div>


        {/* Page Content */}
        <main className="p-4 sm:p-6">

          <Outlet />

        </main>

      </div>

    </div>
  )
}

export default Layout
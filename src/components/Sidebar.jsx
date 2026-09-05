import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  UserPlus,
  ClipboardList,
  CalendarCheck,
  FileText,
  Sparkles,
  Settings,
  Stethoscope,
  X,
} from "lucide-react"

function Sidebar({ mobileOpen, setMobileOpen }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Patients",
      path: "/patients",
      icon: Users,
    },
    {
      name: "New Patient",
      path: "/new-patient",
      icon: UserPlus,
    },
    {
      name: "Case Taking",
      path: "/case-taking",
      icon: ClipboardList,
    },
    {
      name: "Follow-ups",
      path: "/follow-ups",
      icon: CalendarCheck,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: FileText,
    },
    {
      name: "AI Summary",
      path: "/ai-summary",
      icon: Sparkles,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ]

  const handleNavigation = () => {
    setMobileOpen(false)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 min-h-screen bg-white border-r border-slate-200 fixed left-0 top-0 z-50 transition-transform duration-300
        ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0`}
      >

        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Stethoscope
                className="text-white"
                size={22}
              />
            </div>

            <div>

              <h1 className="font-bold text-lg text-slate-800">
                MediCase AI
              </h1>

              <p className="text-xs text-slate-400">
                Clinical Documentation
              </p>

            </div>

          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100"
          >
            <X size={19} />
          </button>

        </div>


        {/* Navigation */}
        <nav className="p-4 space-y-1">

          {menuItems.map((item) => {

            const Icon = item.icon

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
              >

                <Icon size={20} />

                <span className="font-medium">
                  {item.name}
                </span>

              </NavLink>
            )

          })}

        </nav>


        {/* Demo Mode */}
        <div className="absolute bottom-5 left-4 right-4">

          <div className="bg-blue-50 rounded-xl p-4">

            <p className="text-sm font-semibold text-blue-700">
              Demo Mode
            </p>

            <p className="text-xs text-blue-500 mt-1">
              Fictional data only
            </p>

          </div>

        </div>

      </aside>
    </>
  )
}

export default Sidebar
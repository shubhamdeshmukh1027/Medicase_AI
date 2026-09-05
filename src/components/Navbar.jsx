import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  Bell,
  UserCircle,
  LogOut,
  FileText,
  CalendarCheck,
  UserPlus,
  CheckCircle2,
  X,
  Users,
} from "lucide-react"

const demoPatients = [
  {
    id: "P-1001",
    name: "Aarav Sharma",
    age: 28,
    gender: "Male",
    phone: "9876543210",
  },
  {
    id: "P-1002",
    name: "Priya Patil",
    age: 34,
    gender: "Female",
    phone: "9876543211",
  },
  {
    id: "P-1003",
    name: "Rahul Mehta",
    age: 45,
    gender: "Male",
    phone: "9876543212",
  },
  {
    id: "P-1004",
    name: "Sneha Joshi",
    age: 26,
    gender: "Female",
    phone: "9876543213",
  },
  {
    id: "P-1005",
    name: "Vikram Shah",
    age: 51,
    gender: "Male",
    phone: "9876543214",
  },
  {
    id: "P-1006",
    name: "Ananya Kulkarni",
    age: 31,
    gender: "Female",
    phone: "9876543215",
  },
  {
    id: "P-1007",
    name: "Rohan Desai",
    age: 39,
    gender: "Male",
    phone: "9876543216",
  },
  {
    id: "P-1008",
    name: "Neha Joshi",
    age: 29,
    gender: "Female",
    phone: "9876543217",
  },
  {
    id: "P-1009",
    name: "Aditya Patil",
    age: 42,
    gender: "Male",
    phone: "9876543218",
  },
  {
    id: "P-1010",
    name: "Kavya Deshmukh",
    age: 36,
    gender: "Female",
    phone: "9876543219",
  },
]

function Navbar() {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)

  const [showNotifications, setShowNotifications] =
    useState(false)

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New patient registered",
      message:
        "Vikram Shah was added to the patient list.",
      time: "10 min ago",
      icon: UserPlus,
      unread: true,
    },
    {
      id: 2,
      title: "AI summary generated",
      message:
        "AI summary is ready for Priya Patil.",
      time: "25 min ago",
      icon: FileText,
      unread: true,
    },
    {
      id: 3,
      title: "Follow-up pending",
      message:
        "Ananya Kulkarni has a pending follow-up.",
      time: "1 hour ago",
      icon: CalendarCheck,
      unread: true,
    },
  ])

  const notificationRef = useRef(null)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false)
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )
    }
  }, [])

  const filteredPatients =
    search.trim() === ""
      ? []
      : demoPatients.filter((patient) => {
          const value = search.toLowerCase()

          return (
            patient.name.toLowerCase().includes(value) ||
            patient.id.toLowerCase().includes(value) ||
            patient.phone.includes(value)
          )
        })

  const handlePatientClick = (patient) => {
    setSearch("")
    setShowSearchResults(false)

    navigate("/patients")
  }

  const handleLogout = () => {
    localStorage.removeItem("medicase_logged_in")
    localStorage.removeItem("medicase_user")

    navigate("/login")
  }

  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        unread: false,
      }))
    )
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const handleNotificationClick = (id) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, unread: false }
          : item
      )
    )
  }

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">

      {/* Search */}
      <div
        ref={searchRef}
        className="relative w-full max-w-xs"
      >
        <Search
          size={19}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setShowSearchResults(true)
          }}
          onFocus={() => setShowSearchResults(true)}
          placeholder="Search patients..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition text-sm"
        />

        {/* Search Results */}
        {showSearchResults && search.trim() !== "" && (
          <div className="absolute left-0 top-14 w-[360px] max-w-[calc(100vw-32px)] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">

            <div className="px-4 py-3 border-b border-slate-200">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Search Results
              </p>
            </div>

            {filteredPatients.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">

                {filteredPatients.map((patient) => (
                  <button
                    key={patient.id}
                    type="button"
                    onClick={() =>
                      handlePatientClick(patient)
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 transition border-b border-slate-100"
                  >

                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <Users
                        size={18}
                        className="text-blue-600"
                      />
                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="text-sm font-semibold text-slate-700">
                        {patient.name}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {patient.id} • {patient.age} years •{" "}
                        {patient.gender}
                      </p>

                      <p className="text-xs text-slate-400">
                        {patient.phone}
                      </p>

                    </div>

                  </button>
                ))}

              </div>
            ) : (
              <div className="px-5 py-8 text-center">

                <div className="w-11 h-11 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
                  <Search
                    size={20}
                    className="text-slate-400"
                  />
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  No patients found
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Try a different name, ID, or phone number.
                </p>

              </div>
            )}

          </div>
        )}
      </div>


      {/* Right Side */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* Notifications */}
        <div
          ref={notificationRef}
          className="relative"
        >

          <button
            type="button"
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            className="relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition"
            title="Notifications"
          >

            <Bell size={21} />

            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[17px] h-[17px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}

          </button>


          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-[360px] max-w-[calc(100vw-32px)] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">

              <div className="px-4 py-4 border-b border-slate-200 flex items-center justify-between">

                <div>
                  <h3 className="font-semibold text-slate-800">
                    Notifications
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    {unreadCount > 0
                      ? `${unreadCount} unread notification${
                          unreadCount > 1
                            ? "s"
                            : ""
                        }`
                      : "You're all caught up"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowNotifications(false)
                  }
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100"
                >
                  <X size={17} />
                </button>

              </div>


              <div className="max-h-[350px] overflow-y-auto">

                {notifications.length === 0 ? (
                  <div className="px-6 py-10 text-center">

                    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 flex items-center justify-center">
                      <CheckCircle2
                        size={24}
                        className="text-emerald-500"
                      />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      No new notifications
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Everything is up to date.
                    </p>

                  </div>
                ) : (
                  notifications.map((item) => {
                    const Icon = item.icon

                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() =>
                          handleNotificationClick(
                            item.id
                          )
                        }
                        className={`w-full text-left px-4 py-4 flex gap-3 border-b border-slate-100 hover:bg-slate-50 transition ${
                          item.unread
                            ? "bg-blue-50/40"
                            : "bg-white"
                        }`}
                      >

                        <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                          <Icon
                            size={17}
                            className="text-blue-600"
                          />
                        </div>

                        <div className="flex-1 min-w-0">

                          <div className="flex items-start justify-between gap-2">

                            <p className="text-sm font-semibold text-slate-700">
                              {item.title}
                            </p>

                            {item.unread && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                            )}

                          </div>

                          <p className="text-xs text-slate-500 mt-1 leading-5">
                            {item.message}
                          </p>

                          <p className="text-[11px] text-slate-400 mt-2">
                            {item.time}
                          </p>

                        </div>

                      </button>
                    )
                  })
                )}

              </div>


              {notifications.length > 0 && (
                <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">

                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Mark all as read
                  </button>

                  <button
                    type="button"
                    onClick={clearNotifications}
                    className="text-xs font-semibold text-slate-500 hover:text-red-600"
                  >
                    Clear all
                  </button>

                </div>
              )}

            </div>
          )}

        </div>


        {/* Profile */}
        <div className="flex items-center gap-3">

          <UserCircle
            size={38}
            className="text-blue-600"
          />

          <div className="hidden sm:block">

            <p className="text-sm font-semibold text-slate-700">
              Dr. Demo User
            </p>

            <p className="text-xs text-slate-400">
              Doctor
            </p>

          </div>

        </div>


        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
          title="Logout"
        >

          <LogOut size={20} />

          <span className="hidden sm:inline text-sm font-medium">
            Logout
          </span>

        </button>

      </div>

    </header>
  )
}

export default Navbar
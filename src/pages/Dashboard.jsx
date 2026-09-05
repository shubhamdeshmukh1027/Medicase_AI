import { Link } from "react-router-dom"

import {
  UserPlus,
  ClipboardList,
  Users,
  FileText,
  CalendarCheck,
  Activity,
  ArrowRight,
  UserRound,
  Clock3,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react"

function Dashboard() {
  const statistics = [
    {
      title: "Total Patients",
      value: "125",
      description: "Registered patients",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Today's Cases",
      value: "18",
      description: "Cases recorded today",
      icon: ClipboardList,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "Pending Follow-ups",
      value: "7",
      description: "Need attention",
      icon: CalendarCheck,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Reports Generated",
      value: "42",
      description: "Clinical reports",
      icon: FileText,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
  ]

  const quickActions = [
    {
      title: "Register Patient",
      description: "Add a new patient",
      path: "/new-patient",
      icon: UserPlus,
      primary: true,
    },
    {
      title: "Start Case Taking",
      description: "Record patient case",
      path: "/case-taking",
      icon: ClipboardList,
    },
    {
      title: "View Patients",
      description: "Manage patient records",
      path: "/patients",
      icon: Users,
    },
    {
      title: "Generate Report",
      description: "Create case report",
      path: "/reports",
      icon: FileText,
    },
  ]

  const recentPatients = [
    ["Aarav Sharma", "P-1001", "Today"],
    ["Priya Patil", "P-1002", "Today"],
    ["Rahul Mehta", "P-1003", "Yesterday"],
    ["Sneha Joshi", "P-1004", "Yesterday"],
    ["Vikram Shah", "P-1005", "2 days ago"],
  ]

  const followUps = [
    ["Ananya Kulkarni", "10:30 AM", "Pending"],
    ["Rohan Desai", "12:00 PM", "Pending"],
    ["Neha Joshi", "02:30 PM", "Completed"],
    ["Aditya Patil", "04:00 PM", "Pending"],
  ]

  const activities = [
    "Case recorded for Aarav Sharma",
    "AI summary generated for Priya Patil",
    "Report generated for Rahul Mehta",
    "Follow-up completed for Neha Joshi",
    "New patient registered: Vikram Shah",
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-7">

      {/* Header */}

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-3">

              <Sparkles size={14} />

              MediCase AI Dashboard

            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Good Morning, Dr. Demo User 👋
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-500">
              Here is your MediCase AI overview for today.
            </p>

          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">

            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">

              <UserRound
                size={20}
                className="text-blue-600"
              />

            </div>

            <div>

              <p className="text-sm font-semibold text-slate-700">
                Dr. Demo User
              </p>

              <p className="text-xs text-slate-400">
                Demo Account
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div>

        <div className="flex items-center justify-between mb-4">

          <div>

            <h3 className="text-lg font-bold text-slate-800">
              Overview
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Quick view of your clinical activity.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          {statistics.map((stat) => {

            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-sm text-slate-500">
                      {stat.title}
                    </p>

                    <h3 className="text-3xl font-bold text-slate-800 mt-2">
                      {stat.value}
                    </h3>

                    <p className="text-xs text-slate-400 mt-2">
                      {stat.description}
                    </p>

                  </div>

                  <div
                    className={`w-11 h-11 rounded-xl ${stat.iconBg} flex items-center justify-center`}
                  >

                    <Icon
                      size={21}
                      className={stat.iconColor}
                    />

                  </div>

                </div>

              </div>
            )
          })}

        </div>

      </div>

      {/* Quick Actions */}

      <div>

        <div className="mb-4">

          <h3 className="text-lg font-bold text-slate-800">
            Quick Actions
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Quickly access the most common tasks.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          {quickActions.map((action) => {

            const Icon = action.icon

            return (
              <Link
                key={action.title}
                to={action.path}
                className={
                  action.primary
                    ? "group bg-blue-600 text-white rounded-2xl p-5 shadow-sm hover:bg-blue-700 hover:shadow-md transition"
                    : "group bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm transition"
                }
              >

                <div className="flex items-start justify-between gap-3">

                  <div
                    className={
                      action.primary
                        ? "w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center"
                        : "w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center"
                    }
                  >

                    <Icon
                      size={22}
                      className={
                        action.primary
                          ? "text-white"
                          : "text-blue-600"
                      }
                    />

                  </div>

                  <ArrowRight
                    size={18}
                    className={
                      action.primary
                        ? "text-blue-100 group-hover:translate-x-1 transition"
                        : "text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition"
                    }
                  />

                </div>

                <div className="mt-5">

                  <p
                    className={
                      action.primary
                        ? "font-semibold text-white"
                        : "font-semibold text-slate-800"
                    }
                  >
                    {action.title}
                  </p>

                  <p
                    className={
                      action.primary
                        ? "text-xs text-blue-100 mt-1"
                        : "text-xs text-slate-500 mt-1"
                    }
                  >
                    {action.description}
                  </p>

                </div>

              </Link>
            )
          })}

        </div>

      </div>

      {/* Recent Patients + Follow-ups */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Recent Patients */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between">

            <div>

              <h3 className="text-lg font-bold text-slate-800">
                Recent Patients
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Recently added patients
              </p>

            </div>

            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">

              <Users
                className="text-blue-600"
                size={21}
              />

            </div>

          </div>

          <div className="divide-y divide-slate-100">

            {recentPatients.map((patient) => (

              <div
                key={patient[1]}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition"
              >

                <div className="flex items-center gap-3 min-w-0">

                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">

                    <UserRound
                      size={17}
                      className="text-blue-600"
                    />

                  </div>

                  <div className="min-w-0">

                    <p className="font-semibold text-slate-700 truncate">
                      {patient[0]}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Patient ID: {patient[1]}
                    </p>

                  </div>

                </div>

                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {patient[2]}
                </span>

              </div>

            ))}

          </div>

          <div className="p-4 border-t border-slate-100">

            <Link
              to="/patients"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
            >
              View all patients
              <ArrowRight size={15} />
            </Link>

          </div>

        </div>

        {/* Today's Follow-ups */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between">

            <div>

              <h3 className="text-lg font-bold text-slate-800">
                Today's Follow-ups
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Patients requiring follow-up
              </p>

            </div>

            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">

              <CalendarCheck
                className="text-orange-600"
                size={21}
              />

            </div>

          </div>

          <div className="divide-y divide-slate-100">

            {followUps.map((followup) => (

              <div
                key={followup[0]}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition"
              >

                <div className="flex items-center gap-3 min-w-0">

                  <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">

                    <Clock3
                      size={17}
                      className="text-slate-500"
                    />

                  </div>

                  <div className="min-w-0">

                    <p className="font-semibold text-slate-700 truncate">
                      {followup[0]}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {followup[1]}
                    </p>

                  </div>

                </div>

                <span
                  className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap ${
                    followup[2] === "Completed"
                      ? "bg-green-50 text-green-700"
                      : "bg-orange-50 text-orange-700"
                  }`}
                >

                  {followup[2] === "Completed" ? (
                    <CheckCircle size={13} />
                  ) : (
                    <AlertCircle size={13} />
                  )}

                  {followup[2]}

                </span>

              </div>

            ))}

          </div>

          <div className="p-4 border-t border-slate-100">

            <Link
              to="/follow-ups"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
            >
              View all follow-ups
              <ArrowRight size={15} />
            </Link>

          </div>

        </div>

      </div>

      {/* Recent Case Activity */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center gap-3">

          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">

            <Activity
              className="text-indigo-600"
              size={21}
            />

          </div>

          <div>

            <h3 className="text-lg font-bold text-slate-800">
              Recent Case Activity
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Latest activity in MediCase AI
            </p>

          </div>

        </div>

        <div className="divide-y divide-slate-100">

          {activities.map((activity, index) => (

            <div
              key={index}
              className="p-4 sm:p-5 flex items-center gap-3 hover:bg-slate-50 transition"
            >

              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">

                <Activity
                  size={15}
                  className="text-blue-600"
                />

              </div>

              <p className="text-sm text-slate-600">
                {activity}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Demo Notice */}

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">

        <div className="flex items-start gap-3">

          <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">

            <ShieldIcon />

          </div>

          <div>

            <p className="text-sm font-semibold text-blue-700">
              MediCase AI Demo Mode
            </p>

            <p className="text-xs text-blue-600 mt-1 leading-5">
              This dashboard uses fictional patient data for
              demonstration only. No real patient data or backend
              service is connected.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

function ShieldIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-blue-600"
    >
      <path
        d="M12 3L20 6V11C20 16.2 16.6 20.4 12 22C7.4 20.4 4 16.2 4 11V6L12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Dashboard
import { useEffect, useState } from "react"
import {
  CalendarCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Eye,
  ArrowUpRight,
  Users,
} from "lucide-react"

const demoFollowUps = [
  {
    id: "F-1001",
    patientId: "P-1001",
    patientName: "Aarav Sharma",
    date: "Today",
    time: "10:30 AM",
    previousCase: "General Consultation",
    status: "Pending",
  },
  {
    id: "F-1002",
    patientId: "P-1002",
    patientName: "Priya Patil",
    date: "Today",
    time: "12:00 PM",
    previousCase: "Follow-up Case",
    status: "Pending",
  },
  {
    id: "F-1003",
    patientId: "P-1003",
    patientName: "Rahul Mehta",
    date: "Yesterday",
    time: "02:00 PM",
    previousCase: "Clinical Case",
    status: "Overdue",
  },
  {
    id: "F-1004",
    patientId: "P-1004",
    patientName: "Sneha Joshi",
    date: "Tomorrow",
    time: "11:00 AM",
    previousCase: "General Consultation",
    status: "Pending",
  },
  {
    id: "F-1005",
    patientId: "P-1005",
    patientName: "Vikram Shah",
    date: "2 days ago",
    time: "04:00 PM",
    previousCase: "Clinical Case",
    status: "Completed",
  },
]

function FollowUps() {
  const [followUps, setFollowUps] = useState(demoFollowUps)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [selectedFollowUp, setSelectedFollowUp] = useState(null)

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("medicase_followups") || "[]"
    )

    if (saved.length > 0) {
      setFollowUps(saved)
    }
  }, [])

  const markCompleted = (id) => {
    const updated = followUps.map((item) =>
      item.id === id
        ? {
            ...item,
            status: "Completed",
            date: "Completed",
          }
        : item
    )

    setFollowUps(updated)

    localStorage.setItem(
      "medicase_followups",
      JSON.stringify(updated)
    )

    window.dispatchEvent(
      new Event("medicase_followups_updated")
    )
  }

  const filteredFollowUps = followUps.filter((item) => {
    const searchText = search.toLowerCase().trim()

    const matchesSearch =
      item.patientName.toLowerCase().includes(searchText) ||
      item.patientId.toLowerCase().includes(searchText) ||
      item.id.toLowerCase().includes(searchText)

    const matchesFilter =
      filter === "All" || item.status === filter

    return matchesSearch && matchesFilter
  })

  const upcoming = followUps.filter(
    (item) => item.status === "Pending"
  ).length

  const overdue = followUps.filter(
    (item) => item.status === "Overdue"
  ).length

  const completed = followUps.filter(
    (item) => item.status === "Completed"
  ).length

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}

      <div className="mb-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">

                <CalendarCheck
                  size={25}
                  className="text-blue-600"
                />

              </div>

              <div>

                <div className="flex items-center gap-2 flex-wrap">

                  <h1 className="text-2xl font-bold text-slate-800">
                    Follow-ups
                  </h1>

                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                    Patient Care
                  </span>

                </div>

                <p className="text-sm text-slate-500 mt-1">
                  Manage scheduled patient follow-up activities.
                </p>

              </div>

            </div>

          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">

            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
              <Users size={17} className="text-slate-500" />
            </div>

            <span>
              {followUps.length} total follow-ups
            </span>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

        <StatCard
          title="Upcoming"
          value={upcoming}
          icon={Clock}
          iconClass="text-blue-600"
          bgClass="bg-blue-50"
          description="Pending follow-ups"
        />

        <StatCard
          title="Overdue"
          value={overdue}
          icon={AlertCircle}
          iconClass="text-red-600"
          bgClass="bg-red-50"
          description="Need attention"
        />

        <StatCard
          title="Completed"
          value={completed}
          icon={CheckCircle}
          iconClass="text-green-600"
          bgClass="bg-green-50"
          description="Completed follow-ups"
        />

      </div>

      {/* Search and Filter */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 mb-6">

        <div className="flex flex-col lg:flex-row lg:items-center gap-4">

          <div className="flex-1">

            <label className="block text-xs font-semibold text-slate-500 mb-2">
              Search Follow-ups
            </label>

            <div className="relative">

              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search patient name, ID or follow-up ID..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />

            </div>

          </div>

          <div className="w-full lg:w-60">

            <label className="block text-xs font-semibold text-slate-500 mb-2">
              Status
            </label>

            <select
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value)
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            >

              <option value="All">
                All Follow-ups
              </option>

              <option value="Pending">
                Upcoming
              </option>

              <option value="Overdue">
                Overdue
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>

        </div>

        {(search || filter !== "All") && (

          <div className="mt-4 flex items-center justify-between gap-3">

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredFollowUps.length}
              </span>{" "}
              follow-up
              {filteredFollowUps.length !== 1
                ? "s"
                : ""}
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("")
                setFilter("All")
              }}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>

          </div>

        )}

      </div>

      {/* Follow-up Schedule */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div>

            <h2 className="font-bold text-slate-800">
              Follow-up Schedule
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              View and manage scheduled patient activities.
            </p>

          </div>

          <div className="flex items-center gap-2">

            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              {filteredFollowUps.length} Results
            </span>

          </div>

        </div>

        {/* Desktop Table */}

        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Patient
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Schedule
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Previous Case
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Status
                </th>

                <th className="text-right px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredFollowUps.map((item) => (

                <tr
                  key={item.id}
                  className="hover:bg-slate-50 transition"
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                        {item.patientName
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>

                        <p className="font-semibold text-slate-800">
                          {item.patientName}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {item.patientId} • {item.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-start gap-2">

                      <CalendarCheck
                        size={16}
                        className="text-blue-500 mt-0.5"
                      />

                      <div>

                        <p className="text-sm font-semibold text-slate-700">
                          {item.date}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {item.time}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-5 py-4">

                    <p className="text-sm text-slate-600">
                      {item.previousCase}
                    </p>

                  </td>

                  <td className="px-5 py-4">

                    <StatusBadge
                      status={item.status}
                    />

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-end items-center gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedFollowUp(item)
                        }
                        className="p-2 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition"
                        title="View Follow-up"
                      >
                        <Eye size={18} />
                      </button>

                      {item.status !== "Completed" && (

                        <button
                          type="button"
                          onClick={() =>
                            markCompleted(item.id)
                          }
                          className="px-3 py-2 bg-green-50 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-100 transition flex items-center gap-1.5"
                        >
                          <CheckCircle size={14} />
                          Complete
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Mobile Cards */}

        <div className="md:hidden">

          {filteredFollowUps.map((item) => (

            <div
              key={item.id}
              className="p-5 border-b border-slate-100 last:border-b-0"
            >

              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3 min-w-0">

                  <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                    {item.patientName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="min-w-0">

                    <p className="font-semibold text-slate-800 truncate">
                      {item.patientName}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {item.patientId}
                    </p>

                  </div>

                </div>

                <StatusBadge
                  status={item.status}
                />

              </div>

              <div className="mt-4 bg-slate-50 rounded-xl p-4 space-y-3">

                <div className="flex items-center gap-2">

                  <CalendarCheck
                    size={16}
                    className="text-blue-500"
                  />

                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">
                      {item.date}
                    </span>{" "}
                    at {item.time}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-slate-400 uppercase font-semibold">
                    Previous Case
                  </p>

                  <p className="text-sm text-slate-600 mt-1">
                    {item.previousCase}
                  </p>

                </div>

              </div>

              <div className="flex gap-2 mt-4">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedFollowUp(item)
                  }
                  className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-50 transition flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  View
                </button>

                {item.status !== "Completed" && (

                  <button
                    type="button"
                    onClick={() =>
                      markCompleted(item.id)
                    }
                    className="flex-1 py-2.5 bg-green-50 text-green-700 rounded-xl font-semibold text-sm hover:bg-green-100 transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={16} />
                    Complete
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

        {/* Empty State */}

        {filteredFollowUps.length === 0 && (

          <div className="p-12 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">

              <CalendarCheck
                size={28}
                className="text-slate-400"
              />

            </div>

            <p className="font-semibold text-slate-700 mt-4">
              No follow-ups found
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Try another search or change the status filter.
            </p>

          </div>

        )}

      </div>

      {/* Demo Notice */}

      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">

        <div className="flex items-start gap-3">

          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0">

            <ArrowUpRight
              size={17}
              className="text-blue-600"
            />

          </div>

          <div>

            <p className="text-sm font-semibold text-blue-700">
              Demo Mode
            </p>

            <p className="text-xs text-blue-600 mt-1 leading-5">
              This prototype uses fictional patient information
              and browser localStorage only. No real patient data
              or clinical backend is connected.
            </p>

          </div>

        </div>

      </div>

      {/* Follow-up Details Modal */}

      {selectedFollowUp && (

        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">

            <div className="p-5 border-b border-slate-200 flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Follow-up Details
                </p>

                <h2 className="text-xl font-bold text-slate-800 mt-1">
                  {selectedFollowUp.patientName}
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedFollowUp(null)
                }
                className="w-9 h-9 rounded-lg hover:bg-slate-100 text-slate-500 text-xl"
              >
                ×
              </button>

            </div>

            <div className="p-5 space-y-4">

              <div className="grid grid-cols-2 gap-3">

                <InfoBox
                  label="Follow-up ID"
                  value={selectedFollowUp.id}
                />

                <InfoBox
                  label="Patient ID"
                  value={selectedFollowUp.patientId}
                />

                <InfoBox
                  label="Date"
                  value={selectedFollowUp.date}
                />

                <InfoBox
                  label="Time"
                  value={selectedFollowUp.time}
                />

              </div>

              <div className="bg-slate-50 rounded-xl p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Previous Case
                </p>

                <p className="text-sm font-semibold text-slate-700 mt-2">
                  {selectedFollowUp.previousCase}
                </p>

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                  Status
                </p>

                <StatusBadge
                  status={selectedFollowUp.status}
                />

              </div>

            </div>

            <div className="p-5 border-t border-slate-200 flex justify-end gap-3">

              <button
                type="button"
                onClick={() =>
                  setSelectedFollowUp(null)
                }
                className="px-4 py-2.5 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>

              {selectedFollowUp.status !== "Completed" && (

                <button
                  type="button"
                  onClick={() => {
                    markCompleted(selectedFollowUp.id)
                    setSelectedFollowUp(null)
                  }}
                  className="px-4 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 flex items-center gap-2"
                >
                  <CheckCircle size={17} />
                  Mark Complete
                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

function StatCard({
  title,
  value,
  icon: Icon,
  iconClass,
  bgClass,
  description,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

      <div className="flex items-center justify-between gap-4">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="text-3xl font-bold text-slate-800 mt-1">
            {value}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {description}
          </p>

        </div>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgClass}`}
        >

          <Icon
            size={22}
            className={iconClass}
          />

        </div>

      </div>

    </div>
  )
}

function StatusBadge({ status }) {
  if (status === "Completed") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold whitespace-nowrap">
        <CheckCircle size={13} />
        Completed
      </span>
    )
  }

  if (status === "Overdue") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-xs font-semibold whitespace-nowrap">
        <AlertCircle size={13} />
        Overdue
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold whitespace-nowrap">
      <Clock size={13} />
      Pending
    </span>
  )
}

function InfoBox({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3">

      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="text-sm font-semibold text-slate-700 mt-1 break-words">
        {value}
      </p>

    </div>
  )
}

export default FollowUps
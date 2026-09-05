import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import {
  Search,
  UserPlus,
  Eye,
  Edit,
  ClipboardList,
  Users,
  UserRound,
  UserCheck,
  CalendarClock,
  Filter,
  X,
  ArrowRight,
} from "lucide-react"

const demoPatients = [
  {
    id: "P-1001",
    name: "Aarav Sharma",
    age: 28,
    gender: "Male",
    phone: "9876543210",
    status: "Active",
  },
  {
    id: "P-1002",
    name: "Priya Patil",
    age: 34,
    gender: "Female",
    phone: "9876543211",
    status: "Active",
  },
  {
    id: "P-1003",
    name: "Rahul Mehta",
    age: 45,
    gender: "Male",
    phone: "9876543212",
    status: "Follow-up",
  },
  {
    id: "P-1004",
    name: "Sneha Joshi",
    age: 26,
    gender: "Female",
    phone: "9876543213",
    status: "Active",
  },
  {
    id: "P-1005",
    name: "Vikram Shah",
    age: 51,
    gender: "Male",
    phone: "9876543214",
    status: "Completed",
  },
  {
    id: "P-1006",
    name: "Ananya Kulkarni",
    age: 31,
    gender: "Female",
    phone: "9876543215",
    status: "Follow-up",
  },
  {
    id: "P-1007",
    name: "Rohan Desai",
    age: 39,
    gender: "Male",
    phone: "9876543216",
    status: "Active",
  },
  {
    id: "P-1008",
    name: "Neha Joshi",
    age: 29,
    gender: "Female",
    phone: "9876543217",
    status: "Completed",
  },
  {
    id: "P-1009",
    name: "Aditya Patil",
    age: 42,
    gender: "Male",
    phone: "9876543218",
    status: "Active",
  },
  {
    id: "P-1010",
    name: "Kavya Deshmukh",
    age: 36,
    gender: "Female",
    phone: "9876543219",
    status: "Follow-up",
  },
]

function Patients() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [patients, setPatients] = useState(demoPatients)
  const [search, setSearch] = useState("")
  const [genderFilter, setGenderFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedPatientId, setSelectedPatientId] = useState("")

  useEffect(() => {
    const loadPatients = () => {
      const savedPatients = JSON.parse(
        localStorage.getItem("medicase_patients") || "[]"
      )

      setPatients([
        ...demoPatients,
        ...savedPatients,
      ])
    }

    loadPatients()

    window.addEventListener(
      "storage",
      loadPatients
    )

    window.addEventListener(
      "medicase_patients_updated",
      loadPatients
    )

    return () => {
      window.removeEventListener(
        "storage",
        loadPatients
      )

      window.removeEventListener(
        "medicase_patients_updated",
        loadPatients
      )
    }
  }, [])

  useEffect(() => {
    const patientId = searchParams.get("patient")

    if (patientId) {
      setSelectedPatientId(patientId)

      const patient = patients.find(
        (item) => item.id === patientId
      )

      if (patient) {
        setSearch(patient.name)
      }
    }
  }, [searchParams, patients])

  const filteredPatients = patients.filter((patient) => {
    const searchText = search.toLowerCase().trim()

    const matchesSearch =
      patient.name.toLowerCase().includes(searchText) ||
      patient.id.toLowerCase().includes(searchText) ||
      patient.phone.includes(searchText)

    const matchesGender =
      genderFilter === "All" ||
      patient.gender === genderFilter

    const matchesStatus =
      statusFilter === "All" ||
      patient.status === statusFilter

    return (
      matchesSearch &&
      matchesGender &&
      matchesStatus
    )
  })

  const activePatients = patients.filter(
    (patient) => patient.status === "Active"
  ).length

  const followUpPatients = patients.filter(
    (patient) => patient.status === "Follow-up"
  ).length

  const completedPatients = patients.filter(
    (patient) => patient.status === "Completed"
  ).length

  const getStatusClass = (status) => {
    if (status === "Active") {
      return "bg-green-50 text-green-700 border border-green-100"
    }

    if (status === "Follow-up") {
      return "bg-orange-50 text-orange-700 border border-orange-100"
    }

    return "bg-slate-100 text-slate-600 border border-slate-200"
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }

  const handleView = (patient) => {
    alert(
      "Patient: " +
        patient.name +
        "\nPatient ID: " +
        patient.id +
        "\nAge: " +
        patient.age +
        "\nGender: " +
        patient.gender +
        "\nPhone: " +
        patient.phone +
        "\nStatus: " +
        patient.status
    )
  }

  const handleEdit = (patient) => {
    alert(
      "Edit feature for " +
        patient.name +
        " will be connected later."
    )
  }

  const handleStartCase = (patient) => {
    navigate(
      "/case-taking?patient=" +
        encodeURIComponent(patient.id)
    )
  }

  const clearPatientSelection = () => {
    setSelectedPatientId("")
    setSearch("")
    navigate("/patients")
  }

  const clearFilters = () => {
    setSearch("")
    setGenderFilter("All")
    setStatusFilter("All")
    setSelectedPatientId("")
    navigate("/patients")
  }

  const hasActiveFilters =
    search !== "" ||
    genderFilter !== "All" ||
    statusFilter !== "All"

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-3">

            <Users size={14} />

            Patient Management

          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Patients
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage and view patient records in one place.
          </p>

        </div>

        <Link
          to="/new-patient"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 hover:shadow-md transition"
        >
          <UserPlus size={18} />
          Register Patient
          <ArrowRight size={16} />
        </Link>

      </div>

      {/* Search Result Notice */}

      {selectedPatientId && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div className="flex items-start gap-3">

              <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">

                <Search
                  size={17}
                  className="text-blue-600"
                />

              </div>

              <div>

                <p className="text-sm font-semibold text-blue-800">
                  Patient selected from Global Search
                </p>

                <p className="text-xs text-blue-600 mt-1">
                  Showing results for Patient ID:{" "}
                  <span className="font-bold">
                    {selectedPatientId}
                  </span>
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={clearPatientSelection}
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              Clear Selection
              <X size={15} />
            </button>

          </div>

        </div>
      )}

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Total Patients
              </p>

              <p className="text-3xl font-bold text-slate-800 mt-2">
                {patients.length}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                All patient records
              </p>

            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

              <Users
                size={21}
                className="text-blue-600"
              />

            </div>

          </div>

        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Active Patients
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {activePatients}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Currently active
              </p>

            </div>

            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">

              <UserCheck
                size={21}
                className="text-green-600"
              />

            </div>

          </div>

        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Follow-ups
              </p>

              <p className="text-3xl font-bold text-orange-600 mt-2">
                {followUpPatients}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Need attention
              </p>

            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">

              <CalendarClock
                size={21}
                className="text-orange-600"
              />

            </div>

          </div>

        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Completed
              </p>

              <p className="text-3xl font-bold text-slate-700 mt-2">
                {completedPatients}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Completed records
              </p>

            </div>

            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">

              <ClipboardList
                size={21}
                className="text-slate-600"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Search and Filters */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <div className="flex items-center gap-2 mb-4">

          <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">

            <Filter
              size={17}
              className="text-slate-600"
            />

          </div>

          <div>

            <h2 className="font-semibold text-slate-800">
              Search & Filter
            </h2>

            <p className="text-xs text-slate-500">
              Find patients quickly.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="relative">

            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search name, ID or phone..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setSelectedPatientId("")
              }}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />

          </div>

          <select
            value={genderFilter}
            onChange={(event) =>
              setGenderFilter(event.target.value)
            }
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition"
          >

            <option value="All">
              All Genders
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition"
          >

            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Follow-up">
              Follow-up
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

        </div>

        {hasActiveFilters && (
          <div className="mt-4 flex items-center justify-between gap-3">

            <p className="text-xs text-slate-500">
              Filters are currently applied.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear Filters
              <X size={14} />
            </button>

          </div>
        )}

      </div>

      {/* Patient Records */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div>

            <h2 className="text-lg font-bold text-slate-800">
              Patient Records
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Showing {filteredPatients.length} of{" "}
              {patients.length} patients
            </p>

          </div>

          <div className="inline-flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">

            <UserRound
              size={16}
              className="text-slate-500"
            />

            <span className="text-xs font-semibold text-slate-600">
              {filteredPatients.length} Results
            </span>

          </div>

        </div>

        {/* Desktop Table */}

        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50 border-b border-slate-200">

              <tr>

                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Patient
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  ID
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Age
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Gender
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Phone
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

              {filteredPatients.map((patient) => {

                const isSelected =
                  patient.id === selectedPatientId

                return (
                  <tr
                    key={patient.id}
                    className={
                      isSelected
                        ? "bg-blue-50/70"
                        : "hover:bg-slate-50 transition"
                    }
                  >

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">

                          <span className="text-xs font-bold text-blue-600">
                            {getInitials(patient.name)}
                          </span>

                        </div>

                        <div>

                          <p className="font-semibold text-slate-800">
                            {patient.name}
                          </p>

                          <p className="text-xs text-slate-400 mt-0.5">
                            Patient
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="px-5 py-4">

                      <span className="text-sm font-medium text-slate-600">
                        {patient.id}
                      </span>

                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {patient.age} yrs
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {patient.gender}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {patient.phone}
                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={
                          "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold " +
                          getStatusClass(patient.status)
                        }
                      >
                        {patient.status}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-1">

                        <button
                          type="button"
                          onClick={() =>
                            handleView(patient)
                          }
                          className="p-2.5 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition"
                          title="View Patient"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(patient)
                          }
                          className="p-2.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
                          title="Edit Patient"
                        >
                          <Edit size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleStartCase(patient)
                          }
                          className="p-2.5 rounded-lg text-slate-500 hover:bg-green-50 hover:text-green-600 transition"
                          title="Start Case"
                        >
                          <ClipboardList size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              })}

            </tbody>

          </table>

        </div>

        {/* Mobile Cards */}

        <div className="md:hidden divide-y divide-slate-100">

          {filteredPatients.map((patient) => {

            const isSelected =
              patient.id === selectedPatientId

            return (
              <div
                key={patient.id}
                className={
                  isSelected
                    ? "p-5 bg-blue-50/70"
                    : "p-5 hover:bg-slate-50 transition"
                }
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">

                      <span className="text-xs font-bold text-blue-600">
                        {getInitials(patient.name)}
                      </span>

                    </div>

                    <div className="min-w-0">

                      <p className="font-semibold text-slate-800 truncate">
                        {patient.name}
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        {patient.id}
                      </p>

                    </div>

                  </div>

                  <span
                    className={
                      "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap " +
                      getStatusClass(patient.status)
                    }
                  >
                    {patient.status}
                  </span>

                </div>

                <div className="grid grid-cols-2 gap-4 mt-5">

                  <div>

                    <p className="text-xs text-slate-400">
                      Age
                    </p>

                    <p className="text-sm font-medium text-slate-700 mt-1">
                      {patient.age} years
                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-slate-400">
                      Gender
                    </p>

                    <p className="text-sm font-medium text-slate-700 mt-1">
                      {patient.gender}
                    </p>

                  </div>

                  <div className="col-span-2">

                    <p className="text-xs text-slate-400">
                      Phone
                    </p>

                    <p className="text-sm font-medium text-slate-700 mt-1">
                      {patient.phone}
                    </p>

                  </div>

                </div>

                <div className="flex gap-2 mt-5">

                  <button
                    type="button"
                    onClick={() =>
                      handleView(patient)
                    }
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition inline-flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleStartCase(patient)
                    }
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition inline-flex items-center justify-center gap-2"
                  >
                    <ClipboardList size={16} />
                    Start Case
                  </button>

                </div>

              </div>
            )
          })}

        </div>

        {/* Empty State */}

        {filteredPatients.length === 0 && (
          <div className="p-12 text-center">

            <div className="w-14 h-14 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center">

              <Users
                size={26}
                className="text-slate-400"
              />

            </div>

            <p className="mt-4 font-semibold text-slate-700">
              No patients found
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear Filters
            </button>

          </div>
        )}

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
              Patient records shown here are fictional demo data.
              New records are stored locally in your browser.
              No real patient information is used.
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

export default Patients
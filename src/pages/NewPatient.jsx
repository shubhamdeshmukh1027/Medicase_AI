import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  UserPlus,
  Save,
  CheckCircle,
  User,
  Phone,
  Stethoscope,
  ShieldCheck,
  Mail,
  HeartPulse,
} from "lucide-react"

function NewPatient() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [bloodGroup, setBloodGroup] = useState("")
  const [allergies, setAllergies] = useState("")
  const [medicalConditions, setMedicalConditions] =
    useState("")

  const [success, setSuccess] = useState(false)
  const [patientId, setPatientId] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      name.trim() === "" ||
      age === "" ||
      gender === "" ||
      phone.trim() === ""
    ) {
      alert("Please fill all required fields.")
      return
    }

    if (Number(age) < 1 || Number(age) > 120) {
      alert("Please enter a valid age between 1 and 120.")
      return
    }

    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.")
      return
    }

    const existingPatients = JSON.parse(
      localStorage.getItem("medicase_patients") || "[]"
    )

    let id = ""

    do {
      const number = Math.floor(
        1000 + Math.random() * 9000
      )

      id = "P-" + number
    } while (
      existingPatients.some(
        (patient) => patient.id === id
      )
    )

    const newPatient = {
      id,
      name: name.trim(),
      age,
      gender,
      phone,
      email: email.trim(),
      bloodGroup,
      allergies: allergies.trim(),
      medicalConditions: medicalConditions.trim(),
      status: "Active",
    }

    const updatedPatients = [
      ...existingPatients,
      newPatient,
    ]

    localStorage.setItem(
      "medicase_patients",
      JSON.stringify(updatedPatients)
    )

    window.dispatchEvent(
      new Event("medicase_patients_updated")
    )

    setPatientId(id)
    setSuccess(true)

    setName("")
    setAge("")
    setGender("")
    setPhone("")
    setEmail("")
    setBloodGroup("")
    setAllergies("")
    setMedicalConditions("")

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">

        <Link
          to="/patients"
          className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition shadow-sm"
          title="Back to Patients"
        >
          <ArrowLeft size={19} />
        </Link>

        <div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-2">

            <UserPlus size={14} />

            Patient Registration

          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Register New Patient
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Create a new fictional patient record.
          </p>

        </div>

      </div>

      {/* Success Message */}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 shadow-sm">

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">

            <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">

              <CheckCircle
                size={23}
                className="text-green-600"
              />

            </div>

            <div className="flex-1">

              <p className="font-bold text-green-800">
                Patient registered successfully!
              </p>

              <p className="text-sm text-green-700 mt-1">
                A new fictional patient record has been
                saved locally.
              </p>

              <p className="text-sm text-green-700 mt-2">

                Patient ID:

                <span className="font-bold ml-1">
                  {patientId}
                </span>

              </p>

            </div>

            <button
              type="button"
              onClick={() => navigate("/patients")}
              className="px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
            >
              View Patients
            </button>

          </div>

        </div>
      )}

      {/* Main Card */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        {/* Card Header */}

        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-white border-b border-slate-200">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">

              <UserPlus
                size={23}
                className="text-white"
              />

            </div>

            <div>

              <h2 className="text-lg font-bold text-slate-800">
                Patient Information
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Enter the patient's basic and medical
                information.
              </p>

            </div>

          </div>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-6 lg:p-8"
        >

          {/* Basic Information */}

          <div className="flex items-center gap-3 mb-5">

            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">

              <User
                size={18}
                className="text-blue-600"
              />

            </div>

            <div>

              <h3 className="font-bold text-slate-800">
                Basic Information
              </h3>

              <p className="text-xs text-slate-500 mt-0.5">
                Required patient details
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Name */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Patient Name
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative">

                <User
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Enter patient name"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />

              </div>

            </div>

            {/* Age */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Age
                <span className="text-red-500 ml-1">*</span>
              </label>

              <input
                type="number"
                value={age}
                onChange={(event) =>
                  setAge(event.target.value)
                }
                placeholder="Enter age"
                min="1"
                max="120"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />

            </div>

            {/* Gender */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Gender
                <span className="text-red-500 ml-1">*</span>
              </label>

              <select
                value={gender}
                onChange={(event) =>
                  setGender(event.target.value)
                }
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              >

                <option value="">
                  Select gender
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

            </div>

            {/* Phone */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative">

                <Phone
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(
                      event.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  placeholder="10-digit phone number"
                  maxLength="10"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="patient@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />

              </div>

            </div>

            {/* Blood Group */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Blood Group
              </label>

              <select
                value={bloodGroup}
                onChange={(event) =>
                  setBloodGroup(event.target.value)
                }
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              >

                <option value="">
                  Select blood group
                </option>

                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>

              </select>

            </div>

          </div>

          {/* Medical Information */}

          <div className="mt-8 pt-8 border-t border-slate-200">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center">

                <Stethoscope
                  size={18}
                  className="text-purple-600"
                />

              </div>

              <div>

                <h3 className="font-bold text-slate-800">
                  Medical Information
                </h3>

                <p className="text-xs text-slate-500 mt-0.5">
                  Add optional medical details.
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {/* Allergies */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Allergies
                </label>

                <textarea
                  value={allergies}
                  onChange={(event) =>
                    setAllergies(event.target.value)
                  }
                  placeholder="Example: No known allergies"
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
                />

                <p className="text-xs text-slate-400 mt-2">
                  Mention any known allergies if available.
                </p>

              </div>

              {/* Medical Conditions */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Medical Conditions
                </label>

                <textarea
                  value={medicalConditions}
                  onChange={(event) =>
                    setMedicalConditions(
                      event.target.value
                    )
                  }
                  placeholder="Example: No known medical conditions"
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
                />

                <p className="text-xs text-slate-400 mt-2">
                  Add existing conditions if known.
                </p>

              </div>

            </div>

          </div>

          {/* Save Area */}

          <div className="mt-8 pt-6 border-t border-slate-200">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">

                  <ShieldCheck
                    size={18}
                    className="text-green-600"
                  />

                </div>

                <div>

                  <p className="text-sm font-semibold text-slate-700">
                    Local Demo Storage
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    This prototype saves fictional data
                    only in your browser.
                  </p>

                </div>

              </div>

              <div className="flex flex-col sm:flex-row gap-3">

                <Link
                  to="/patients"
                  className="px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 font-semibold hover:bg-slate-50 transition text-center"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:shadow-md transition flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Save Patient
                </button>

              </div>

            </div>

          </div>

        </form>

      </div>

      {/* Bottom Demo Notice */}

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">

        <div className="flex items-start gap-3">

          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">

            <HeartPulse
              size={19}
              className="text-blue-600"
            />

          </div>

          <div>

            <p className="text-sm font-bold text-blue-700">
              MediCase AI Demo Mode
            </p>

            <p className="text-xs text-blue-600 mt-1 leading-5">
              All patient information in this prototype is
              fictional. No real patient data is used.
              Records are stored locally in the browser.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default NewPatient
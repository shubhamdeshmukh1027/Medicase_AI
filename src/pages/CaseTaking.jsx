import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import {
  ClipboardList,
  User,
  ChevronLeft,
  ChevronRight,
  Save,
  Sparkles,
  CheckCircle,
  FileText,
  Stethoscope,
  ShieldCheck,
} from "lucide-react"

const demoPatients = [
  { id: "P-1001", name: "Aarav Sharma", age: 28, gender: "Male" },
  { id: "P-1002", name: "Priya Patil", age: 34, gender: "Female" },
  { id: "P-1003", name: "Rahul Mehta", age: 45, gender: "Male" },
  { id: "P-1004", name: "Sneha Joshi", age: 26, gender: "Female" },
  { id: "P-1005", name: "Vikram Shah", age: 51, gender: "Male" },
  { id: "P-1006", name: "Ananya Kulkarni", age: 31, gender: "Female" },
  { id: "P-1007", name: "Rohan Desai", age: 39, gender: "Male" },
  { id: "P-1008", name: "Neha Joshi", age: 29, gender: "Female" },
  { id: "P-1009", name: "Aditya Patil", age: 42, gender: "Male" },
  { id: "P-1010", name: "Kavya Deshmukh", age: 36, gender: "Female" },
]

const steps = [
  "Chief Complaint",
  "Present History",
  "Medical History",
  "Medicines & Allergies",
  "Family History",
  "Lifestyle",
  "Clinical Examination",
  "Review",
]

function CaseTaking() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const selectedId = searchParams.get("patient")

  const [selectedPatient, setSelectedPatient] = useState(
    selectedId || ""
  )

  const [currentStep, setCurrentStep] = useState(0)
  const [saved, setSaved] = useState(false)

  const [chiefComplaint, setChiefComplaint] = useState("")
  const [presentHistory, setPresentHistory] = useState("")
  const [medicalHistory, setMedicalHistory] = useState("")
  const [medicines, setMedicines] = useState("")
  const [allergies, setAllergies] = useState("")
  const [familyHistory, setFamilyHistory] = useState("")
  const [lifestyle, setLifestyle] = useState("")
  const [clinicalExamination, setClinicalExamination] =
    useState("")

  const savedPatients = JSON.parse(
    localStorage.getItem("medicase_patients") || "[]"
  )

  const allPatients = [
    ...demoPatients,
    ...savedPatients,
  ]

  const patient = allPatients.find(
    (item) => item.id === selectedPatient
  )

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setSaved(false)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const saveCase = () => {
    if (!selectedPatient) {
      alert("Please select a patient first.")
      return
    }

    const caseData = {
      id: "CASE-" + Date.now(),
      patientId: selectedPatient,
      patientName: patient ? patient.name : "",
      chiefComplaint,
      presentHistory,
      medicalHistory,
      medicines,
      allergies,
      familyHistory,
      lifestyle,
      clinicalExamination,
      createdAt: new Date().toLocaleString(),
      status: "Completed",
    }

    const oldCases = JSON.parse(
      localStorage.getItem("medicase_cases") || "[]"
    )

    oldCases.push(caseData)

    localStorage.setItem(
      "medicase_cases",
      JSON.stringify(oldCases)
    )

    window.dispatchEvent(
      new Event("medicase_cases_updated")
    )

    setSaved(true)
  }

  const generateSummary = () => {
    if (!selectedPatient) {
      alert("Please select a patient first.")
      return
    }

    saveCase()

    setTimeout(() => {
      navigate("/ai-summary")
    }, 500)
  }

  const renderStep = () => {
    const textareaClass =
      "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"

    const labelClass =
      "block text-sm font-semibold text-slate-700 mb-2"

    if (currentStep === 0) {
      return (
        <div>
          <SectionTitle
            icon={FileText}
            title="Chief Complaint"
            description="Record the main reason for the patient's visit."
          />

          <label className={labelClass}>
            Chief Complaint
          </label>

          <textarea
            value={chiefComplaint}
            onChange={(event) =>
              setChiefComplaint(event.target.value)
            }
            placeholder="Example: Patient reports headache for the last 3 days..."
            rows="8"
            className={textareaClass}
          />
        </div>
      )
    }

    if (currentStep === 1) {
      return (
        <div>
          <SectionTitle
            icon={FileText}
            title="Present History"
            description="Record details about the current complaint."
          />

          <label className={labelClass}>
            History of Present Illness
          </label>

          <textarea
            value={presentHistory}
            onChange={(event) =>
              setPresentHistory(event.target.value)
            }
            placeholder="Describe when the symptoms started, duration, changes, and related symptoms..."
            rows="9"
            className={textareaClass}
          />
        </div>
      )
    }

    if (currentStep === 2) {
      return (
        <div>
          <SectionTitle
            icon={Stethoscope}
            title="Medical History"
            description="Record previous medical history."
          />

          <label className={labelClass}>
            Previous Medical Conditions
          </label>

          <textarea
            value={medicalHistory}
            onChange={(event) =>
              setMedicalHistory(event.target.value)
            }
            placeholder="Example: Previous history of asthma, diabetes, hypertension, surgeries..."
            rows="9"
            className={textareaClass}
          />
        </div>
      )
    }

    if (currentStep === 3) {
      return (
        <div>
          <SectionTitle
            icon={Stethoscope}
            title="Medicines & Allergies"
            description="Record current medicines and known allergies."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            <div>
              <label className={labelClass}>
                Current Medicines
              </label>

              <textarea
                value={medicines}
                onChange={(event) =>
                  setMedicines(event.target.value)
                }
                placeholder="Example: Medicine name, dosage, frequency..."
                rows="7"
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Allergies
              </label>

              <textarea
                value={allergies}
                onChange={(event) =>
                  setAllergies(event.target.value)
                }
                placeholder="Example: No known allergies"
                rows="7"
                className={textareaClass}
              />
            </div>

          </div>
        </div>
      )
    }

    if (currentStep === 4) {
      return (
        <div>
          <SectionTitle
            icon={User}
            title="Family History"
            description="Record relevant family medical history."
          />

          <label className={labelClass}>
            Family Medical History
          </label>

          <textarea
            value={familyHistory}
            onChange={(event) =>
              setFamilyHistory(event.target.value)
            }
            placeholder="Example: Family history of diabetes or hypertension..."
            rows="9"
            className={textareaClass}
          />
        </div>
      )
    }

    if (currentStep === 5) {
      return (
        <div>
          <SectionTitle
            icon={User}
            title="Lifestyle"
            description="Record relevant lifestyle information."
          />

          <label className={labelClass}>
            Lifestyle Information
          </label>

          <textarea
            value={lifestyle}
            onChange={(event) =>
              setLifestyle(event.target.value)
            }
            placeholder="Example: Diet, exercise, sleep, smoking, occupation..."
            rows="9"
            className={textareaClass}
          />
        </div>
      )
    }

    if (currentStep === 6) {
      return (
        <div>
          <SectionTitle
            icon={Stethoscope}
            title="Clinical Examination"
            description="Record examination observations."
          />

          <label className={labelClass}>
            Examination Notes
          </label>

          <textarea
            value={clinicalExamination}
            onChange={(event) =>
              setClinicalExamination(event.target.value)
            }
            placeholder="Example: General appearance, vital signs, examination observations..."
            rows="9"
            className={textareaClass}
          />
        </div>
      )
    }

    const reviewItems = [
      ["Chief Complaint", chiefComplaint],
      ["Present History", presentHistory],
      ["Medical History", medicalHistory],
      ["Current Medicines", medicines],
      ["Allergies", allergies],
      ["Family History", familyHistory],
      ["Lifestyle", lifestyle],
      ["Clinical Examination", clinicalExamination],
    ]

    return (
      <div>
        <SectionTitle
          icon={CheckCircle}
          title="Review Case"
          description="Review the recorded information before saving."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {reviewItems.map(([title, value]) => (
            <div
              key={title}
              className="bg-slate-50 border border-slate-100 rounded-xl p-4"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                {title}
              </p>

              <p className="text-sm text-slate-700 mt-2 leading-6">
                {value || "Not recorded"}
              </p>
            </div>
          ))}

        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}

      <div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-3">

          <ClipboardList size={14} />

          Clinical Case Documentation

        </div>

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">

            <ClipboardList
              size={24}
              className="text-white"
            />

          </div>

          <div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Case Taking
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Record structured patient case information.
            </p>

          </div>

        </div>

      </div>

      {/* Patient Selection */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-5 sm:p-6 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">

              <User
                size={19}
                className="text-blue-600"
              />

            </div>

            <div>

              <h2 className="font-bold text-slate-800">
                Select Patient
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Choose the patient for this case.
              </p>

            </div>

          </div>

        </div>

        <div className="p-5 sm:p-6">

          <select
            value={selectedPatient}
            onChange={(event) => {
              setSelectedPatient(event.target.value)
              setSaved(false)
            }}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          >

            <option value="">
              Select a patient
            </option>

            {allPatients.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.id} - {item.name}
              </option>
            ))}

          </select>

          {patient && (
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-2xl p-4">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">

                  <User
                    size={22}
                    className="text-blue-600"
                  />

                </div>

                <div className="flex-1 min-w-0">

                  <p className="font-bold text-slate-800">
                    {patient.name}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    {patient.id} • {patient.age} years •{" "}
                    {patient.gender}
                  </p>

                </div>

                <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-white text-blue-700 border border-blue-100 text-xs font-semibold">
                  Selected
                </span>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* Progress */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6">

        <div className="flex items-center justify-between mb-3">

          <div>

            <p className="text-sm font-bold text-slate-800">
              Case Progress
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Step {currentStep + 1} of {steps.length}
            </p>

          </div>

          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold">
            {Math.round(
              ((currentStep + 1) / steps.length) * 100
            )}%
          </span>

        </div>

        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">

          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{
              width:
                ((currentStep + 1) / steps.length) * 100 +
                "%",
            }}
          />

        </div>

        <div className="hidden md:grid grid-cols-8 gap-2 mt-5">

          {steps.map((step, index) => (

            <button
              key={step}
              type="button"
              onClick={() => setCurrentStep(index)}
              className={
                "p-2.5 rounded-xl text-xs font-semibold transition " +
                (index === currentStep
                  ? "bg-blue-600 text-white shadow-sm"
                  : index < currentStep
                  ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  : "bg-slate-50 text-slate-400 hover:bg-slate-100")
              }
            >
              <span className="block text-[10px] opacity-80 mb-1">
                STEP {index + 1}
              </span>

              {step}

            </button>

          ))}

        </div>

      </div>

      {/* Current Step Form */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-5 sm:p-6 lg:p-8">

          {renderStep()}

        </div>

        {/* Action Bar */}

        <div className="p-5 sm:p-6 border-t border-slate-200 bg-slate-50">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition flex items-center justify-center gap-2"
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            <div className="flex flex-col sm:flex-row gap-3">

              <button
                type="button"
                onClick={saveCase}
                className="px-5 py-3 rounded-xl border border-blue-200 bg-white text-blue-600 font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                <Save size={18} />
                Save Case
              </button>

              {currentStep < steps.length - 1 ? (

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:shadow-md transition flex items-center justify-center gap-2"
                >
                  Next Step
                  <ChevronRight size={18} />
                </button>

              ) : (

                <button
                  type="button"
                  onClick={generateSummary}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:shadow-md transition flex items-center justify-center gap-2"
                >
                  <Sparkles size={18} />
                  Generate AI Summary
                </button>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* Saved Message */}

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 shadow-sm">

          <div className="flex items-start gap-3">

            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">

              <CheckCircle
                size={21}
                className="text-green-600"
              />

            </div>

            <div>

              <p className="font-bold text-green-800">
                Case saved successfully
              </p>

              <p className="text-sm text-green-700 mt-1">
                The case has been stored locally in Demo Mode.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Demo Notice */}

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">

        <div className="flex items-start gap-3">

          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">

            <ShieldCheck
              size={20}
              className="text-amber-700"
            />

          </div>

          <div>

            <p className="text-sm font-bold text-amber-800">
              Demo Mode & Safety Notice
            </p>

            <p className="text-xs text-amber-700 mt-1 leading-5">
              This prototype uses fictional patient data and
              stores information locally in your browser.
              AI-generated documentation is for demonstration
              only and should be reviewed by a qualified
              healthcare professional.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

function SectionTitle({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3 mb-6">

      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">

        <Icon
          size={19}
          className="text-blue-600"
        />

      </div>

      <div>

        <h2 className="text-xl font-bold text-slate-800">
          {title}
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {description}
        </p>

      </div>

    </div>
  )
}

export default CaseTaking
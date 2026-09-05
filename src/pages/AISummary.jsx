import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Sparkles,
  Copy,
  RefreshCw,
  Save,
  FileText,
  User,
  CheckCircle,
  AlertTriangle,
  ClipboardCheck,
  ShieldCheck,
  Clock3,
  ArrowLeft,
} from "lucide-react"

function AISummary() {
  const navigate = useNavigate()

  const [caseData, setCaseData] = useState(null)
  const [summary, setSummary] = useState("")
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    const cases = JSON.parse(
      localStorage.getItem("medicase_cases") || "[]"
    )

    if (cases.length > 0) {
      const latestCase = cases[cases.length - 1]

      setCaseData(latestCase)
      createSummary(latestCase)
    }
  }, [])

  const createSummary = (data) => {
    const patientName = data.patientName || "Demo Patient"

    const generatedSummary = `
PATIENT CASE SUMMARY

Patient
${patientName}

Patient ID
${data.patientId || "N/A"}

Chief Complaint
${data.chiefComplaint || "No complaint recorded."}

Present History
${data.presentHistory || "No present history recorded."}

Medical History
${data.medicalHistory || "No previous medical history recorded."}

Medicines
${data.medicines || "No medicines recorded."}

Allergies
${data.allergies || "No allergies recorded."}

Family History
${data.familyHistory || "No family history recorded."}

Lifestyle
${data.lifestyle || "No lifestyle information recorded."}

Clinical Examination
${data.clinicalExamination || "No examination notes recorded."}

DOCUMENTATION NOTE

This summary is generated from the information entered during case taking. It is intended only to assist with clinical documentation and organization of recorded information.

No diagnosis, prescription, or treatment recommendation has been generated.
`

    setSummary(generatedSummary.trim())
  }

  const regenerateSummary = () => {
    if (!caseData) return

    setGenerating(true)
    setSaved(false)

    setTimeout(() => {
      createSummary(caseData)
      setGenerating(false)
    }, 800)
  }

  const copySummary = async () => {
    if (!summary) return

    try {
      await navigator.clipboard.writeText(summary)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      alert("Unable to copy summary.")
    }
  }

  const saveSummary = () => {
    if (!caseData || !summary) return

    const savedSummaries = JSON.parse(
      localStorage.getItem("medicase_ai_summaries") || "[]"
    )

    const summaryData = {
      id: "AI-" + Date.now(),
      caseId: caseData.id,
      patientId: caseData.patientId,
      patientName: caseData.patientName,
      summary: summary,
      createdAt: new Date().toLocaleString(),
    }

    savedSummaries.push(summaryData)

    localStorage.setItem(
      "medicase_ai_summaries",
      JSON.stringify(savedSummaries)
    )

    setSaved(true)
  }

  if (!caseData) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-8 sm:p-12 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center">
              <Sparkles
                size={38}
                className="text-blue-600"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-6">
              No Case Available
            </h1>

            <p className="max-w-md mx-auto text-slate-500 mt-3 leading-6">
              Please complete a patient case before generating an AI summary.
            </p>

            <button
              type="button"
              onClick={() => navigate("/case-taking")}
              className="mt-7 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2"
            >
              <ClipboardCheck size={18} />
              Start Case Taking
            </button>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-center">
            <p className="text-xs text-slate-400">
              MediCase AI • Frontend Prototype • Fictional Demo Data Only
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 sm:p-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Sparkles
                size={26}
                className="text-blue-600"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                  AI DOCUMENTATION
                </span>

                <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold flex items-center gap-1">
                  <CheckCircle size={13} />
                  Ready
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-3">
                AI Case Summary
              </h1>

              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                Structured documentation assistance created from the recorded case information.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => navigate("/case-taking")}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition"
            >
              <ArrowLeft size={17} />
              Back to Case
            </button>

            <button
              type="button"
              onClick={regenerateSummary}
              disabled={generating}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                size={17}
                className={generating ? "animate-spin" : ""}
              />
              {generating ? "Generating..." : "Regenerate"}
            </button>

            <button
              type="button"
              onClick={saveSummary}
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              <Save size={17} />
              Save Summary
            </button>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
            <AlertTriangle
              size={20}
              className="text-amber-600"
            />
          </div>

          <div>
            <p className="font-bold text-amber-800">
              AI-generated documentation assistance
            </p>

            <p className="text-sm text-amber-700 mt-1 leading-6">
              Please verify all information before clinical use. This prototype
              does not diagnose, prescribe medicines, or recommend treatment.
            </p>
          </div>
        </div>
      </div>

      {/* Patient + Case Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <InfoCard
          icon={User}
          label="Patient"
          value={caseData.patientName || "Demo Patient"}
        />

        <InfoCard
          icon={ShieldCheck}
          label="Patient ID"
          value={caseData.patientId || "N/A"}
        />

        <InfoCard
          icon={FileText}
          label="Case ID"
          value={caseData.id || "N/A"}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* Recorded Information */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

          <div className="p-5 border-b border-slate-200 bg-slate-50/70">
            <div className="flex items-center justify-between gap-3">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <FileText
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-slate-800">
                    Recorded Case
                  </h2>

                  <p className="text-xs text-slate-500 mt-1">
                    Information from case taking
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                Source Data
              </span>
            </div>
          </div>

          <div className="p-5 space-y-4">

            <CaseSection
              title="Chief Complaint"
              value={caseData.chiefComplaint}
            />

            <CaseSection
              title="Present History"
              value={caseData.presentHistory}
            />

            <CaseSection
              title="Medical History"
              value={caseData.medicalHistory}
            />

            <CaseSection
              title="Medicines"
              value={caseData.medicines}
            />

            <CaseSection
              title="Allergies"
              value={caseData.allergies}
            />

            <CaseSection
              title="Family History"
              value={caseData.familyHistory}
            />

            <CaseSection
              title="Lifestyle"
              value={caseData.lifestyle}
            />

            <CaseSection
              title="Clinical Examination"
              value={caseData.clinicalExamination}
            />
          </div>
        </div>

        {/* AI Summary */}
        <div className="xl:col-span-3 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

          <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-blue-50/80 to-teal-50/50">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white border border-blue-100 flex items-center justify-center">
                  <Sparkles
                    size={21}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-slate-800">
                    AI Generated Summary
                  </h2>

                  <p className="text-xs text-slate-500 mt-1">
                    Editable documentation draft
                  </p>
                </div>
              </div>

              <span className="self-start sm:self-auto px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle size={14} />
                Generated
              </span>
            </div>
          </div>

          <div className="p-5">

            <div className="mb-4 flex items-center gap-2 text-xs text-slate-400">
              <Clock3 size={14} />
              <span>
                Review and edit the summary before saving.
              </span>
            </div>

            <textarea
              value={summary}
              onChange={(event) => {
                setSummary(event.target.value)
                setSaved(false)
              }}
              rows="25"
              className="w-full p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 leading-7 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-y transition"
            />

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-4">

              <button
                type="button"
                onClick={copySummary}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition"
              >
                {copied ? (
                  <CheckCircle size={17} />
                ) : (
                  <Copy size={17} />
                )}

                {copied ? "Copied" : "Copy Summary"}
              </button>

              <button
                type="button"
                onClick={regenerateSummary}
                disabled={generating}
                className="px-4 py-2.5 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 font-semibold flex items-center justify-center gap-2 hover:bg-blue-100 transition disabled:opacity-50"
              >
                <RefreshCw
                  size={17}
                  className={generating ? "animate-spin" : ""}
                />

                {generating ? "Generating..." : "Regenerate"}
              </button>

              <button
                type="button"
                onClick={saveSummary}
                className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
              >
                <Save size={17} />
                Save Summary
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Success */}
      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
              <CheckCircle
                size={20}
                className="text-green-600"
              />
            </div>

            <div>
              <p className="font-bold text-green-800">
                AI Summary saved successfully
              </p>

              <p className="text-sm text-green-700 mt-1">
                The summary has been stored locally in Demo Mode.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <FeatureNotice
          icon={ShieldCheck}
          title="Privacy"
          text="Demo information is stored locally in the browser."
        />

        <FeatureNotice
          icon={ClipboardCheck}
          title="Documentation"
          text="Summary is created from recorded case information."
        />

        <FeatureNotice
          icon={AlertTriangle}
          title="Review Required"
          text="Always verify the generated information before use."
        />
      </div>

      {/* Footer */}
      <div className="text-center pb-2">
        <p className="text-xs text-slate-400">
          MediCase AI • Frontend Prototype • Fictional Demo Data Only
        </p>
      </div>
    </div>
  )
}

function InfoCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <Icon
            size={19}
            className="text-blue-600"
          />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            {label}
          </p>

          <p className="text-sm font-bold text-slate-800 mt-1 truncate">
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}

function CaseSection({
  title,
  value,
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <div className="mt-2 bg-slate-50 border border-slate-100 rounded-xl p-3.5">
        <p className="text-sm text-slate-700 leading-6 whitespace-pre-wrap">
          {value || "Not recorded"}
        </p>
      </div>
    </div>
  )
}

function FeatureNotice({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4">
      <div className="flex items-start gap-3">

        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
          <Icon
            size={18}
            className="text-slate-500"
          />
        </div>

        <div>
          <p className="text-sm font-bold text-slate-700">
            {title}
          </p>

          <p className="text-xs text-slate-500 mt-1 leading-5">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AISummary
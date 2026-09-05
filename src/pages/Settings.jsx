import { useEffect, useState } from "react"
import {
  Settings as SettingsIcon,
  User,
  Bell,
  ShieldCheck,
  Database,
  Save,
  CheckCircle,
  Trash2,
  AlertTriangle,
  SlidersHorizontal,
} from "lucide-react"

function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [success, setSuccess] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  useEffect(() => {
    const savedSettings = JSON.parse(
      localStorage.getItem("medicase_settings") || "null"
    )

    if (savedSettings) {
      setNotifications(
        savedSettings.notifications ?? true
      )

      setAutoSave(
        savedSettings.autoSave ?? true
      )
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem(
      "medicase_settings",
      JSON.stringify({
        notifications,
        autoSave,
      })
    )

    setSuccess(true)

    setTimeout(() => {
      setSuccess(false)
    }, 3000)
  }

  const handleResetDemoData = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all demo data?\n\nThis will remove saved patients, cases, AI summaries and follow-ups."
    )

    if (!confirmed) {
      return
    }

    localStorage.removeItem("medicase_patients")
    localStorage.removeItem("medicase_cases")
    localStorage.removeItem("medicase_ai_summaries")
    localStorage.removeItem("medicase_followups")
    localStorage.removeItem("medicase_settings")

    setNotifications(true)
    setAutoSave(true)

    window.dispatchEvent(
      new Event("medicase_patients_updated")
    )

    window.dispatchEvent(
      new Event("medicase_cases_updated")
    )

    window.dispatchEvent(
      new Event("medicase_followups_updated")
    )

    setResetSuccess(true)

    setTimeout(() => {
      setResetSuccess(false)
    }, 4000)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 sm:p-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">

              <SettingsIcon
                size={27}
                className="text-blue-600"
              />

            </div>

            <div>

              <div className="flex items-center gap-2 flex-wrap">

                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                  CONFIGURATION
                </span>

                <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold">
                  Demo Mode
                </span>

              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-3">
                Settings
              </h1>

              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                Manage your MediCase AI profile, preferences and demo data.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">

            <SlidersHorizontal
              size={18}
              className="text-slate-500"
            />

            <div>

              <p className="text-xs text-slate-400">
                Application
              </p>

              <p className="text-sm font-bold text-slate-700">
                MediCase AI v1.0
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Success Messages */}

      {success && (

        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">

          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">

            <CheckCircle
              size={20}
              className="text-green-600"
            />

          </div>

          <div>

            <p className="text-sm font-bold text-green-700">
              Settings saved successfully.
            </p>

            <p className="text-xs text-green-600 mt-1">
              Your preferences have been saved to browser localStorage.
            </p>

          </div>

        </div>

      )}

      {resetSuccess && (

        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">

          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">

            <CheckCircle
              size={20}
              className="text-green-600"
            />

          </div>

          <div>

            <p className="text-sm font-bold text-green-700">
              Demo data reset successfully.
            </p>

            <p className="text-xs text-green-600 mt-1">
              Saved patients, cases, summaries and follow-ups were cleared.
            </p>

          </div>

        </div>

      )}

      {/* Main Grid */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Doctor Profile */}

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          <SectionHeader
            icon={User}
            title="Doctor Profile"
            subtitle="Demo doctor information"
            iconClass="text-blue-600"
            iconBg="bg-blue-50"
          />

          <div className="p-5 sm:p-6">

            <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-2xl">

              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                DD
              </div>

              <div>

                <p className="font-bold text-slate-800">
                  Dr. Demo User
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Doctor • MediCase Demo Clinic
                </p>

              </div>

              <span className="ml-auto hidden sm:inline-flex px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold">
                Active
              </span>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <ReadOnlyField
                label="Doctor Name"
                value="Dr. Demo User"
              />

              <ReadOnlyField
                label="Role"
                value="Doctor"
              />

              <ReadOnlyField
                label="Hospital / Clinic"
                value="MediCase Demo Clinic"
              />

              <ReadOnlyField
                label="Account Status"
                value="Active Demo Account"
                success
              />

            </div>

          </div>

        </div>

        {/* Application */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          <SectionHeader
            icon={Database}
            title="Application"
            subtitle="Prototype information"
            iconClass="text-purple-600"
            iconBg="bg-purple-50"
          />

          <div className="p-5 sm:p-6 space-y-4">

            <InfoRow
              label="Application"
              value="MediCase AI"
            />

            <InfoRow
              label="Version"
              value="1.0.0 Prototype"
            />

            <InfoRow
              label="Frontend"
              value="React + Vite"
            />

            <InfoRow
              label="Storage"
              value="Browser LocalStorage"
            />

            <div className="pt-2">

              <span className="inline-flex px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                Frontend Only
              </span>

            </div>

          </div>

        </div>

        {/* Preferences */}

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          <SectionHeader
            icon={Bell}
            title="Preferences"
            subtitle="Control application behavior"
            iconClass="text-blue-600"
            iconBg="bg-blue-50"
          />

          <div className="p-5 sm:p-6">

            <ToggleRow
              title="Notifications"
              description="Show follow-up and application notifications."
              enabled={notifications}
              onChange={() =>
                setNotifications(!notifications)
              }
            />

            <div className="border-t border-slate-100 my-5" />

            <ToggleRow
              title="Auto Save"
              description="Automatically save prototype data locally."
              enabled={autoSave}
              onChange={() =>
                setAutoSave(!autoSave)
              }
            />

            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">

              <p className="text-sm font-semibold text-blue-700">
                Current Preferences
              </p>

              <div className="flex flex-wrap gap-2 mt-3">

                <span className="px-3 py-1.5 bg-white rounded-lg text-xs font-semibold text-slate-600">
                  Notifications:{" "}
                  {notifications ? "On" : "Off"}
                </span>

                <span className="px-3 py-1.5 bg-white rounded-lg text-xs font-semibold text-slate-600">
                  Auto Save:{" "}
                  {autoSave ? "On" : "Off"}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Data Privacy */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          <SectionHeader
            icon={ShieldCheck}
            title="Data & Privacy"
            subtitle="Prototype data information"
            iconClass="text-green-600"
            iconBg="bg-green-50"
          />

          <div className="p-5 sm:p-6 space-y-4">

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">

              <div className="flex items-start gap-3">

                <AlertTriangle
                  size={19}
                  className="text-amber-600 mt-0.5 flex-shrink-0"
                />

                <div>

                  <p className="font-bold text-amber-800">
                    Fictional Data Only
                  </p>

                  <p className="text-xs text-amber-700 mt-1 leading-5">
                    Do not enter real patient information into this prototype.
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">

              <div className="flex items-start gap-3">

                <Database
                  size={19}
                  className="text-green-600 mt-0.5 flex-shrink-0"
                />

                <div>

                  <p className="font-bold text-green-800">
                    Local Storage
                  </p>

                  <p className="text-xs text-green-700 mt-1 leading-5">
                    Demo data is stored only in this browser.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Reset Demo Data */}

        <div className="lg:col-span-3 bg-white border border-red-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="p-5 sm:p-6 border-b border-red-100">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center">

                <Trash2
                  size={20}
                  className="text-red-600"
                />

              </div>

              <div>

                <h2 className="font-bold text-slate-800">
                  Reset Demo Data
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Clear all locally saved prototype information.
                </p>

              </div>

            </div>

          </div>

          <div className="p-5 sm:p-6">

            <div className="bg-red-50 border border-red-200 rounded-xl p-4">

              <div className="flex items-start gap-3">

                <AlertTriangle
                  size={21}
                  className="text-red-600 mt-0.5 flex-shrink-0"
                />

                <div>

                  <p className="font-bold text-red-800">
                    Warning
                  </p>

                  <p className="text-sm text-red-700 mt-1 leading-6">
                    Resetting will remove saved patients, cases,
                    AI summaries, follow-ups and settings from
                    this browser.
                  </p>

                </div>

              </div>

            </div>

            <button
              type="button"
              onClick={handleResetDemoData}
              className="mt-4 w-full sm:w-auto px-5 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
            >

              <Trash2 size={18} />

              Reset Demo Data

            </button>

          </div>

        </div>

      </div>

      {/* Bottom Actions */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>

            <p className="font-bold text-slate-800">
              Save your preferences
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Changes are stored locally in your browser.
            </p>

          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-sm"
          >

            <Save size={18} />

            Save Settings

          </button>

        </div>

      </div>

      {/* Demo Notice */}

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">

        <div className="flex items-start gap-3">

          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0">

            <ShieldCheck
              size={18}
              className="text-blue-600"
            />

          </div>

          <div>

            <p className="text-sm font-bold text-blue-700">
              MediCase AI Demo Mode
            </p>

            <p className="text-xs text-blue-600 mt-1 leading-5">
              This is a frontend-only prototype created for demonstration.
              It uses fictional data and browser localStorage. No real
              patient data or backend service is connected.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  iconClass,
  iconBg,
}) {
  return (
    <div className="p-5 sm:p-6 border-b border-slate-200">

      <div className="flex items-center gap-3">

        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}
        >

          <Icon
            size={20}
            className={iconClass}
          />

        </div>

        <div>

          <h2 className="font-bold text-slate-800">
            {title}
          </h2>

          <p className="text-sm text-slate-500 mt-0.5">
            {subtitle}
          </p>

        </div>

      </div>

    </div>
  )
}

function ReadOnlyField({
  label,
  value,
  success = false,
}) {
  return (
    <div>

      <label className="block text-xs font-semibold text-slate-500 mb-2">
        {label}
      </label>

      <div
        className={`px-4 py-3 rounded-xl border ${
          success
            ? "bg-green-50 border-green-200 text-green-700"
            : "bg-slate-50 border-slate-200 text-slate-700"
        }`}
      >

        <p className="text-sm font-semibold">
          {value}
        </p>

      </div>

    </div>
  )
}

function InfoRow({
  label,
  value,
}) {
  return (
    <div className="flex items-start justify-between gap-4">

      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
        {label}
      </p>

      <p className="text-sm font-semibold text-slate-700 text-right">
        {value}
      </p>

    </div>
  )
}

function ToggleRow({
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4">

      <div>

        <p className="font-semibold text-slate-700">
          {title}
        </p>

        <p className="text-sm text-slate-500 mt-1 leading-5">
          {description}
        </p>

      </div>

      <button
        type="button"
        onClick={onChange}
        aria-label={`Toggle ${title}`}
        className={`relative w-12 h-6 rounded-full flex-shrink-0 transition ${
          enabled
            ? "bg-blue-600"
            : "bg-slate-300"
        }`}
      >

        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition ${
            enabled
              ? "left-7"
              : "left-1"
          }`}
        />

      </button>

    </div>
  )
}

export default Settings
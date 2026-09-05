import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Stethoscope,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Sparkles,
  FileText,
  Users,
} from "lucide-react"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")

    if (
      email === "doctor@medicase.ai" &&
      password === "demo123"
    ) {
      localStorage.setItem(
        "medicase_logged_in",
        "true"
      )

      localStorage.setItem(
        "medicase_user",
        JSON.stringify({
          name: "Dr. Demo User",
          role: "Doctor",
          email: "doctor@medicase.ai",
        })
      )

      if (rememberMe) {
        localStorage.setItem(
          "medicase_remember",
          "true"
        )
      } else {
        localStorage.removeItem(
          "medicase_remember"
        )
      }

      navigate("/dashboard")
    } else {
      setError(
        "The email or password you entered is incorrect."
      )
    }
  }

  const handleGoogleLogin = () => {
    setError(
      "Google sign-in is not connected in this frontend prototype."
    )
  }

  const handleForgotPassword = () => {
    setError(
      "Password recovery is not available in this frontend prototype."
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">

          {/* LEFT PANEL */}
          <div className="hidden lg:flex bg-blue-600 text-white p-12 xl:p-14 flex-col justify-between min-h-[720px]">

            <div>

              {/* Brand */}
              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                  <Stethoscope size={26} />
                </div>

                <div>
                  <h1 className="text-xl font-bold tracking-tight">
                    MediCase AI
                  </h1>

                  <p className="text-xs text-blue-100 mt-0.5">
                    Clinical Documentation
                  </p>
                </div>

              </div>

              {/* Hero */}
              <div className="mt-20 max-w-lg">

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-blue-50 mb-6">
                  <Sparkles size={14} />
                  Intelligent healthcare workflow
                </div>

                <h2 className="text-4xl xl:text-5xl font-bold leading-[1.12] tracking-tight">
                  Spend less time
                  <br />
                  documenting.
                  <br />
                  Focus more on care.
                </h2>

                <p className="mt-6 text-blue-100 leading-7 text-sm xl:text-base max-w-md">
                  Organize patient information, capture clinical
                  cases, and create structured documentation
                  through one simple workflow.
                </p>

              </div>

              {/* Features */}
              <div className="mt-12 space-y-5">

                <div className="flex items-start gap-4">

                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <FileText size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      Structured case-taking
                    </p>

                    <p className="text-xs text-blue-100 mt-1">
                      Capture important case information in an organized way.
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Sparkles size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      AI-assisted summaries
                    </p>

                    <p className="text-xs text-blue-100 mt-1">
                      Turn recorded case information into structured summaries.
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Users size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      Simple patient management
                    </p>

                    <p className="text-xs text-blue-100 mt-1">
                      Manage patients, reports, and follow-ups from one place.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-blue-100 border-t border-white/15 pt-6">
              <span>
                MediCase AI
              </span>

              <span>
                Frontend Prototype
              </span>
            </div>

          </div>


          {/* RIGHT LOGIN PANEL */}
          <div className="p-6 sm:p-10 xl:p-14 flex flex-col justify-center">

            {/* Mobile Brand */}
            <div className="lg:hidden flex items-center gap-3 mb-10">

              <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center">
                <Stethoscope
                  size={23}
                  className="text-white"
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


            {/* Heading */}
            <div className="mb-8">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-5">
                <ShieldCheck size={14} />
                Healthcare workspace
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Welcome back
              </h2>

              <p className="text-sm text-slate-500 mt-3 leading-6 max-w-md">
                Sign in to access your MediCase AI workspace
                and continue your documentation workflow.
              </p>

            </div>


            {/* Error */}
            {error && (
              <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                {error}
              </div>
            )}


            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full h-12 flex items-center justify-center gap-3 border border-slate-300 rounded-xl bg-white text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-400 transition"
            >

              <Globe
                size={19}
                className="text-slate-600"
              />

              Continue with Google

            </button>


            {/* Divider */}
            <div className="flex items-center gap-4 my-7">

              <div className="flex-1 h-px bg-slate-200" />

              <span className="text-[11px] font-semibold tracking-wider text-slate-400">
                OR
              </span>

              <div className="flex-1 h-px bg-slate-200" />

            </div>


            {/* Form */}
            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition"
                  />

                </div>

              </div>


              {/* Password */}
              <div>

                <div className="flex items-center justify-between mb-2">

                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full h-12 pl-11 pr-12 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

              </div>


              {/* Remember */}
              <div className="flex items-center">

                <label className="flex items-center gap-2 cursor-pointer">

                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 accent-blue-600"
                  />

                  <span className="text-sm text-slate-600">
                    Remember me
                  </span>

                </label>

              </div>


              {/* Sign In */}
              <button
                type="submit"
                className="w-full h-12 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition"
              >

                <span>
                  Sign in
                </span>

                <ArrowRight size={18} />

              </button>

            </form>


            {/* Trust Card */}
            <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-200">

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">

                  <ShieldCheck
                    size={19}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <p className="text-sm font-semibold text-slate-700">
                    Designed for a simple workflow
                  </p>

                  <div className="mt-2 space-y-1.5">

                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        size={14}
                        className="text-emerald-500"
                      />

                      <span className="text-xs text-slate-500">
                        Patient case organization
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        size={14}
                        className="text-emerald-500"
                      />

                      <span className="text-xs text-slate-500">
                        AI-assisted documentation
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        size={14}
                        className="text-emerald-500"
                      />

                      <span className="text-xs text-slate-500">
                        Reports and follow-up management
                      </span>
                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* Prototype Notice */}
            <div className="mt-5 text-center">

              <p className="text-xs text-slate-400 leading-5">
                MediCase AI is a frontend demonstration prototype
                using fictional data only.
              </p>

            </div>


            {/* Footer */}
            <div className="mt-7 pt-6 border-t border-slate-100 text-center">

              <p className="text-xs text-slate-400">
                © 2026 MediCase AI
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Smart Patient Case-Taking & Clinical Documentation
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login
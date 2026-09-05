# 🏥 MediCase AI

## Smart Patient Case-Taking & Clinical Documentation

MediCase AI is a modern healthcare dashboard prototype designed to simplify patient case-taking and clinical documentation. The project provides a simple and organized interface for managing patient records, recording clinical cases, generating AI-assisted summaries, managing follow-ups, and generating reports.

This project is developed as a **frontend-only prototype for demonstration and educational purposes**, using fictional patient data and browser localStorage.

---

## 🎯 Project Objective

The main objective of MediCase AI is to provide a simple digital workflow for clinical documentation.

The system brings important activities into one dashboard:

**Patients → Case Taking → AI Summary → Reports → Follow-ups**

It is designed to reduce manual documentation work and provide a more organized way to manage clinical case information.

---

## ✨ Key Features

### 📊 Dashboard

* Total patient statistics
* Today's cases
* Pending follow-ups
* Generated reports
* Recent patients
* Recent case activity
* Quick action buttons

### 👥 Patient Management

* View patient records
* Search patients by name, ID, or phone
* Filter patients
* View patient details
* Start case taking directly
* Register new patients
* Patient status management

### ➕ New Patient Registration

* Patient name
* Age
* Gender
* Phone number
* Email
* Blood group
* Allergies
* Medical conditions
* Automatic patient ID generation

### 📋 Case Taking

* Select patient
* Step-by-step case-taking workflow
* Patient information
* Chief complaints
* History
* Clinical information
* Medicines
* Allergies
* Additional case information
* Save case
* Generate AI summary

### 🤖 AI Summary

* Structured case summary
* AI-assisted documentation
* Editable summary
* Copy summary
* Regenerate summary
* Save summary
* Patient and case information

### 📄 Reports

* View generated reports
* Search reports
* Patient and case information
* Report details
* Print reports
* Download reports as text files

### 📅 Follow-ups

* View follow-up records
* Pending follow-ups
* Overdue follow-ups
* Completed follow-ups
* Search follow-ups
* Mark follow-up as completed
* View follow-up details

### ⚙️ Settings

* Doctor profile
* Application information
* Notification settings
* Auto-save settings
* Save settings
* Reset demo data

### 🔐 Authentication

* Login page
* Email and password login
* Remember me option
* Logout
* Protected application routes
* Demo authentication

### 📱 Responsive Design

The application is designed to work on:

* Desktop
* Laptop
* Tablet
* Mobile devices

---

## 🛠️ Technologies Used

| Technology   | Purpose                       |
| ------------ | ----------------------------- |
| React.js     | Frontend UI                   |
| Vite         | Development and build tool    |
| Tailwind CSS | Styling and responsive design |
| React Router | Page navigation               |
| Lucide React | Icons                         |
| JavaScript   | Application logic             |
| LocalStorage | Demo data storage             |

---

## 📁 Project Structure

```text
Medicase_AI/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Patients.jsx
│   │   ├── NewPatient.jsx
│   │   ├── CaseTaking.jsx
│   │   ├── AISummary.jsx
│   │   ├── Reports.jsx
│   │   ├── FollowUps.jsx
│   │   └── Settings.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shubhamdeshmukh1027/Medicase_AI.git
```

### 2. Open the Project

```bash
cd Medicase_AI
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Vite will display a local development URL in the terminal.

Open that URL in your browser.

---

## 🔐 Demo Login

The project contains a demo login for testing.

**Email**

```text
doctor@medicase.ai
```

**Password**

```text
demo123
```

> These credentials are only for the frontend demonstration prototype.

---

## 💾 Data Storage

MediCase AI currently uses **browser localStorage** instead of a backend database.

The prototype stores demo information using keys such as:

```text
medicase_patients
medicase_cases
medicase_ai_summaries
medicase_followups
medicase_settings
```

This allows the prototype to demonstrate data persistence without requiring a backend server.

---

## 🔄 Application Workflow

```text
Login
  ↓
Dashboard
  ↓
Patients
  ↓
New Patient
  ↓
Case Taking
  ↓
AI Summary
  ↓
Reports
  ↓
Follow-ups
```

---

## 🤖 AI Documentation

The AI Summary section demonstrates how structured clinical information can be converted into a readable documentation format.

The current prototype uses mock/demo logic and does not connect to a real AI model or medical database.

The AI-generated content should always be reviewed and verified before any hypothetical clinical use.

---

## 🔒 Privacy & Safety

MediCase AI is currently a frontend-only prototype.

* No real patient data should be entered.
* No real medical records are stored.
* No production healthcare database is connected.
* Demo data is fictional.
* AI summaries are for demonstration only.
* The application is not intended for diagnosis or treatment decisions.

---

## 📸 Screenshots

Add screenshots of the project here after completing the UI.

Example:

```text
screenshots/
├── login.png
├── dashboard.png
├── patients.png
├── case-taking.png
├── ai-summary.png
└── reports.png
```

You can later add them to this README using Markdown.

---

## 🔮 Future Scope

The project can be extended with:

* Real backend integration
* MySQL/PostgreSQL database
* Firebase Authentication
* Google Sign-In
* Real AI/LLM integration
* Speech-to-text case taking
* Multi-language support
* PDF report generation
* Doctor and hospital management
* Role-based authentication
* Secure cloud storage
* Audit logs
* Advanced analytics
* Clinical terminology support

---

## 🎓 Project Information

**Project Name:** MediCase AI

**Project Type:** Healthcare Technology / AI Prototype

**Purpose:** Smart Patient Case-Taking & Clinical Documentation

**Platform:** Web Application

**Development:** Frontend Prototype

**Hackathon:** Smart India Hackathon

---

## 👨‍💻 Developer

**Shubham Deshmukh**

B.Tech – Artificial Intelligence & Data Science

---

## ⚠️ Disclaimer

MediCase AI is an **educational and hackathon demonstration prototype**.

It is not a certified medical device or clinical decision-support system. It should not be used for real patient diagnosis, treatment, prescription, or medical decision-making.

All patient information included in the demonstration is fictional.

---

## 📄 License

This project is created for educational, academic, and hackathon demonstration purposes.

© 2026 Shubham Deshmukh. All rights reserved.

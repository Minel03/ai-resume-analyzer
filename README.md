# 🚀 AI Resume Analyzer & Career Suite

A professional-grade, AI-powered platform designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS), generate tailored career documents, and prepare for interviews with precision.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Groq AI](https://img.shields.io/badge/Groq_AI-f3ac00?style=for-the-badge&logo=lightning&logoColor=black)

---

## ✨ Key Features

### 📊 Advanced ATS Scoring

- **Performance Metrics**: Detailed scoring on **Impact, Brevity, Style, and Soft Skills**.
- **Job Matching**: Paste a Job Description to get a real-time **Match Rate** and identify critical skill gaps.
- **Contact Audit**: Automated verification of essential contact links (Email, Phone, LinkedIn, Portfolio).

### ✍️ AI-Powered Content Creation

- **Personalized Rewriter**: Paste any resume bullet point and generate 3 professional variations (Action-Oriented, Data-Driven, Concise).
- **Cover Letter Generator**: Instant generation of 100% tailored cover letters based on your resume and a specific job description.

### 🎯 Career Coaching & Prep

- **Interview Prep Assistant**: Custom AI-generated interview questions and perfect STAR-method answers based on your experience.
- **Learning Roadmaps**: Hover over any missing skill to receive AI-curated advice on how to master it.
- **Persistent History**: Local tracking of your last 10 scans to monitor your optimization progress.

### 📄 Professional Export

- **Print-Optimized Reports**: Export your full analysis into a clean, professional PDF report.
- **Premium UI**: Sleek dark-mode interface with smooth animations and responsive design.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Engine**: [Groq Cloud SDK](https://groq.com/) (Llama 3.3 70B model)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Parsing**: `pdf-parse` for robust server-side text extraction.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 🛡️ Privacy & Data

- **Local Processing**: Analysis results are stored in your browser's `localStorage`. No personal data is stored on our servers.
- **Secure AI**: We use the Groq API for lightning-fast, private AI processing.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

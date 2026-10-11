# SAFARI ACADEMY SCHOOL MANAGEMENT PLATFORM — PROJECT EVIDENCE & DOSSIER

**Document Status:** Official Demonstration Dossier  
**Project Developer:** Alem Hidasie (Grade 12 Candidate, Natural Science Stream)  
**School Context:** Safari Academy, Addis Ababa, Ethiopia  
**Target Graduation Year:** 2026/2027 (2018 E.C.)  
**Official Motto:** "ልጆችዎ ልጆቻችን ናቸው!" / "Your kids our kids"

---

## 1. PROJECT OVERVIEW & HYPOTHESIS

### The Core Problem
Secondary schools in Addis Ababa traditionally face substantial administrative friction:
1. **Attendance Tracking:** Roll calls recorded in paper registers are prone to calculation errors and cannot be verified by guardians in real-time.
2. **Continuous Assessment Grading:** The Ethiopian secondary curriculum mandates a 5-part continuous assessment breakdown (Quiz 10%, Midterm 20%, Assignment 10%, Project 10%, Final Exam 50% = 100%). Aggregating these across 8 courses per candidate manually creates workload bottlenecks for teachers before term reporting deadlines.
3. **Guardian Communication:** Parents must travel physically to school campuses (Gerji, Bole, CMC) or wait for end-of-term assemblies to discover attendance warnings or academic slip-ups.

### The Proposed Technical Solution
A centralized, role-based web application tailored specifically for the Safari Academy community that:
- Implements strict Role-Based Access Control (RBAC) across Administrators, Teachers, Candidates, and Guardians.
- Automatically calculates cumulative continuous assessment marks and assigns Ethiopian Ministry of Education letter grades.
- Renders print-ready official report cards and transcripts with the school's identity and mottos.
- Adapts seamlessly to all devices (smartphones, tablets, laptops, desktops).

---

## 2. FEATURE STATUS AUDIT

| Feature Module | Declared Status | Verification Method |
| :--- | :--- | :--- |
| **Authentication & Persona Switching** | Implemented & Tested | Interactive Persona Switcher (Admin, Teacher, Student, Parent) |
| **Official Safari Academy Branding** | Implemented & Tested | Vector SVGs (`safari-logo.svg`, `safari-banner.svg`) & custom uploader |
| **Student Directory & Enrollment** | Implemented & Tested | Full CRUD, search, filter by stream/grade, CSV export |
| **Daily Classroom Attendance** | Implemented & Tested | Session logs with Present/Absent/Late/Excused & live % |
| **Ethiopian Curriculum Grading Engine** | Implemented & Tested | Real-time score calculator with A+ to F scale |
| **Printable Term Report Cards** | Implemented & Tested | `@media print` layout with seal, signature lines & rank |
| **School Bulletins & Calendar** | Implemented & Tested | Targeted announcements + dual calendar (Gregorian & 2018 E.C.) |
| **Full Institutional Settings** | Implemented & Tested | Campus configurations, academic year, and brand controls |
| **Production Server Database Sync** | Prototype State | Local persistent state ready for PostgreSQL / Supabase migration |

---

## 3. TECHNICAL SPECIFICATIONS & ARCHITECTURE

- **Frontend Framework:** React 19 SPA with TypeScript (Strict mode enabled)
- **Styling Architecture:** Tailwind CSS v4 with custom design tokens (`--safari-primary: #123D2B`, `--safari-accent: #2E8B57`)
- **Typography:**
  - UI Display & Body: *Plus Jakarta Sans*
  - Ethiopic Script: *Noto Sans Ethiopic* (ensuring native glyph accuracy for "ሳፋሪ አካዳሚ" and "ልጆችዎ ልጆቻችን ናቸው!")
  - Numeric & Telemetry: *JetBrains Mono* with `tabular-nums`
- **Data Security Principles:**
  - Students cannot view or modify peer marks.
  - Parents only access verified linked children (e.g., candidate SA-2026-1201).
  - Teachers can only enter marks for assigned subject courses.

---

## 4. SCHOLARSHIP INTERVIEW TALKING POINTS

1. **Why did you build this?**
   *"As a Grade 12 student at Safari Academy, I saw how much time our teachers spent calculating continuous assessment totals by hand and dealing with paper records. I built this software to show how digital tooling can modernize education management in Ethiopia while respecting local needs like dual calendars."*

2. **How did you approach accessibility and responsive design?**
   *"In Ethiopia, many parents access portals exclusively through mobile smartphones on mobile data, while school registrars use desktop computers. I engineered the layout from the start to adapt smoothly across 360px mobile viewports, tablets, and full 1440px desktop workstations."*

3. **What is the next step for this project?**
   *"Presenting the working platform to the Safari Academy administration and ICT department for security review, followed by backend connection to a managed PostgreSQL database with Row Level Security."*

# SAFARI ACADEMY PORTAL — LOCAL SETUP & DEMONSTRATION GUIDE

This guide explains how to open, run, test, and demonstrate the Safari Academy School Management Platform on your local machine using Visual Studio Code.

---

## 1. PREREQUISITES

Ensure you have installed:
- **Node.js**: v18.0.0 or later (LTS recommended)
- **npm** or **bun** / **pnpm**
- **Visual Studio Code**

---

## 2. INSTALLATION & RUNNING LOCALLY

Open your terminal in the project directory:

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server (Port 3000)
npm run dev
```

Open your browser at:
```
http://localhost:3000
```

---

## 3. BUILDING & TESTING

```bash
# Run TypeScript typecheck & lint verification
npm run lint

# Run production build
npm run build

# Preview production build
npm run preview
```

---

## 4. DEMONSTRATION WORKFLOWS FOR TEACHERS & COMMITTEES

### Workflow A: Switch User Roles
1. In the top navigation bar, click the **Role** pill dropdown (top right).
2. Switch between:
   - **Administrator:** Full school command center, enroll student, view audit trail.
   - **Teacher:** Ato Yohannes Tadesse (Physics), take daily attendance for Grade 12A, update continuous assessment marks.
   - **Student:** Candidate Alem Hidasie, review Grade 12 subjects, GPA (3.94), class standing (1st/34).
   - **Parent:** Ato Hidasie Mengesha, inspect verified attendance notifications and report cards.

### Workflow B: Official Report Card Printing
1. Switch to **Student** or **Administrator** role.
2. Click **"Official Report Card"**.
3. View the printable layout with Safari Academy banner, logo, mottos, marks breakdown, teacher comments, and seal.
4. Click **"Print / Save as PDF"** to test native `@media print` formatting.

### Workflow C: Custom Branding Verification
1. As Administrator, go to **School Settings** from the sidebar.
2. Preview the official vector SVG emblem and banner.
3. Test uploading custom logo or banner images with real-time preview, or click **"Reset to Official Vector Assets"** to restore defaults.

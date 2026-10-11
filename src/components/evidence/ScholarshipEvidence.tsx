import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Code, Layers, FileText, ExternalLink, Terminal } from 'lucide-react';

export const ScholarshipEvidence: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Dossier Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#123D2B] via-[#1D5A40] to-[#2E8B57] text-white shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#A7F3D0]" />
            <span className="text-xs uppercase font-bold tracking-wider text-[#A7F3D0]">
              Grade 12 Developer & Scholarship Portfolio
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Safari Academy School Management Platform
          </h1>
          <p className="text-xs text-white/80">
            Lead Developer: Alem Hidasie · Grade 12 Secondary Candidate · Addis Ababa, Ethiopia
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white">
            Status: Fully Functional Demonstration Prototype
          </span>
        </div>
      </div>

      {/* Structured Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Problem Hypothesis & Personal Contributions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-[#123D2B] uppercase tracking-wider">
              1. Project Vision & Problem Hypothesis
            </h2>
            <p className="text-xs text-[#17251D] leading-relaxed">
              In secondary schools across Ethiopia, teachers frequently manage roll-call attendance, grade tallying (continuous assessments across 5 components), and bulletin distributions using manual paper records. This project hypothesizes that a unified, secure digital platform with role-based access for school administrators, faculty, candidates, and verified parents can reduce record discrepancies, prevent lost marks, and offer parents immediate transparency into attendance and term results.
            </p>
            <div className="p-3.5 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1] text-xs text-[#65736A] space-y-1">
              <strong className="text-[#123D2B] block">Truthful Stage Disclosure:</strong>
              <span>
                This system is a fully developed and demonstrable technical prototype built by a Grade 12 student developer. It has not yet undergone official administrative adoption by Safari Academy leadership.
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#123D2B] uppercase tracking-wider">
              2. Implemented Features & Verification Matrix
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1]">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#17251D]">Role-Based Access Control (RBAC):</strong>
                  <p className="text-[#65736A]">
                    Four distinct user roles (Administrator, Teacher, Student, Parent) with verified data boundaries.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1]">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#17251D]">Official Ethiopian Curriculum Continuous Assessment Engine:</strong>
                  <p className="text-[#65736A]">
                    Complies with the secondary 100-point structure (Quiz 10%, Midterm 20%, Assignment 10%, Project 10%, Final 50%) with automatic letter grade computation (A+ to F).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1]">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#17251D]">Daily Session Roll Call & Analytics:</strong>
                  <p className="text-[#65736A]">
                    Classroom attendance tracking with Present, Absent, Late, Excused statuses and aggregate session percentages.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1]">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#17251D]">Printable Official Safari Academy Term Report Cards:</strong>
                  <p className="text-[#65736A]">
                    Print-formatted academic transcripts complete with official school emblem, motto, term score breakdown, and teacher signature lines.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1]">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#17251D]">Ethiopian & Gregorian Calendar Support:</strong>
                  <p className="text-[#65736A]">
                    Simultaneous representation of 2026/2027 and 2018 ዓ.ም dates for examination timetables and parent assembly dates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Technical Architecture & Scholarship Defense Points */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-[#123D2B] uppercase tracking-wider flex items-center gap-2">
              <Code className="w-4 h-4 text-[#2E8B57]" />
              Architecture & Stack
            </h2>
            <div className="space-y-2 text-xs text-[#17251D]">
              <div className="p-2.5 rounded-lg bg-[#F7F9F6] border border-[#E1E8E1]">
                <span className="text-[#65736A] block text-[11px]">Frontend Engine:</span>
                <strong>React 19 + TypeScript (Strict) + Vite 8</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F7F9F6] border border-[#E1E8E1]">
                <span className="text-[#65736A] block text-[11px]">Styling System:</span>
                <strong>Tailwind CSS v4 + Plus Jakarta Sans + Noto Sans Ethiopic</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F7F9F6] border border-[#E1E8E1]">
                <span className="text-[#65736A] block text-[11px]">Design Tokens:</span>
                <strong>Safari Forest Green (#123D2B) & Emerald (#2E8B57)</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F7F9F6] border border-[#E1E8E1]">
                <span className="text-[#65736A] block text-[11px]">Print Output:</span>
                <strong>CSS Paged Media (@media print) standard</strong>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-[#123D2B] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2E8B57]" />
              Scholarship Interview Guide
            </h2>
            <p className="text-xs text-[#65736A] leading-relaxed">
              When explaining this platform to scholarship admission committees:
            </p>
            <ul className="space-y-2 text-xs text-[#17251D]">
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#2E8B57]">1.</span>
                <span>Explain how you designed the role matrix to isolate student confidential records from peers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#2E8B57]">2.</span>
                <span>Discuss how you addressed Ethiopian school realities (dual calendars, continuous assessments).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#2E8B57]">3.</span>
                <span>Emphasize software maintainability, clean TypeScript typing, and accessible WCAG AA contrast.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

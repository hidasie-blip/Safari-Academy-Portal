import React from 'react';
import { Student, StudentGradeRecord, SchoolSettingsConfig } from '../../types';
import { SafariLogo } from '../common/BrandAssets';
import { Printer, X, Download, ShieldCheck } from 'lucide-react';

interface PrintableReportCardProps {
  student: Student;
  grades: StudentGradeRecord[];
  settings: SchoolSettingsConfig;
  onClose: () => void;
}

export const PrintableReportCard: React.FC<PrintableReportCardProps> = ({
  student,
  grades,
  settings,
  onClose,
}) => {
  const studentGrades = grades.filter((g) => g.studentId === student.studentId);

  const calculateTotalPoints = () => {
    if (studentGrades.length === 0) return 0;
    return studentGrades.reduce((acc, g) => acc + g.breakdown.total, 0);
  };

  const averageScore = studentGrades.length > 0
    ? (calculateTotalPoints() / studentGrades.length).toFixed(1)
    : '0';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#E1E8E1] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls (Hidden in Print) */}
        <div className="p-4 border-b border-[#E1E8E1] bg-[#F7F9F6] flex items-center justify-between no-print">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#123D2B]">
            <ShieldCheck className="w-4 h-4 text-[#2E8B57]" />
            <span>Official Academic Report Card Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#123D2B] text-white rounded-xl hover:bg-[#1D5A40] transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#65736A] hover:text-[#123D2B] hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE DOCUMENT AREA */}
        <div className="p-8 sm:p-10 space-y-6 bg-white text-[#17251D]">
          {/* Official Academy Header */}
          <div className="border-b-2 border-[#123D2B] pb-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SafariLogo size="xl" />
                <div className="space-y-0.5">
                  <h1 className="text-2xl font-black text-[#123D2B] tracking-tight uppercase">
                    Safari Academy
                  </h1>
                  <h2 className="font-ethiopic text-lg font-bold text-[#1D5A40]">
                    ሳፋሪ አካዳሚ
                  </h2>
                  <p className="text-xs text-[#65736A] italic">
                    "ልጆችዎ ልጆቻችን ናቸው!" · "Your kids our kids"
                  </p>
                </div>
              </div>

              <div className="text-right text-xs text-[#65736A] space-y-0.5 font-mono">
                <div>Addis Ababa, Ethiopia</div>
                <div>Campus: {student.campus}</div>
                <div>Year: {settings.currentAcademicYear} ({settings.ethiopicYear})</div>
                <div className="font-bold text-[#123D2B]">SEMESTER 1 REPORT CARD</div>
              </div>
            </div>
          </div>

          {/* Student Dossier Information Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] text-xs">
            <div>
              <span className="text-[#65736A] block text-[11px]">Student Full Name</span>
              <strong className="text-sm text-[#123D2B]">{student.fullName}</strong>
              <div className="font-ethiopic text-xs text-[#2E8B57]">{student.amharicName}</div>
            </div>
            <div>
              <span className="text-[#65736A] block text-[11px]">Candidate ID</span>
              <strong className="text-sm font-mono text-[#17251D]">{student.studentId}</strong>
              <div className="text-[11px] text-[#65736A]">DOB: {student.dateOfBirth}</div>
            </div>
            <div>
              <span className="text-[#65736A] block text-[11px]">Grade & Section</span>
              <strong className="text-sm text-[#123D2B]">{student.grade} - {student.section}</strong>
              <div className="text-[11px] text-[#65736A]">{student.stream}</div>
            </div>
            <div>
              <span className="text-[#65736A] block text-[11px]">Rank in Section</span>
              <strong className="text-sm text-[#2E8B57]">1st / 34 Students</strong>
              <div className="text-[11px] text-[#65736A]">Attendance: {student.attendanceRate}%</div>
            </div>
          </div>

          {/* Academic Results Table */}
          <div className="border border-[#123D2B] rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#123D2B] text-white text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-2 text-right">Quiz (10)</th>
                  <th className="py-2.5 px-2 text-right">Mid (20)</th>
                  <th className="py-2.5 px-2 text-right">Asgn (10)</th>
                  <th className="py-2.5 px-2 text-right">Proj (10)</th>
                  <th className="py-2.5 px-2 text-right">Exam (50)</th>
                  <th className="py-2.5 px-3 text-right">Total (100)</th>
                  <th className="py-2.5 px-2 text-center">Grade</th>
                  <th className="py-2.5 px-3">Teacher Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1E8E1]">
                {studentGrades.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-[#17251D]">{g.subjectName}</td>
                    <td className="py-2.5 px-2 text-right tabular-nums text-[#65736A]">{g.breakdown.quiz}</td>
                    <td className="py-2.5 px-2 text-right tabular-nums text-[#65736A]">{g.breakdown.midterm}</td>
                    <td className="py-2.5 px-2 text-right tabular-nums text-[#65736A]">{g.breakdown.assignment}</td>
                    <td className="py-2.5 px-2 text-right tabular-nums text-[#65736A]">{g.breakdown.project}</td>
                    <td className="py-2.5 px-2 text-right tabular-nums text-[#65736A]">{g.breakdown.finalExam}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums font-bold text-[#123D2B]">{g.breakdown.total}</td>
                    <td className="py-2.5 px-2 text-center font-bold text-[#2E8B57]">{g.breakdown.letterGrade}</td>
                    <td className="py-2.5 px-3 text-[11px] text-[#65736A] italic">{g.teacherRemarks || 'Excellent work.'}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#F7F9F6] border-t-2 border-[#123D2B] font-bold">
                  <td className="py-3 px-3 uppercase text-[#123D2B]">Cumulative Standing</td>
                  <td colSpan={5} className="py-3 px-2 text-right text-[#65736A]">
                    Overall Average:
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-base text-[#123D2B]">
                    {averageScore}%
                  </td>
                  <td className="py-3 px-2 text-center text-sm text-[#2E8B57]">
                    A+
                  </td>
                  <td className="py-3 px-3 text-xs text-[#2E8B57]">
                    Promoted with Distinction (GPA: {student.gpa.toFixed(2)})
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Grading Legend & Sign-Off */}
          <div className="pt-4 border-t border-[#E1E8E1] space-y-6">
            <div className="text-[10px] text-[#65736A] flex flex-wrap items-center gap-3">
              <span><strong>Grading Scale:</strong> A+ (90-100) · A (85-89) · B+ (80-84) · B (75-79) · C (65-74) · D (50-64) · F (&lt;50)</span>
            </div>

            <div className="grid grid-cols-3 gap-6 text-xs pt-4">
              <div className="border-t border-slate-400 pt-2 text-center">
                <span className="block font-semibold text-[#17251D]">Ato Yohannes Tadesse</span>
                <span className="text-[11px] text-[#65736A]">Homeroom Teacher</span>
              </div>
              <div className="border-t border-slate-400 pt-2 text-center">
                <span className="block font-semibold text-[#17251D]">W/ro Selamawit Bekele</span>
                <span className="text-[11px] text-[#65736A]">Principal & Academic Director</span>
              </div>
              <div className="border-t border-slate-400 pt-2 text-center">
                <div className="w-16 h-16 mx-auto border-2 border-dashed border-[#2E8B57]/50 rounded-full flex items-center justify-center text-[9px] text-[#2E8B57] font-bold rotate-[-12deg]">
                  SAFARI ACADEMY<br/>SEAL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

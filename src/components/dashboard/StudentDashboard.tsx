import React from 'react';
import { Student, StudentGradeRecord, Announcement, SchoolEvent } from '../../types';
import {
  Award,
  CalendarCheck2,
  BookOpen,
  Printer,
  ChevronRight,
  TrendingUp,
  Clock,
  Sparkles,
  FileCheck,
} from 'lucide-react';

interface StudentDashboardProps {
  currentStudent: Student;
  grades: StudentGradeRecord[];
  announcements: Announcement[];
  events: SchoolEvent[];
  onOpenReportCard: () => void;
  onNavigate: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentStudent,
  grades,
  announcements,
  events,
  onOpenReportCard,
  onNavigate,
}) => {
  const studentGrades = grades.filter((g) => g.studentId === currentStudent.studentId);
  const relevantAnnouncements = announcements.filter(
    (a) => a.targetRoles.includes('student') || (a.targetGrades && a.targetGrades.includes(currentStudent.grade))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Student Profile Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#123D2B] via-[#1D5A40] to-[#2E8B57] text-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl font-bold text-white shrink-0">
            {currentStudent.fullName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#A7F3D0]">
                {currentStudent.grade} · Section {currentStudent.section}
              </span>
              <span className="text-white/40" aria-hidden="true">·</span>
              <span className="text-xs font-mono text-white/80">{currentStudent.studentId}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              {currentStudent.fullName}
              <span className="font-ethiopic text-lg font-normal ml-2 text-[#A7F3D0]">
                {currentStudent.amharicName}
              </span>
            </h1>
            <p className="text-xs text-white/80">
              Stream: {currentStudent.stream} · Campus: {currentStudent.campus} · Academic Year 2026/2027 (2018 ዓ.ም)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenReportCard}
            className="px-4 py-2.5 text-xs font-semibold bg-white text-[#123D2B] rounded-xl hover:bg-[#F7F9F6] transition-colors shadow-xs flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-[#2E8B57]" />
            <span>Official Report Card</span>
          </button>
        </div>
      </div>

      {/* Performance Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-2">
          <span className="text-xs font-medium text-[#65736A]">Semester GPA</span>
          <div className="text-3xl font-extrabold text-[#123D2B] tabular-nums">
            {currentStudent.gpa.toFixed(2)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#2E8B57] font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Highest Honors (Dean's List)</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-2">
          <span className="text-xs font-medium text-[#65736A]">Attendance Rate</span>
          <div className="text-3xl font-extrabold text-[#123D2B] tabular-nums">
            {currentStudent.attendanceRate}%
          </div>
          <div className="text-xs text-[#65736A]">
            Consistent presence in all sessions
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-2">
          <span className="text-xs font-medium text-[#65736A]">Class Standing</span>
          <div className="text-3xl font-extrabold text-[#123D2B] tabular-nums">
            1st / 34
          </div>
          <div className="text-xs text-[#2E8B57] font-semibold">
            Section 12A Natural Science
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-2">
          <span className="text-xs font-medium text-[#65736A]">Registered Courses</span>
          <div className="text-3xl font-extrabold text-[#123D2B] tabular-nums">
            8 Subjects
          </div>
          <div className="text-xs text-[#65736A]">
            Curriculum fully verified
          </div>
        </div>
      </div>

      {/* Grade Subject Breakdown Table */}
      <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#123D2B] tracking-tight">
              Semester 1 Course Evaluation & Continuous Assessments
            </h2>
            <p className="text-xs text-[#65736A]">
              Continuous Assessment (50%) + Final Exam (50%) = Total (100%)
            </p>
          </div>
          <button
            onClick={onOpenReportCard}
            className="text-xs font-semibold text-[#2E8B57] hover:underline flex items-center gap-1"
          >
            <span>Print Official Transcript</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E1E8E1] text-[11px] font-semibold text-[#65736A] uppercase tracking-wider">
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3 text-right">Quiz (10)</th>
                <th className="py-2.5 px-3 text-right">Midterm (20)</th>
                <th className="py-2.5 px-3 text-right">Assign (10)</th>
                <th className="py-2.5 px-3 text-right">Project (10)</th>
                <th className="py-2.5 px-3 text-right">Final (50)</th>
                <th className="py-2.5 px-3 text-right">Total (100)</th>
                <th className="py-2.5 px-3 text-right">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E8E1] text-xs">
              {studentGrades.map((rec) => (
                <tr key={rec.id} className="hover:bg-[#F7F9F6] transition-colors">
                  <td className="py-3 px-3 font-semibold text-[#17251D]">
                    {rec.subjectName}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-[#65736A]">
                    {rec.breakdown.quiz}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-[#65736A]">
                    {rec.breakdown.midterm}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-[#65736A]">
                    {rec.breakdown.assignment}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-[#65736A]">
                    {rec.breakdown.project}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-[#65736A]">
                    {rec.breakdown.finalExam}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums font-bold text-[#123D2B]">
                    {rec.breakdown.total}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded-md bg-[#E8F5E9] text-[#123D2B] font-bold text-xs">
                      {rec.breakdown.letterGrade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Relevant Announcements for Grade 12 Candidates */}
      <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-[#123D2B] tracking-tight">
          Candidate Notices & University Preparation Bulletins
        </h2>
        <div className="space-y-3">
          {relevantAnnouncements.map((ann) => (
            <div key={ann.id} className="p-3.5 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#123D2B]">{ann.title}</span>
                <span className="text-[10px] text-[#2E8B57] bg-[#E8F5E9] px-2 py-0.5 rounded-md font-semibold">
                  {ann.category}
                </span>
              </div>
              {ann.amharicTitle && (
                <div className="font-ethiopic text-xs font-semibold text-[#1D5A40]">
                  {ann.amharicTitle}
                </div>
              )}
              <p className="text-xs text-[#65736A] leading-relaxed">{ann.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

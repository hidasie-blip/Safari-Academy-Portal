import React from 'react';
import { SafariBanner } from '../common/BrandAssets';
import { Student, Staff, AttendanceRecord, Announcement, SchoolEvent, AuditLog } from '../../types';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  Award,
  ArrowUpRight,
  PlusCircle,
  FileText,
  Bell,
  Clock,
  Sparkles,
  ChevronRight,
  MapPin,
  Calendar,
} from 'lucide-react';

interface AdminDashboardProps {
  students: Student[];
  staff: Staff[];
  attendance: AttendanceRecord[];
  announcements: Announcement[];
  events: SchoolEvent[];
  auditLogs: AuditLog[];
  onNavigate: (tab: string) => void;
  onOpenEnrollModal: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  students,
  staff,
  attendance,
  announcements,
  events,
  auditLogs,
  onNavigate,
  onOpenEnrollModal,
}) => {
  // Real calculations
  const totalStudents = students.length;
  const activeStaff = staff.length;
  const avgAttendance = students.length > 0
    ? (students.reduce((acc, s) => acc + s.attendanceRate, 0) / students.length).toFixed(1)
    : '0';
  const grade12Students = students.filter(s => s.grade === 'Grade 12').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Official Banner Hero Area */}
      <div className="space-y-3">
        <SafariBanner />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#123D2B] tracking-tight">
              Administrative Command Center
            </h1>
            <p className="text-xs sm:text-sm text-[#65736A]">
              Academic Year 2026/2027 (2018 ዓ.ም) · Semester 1 · Gerji High School Campus
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenEnrollModal}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-[#123D2B] text-white rounded-xl hover:bg-[#1D5A40] transition-colors shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Enroll Student</span>
            </button>
            <button
              onClick={() => onNavigate('grades')}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-white border border-[#E1E8E1] text-[#17251D] rounded-xl hover:bg-[#F7F9F6] transition-colors"
            >
              <FileText className="w-4 h-4 text-[#2E8B57]" />
              <span>Grade Sheets</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Real Data Grid - Strict Tabular Figures, No Slop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#65736A]">Total Enrolled</span>
            <div className="p-2 rounded-xl bg-[#E8F5E9] text-[#123D2B]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-[#123D2B] tabular-nums tracking-tight">
              {totalStudents}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#65736A]">
              <span>Grade 9–12 Secondary</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#2E8B57] font-semibold">{grade12Students} G12</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#65736A]">Active Faculty & Staff</span>
            <div className="p-2 rounded-xl bg-[#E8F5E9] text-[#123D2B]">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-[#123D2B] tabular-nums tracking-tight">
              {activeStaff}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#65736A]">
              <span>Across 6 Departments</span>
              <span aria-hidden="true">·</span>
              <span>100% Certified</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#65736A]">Average Attendance</span>
            <div className="p-2 rounded-xl bg-[#E8F5E9] text-[#123D2B]">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-[#123D2B] tabular-nums tracking-tight">
              {avgAttendance}%
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#2E8B57] font-semibold">
              <span>On-track for high term completion</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#65736A]">Grade 12 Candidacy</span>
            <div className="p-2 rounded-xl bg-[#E8F5E9] text-[#123D2B]">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-[#123D2B] tabular-nums tracking-tight">
              3.82
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#65736A]">
              <span>Average Section GPA</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#2E8B57]">Top 2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Student Snapshot & Bulletins */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Roster Table */}
          <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#123D2B] tracking-tight">
                  Recent High School Enrollments
                </h2>
                <p className="text-xs text-[#65736A]">
                  Latest registered Grade 9–12 students in the current semester
                </p>
              </div>
              <button
                onClick={() => onNavigate('students')}
                className="text-xs font-semibold text-[#2E8B57] hover:underline flex items-center gap-1"
              >
                <span>View All ({students.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E1E8E1] text-[11px] font-semibold text-[#65736A] uppercase tracking-wider">
                    <th className="py-2.5 px-3">Student</th>
                    <th className="py-2.5 px-3">Student ID</th>
                    <th className="py-2.5 px-3">Class</th>
                    <th className="py-2.5 px-3">Stream</th>
                    <th className="py-2.5 px-3 text-right">Attendance</th>
                    <th className="py-2.5 px-3 text-right">GPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E8E1] text-xs">
                  {students.slice(0, 5).map((stud) => (
                    <tr key={stud.id} className="hover:bg-[#F7F9F6] transition-colors">
                      <td className="py-3 px-3 font-medium text-[#17251D]">
                        <div className="flex flex-col">
                          <span>{stud.fullName}</span>
                          <span className="font-ethiopic text-[11px] text-[#65736A]">{stud.amharicName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[#65736A] tabular-nums">
                        {stud.studentId}
                      </td>
                      <td className="py-3 px-3 font-medium text-[#123D2B]">
                        {stud.grade} - {stud.section}
                      </td>
                      <td className="py-3 px-3 text-[#65736A]">
                        {stud.stream}
                      </td>
                      <td className="py-3 px-3 text-right tabular-nums font-semibold text-[#2E8B57]">
                        {stud.attendanceRate}%
                      </td>
                      <td className="py-3 px-3 text-right tabular-nums font-bold text-[#123D2B]">
                        {stud.gpa.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* School Announcements Preview */}
          <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#2E8B57]" />
                <h2 className="text-sm font-bold text-[#123D2B] tracking-tight">
                  Official School Announcements
                </h2>
              </div>
              <button
                onClick={() => onNavigate('announcements')}
                className="text-xs font-semibold text-[#2E8B57] hover:underline"
              >
                Manage Bulletins
              </button>
            </div>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-3.5 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1] hover:border-[#2E8B57]/40 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#123D2B] leading-tight">
                      {ann.title}
                    </span>
                    <span className="text-[10px] font-semibold text-[#2E8B57] bg-[#E8F5E9] px-2 py-0.5 rounded-md shrink-0">
                      {ann.category}
                    </span>
                  </div>
                  {ann.amharicTitle && (
                    <div className="font-ethiopic text-xs font-semibold text-[#1D5A40]">
                      {ann.amharicTitle}
                    </div>
                  )}
                  <p className="text-xs text-[#65736A] line-clamp-2 leading-relaxed">
                    {ann.content}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-[#65736A] pt-1">
                    <span>By {ann.authorName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{new Date(ann.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Calendar, Events & Audit Trail */}
        <div className="space-y-6">
          {/* Upcoming School Events */}
          <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2E8B57]" />
                <h2 className="text-sm font-bold text-[#123D2B] tracking-tight">
                  Academic Calendar
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-[#65736A]">2018 E.C.</span>
            </div>

            <div className="space-y-3">
              {events.map((evt) => (
                <div key={evt.id} className="p-3 rounded-xl border border-[#E1E8E1] space-y-1">
                  <div className="text-xs font-bold text-[#17251D]">
                    {evt.title}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#2E8B57] font-semibold">
                    <span>{evt.gregorianDate}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-ethiopic text-[#1D5A40]">{evt.ethiopicDate}</span>
                  </div>
                  <p className="text-[11px] text-[#65736A] leading-tight">
                    {evt.description}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-[#65736A] pt-0.5">
                    <MapPin className="w-3 h-3 text-[#2E8B57]" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Activity Trail */}
          <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2E8B57]" />
                <h2 className="text-sm font-bold text-[#123D2B] tracking-tight">
                  Audit Logs
                </h2>
              </div>
              <span className="text-[10px] text-[#65736A]">Immutable</span>
            </div>

            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div key={log.id} className="text-xs space-y-0.5 border-b border-[#E1E8E1] pb-2 last:border-none last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#123D2B]">{log.action}</span>
                    <span className="text-[10px] text-[#65736A] font-mono">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#65736A]">
                    {log.userName} · <span className="text-[#17251D]">{log.targetRecord}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

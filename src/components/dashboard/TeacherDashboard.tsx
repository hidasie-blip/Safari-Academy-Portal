import React from 'react';
import { Student, Staff, AttendanceRecord, StudentGradeRecord } from '../../types';
import {
  CalendarCheck2,
  FileSpreadsheet,
  Users,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface TeacherDashboardProps {
  currentStaff: Staff;
  students: Student[];
  attendance: AttendanceRecord[];
  grades: StudentGradeRecord[];
  onNavigate: (tab: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  currentStaff,
  students,
  attendance,
  grades,
  onNavigate,
}) => {
  const g12Students = students.filter((s) => s.grade === 'Grade 12' && s.section === 'A');
  const todayDate = new Date().toISOString().split('T')[0];
  const attendanceToday = attendance.filter((a) => a.date === todayDate && a.grade === 'Grade 12' && a.section === 'A');
  const isAttendanceDoneToday = attendanceToday.length > 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Teacher Welcome Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#123D2B] to-[#1D5A40] text-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#A7F3D0]">
              Faculty Portal
            </span>
            <span className="text-white/40" aria-hidden="true">·</span>
            <span className="text-xs font-mono text-white/80">{currentStaff.staffId}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome, {currentStaff.fullName}
          </h1>
          <p className="text-xs text-white/80">
            {currentStaff.roleTitle} · {currentStaff.department} Department · Assigned: Grade 11 & 12
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('attendance')}
            className="px-4 py-2 text-xs font-semibold bg-white text-[#123D2B] rounded-xl hover:bg-[#F7F9F6] transition-colors shadow-xs flex items-center gap-2"
          >
            <CalendarCheck2 className="w-4 h-4 text-[#2E8B57]" />
            <span>Take Roll Call</span>
          </button>
          <button
            onClick={() => onNavigate('grades')}
            className="px-4 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-colors flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Enter Assessment Scores</span>
          </button>
        </div>
      </div>

      {/* Quick Action Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#65736A]">Today's Roll Call Status</span>
            <div className={`p-2 rounded-xl ${isAttendanceDoneToday ? 'bg-[#E8F5E9] text-[#2E8B57]' : 'bg-amber-50 text-amber-700'}`}>
              {isAttendanceDoneToday ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-[#123D2B]">
              {isAttendanceDoneToday ? 'Completed' : 'Pending for Grade 12A'}
            </div>
            <p className="text-xs text-[#65736A] mt-1">
              {isAttendanceDoneToday 
                ? `${attendanceToday.length} student records confirmed` 
                : 'Session requires morning confirmation before 9:00 AM'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('attendance')}
            className="text-xs font-semibold text-[#2E8B57] hover:underline flex items-center gap-1 pt-1"
          >
            <span>{isAttendanceDoneToday ? 'Review Records' : 'Launch Session'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#65736A]">Continuous Assessments</span>
            <div className="p-2 rounded-xl bg-[#E8F5E9] text-[#123D2B]">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-[#123D2B]">
              Semester 1 Physics
            </div>
            <p className="text-xs text-[#65736A] mt-1">
              Midterm (20%) & Quiz (10%) scores registered for candidates
            </p>
          </div>
          <button
            onClick={() => onNavigate('grades')}
            className="text-xs font-semibold text-[#2E8B57] hover:underline flex items-center gap-1 pt-1"
          >
            <span>Update Scorecard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#65736A]">Class 12A Roster</span>
            <div className="p-2 rounded-xl bg-[#E8F5E9] text-[#123D2B]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-[#123D2B]">
              {g12Students.length} Registered Candidates
            </div>
            <p className="text-xs text-[#65736A] mt-1">
              Natural Science stream · 98.4% average attendance rate
            </p>
          </div>
          <button
            onClick={() => onNavigate('students')}
            className="text-xs font-semibold text-[#2E8B57] hover:underline flex items-center gap-1 pt-1"
          >
            <span>View Student Profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grade 12A Class Roster & Performance Preview */}
      <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#123D2B] tracking-tight">
              Assigned Class: Grade 12 - Section A (Natural Science)
            </h2>
            <p className="text-xs text-[#65736A]">
              Course: Physics (PHYS-12) · Room 204 · Gerji Campus
            </p>
          </div>
          <button
            onClick={() => onNavigate('attendance')}
            className="text-xs font-semibold text-[#2E8B57] hover:underline"
          >
            Daily Roll Call
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E1E8E1] text-[11px] font-semibold text-[#65736A] uppercase tracking-wider">
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">ID</th>
                <th className="py-2.5 px-3 text-right">Attendance Rate</th>
                <th className="py-2.5 px-3 text-right">Physics Continuous Mark</th>
                <th className="py-2.5 px-3 text-right">Grade Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E8E1] text-xs">
              {g12Students.map((stud) => {
                const studGrade = grades.find((g) => g.studentId === stud.studentId && g.subjectId === 'sub-1');
                return (
                  <tr key={stud.id} className="hover:bg-[#F7F9F6] transition-colors">
                    <td className="py-3 px-3 font-medium text-[#17251D]">
                      {stud.fullName}
                      <span className="font-ethiopic text-[11px] text-[#65736A] ml-2">
                        {stud.amharicName}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[#65736A] tabular-nums">
                      {stud.studentId}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums font-semibold text-[#2E8B57]">
                      {stud.attendanceRate}%
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums font-bold text-[#123D2B]">
                      {studGrade ? `${studGrade.breakdown.total}/100` : 'Pending'}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {studGrade ? (
                        <span className="px-2 py-0.5 rounded-md bg-[#E8F5E9] text-[#123D2B] font-bold text-xs">
                          {studGrade.breakdown.letterGrade}
                        </span>
                      ) : (
                        <span className="text-[#65736A]">In Progress</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

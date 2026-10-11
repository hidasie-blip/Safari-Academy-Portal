import React from 'react';
import { Student, StudentGradeRecord, Announcement, SchoolEvent } from '../../types';
import {
  Users,
  CalendarCheck,
  Award,
  Phone,
  Mail,
  Printer,
  ChevronRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

interface ParentDashboardProps {
  linkedStudents: Student[];
  grades: StudentGradeRecord[];
  announcements: Announcement[];
  events: SchoolEvent[];
  onOpenReportCard: (student: Student) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  linkedStudents,
  grades,
  announcements,
  events,
  onOpenReportCard,
}) => {
  const primaryStudent = linkedStudents[0];
  const studentGrades = primaryStudent ? grades.filter((g) => g.studentId === primaryStudent.studentId) : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Parent Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#123D2B] via-[#1D5A40] to-[#2E8B57] text-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#A7F3D0]" />
            <span className="text-xs uppercase font-bold tracking-wider text-[#A7F3D0]">
              Verified Guardian Portal
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Safari Academy Guardian Portal
          </h1>
          <p className="text-xs text-white/80">
            Monitoring Academic Progress & Well-being · Motto: "ልጆችዎ ልጆቻችን ናቸው!" (Your kids our kids)
          </p>
        </div>

        {primaryStudent && (
          <button
            onClick={() => onOpenReportCard(primaryStudent)}
            className="px-4 py-2.5 text-xs font-semibold bg-white text-[#123D2B] rounded-xl hover:bg-[#F7F9F6] transition-colors shadow-xs flex items-center gap-2 self-start md:self-auto"
          >
            <Printer className="w-4 h-4 text-[#2E8B57]" />
            <span>View Official Term Report Card</span>
          </button>
        )}
      </div>

      {primaryStudent ? (
        <>
          {/* Linked Student Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E8E1]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#E8F5E9] text-[#123D2B] font-bold text-lg flex items-center justify-center border border-[#2E8B57]/30">
                  {primaryStudent.fullName.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#123D2B]">
                    {primaryStudent.fullName}
                    <span className="font-ethiopic text-sm font-semibold text-[#2E8B57] ml-2">
                      {primaryStudent.amharicName}
                    </span>
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#65736A] mt-0.5">
                    <span>ID: <strong className="font-mono text-[#17251D]">{primaryStudent.studentId}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>Class: <strong className="text-[#17251D]">{primaryStudent.grade} - Section {primaryStudent.section}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>Stream: <strong className="text-[#17251D]">{primaryStudent.stream}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-[#65736A]">Attendance Record</div>
                  <div className="text-xl font-extrabold text-[#2E8B57] tabular-nums">
                    {primaryStudent.attendanceRate}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#65736A]">Term GPA</div>
                  <div className="text-xl font-extrabold text-[#123D2B] tabular-nums">
                    {primaryStudent.gpa.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Guardian Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1]">
                <span className="text-[#65736A] block text-[11px]">Primary Campus</span>
                <span className="font-semibold text-[#17251D]">{primaryStudent.campus}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1]">
                <span className="text-[#65736A] block text-[11px]">Homeroom Advisor</span>
                <span className="font-semibold text-[#17251D]">Ato Yohannes Tadesse</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1]">
                <span className="text-[#65736A] block text-[11px]">School Office Line</span>
                <span className="font-semibold text-[#17251D]">+251 11 629 8888</span>
              </div>
            </div>
          </div>

          {/* Academic Report Summary */}
          <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#123D2B] tracking-tight">
                  Academic Performance & Subject Marks
                </h2>
                <p className="text-xs text-[#65736A]">
                  Continuous assessment totals recorded by faculty
                </p>
              </div>
              <button
                onClick={() => onOpenReportCard(primaryStudent)}
                className="text-xs font-semibold text-[#2E8B57] hover:underline"
              >
                Print Official Form
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {studentGrades.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-[#123D2B]">{rec.subjectName}</div>
                    <div className="text-[11px] text-[#65736A] line-clamp-1 italic mt-0.5">
                      "{rec.teacherRemarks || 'Active participation'}"
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="text-sm font-extrabold text-[#123D2B] tabular-nums mr-2">
                      {rec.breakdown.total}/100
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#E8F5E9] text-[#123D2B] font-bold text-xs">
                      {rec.breakdown.letterGrade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="p-8 rounded-2xl bg-white border border-[#E1E8E1] text-center space-y-2">
          <p className="text-sm text-[#65736A]">No linked student records currently assigned to this guardian ID.</p>
        </div>
      )}

      {/* Parent-Teacher Assembly & Important Notice */}
      <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#2E8B57]" />
          <h2 className="text-sm font-bold text-[#123D2B]">
            Upcoming Parent Consultations & School Events
          </h2>
        </div>

        <div className="space-y-3">
          {events.slice(0, 2).map((evt) => (
            <div key={evt.id} className="p-3.5 rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#123D2B]">{evt.title}</span>
                <span className="text-[11px] font-semibold text-[#2E8B57]">{evt.gregorianDate}</span>
              </div>
              <p className="text-xs text-[#65736A]">{evt.description}</p>
              <div className="text-[11px] text-[#17251D]">
                Venue: <strong>{evt.location}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

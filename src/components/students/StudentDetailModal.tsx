import React from 'react';
import { Student, StudentGradeRecord } from '../../types';
import { X, User, Phone, Mail, MapPin, Calendar, Award, FileText, CheckCircle2 } from 'lucide-react';

interface StudentDetailModalProps {
  student: Student | null;
  grades: StudentGradeRecord[];
  onClose: () => void;
  onOpenReportCard: (student: Student) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  grades,
  onClose,
  onOpenReportCard,
}) => {
  if (!student) return null;

  const studentGrades = grades.filter((g) => g.studentId === student.studentId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-[#E1E8E1] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E1E8E1] flex items-center justify-between bg-[#F7F9F6]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#123D2B] text-white flex items-center justify-center font-bold text-base">
              {student.fullName.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#123D2B]">{student.fullName}</h2>
                <span className="font-ethiopic text-sm text-[#2E8B57] font-semibold">{student.amharicName}</span>
              </div>
              <p className="text-xs text-[#65736A] font-mono">
                Student ID: {student.studentId} · Enrolled: {student.enrollmentDate}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#65736A] hover:text-[#123D2B] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1]">
              <span className="text-[#65736A] block text-[11px]">Academic Class</span>
              <span className="font-bold text-[#123D2B] text-sm">{student.grade} - {student.section}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1]">
              <span className="text-[#65736A] block text-[11px]">Stream</span>
              <span className="font-bold text-[#123D2B] text-sm">{student.stream}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1]">
              <span className="text-[#65736A] block text-[11px]">Cumulative GPA</span>
              <span className="font-bold text-[#2E8B57] text-sm tabular-nums">{student.gpa.toFixed(2)}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1]">
              <span className="text-[#65736A] block text-[11px]">Attendance</span>
              <span className="font-bold text-[#123D2B] text-sm tabular-nums">{student.attendanceRate}%</span>
            </div>
          </div>

          {/* Student Profile Information */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#123D2B]">
              Personal & Academic Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl border border-[#E1E8E1] bg-white">
              <div>
                <span className="text-[#65736A]">Date of Birth:</span>{' '}
                <strong className="text-[#17251D]">{student.dateOfBirth}</strong>
              </div>
              <div>
                <span className="text-[#65736A]">Gender:</span>{' '}
                <strong className="text-[#17251D]">{student.gender}</strong>
              </div>
              <div>
                <span className="text-[#65736A]">Campus:</span>{' '}
                <strong className="text-[#17251D]">{student.campus}</strong>
              </div>
              <div>
                <span className="text-[#65736A]">Enrollment Status:</span>{' '}
                <span className="px-2 py-0.5 rounded-md bg-[#E8F5E9] text-[#123D2B] font-bold text-[11px]">
                  {student.enrollmentStatus}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[#65736A]">Residential Address:</span>{' '}
                <strong className="text-[#17251D]">{student.address}</strong>
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#123D2B]">
              Guardian / Parent Record
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl border border-[#E1E8E1] bg-white">
              <div>
                <span className="text-[#65736A]">Guardian Name:</span>{' '}
                <strong className="text-[#17251D]">{student.guardianName}</strong>
              </div>
              <div>
                <span className="text-[#65736A]">Relationship:</span>{' '}
                <strong className="text-[#17251D]">{student.guardianRelationship}</strong>
              </div>
              <div>
                <span className="text-[#65736A]">Phone:</span>{' '}
                <strong className="text-[#17251D] font-mono">{student.guardianPhone}</strong>
              </div>
              <div>
                <span className="text-[#65736A]">Email:</span>{' '}
                <strong className="text-[#17251D]">{student.guardianEmail}</strong>
              </div>
            </div>
          </div>

          {/* Course Grades Overview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#123D2B]">
                Registered Courses & Evaluation
              </h3>
              <button
                onClick={() => onOpenReportCard(student)}
                className="text-xs font-semibold text-[#2E8B57] hover:underline flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Open Printable Report Card</span>
              </button>
            </div>

            <div className="border border-[#E1E8E1] rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F7F9F6] border-b border-[#E1E8E1] text-[11px] font-semibold text-[#65736A]">
                  <tr>
                    <th className="py-2 px-3">Subject</th>
                    <th className="py-2 px-3 text-right">Continuous Mark</th>
                    <th className="py-2 px-3 text-right">Letter Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E8E1] text-xs">
                  {studentGrades.map((g) => (
                    <tr key={g.id}>
                      <td className="py-2.5 px-3 font-medium text-[#17251D]">{g.subjectName}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-[#123D2B] font-bold">
                        {g.breakdown.total}/100
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-[#2E8B57]">
                        {g.breakdown.letterGrade}
                      </td>
                    </tr>
                  ))}
                  {studentGrades.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-3 px-3 text-center text-[#65736A]">
                        Assessment records pending teacher entry.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E1E8E1] bg-[#F7F9F6] flex items-center justify-between">
          <button
            onClick={() => onOpenReportCard(student)}
            className="px-4 py-2 text-xs font-semibold bg-[#123D2B] text-white rounded-xl hover:bg-[#1D5A40] transition-colors"
          >
            Generate Official Transcript
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium border border-[#E1E8E1] rounded-xl hover:bg-white text-[#65736A] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

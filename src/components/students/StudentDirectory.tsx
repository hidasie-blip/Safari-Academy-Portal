import React, { useState } from 'react';
import { Student, GradeLevel, StudentGradeRecord } from '../../types';
import {
  Search,
  Filter,
  Download,
  PlusCircle,
  Eye,
  FileText,
  UserCheck,
  ChevronDown,
  GraduationCap,
} from 'lucide-react';

interface StudentDirectoryProps {
  students: Student[];
  grades: StudentGradeRecord[];
  onSelectStudent: (student: Student) => void;
  onOpenEnrollModal: () => void;
  onOpenReportCard: (student: Student) => void;
}

export const StudentDirectory: React.FC<StudentDirectoryProps> = ({
  students,
  grades,
  onSelectStudent,
  onOpenEnrollModal,
  onOpenReportCard,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [streamFilter, setStreamFilter] = useState<string>('all');

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.amharicName && s.amharicName.includes(searchTerm)) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.guardianName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGrade = gradeFilter === 'all' || s.grade === gradeFilter;
    const matchesStream = streamFilter === 'all' || s.stream === streamFilter;

    return matchesSearch && matchesGrade && matchesStream;
  });

  const exportCSV = () => {
    const headers = ['Student ID,Full Name,Amharic Name,Gender,Grade,Section,Stream,GPA,Attendance Rate,Guardian,Phone'];
    const rows = filteredStudents.map((s) =>
      `"${s.studentId}","${s.fullName}","${s.amharicName || ''}","${s.gender}","${s.grade}","${s.section}","${s.stream}",${s.gpa},${s.attendanceRate}%,"${s.guardianName}","${s.guardianPhone}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Safari_Academy_Students_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123D2B] tracking-tight">
            Student Information & Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#65736A]">
            Official registry of enrolled candidates across Safari Academy campuses
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl border border-[#E1E8E1] bg-white hover:bg-[#F7F9F6] text-[#17251D] transition-colors"
            title="Export filtered student registry to CSV"
          >
            <Download className="w-3.5 h-3.5 text-[#2E8B57]" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onOpenEnrollModal}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#123D2B] text-white hover:bg-[#1D5A40] transition-colors shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Enroll New Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-[#65736A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by student name, Amharic name, ID (e.g. SA-2026-1201), guardian..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
            />
          </div>

          {/* Grade Level Selector */}
          <div>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
            >
              <option value="all">All Grade Levels</option>
              <option value="Grade 12">Grade 12 (Candidates)</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 9">Grade 9</option>
            </select>
          </div>

          {/* Stream Selector */}
          <div>
            <select
              value={streamFilter}
              onChange={(e) => setStreamFilter(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
            >
              <option value="all">All Streams</option>
              <option value="Natural Science">Natural Science</option>
              <option value="Social Science">Social Science</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Counts */}
        <div className="flex items-center gap-3 text-xs text-[#65736A] pt-1 border-t border-[#E1E8E1]">
          <span>Showing <strong className="text-[#123D2B]">{filteredStudents.length}</strong> of {students.length} students</span>
          {gradeFilter !== 'all' && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#2E8B57] font-semibold">{gradeFilter}</span>
            </>
          )}
          {streamFilter !== 'all' && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#2E8B57] font-semibold">{streamFilter}</span>
            </>
          )}
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-2xl border border-[#E1E8E1] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F9F6] border-b border-[#E1E8E1] text-[11px] font-semibold text-[#65736A] uppercase tracking-wider">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Grade & Section</th>
                <th className="py-3 px-4">Stream</th>
                <th className="py-3 px-4 text-right">Attendance</th>
                <th className="py-3 px-4 text-right">GPA</th>
                <th className="py-3 px-4">Guardian Contact</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E8E1] text-xs">
              {filteredStudents.map((stud) => (
                <tr key={stud.id} className="hover:bg-[#F7F9F6] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E8F5E9] text-[#123D2B] font-bold text-xs flex items-center justify-center shrink-0">
                        {stud.fullName.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#17251D]">{stud.fullName}</span>
                        <span className="font-ethiopic text-[11px] text-[#2E8B57]">{stud.amharicName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#65736A] tabular-nums">
                    {stud.studentId}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#123D2B]">
                    {stud.grade} · {stud.section}
                  </td>
                  <td className="py-3.5 px-4 text-[#65736A]">
                    {stud.stream}
                  </td>
                  <td className="py-3.5 px-4 text-right tabular-nums font-semibold text-[#2E8B57]">
                    {stud.attendanceRate}%
                  </td>
                  <td className="py-3.5 px-4 text-right tabular-nums font-bold text-[#123D2B]">
                    {stud.gpa.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="text-[#17251D]">{stud.guardianName}</span>
                      <span className="text-[11px] text-[#65736A] font-mono">{stud.guardianPhone}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onSelectStudent(stud)}
                        className="p-1.5 rounded-lg text-[#65736A] hover:text-[#123D2B] hover:bg-white border border-transparent hover:border-[#E1E8E1] transition-colors"
                        title="View Full Student Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onOpenReportCard(stud)}
                        className="p-1.5 rounded-lg text-[#2E8B57] hover:text-[#123D2B] hover:bg-[#E8F5E9] transition-colors"
                        title="Open Printable Report Card"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#65736A]">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <GraduationCap className="w-8 h-8 text-[#94a3b8]" />
                      <p className="text-sm font-semibold text-[#17251D]">No student records found</p>
                      <p className="text-xs text-[#65736A]">Try modifying your search criteria or filter selections.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

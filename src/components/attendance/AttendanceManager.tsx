import React, { useState } from 'react';
import { Student, AttendanceRecord, AttendanceStatus, UserRole } from '../../types';
import {
  CalendarCheck2,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Calendar,
  Save,
  Check,
  Search,
} from 'lucide-react';

interface AttendanceManagerProps {
  students: Student[];
  attendanceRecords: AttendanceRecord[];
  onSaveAttendance: (records: AttendanceRecord[]) => void;
  currentRole: UserRole;
  currentUserName: string;
}

export const AttendanceManager: React.FC<AttendanceManagerProps> = ({
  students,
  attendanceRecords,
  onSaveAttendance,
  currentRole,
  currentUserName,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedGrade, setSelectedGrade] = useState<string>('Grade 12');
  const [selectedSection, setSelectedSection] = useState<string>('A');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter students for the selected class session
  const classStudents = students.filter(
    (s) => s.grade === selectedGrade && s.section === selectedSection
  );

  // Local state for the current attendance session map
  const [statusMap, setStatusMap] = useState<Record<string, { status: AttendanceStatus; remark: string }>>(() => {
    const initial: Record<string, { status: AttendanceStatus; remark: string }> = {};
    classStudents.forEach((stud) => {
      // Find existing record for this student and date
      const existing = attendanceRecords.find(
        (a) => a.studentId === stud.studentId && a.date === selectedDate
      );
      initial[stud.studentId] = {
        status: existing ? existing.status : 'Present',
        remark: existing?.remark || '',
      };
    });
    return initial;
  });

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
      },
    }));
  };

  const handleRemarkChange = (studentId: string, remark: string) => {
    setStatusMap((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remark,
      },
    }));
  };

  const markAllPresent = () => {
    const updated: Record<string, { status: AttendanceStatus; remark: string }> = {};
    classStudents.forEach((s) => {
      updated[s.studentId] = {
        status: 'Present',
        remark: statusMap[s.studentId]?.remark || '',
      };
    });
    setStatusMap(updated);
  };

  const handleSave = () => {
    const newRecords: AttendanceRecord[] = classStudents.map((stud) => ({
      id: `att-${stud.studentId}-${selectedDate}`,
      studentId: stud.studentId,
      date: selectedDate,
      grade: selectedGrade as any,
      section: selectedSection,
      status: statusMap[stud.studentId]?.status || 'Present',
      remark: statusMap[stud.studentId]?.remark || undefined,
      recordedBy: currentUserName,
      timestamp: new Date().toISOString(),
    }));

    onSaveAttendance(newRecords);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Metrics for active view
  const presentCount = classStudents.filter((s) => (statusMap[s.studentId]?.status || 'Present') === 'Present').length;
  const absentCount = classStudents.filter((s) => statusMap[s.studentId]?.status === 'Absent').length;
  const lateCount = classStudents.filter((s) => statusMap[s.studentId]?.status === 'Late').length;
  const excusedCount = classStudents.filter((s) => statusMap[s.studentId]?.status === 'Excused').length;
  const sessionRate = classStudents.length > 0 ? ((presentCount + lateCount) / classStudents.length * 100).toFixed(1) : '100';

  const canEdit = currentRole === 'admin' || currentRole === 'teacher';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123D2B] tracking-tight">
            Daily Attendance & Roll Call
          </h1>
          <p className="text-xs sm:text-sm text-[#65736A]">
            Authorized attendance logs for Safari Academy secondary classes
          </p>
        </div>

        {canEdit && (
          <div className="flex items-center gap-2">
            <button
              onClick={markAllPresent}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-[#E1E8E1] bg-white hover:bg-[#F7F9F6] text-[#123D2B] transition-colors"
            >
              Mark All Present
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-[#123D2B] text-white hover:bg-[#1D5A40] transition-colors shadow-xs"
            >
              {saveSuccess ? <Check className="w-4 h-4 text-[#A7F3D0]" /> : <Save className="w-4 h-4" />}
              <span>{saveSuccess ? 'Session Saved!' : 'Save Attendance Session'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Session Filter Controls */}
      <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#123D2B] mb-1">
              Attendance Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#123D2B] mb-1">
              Class Grade
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
            >
              <option value="Grade 12">Grade 12 (Candidates)</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 9">Grade 9</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#123D2B] mb-1">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
          </div>
        </div>

        {/* Live Counters */}
        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-[#E1E8E1] text-xs">
          <div className="flex items-center gap-1.5 text-[#17251D]">
            <span className="w-2 h-2 rounded-full bg-[#2E8B57]" />
            <span>Present: <strong className="tabular-nums">{presentCount}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-[#17251D]">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Absent: <strong className="tabular-nums">{absentCount}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-[#17251D]">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Late: <strong className="tabular-nums">{lateCount}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-[#17251D]">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Excused: <strong className="tabular-nums">{excusedCount}</strong></span>
          </div>
          <span className="text-[#65736A] ml-auto">
            Class Attendance Rate: <strong className="text-[#2E8B57] tabular-nums">{sessionRate}%</strong>
          </span>
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-white rounded-2xl border border-[#E1E8E1] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F9F6] border-b border-[#E1E8E1] text-[11px] font-semibold text-[#65736A] uppercase tracking-wider">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Remarks / Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E8E1] text-xs">
              {classStudents.map((stud) => {
                const currentStatus = statusMap[stud.studentId]?.status || 'Present';
                const currentRemark = statusMap[stud.studentId]?.remark || '';

                return (
                  <tr key={stud.id} className="hover:bg-[#F7F9F6] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#17251D]">
                      {stud.fullName}
                      <span className="font-ethiopic text-[11px] text-[#65736A] ml-2">
                        {stud.amharicName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#65736A] tabular-nums">
                      {stud.studentId}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {(['Present', 'Absent', 'Late', 'Excused'] as AttendanceStatus[]).map((status) => {
                          const isSelected = currentStatus === status;
                          const styles = {
                            Present: isSelected ? 'bg-[#123D2B] text-white' : 'hover:bg-[#E8F5E9] text-[#123D2B]',
                            Absent: isSelected ? 'bg-red-600 text-white' : 'hover:bg-red-50 text-red-600',
                            Late: isSelected ? 'bg-amber-600 text-white' : 'hover:bg-amber-50 text-amber-600',
                            Excused: isSelected ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-blue-600',
                          };

                          return (
                            <button
                              key={status}
                              disabled={!canEdit}
                              onClick={() => handleStatusChange(stud.studentId, status)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${styles[status]} ${
                                !canEdit ? 'cursor-default opacity-80' : ''
                              }`}
                            >
                              {status}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {canEdit ? (
                        <input
                          type="text"
                          placeholder="Add remark (e.g. excused medical, traffic)..."
                          value={currentRemark}
                          onChange={(e) => handleRemarkChange(stud.studentId, e.target.value)}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-[#E1E8E1] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]"
                        />
                      ) : (
                        <span className="text-[#65736A]">{currentRemark || '—'}</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {classStudents.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-[#65736A]">
                    No enrolled students in {selectedGrade} {selectedSection}.
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

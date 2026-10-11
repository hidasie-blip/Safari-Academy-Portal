import React, { useState } from 'react';
import { Student, StudentGradeRecord, Subject, UserRole } from '../../types';
import {
  FileSpreadsheet,
  Save,
  Check,
  Printer,
  Sparkles,
  HelpCircle,
  Award,
} from 'lucide-react';

interface GradeManagerProps {
  students: Student[];
  grades: StudentGradeRecord[];
  subjects: Subject[];
  onSaveGrades: (updatedGrades: StudentGradeRecord[]) => void;
  onOpenReportCard: (student: Student) => void;
  currentRole: UserRole;
}

export const GradeManager: React.FC<GradeManagerProps> = ({
  students,
  grades,
  subjects,
  onSaveGrades,
  onOpenReportCard,
  currentRole,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('sub-1'); // Physics
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>('Grade 12');
  const [selectedSection, setSelectedSection] = useState<string>('A');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter students enrolled in this class
  const classStudents = students.filter(
    (s) => s.grade === selectedGradeLevel && s.section === selectedSection
  );

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  // Helper to calculate letter grade based on Ethiopian grading scale
  const computeLetter = (total: number): string => {
    if (total >= 90) return 'A+';
    if (total >= 85) return 'A';
    if (total >= 80) return 'B+';
    if (total >= 75) return 'B';
    if (total >= 65) return 'C';
    if (total >= 50) return 'D';
    return 'F';
  };

  // Local state for editable grades
  const [localGrades, setLocalGrades] = useState<Record<string, StudentGradeRecord>>(() => {
    const map: Record<string, StudentGradeRecord> = {};
    grades.forEach((g) => {
      map[`${g.studentId}-${g.subjectId}`] = g;
    });
    return map;
  });

  const handleScoreChange = (
    studentId: string,
    field: 'quiz' | 'midterm' | 'assignment' | 'project' | 'finalExam',
    value: number
  ) => {
    const key = `${studentId}-${selectedSubjectId}`;
    const existing = localGrades[key] || {
      id: `grd-${studentId}-${selectedSubjectId}`,
      studentId,
      subjectId: selectedSubjectId,
      subjectName: selectedSubject.name,
      academicYear: '2026/2027',
      semester: 'Semester 1',
      breakdown: { quiz: 0, midterm: 0, assignment: 0, project: 0, finalExam: 0, total: 0, letterGrade: 'F' },
      isPublished: true,
    };

    const newBreakdown = {
      ...existing.breakdown,
      [field]: Math.max(0, Number(value) || 0),
    };

    const total =
      newBreakdown.quiz +
      newBreakdown.midterm +
      newBreakdown.assignment +
      newBreakdown.project +
      newBreakdown.finalExam;

    const letterGrade = computeLetter(total);

    const updatedRecord: StudentGradeRecord = {
      ...existing,
      breakdown: {
        ...newBreakdown,
        total,
        letterGrade,
      },
    };

    setLocalGrades((prev) => ({
      ...prev,
      [key]: updatedRecord,
    }));
  };

  const handleSaveAll = () => {
    const updatedList = Object.values(localGrades);
    onSaveGrades(updatedList);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const canEdit = currentRole === 'admin' || currentRole === 'teacher';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123D2B] tracking-tight">
            Academic Assessments & Grade Sheets
          </h1>
          <p className="text-xs sm:text-sm text-[#65736A]">
            Continuous assessment weights: Quiz (10%) · Midterm (20%) · Assignment (10%) · Project (10%) · Final (50%)
          </p>
        </div>

        {canEdit && (
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-[#123D2B] text-white hover:bg-[#1D5A40] transition-colors shadow-xs"
          >
            {saveSuccess ? <Check className="w-4 h-4 text-[#A7F3D0]" /> : <Save className="w-4 h-4" />}
            <span>{saveSuccess ? 'Scores Saved & Published!' : 'Save & Publish Grade Sheet'}</span>
          </button>
        )}
      </div>

      {/* Subject & Class Selectors */}
      <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#123D2B] mb-1">
              Select Subject Course
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#123D2B] mb-1">
              Academic Grade Level
            </label>
            <select
              value={selectedGradeLevel}
              onChange={(e) => setSelectedGradeLevel(e.target.value)}
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
              Class Section
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
      </div>

      {/* Grade Ledger Table */}
      <div className="bg-white rounded-2xl border border-[#E1E8E1] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F7F9F6] border-b border-[#E1E8E1] text-[11px] font-semibold text-[#65736A] uppercase tracking-wider">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-3">Candidate ID</th>
                <th className="py-3 px-3 text-right">Quiz (10)</th>
                <th className="py-3 px-3 text-right">Midterm (20)</th>
                <th className="py-3 px-3 text-right">Assign (10)</th>
                <th className="py-3 px-3 text-right">Project (10)</th>
                <th className="py-3 px-3 text-right">Final Exam (50)</th>
                <th className="py-3 px-3 text-right font-bold text-[#123D2B]">Total (100)</th>
                <th className="py-3 px-3 text-center font-bold text-[#123D2B]">Letter Grade</th>
                <th className="py-3 px-4 text-center">Report Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E8E1]">
              {classStudents.map((stud) => {
                const key = `${stud.studentId}-${selectedSubjectId}`;
                const record = localGrades[key] || {
                  id: `grd-${stud.studentId}-${selectedSubjectId}`,
                  studentId: stud.studentId,
                  subjectId: selectedSubjectId,
                  subjectName: selectedSubject.name,
                  academicYear: '2026/2027',
                  semester: 'Semester 1',
                  breakdown: { quiz: 9, midterm: 18, assignment: 9, project: 9, finalExam: 45, total: 90, letterGrade: 'A' },
                  isPublished: true,
                };

                return (
                  <tr key={stud.id} className="hover:bg-[#F7F9F6] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#17251D]">
                      {stud.fullName}
                      <span className="font-ethiopic text-[11px] text-[#65736A] ml-2">
                        {stud.amharicName}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[#65736A] tabular-nums">
                      {stud.studentId}
                    </td>

                    {/* Quiz */}
                    <td className="py-3.5 px-3 text-right">
                      {canEdit ? (
                        <input
                          type="number"
                          max={10}
                          min={0}
                          value={record.breakdown.quiz}
                          onChange={(e) => handleScoreChange(stud.studentId, 'quiz', Number(e.target.value))}
                          className="w-14 text-right py-1 px-1.5 rounded-lg border border-[#E1E8E1] tabular-nums font-mono text-xs focus:ring-1 focus:ring-[#2E8B57]"
                        />
                      ) : (
                        <span className="tabular-nums font-mono">{record.breakdown.quiz}</span>
                      )}
                    </td>

                    {/* Midterm */}
                    <td className="py-3.5 px-3 text-right">
                      {canEdit ? (
                        <input
                          type="number"
                          max={20}
                          min={0}
                          value={record.breakdown.midterm}
                          onChange={(e) => handleScoreChange(stud.studentId, 'midterm', Number(e.target.value))}
                          className="w-14 text-right py-1 px-1.5 rounded-lg border border-[#E1E8E1] tabular-nums font-mono text-xs focus:ring-1 focus:ring-[#2E8B57]"
                        />
                      ) : (
                        <span className="tabular-nums font-mono">{record.breakdown.midterm}</span>
                      )}
                    </td>

                    {/* Assignment */}
                    <td className="py-3.5 px-3 text-right">
                      {canEdit ? (
                        <input
                          type="number"
                          max={10}
                          min={0}
                          value={record.breakdown.assignment}
                          onChange={(e) => handleScoreChange(stud.studentId, 'assignment', Number(e.target.value))}
                          className="w-14 text-right py-1 px-1.5 rounded-lg border border-[#E1E8E1] tabular-nums font-mono text-xs focus:ring-1 focus:ring-[#2E8B57]"
                        />
                      ) : (
                        <span className="tabular-nums font-mono">{record.breakdown.assignment}</span>
                      )}
                    </td>

                    {/* Project */}
                    <td className="py-3.5 px-3 text-right">
                      {canEdit ? (
                        <input
                          type="number"
                          max={10}
                          min={0}
                          value={record.breakdown.project}
                          onChange={(e) => handleScoreChange(stud.studentId, 'project', Number(e.target.value))}
                          className="w-14 text-right py-1 px-1.5 rounded-lg border border-[#E1E8E1] tabular-nums font-mono text-xs focus:ring-1 focus:ring-[#2E8B57]"
                        />
                      ) : (
                        <span className="tabular-nums font-mono">{record.breakdown.project}</span>
                      )}
                    </td>

                    {/* Final Exam */}
                    <td className="py-3.5 px-3 text-right">
                      {canEdit ? (
                        <input
                          type="number"
                          max={50}
                          min={0}
                          value={record.breakdown.finalExam}
                          onChange={(e) => handleScoreChange(stud.studentId, 'finalExam', Number(e.target.value))}
                          className="w-16 text-right py-1 px-1.5 rounded-lg border border-[#E1E8E1] tabular-nums font-mono text-xs focus:ring-1 focus:ring-[#2E8B57]"
                        />
                      ) : (
                        <span className="tabular-nums font-mono">{record.breakdown.finalExam}</span>
                      )}
                    </td>

                    {/* Total */}
                    <td className="py-3.5 px-3 text-right font-extrabold text-[#123D2B] tabular-nums text-sm">
                      {record.breakdown.total}
                    </td>

                    {/* Letter Grade */}
                    <td className="py-3.5 px-3 text-center">
                      <span className="px-2.5 py-1 rounded-md bg-[#E8F5E9] text-[#123D2B] font-extrabold text-xs">
                        {record.breakdown.letterGrade}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onOpenReportCard(stud)}
                        className="p-1.5 rounded-lg text-[#2E8B57] hover:bg-[#E8F5E9] transition-colors"
                        title="Open Printable Student Report Card"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
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

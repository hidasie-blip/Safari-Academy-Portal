import React, { useState } from 'react';
import { Subject, GradeLevel } from '../../types';
import { BookOpen, Layers, Clock, Award, Users, CheckCircle } from 'lucide-react';

interface AcademicStructureProps {
  subjects: Subject[];
}

export const AcademicStructure: React.FC<AcademicStructureProps> = ({ subjects }) => {
  const [activeGrade, setActiveGrade] = useState<GradeLevel>('Grade 12');

  const gradeStructures: Record<GradeLevel, { title: string; desc: string; streams: string[]; sections: string[]; students: number }> = {
    'Grade 12': {
      title: 'Grade 12 — Preparatory & University Entrance Candidates',
      desc: 'Focused academic streams preparing candidates for the Ethiopian University Entrance Examination (EUEE).',
      streams: ['Natural Science (Pre-Engineering & Medicine)', 'Social Science (Law, Business & Economics)'],
      sections: ['Section 12A (Natural Science)', 'Section 12B (Social Science)'],
      students: 68,
    },
    'Grade 11': {
      title: 'Grade 11 — Senior Secondary Division',
      desc: 'Stream specialization commencement with rigorous laboratory science and advanced mathematics.',
      streams: ['Natural Science', 'Social Science'],
      sections: ['Section 11A', 'Section 11B'],
      students: 72,
    },
    'Grade 10': {
      title: 'Grade 10 — General Secondary Foundation',
      desc: 'National examination preparation and foundational core competencies.',
      streams: ['General Secondary Curriculum'],
      sections: ['Section 10A', 'Section 10B'],
      students: 80,
    },
    'Grade 9': {
      title: 'Grade 9 — Junior High Transition',
      desc: 'Introduction to secondary subjects, sciences, and digital literacy.',
      streams: ['General Secondary Curriculum'],
      sections: ['Section 9A', 'Section 9B', 'Section 9C'],
      students: 85,
    },
    'KG 1': { title: 'Early Years', desc: 'Kindergarten foundation', streams: ['Early Childhood'], sections: ['KG 1A'], students: 30 },
    'KG 2': { title: 'Kindergarten 2', desc: 'Kindergarten foundation', streams: ['Early Childhood'], sections: ['KG 2A'], students: 30 },
    'KG 3': { title: 'Kindergarten 3', desc: 'Kindergarten transition', streams: ['Early Childhood'], sections: ['KG 3A'], students: 30 },
  };

  const currentGradeInfo = gradeStructures[activeGrade] || gradeStructures['Grade 12'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#123D2B] tracking-tight">
          Academic Structure & Course Catalog
        </h1>
        <p className="text-xs sm:text-sm text-[#65736A]">
          Ethiopian secondary curriculum standards and Safari Academy campus departments
        </p>
      </div>

      {/* Grade Level Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['Grade 12', 'Grade 11', 'Grade 10', 'Grade 9'] as GradeLevel[]).map((grade) => (
          <button
            key={grade}
            onClick={() => setActiveGrade(grade)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeGrade === grade
                ? 'bg-[#123D2B] text-white shadow-xs'
                : 'bg-white border border-[#E1E8E1] text-[#65736A] hover:text-[#123D2B] hover:bg-[#F7F9F6]'
            }`}
          >
            {grade}
          </button>
        ))}
      </div>

      {/* Selected Grade Overview Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E1E8E1]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E8B57]">
                Curriculum Blueprint
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#123D2B] mt-0.5">
              {currentGradeInfo.title}
            </h2>
            <p className="text-xs text-[#65736A] mt-1 max-w-2xl">
              {currentGradeInfo.desc}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs shrink-0">
            <div className="p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1] text-center min-w-24">
              <span className="text-[#65736A] block text-[11px]">Enrolled</span>
              <strong className="text-base text-[#123D2B] tabular-nums">{currentGradeInfo.students}</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1] text-center min-w-24">
              <span className="text-[#65736A] block text-[11px]">Sections</span>
              <strong className="text-base text-[#2E8B57]">{currentGradeInfo.sections.length} Active</strong>
            </div>
          </div>
        </div>

        {/* Sections and Streams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#123D2B] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#2E8B57]" />
              Approved Academic Streams
            </span>
            <ul className="space-y-1.5 text-xs text-[#17251D]">
              {currentGradeInfo.streams.map((stream, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#2E8B57] shrink-0" />
                  <span>{stream}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#123D2B] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#2E8B57]" />
              Allocated Class Sections
            </span>
            <ul className="space-y-1.5 text-xs text-[#17251D]">
              {currentGradeInfo.sections.map((sec, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#2E8B57] shrink-0" />
                  <span>{sec} — Homeroom Assigned</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Grade 12 Course Catalog Table */}
      <div className="bg-white rounded-2xl border border-[#E1E8E1] shadow-xs overflow-hidden space-y-0">
        <div className="p-4 border-b border-[#E1E8E1] flex items-center justify-between bg-[#F7F9F6]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#2E8B57]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#123D2B]">
              Standard Course Subjects & Credit Hours
            </h3>
          </div>
          <span className="text-[11px] text-[#65736A]">National Curriculum Compliant</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E1E8E1] text-[11px] font-semibold text-[#65736A] uppercase tracking-wider">
                <th className="py-3 px-4">Subject Code</th>
                <th className="py-3 px-4">Course Title</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4 text-center">Credit Hours / Wk</th>
                <th className="py-3 px-4">Applicable Stream</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E8E1] text-xs">
              {subjects.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#F7F9F6] transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-[#123D2B]">
                    {sub.code}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#17251D]">
                    {sub.name}
                  </td>
                  <td className="py-3 px-4 text-[#65736A]">
                    {sub.department}
                  </td>
                  <td className="py-3 px-4 text-center font-bold tabular-nums text-[#2E8B57]">
                    {sub.creditHours} hrs
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-[#E8F5E9] text-[#123D2B] font-semibold text-[11px]">
                      {sub.stream || 'Core Curriculum'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

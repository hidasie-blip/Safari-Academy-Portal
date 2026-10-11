import React, { useState } from 'react';
import { Student, GradeLevel, AcademicStream } from '../../types';
import { X, UserPlus, AlertCircle } from 'lucide-react';

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Omit<Student, 'id'>) => void;
  existingCount: number;
}

export const StudentFormModal: React.FC<StudentFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  existingCount,
}) => {
  if (!isOpen) return null;

  const defaultId = `SA-2026-${(1205 + existingCount).toString()}`;

  const [formData, setFormData] = useState({
    fullName: '',
    amharicName: '',
    studentId: defaultId,
    gender: 'Male' as 'Male' | 'Female',
    dateOfBirth: '2008-05-15',
    grade: 'Grade 12' as GradeLevel,
    section: 'A',
    stream: 'Natural Science' as AcademicStream,
    guardianName: '',
    guardianPhone: '+251 9',
    guardianEmail: '',
    guardianRelationship: 'Father' as 'Father' | 'Mother' | 'Guardian',
    address: 'Addis Ababa',
    campus: 'Gerji Campus',
    gpa: 3.5,
    attendanceRate: 98.0,
  });

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setError('Student full name is required');
      return;
    }
    if (!formData.guardianName.trim()) {
      setError('Guardian full name is required');
      return;
    }
    if (!formData.guardianPhone.trim() || formData.guardianPhone.length < 10) {
      setError('Please provide a valid Ethiopian guardian phone number (+251...)');
      return;
    }

    onSave({
      ...formData,
      enrollmentStatus: 'Active',
      enrollmentDate: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-[#E1E8E1] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#E1E8E1] flex items-center justify-between bg-[#F7F9F6]">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#2E8B57]" />
            <h2 className="text-base font-bold text-[#123D2B]">
              Enroll New Student
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#65736A] hover:text-[#123D2B] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">
                Full Name (English) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dawit Yohannes"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">
                Full Name (Amharic)
              </label>
              <input
                type="text"
                placeholder="e.g. ዳዊት ዮሐንስ"
                value={formData.amharicName}
                onChange={(e) => setFormData({ ...formData, amharicName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:outline-none focus:ring-2 focus:ring-[#2E8B57] font-ethiopic"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">
                Student ID
              </label>
              <input
                type="text"
                readOnly
                value={formData.studentId}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] text-[#65736A] font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Male' | 'Female' })}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">
                Academic Grade Level
              </label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value as GradeLevel })}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
              >
                <option value="Grade 12">Grade 12 (Prep / Candidate)</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 9">Grade 9</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">
                Section & Stream
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>

                <select
                  value={formData.stream}
                  onChange={(e) => setFormData({ ...formData, stream: e.target.value as AcademicStream })}
                  className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
                >
                  <option value="Natural Science">Natural Science</option>
                  <option value="Social Science">Social Science</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2 pt-2 border-t border-[#E1E8E1]">
              <span className="font-bold text-xs uppercase text-[#123D2B] tracking-wider block mb-2">
                Guardian & Contact Information
              </span>
            </div>

            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">
                Guardian Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Ato / W/ro..."
                value={formData.guardianName}
                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">
                Relationship
              </label>
              <select
                value={formData.guardianRelationship}
                onChange={(e) => setFormData({ ...formData, guardianRelationship: e.target.value as any })}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
              >
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Guardian">Guardian</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">
                Guardian Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.guardianPhone}
                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:outline-none focus:ring-2 focus:ring-[#2E8B57] font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#123D2B] mb-1">
                Campus Location
              </label>
              <select
                value={formData.campus}
                onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
              >
                <option value="Gerji Campus">Gerji Campus (Main High School)</option>
                <option value="Bole Campus">Bole Campus</option>
                <option value="CMC Campus">CMC Campus</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-[#123D2B] mb-1">
                Residential Address in Addis Ababa
              </label>
              <input
                type="text"
                placeholder="e.g. Gerji, Bole Sub-City, Addis Ababa"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E1E8E1] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E1E8E1] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#E1E8E1] text-[#65736A] hover:bg-[#F7F9F6] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#123D2B] text-white font-semibold hover:bg-[#1D5A40] transition-colors"
            >
              Confirm Enrollment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

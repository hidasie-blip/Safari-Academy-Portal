import React, { useState } from 'react';
import { Staff } from '../../types';
import {
  GraduationCap,
  Mail,
  Phone,
  Search,
  BookOpen,
  Award,
  PlusCircle,
  Briefcase,
} from 'lucide-react';

interface StaffDirectoryProps {
  staff: Staff[];
}

export const StaffDirectory: React.FC<StaffDirectoryProps> = ({ staff }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState<string>('all');

  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.assignedSubjects.some((sub) => sub.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDept = deptFilter === 'all' || s.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123D2B] tracking-tight">
            Faculty & Academic Staff Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#65736A]">
            Qualified educators and departmental heads across Safari Academy secondary divisions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#2E8B57] bg-[#E8F5E9] px-3 py-1.5 rounded-xl border border-[#2E8B57]/30">
            {staff.length} Active Faculty Members
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-[#65736A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search faculty by name, subject (Physics, Math, Chemistry), or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
            />
          </div>

          <div>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-[#E1E8E1] bg-[#F7F9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
            >
              <option value="all">All Departments</option>
              <option value="Natural Sciences">Natural Sciences</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Languages">Languages</option>
              <option value="ICT & STEM">ICT & STEM</option>
              <option value="Administration">Administration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Staff Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map((member) => (
          <div
            key={member.id}
            className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs flex flex-col justify-between hover:border-[#2E8B57]/40 transition-colors space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#123D2B] text-white flex items-center justify-center font-bold text-base shrink-0">
                    {member.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#123D2B]">{member.fullName}</h3>
                    <p className="text-xs text-[#2E8B57] font-semibold">{member.roleTitle}</p>
                    <span className="text-[10px] text-[#65736A] font-mono">{member.staffId}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1] space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-[#17251D] font-medium">
                  <Briefcase className="w-3.5 h-3.5 text-[#2E8B57] shrink-0" />
                  <span>{member.department} Department</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#65736A] text-[11px]">
                  <Award className="w-3.5 h-3.5 text-[#2E8B57] shrink-0" />
                  <span>{member.qualification}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#65736A] text-[11px]">
                  <BookOpen className="w-3.5 h-3.5 text-[#2E8B57] shrink-0" />
                  <span>Teaches: {member.assignedSubjects.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E1E8E1] flex items-center justify-between text-xs text-[#65736A]">
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-1 hover:text-[#123D2B]"
                  title={member.email}
                >
                  <Mail className="w-3.5 h-3.5 text-[#2E8B57]" />
                  <span className="text-[11px]">Email</span>
                </a>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-[#2E8B57]" />
                  <span>{member.phone.split(' ')[0]}...</span>
                </span>
              </div>
              <span className="text-[10px] font-semibold text-[#123D2B] bg-[#E8F5E9] px-2 py-0.5 rounded-md">
                {member.employmentStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

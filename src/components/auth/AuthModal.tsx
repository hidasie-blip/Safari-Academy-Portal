import React, { useState } from 'react';
import { UserRole, UserProfile } from '../../types';
import { DEMO_PROFILES } from '../../data/initialData';
import { X, ShieldCheck, GraduationCap, User, Users, Check, Lock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole,
}) => {
  if (!isOpen) return null;

  const roles: { role: UserRole; title: string; subtitle: string; icon: React.ReactNode; user: UserProfile }[] = [
    {
      role: 'admin',
      title: 'School Administrator',
      subtitle: 'Principal W/ro Selamawit Bekele (Full School Oversight & Rosters)',
      icon: <ShieldCheck className="w-5 h-5 text-[#2E8B57]" />,
      user: DEMO_PROFILES.admin,
    },
    {
      role: 'teacher',
      title: 'Faculty / Teacher',
      subtitle: 'Ato Yohannes Tadesse (Head of Physics, Grade 12 Homeroom)',
      icon: <GraduationCap className="w-5 h-5 text-[#2E8B57]" />,
      user: DEMO_PROFILES.teacher,
    },
    {
      role: 'student',
      title: 'Student Portal (Grade 12)',
      subtitle: 'Alem Hidasie (Candidate SA-2026-1201, Grade 12A Natural Science)',
      icon: <User className="w-5 h-5 text-[#2E8B57]" />,
      user: DEMO_PROFILES.student,
    },
    {
      role: 'parent',
      title: 'Parent & Guardian Portal',
      subtitle: 'Ato Hidasie Mengesha (Verified Guardian of Alem Hidasie)',
      icon: <Users className="w-5 h-5 text-[#2E8B57]" />,
      user: DEMO_PROFILES.parent,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#E1E8E1] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#E1E8E1] bg-[#F7F9F6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#2E8B57]" />
            <h3 className="text-sm font-bold text-[#123D2B]">
              Safari Academy Secure Role Access
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#65736A] hover:text-[#123D2B] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <p className="text-[#65736A] leading-relaxed">
            Select a verified persona to test the Safari Academy platform under real operational access rules:
          </p>

          <div className="space-y-2.5">
            {roles.map((item) => {
              const isSelected = currentRole === item.role;
              return (
                <button
                  key={item.role}
                  onClick={() => {
                    onSelectRole(item.role);
                    onClose();
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-[#2E8B57] bg-[#E8F5E9] ring-1 ring-[#2E8B57]'
                      : 'border-[#E1E8E1] hover:border-[#2E8B57]/50 hover:bg-[#F7F9F6]'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white border border-[#E1E8E1] shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#123D2B]">{item.title}</span>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#2E8B57]">
                          <Check className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[#65736A] text-xs leading-normal">{item.subtitle}</p>
                    <div className="text-[11px] font-mono text-[#65736A] pt-1">
                      {item.user.email}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-[#E1E8E1] bg-[#F7F9F6] text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#123D2B] text-white hover:bg-[#1D5A40] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

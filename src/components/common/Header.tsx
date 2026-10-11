import React, { useState } from 'react';
import { SafariLogo } from './BrandAssets';
import { UserRole, UserProfile } from '../../types';
import { 
  Menu, 
  X, 
  UserCheck, 
  LogOut, 
  ChevronDown, 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  User, 
  Award
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  currentUser: UserProfile;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenAuthModal: () => void;
  onOpenEvidence: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  currentUser,
  onRoleChange,
  activeTab,
  onTabChange,
  onOpenAuthModal,
  onOpenEvidence,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode; color: string }> = {
    admin: { label: 'Administrator', icon: <ShieldCheck className="w-3.5 h-3.5" />, color: 'bg-[#123D2B] text-white' },
    teacher: { label: 'Faculty / Teacher', icon: <GraduationCap className="w-3.5 h-3.5" />, color: 'bg-[#1D5A40] text-white' },
    student: { label: 'Student Portal', icon: <User className="w-3.5 h-3.5" />, color: 'bg-[#2E8B57] text-white' },
    parent: { label: 'Parent Portal', icon: <Users className="w-3.5 h-3.5" />, color: 'bg-emerald-800 text-white' },
  };

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'students', label: 'Students' },
    { id: 'academics', label: 'Academics & Grades' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'announcements', label: 'Announcements' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E1E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand Wordmark Element with Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onTabChange('dashboard')} 
              className="flex items-center gap-2.5 text-left group focus-visible:outline-2 focus-visible:outline-[#2E8B57] rounded-lg"
            >
              <SafariLogo size="md" />
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-[#123D2B] group-hover:text-[#2E8B57] transition-colors whitespace-nowrap">
                  Safari Academy
                </span>
                <span className="font-ethiopic text-[11px] font-semibold text-[#65736A] leading-none">
                  ሳፋሪ አካዳሚ
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#65736A]">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onTabChange(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive 
                      ? 'text-[#123D2B] font-semibold' 
                      : 'hover:text-[#123D2B]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2E8B57] rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Scholarship Evidence Dossier Link for student developer portfolio */}
            <button
              onClick={onOpenEvidence}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-[#E8F5E9] text-[#123D2B] hover:bg-[#d4edd6] transition-colors whitespace-nowrap shrink-0 border border-[#2E8B57]/30"
              title="View Grade 12 Developer Scholarship Evidence Log"
            >
              <Award className="w-3.5 h-3.5 text-[#2E8B57]" />
              <span>Scholarship Dossier</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action Area / Role Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#E1E8E1] bg-[#F7F9F6] hover:bg-[#ebf0ea] text-[#17251D] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#2E8B57]"
                aria-expanded={roleDropdownOpen}
                aria-label="Switch active demonstration role"
              >
                <span className="w-2 h-2 rounded-full bg-[#2E8B57]" aria-hidden="true" />
                <span className="hidden sm:inline text-[#65736A]">Role:</span>
                <span className="font-semibold text-[#123D2B]">{roleLabels[currentRole].label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#65736A]" />
              </button>

              {roleDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-[#E1E8E1] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#65736A] border-b border-[#E1E8E1] mb-1">
                    Select Access Role
                  </div>
                  {(['admin', 'teacher', 'student', 'parent'] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => onRoleChange(role)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg transition-colors text-left ${
                        currentRole === role
                          ? 'bg-[#E8F5E9] text-[#123D2B] font-semibold'
                          : 'text-[#17251D] hover:bg-[#F7F9F6]'
                      }`}
                    >
                      <span className="p-1 rounded-md bg-white border border-[#E1E8E1] text-[#2E8B57]">
                        {roleLabels[role].icon}
                      </span>
                      <div className="flex flex-col">
                        <span>{roleLabels[role].label}</span>
                        <span className="text-[10px] text-[#65736A]">
                          {role === 'admin' && 'Principal & Registrar'}
                          {role === 'teacher' && 'Ato Yohannes (Physics)'}
                          {role === 'student' && 'Alem Hidasie (Gr. 12)'}
                          {role === 'parent' && 'Ato Hidasie Mengesha'}
                        </span>
                      </div>
                    </button>
                  ))}

                  <div className="border-t border-[#E1E8E1] mt-1 pt-1">
                    <button
                      onClick={onOpenAuthModal}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#65736A] hover:text-[#123D2B] hover:bg-[#F7F9F6] rounded-md transition-colors"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Switch Credentials / Login</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar / Sign-Out */}
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#F7F9F6] border border-transparent hover:border-[#E1E8E1] transition-colors"
              title={`${currentUser.name} (${currentUser.role})`}
            >
              <div className="w-8 h-8 rounded-full bg-[#123D2B] text-white flex items-center justify-center text-xs font-bold shrink-0">
                {currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#65736A] hover:text-[#123D2B] hover:bg-[#F7F9F6] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E1E8E1] bg-white px-4 pt-3 pb-6 space-y-3 shadow-md">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onTabChange(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === link.id
                    ? 'bg-[#E8F5E9] text-[#123D2B] font-semibold'
                    : 'text-[#65736A] hover:bg-[#F7F9F6] hover:text-[#123D2B]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => {
                onOpenEvidence();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold bg-[#E8F5E9] text-[#123D2B] border border-[#2E8B57]/30 flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-[#2E8B57]" />
              <span>Grade 12 Developer Scholarship Dossier</span>
            </button>
          </div>

          <div className="pt-3 border-t border-[#E1E8E1]">
            <div className="text-xs font-semibold text-[#65736A] uppercase tracking-wider mb-2">
              Current Session: {currentUser.name}
            </div>
            <div className="flex items-center justify-between text-xs text-[#65736A]">
              <span>Role: <strong className="text-[#123D2B]">{roleLabels[currentRole].label}</strong></span>
              <button
                onClick={onOpenAuthModal}
                className="text-[#2E8B57] font-semibold hover:underline"
              >
                Change Account
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

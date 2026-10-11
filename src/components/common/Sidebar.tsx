import React from 'react';
import { UserRole } from '../../types';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck2,
  FileSpreadsheet,
  Bell,
  Settings,
  Award,
  Shield,
  ExternalLink,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentRole: UserRole;
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  currentRole,
  collapsed = false,
}) => {
  interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    roles: UserRole[];
    badge?: string;
  }

  const items: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
      roles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      id: 'students',
      label: 'Student Directory',
      icon: <Users className="w-4 h-4" />,
      roles: ['admin', 'teacher'],
    },
    {
      id: 'staff',
      label: 'Staff & Faculty',
      icon: <GraduationCap className="w-4 h-4" />,
      roles: ['admin'],
    },
    {
      id: 'academics',
      label: 'Academics & Structure',
      icon: <BookOpen className="w-4 h-4" />,
      roles: ['admin', 'teacher'],
    },
    {
      id: 'attendance',
      label: 'Daily Attendance',
      icon: <CalendarCheck2 className="w-4 h-4" />,
      roles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      id: 'grades',
      label: currentRole === 'student' || currentRole === 'parent' ? 'My Report Card' : 'Grades & Assessments',
      icon: <FileSpreadsheet className="w-4 h-4" />,
      roles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: <Bell className="w-4 h-4" />,
      roles: ['admin', 'teacher', 'student', 'parent'],
      badge: '3',
    },
    {
      id: 'evidence',
      label: 'Scholarship Dossier',
      icon: <Award className="w-4 h-4" />,
      roles: ['admin', 'teacher', 'student', 'parent'],
      badge: 'Grade 12',
    },
    {
      id: 'settings',
      label: 'School Settings',
      icon: <Settings className="w-4 h-4" />,
      roles: ['admin'],
    },
  ];

  const visibleItems = items.filter((item) => item.roles.includes(currentRole));

  return (
    <aside
      className={`shrink-0 bg-white border-r border-[#E1E8E1] flex flex-col justify-between transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 space-y-6">
        {/* Navigation Section */}
        <div className="space-y-1">
          <div className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#65736A] ${collapsed ? 'hidden' : 'block'}`}>
            School Modules
          </div>

          <nav className="space-y-1">
            {visibleItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#123D2B] text-white shadow-xs'
                      : 'text-[#17251D] hover:bg-[#F7F9F6] hover:text-[#123D2B]'
                  }`}
                >
                  <span className={`${isActive ? 'text-white' : 'text-[#2E8B57]'}`}>
                    {item.icon}
                  </span>

                  {!collapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}

                  {!collapsed && item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#E8F5E9] text-[#123D2B]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Ethiopian Calendar Quick Card */}
        {!collapsed && (
          <div className="p-3 rounded-xl bg-[#F7F9F6] border border-[#E1E8E1] space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#123D2B]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E8B57]" />
                Academic Term
              </span>
              <span className="text-[10px] text-[#65736A]">Semester 1</span>
            </div>
            <div className="text-xs font-bold text-[#17251D]">
              2026/2027 · <span className="font-ethiopic text-[#1D5A40]">2018 ዓ.ም</span>
            </div>
            <div className="text-[11px] text-[#65736A] truncate">
              Gerji Main Campus · Addis Ababa
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding Info */}
      <div className="p-4 border-t border-[#E1E8E1]">
        {!collapsed ? (
          <div className="space-y-1">
            <div className="text-[11px] font-medium text-[#123D2B] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#2E8B57]" />
              <span>Safari Academy Portal</span>
            </div>
            <p className="text-[10px] text-[#65736A] leading-tight">
              A Grade 12 Developer Demonstration Platform
            </p>
          </div>
        ) : (
          <div className="flex justify-center text-[#2E8B57]">
            <Shield className="w-4 h-4" />
          </div>
        )}
      </div>
    </aside>
  );
};

import React, { useState } from 'react';
import { UserRole, Student, Staff, AttendanceRecord, StudentGradeRecord, Announcement, SchoolSettingsConfig } from './types';
import {
  INITIAL_STUDENTS,
  INITIAL_STAFF,
  INITIAL_SUBJECTS,
  INITIAL_GRADES,
  INITIAL_ATTENDANCE,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EVENTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_SCHOOL_SETTINGS,
  DEMO_PROFILES,
} from './data/initialData';

import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { TeacherDashboard } from './components/dashboard/TeacherDashboard';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { ParentDashboard } from './components/dashboard/ParentDashboard';

import { StudentDirectory } from './components/students/StudentDirectory';
import { StudentDetailModal } from './components/students/StudentDetailModal';
import { StudentFormModal } from './components/students/StudentFormModal';
import { StaffDirectory } from './components/staff/StaffDirectory';
import { AcademicStructure } from './components/academics/AcademicStructure';
import { AttendanceManager } from './components/attendance/AttendanceManager';
import { GradeManager } from './components/grades/GradeManager';
import { PrintableReportCard } from './components/grades/PrintableReportCard';
import { AnnouncementsManager } from './components/announcements/AnnouncementsManager';
import { SchoolSettings } from './components/settings/SchoolSettings';
import { ScholarshipEvidence } from './components/evidence/ScholarshipEvidence';
import { AuthModal } from './components/auth/AuthModal';

export default function App() {
  // Application State
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [staff, setStaff] = useState<Staff[]>(INITIAL_STAFF);
  const [subjects] = useState(INITIAL_SUBJECTS);
  const [grades, setGrades] = useState<StudentGradeRecord[]>(INITIAL_GRADES);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [events] = useState(INITIAL_EVENTS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [settings, setSettings] = useState<SchoolSettingsConfig>(INITIAL_SCHOOL_SETTINGS);

  // Modals
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<Student | null>(null);
  const [selectedStudentForReportCard, setSelectedStudentForReportCard] = useState<Student | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Current active persona profile
  const currentUser = DEMO_PROFILES[currentRole];

  // Primary student for student / parent views
  const currentStudent = students.find((s) => s.studentId === 'SA-2026-1201') || students[0];
  const linkedStudents = students.filter((s) => s.studentId === 'SA-2026-1201');

  // Role change handler
  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    // If active tab isn't available for the new role, switch back to dashboard
    if (newRole === 'student' || newRole === 'parent') {
      if (['staff', 'settings'].includes(activeTab)) {
        setActiveTab('dashboard');
      }
    }
  };

  // Add new student
  const handleEnrollStudent = (newStudentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...newStudentData,
      id: `stud-${Date.now()}`,
    };
    setStudents((prev) => [newStudent, ...prev]);

    // Log action to audit trail
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userName: currentUser.name,
      userRole: currentRole,
      action: 'Student Enrolled',
      targetRecord: `${newStudent.fullName} (${newStudent.studentId})`,
      details: `Enrolled into ${newStudent.grade} Section ${newStudent.section}`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Save attendance records
  const handleSaveAttendance = (newRecords: AttendanceRecord[]) => {
    setAttendance((prev) => {
      const filtered = prev.filter(
        (p) => !newRecords.some((nr) => nr.studentId === p.studentId && nr.date === p.date)
      );
      return [...newRecords, ...filtered];
    });

    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userName: currentUser.name,
      userRole: currentRole,
      action: 'Attendance Session Saved',
      targetRecord: `${newRecords[0]?.grade || ''} ${newRecords[0]?.section || ''}`,
      details: `Recorded attendance for ${newRecords.length} students.`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Save grades
  const handleSaveGrades = (updatedGrades: StudentGradeRecord[]) => {
    setGrades(updatedGrades);

    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userName: currentUser.name,
      userRole: currentRole,
      action: 'Continuous Assessment Updated',
      targetRecord: 'Term Grade Sheets',
      details: 'Recorded course assessment marks.',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Add announcement
  const handleAddAnnouncement = (newAnnData: Omit<Announcement, 'id'>) => {
    const newAnn: Announcement = {
      ...newAnnData,
      id: `ann-${Date.now()}`,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);

    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userName: currentUser.name,
      userRole: currentRole,
      action: 'Announcement Published',
      targetRecord: newAnn.title,
      details: `Category: ${newAnn.category}`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#F7F9F6] text-[#17251D] flex flex-col font-sans">
      {/* Top Bar Header */}
      <Header
        currentRole={currentRole}
        currentUser={currentUser}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenEvidence={() => setActiveTab('evidence')}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            currentRole={currentRole}
          />
        </div>

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* OVERVIEW / DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <>
              {currentRole === 'admin' && (
                <AdminDashboard
                  students={students}
                  staff={staff}
                  attendance={attendance}
                  announcements={announcements}
                  events={events}
                  auditLogs={auditLogs}
                  onNavigate={setActiveTab}
                  onOpenEnrollModal={() => setIsEnrollModalOpen(true)}
                />
              )}

              {currentRole === 'teacher' && (
                <TeacherDashboard
                  currentStaff={staff[1]} // Ato Yohannes Tadesse
                  students={students}
                  attendance={attendance}
                  grades={grades}
                  onNavigate={setActiveTab}
                />
              )}

              {currentRole === 'student' && (
                <StudentDashboard
                  currentStudent={currentStudent}
                  grades={grades}
                  announcements={announcements}
                  events={events}
                  onOpenReportCard={() => setSelectedStudentForReportCard(currentStudent)}
                  onNavigate={setActiveTab}
                />
              )}

              {currentRole === 'parent' && (
                <ParentDashboard
                  linkedStudents={linkedStudents}
                  grades={grades}
                  announcements={announcements}
                  events={events}
                  onOpenReportCard={(stud) => setSelectedStudentForReportCard(stud)}
                />
              )}
            </>
          )}

          {/* STUDENTS TAB */}
          {activeTab === 'students' && (
            <StudentDirectory
              students={students}
              grades={grades}
              onSelectStudent={(stud) => setSelectedStudentForDetail(stud)}
              onOpenEnrollModal={() => setIsEnrollModalOpen(true)}
              onOpenReportCard={(stud) => setSelectedStudentForReportCard(stud)}
            />
          )}

          {/* STAFF TAB */}
          {activeTab === 'staff' && (
            <StaffDirectory staff={staff} />
          )}

          {/* ACADEMICS TAB */}
          {activeTab === 'academics' && (
            <AcademicStructure subjects={subjects} />
          )}

          {/* ATTENDANCE TAB */}
          {activeTab === 'attendance' && (
            <AttendanceManager
              students={students}
              attendanceRecords={attendance}
              onSaveAttendance={handleSaveAttendance}
              currentRole={currentRole}
              currentUserName={currentUser.name}
            />
          )}

          {/* GRADES TAB */}
          {activeTab === 'grades' && (
            <GradeManager
              students={students}
              grades={grades}
              subjects={subjects}
              onSaveGrades={handleSaveGrades}
              onOpenReportCard={(stud) => setSelectedStudentForReportCard(stud)}
              currentRole={currentRole}
            />
          )}

          {/* ANNOUNCEMENTS TAB */}
          {activeTab === 'announcements' && (
            <AnnouncementsManager
              announcements={announcements}
              events={events}
              onAddAnnouncement={handleAddAnnouncement}
              currentRole={currentRole}
              authorName={currentUser.name}
            />
          )}

          {/* SCHOLARSHIP EVIDENCE TAB */}
          {activeTab === 'evidence' && (
            <ScholarshipEvidence />
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <SchoolSettings
              settings={settings}
              onUpdateSettings={setSettings}
            />
          )}
        </main>
      </div>

      {/* MODALS */}
      {/* Student Detail Profile Modal */}
      <StudentDetailModal
        student={selectedStudentForDetail}
        grades={grades}
        onClose={() => setSelectedStudentForDetail(null)}
        onOpenReportCard={(stud) => setSelectedStudentForReportCard(stud)}
      />

      {/* New Student Enrollment Modal */}
      <StudentFormModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        onSave={handleEnrollStudent}
        existingCount={students.length}
      />

      {/* Printable Report Card Modal */}
      {selectedStudentForReportCard && (
        <PrintableReportCard
          student={selectedStudentForReportCard}
          grades={grades}
          settings={settings}
          onClose={() => setSelectedStudentForReportCard(null)}
        />
      )}

      {/* Authentication / Persona Switcher Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentRole={currentRole}
        onSelectRole={handleRoleChange}
      />
    </div>
  );
}

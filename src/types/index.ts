export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  studentId?: string; // If student
  staffId?: string;   // If teacher/admin
  linkedStudentIds?: string[]; // If parent
  title?: string;
  department?: string;
}

export type GradeLevel = 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12' | 'KG 1' | 'KG 2' | 'KG 3';
export type AcademicStream = 'General' | 'Natural Science' | 'Social Science';

export interface Student {
  id: string;
  studentId: string; // e.g. SA-2026-0841
  fullName: string;
  amharicName?: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  grade: GradeLevel;
  section: string; // e.g. 'A', 'B', 'C'
  stream: AcademicStream;
  enrollmentStatus: 'Active' | 'On Leave' | 'Transferred' | 'Graduated';
  enrollmentDate: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianRelationship: 'Father' | 'Mother' | 'Guardian';
  address: string; // e.g. Gerji, Addis Ababa
  gpa: number;
  attendanceRate: number; // Percentage, e.g. 96.5
  avatarUrl?: string;
  campus: string;
}

export interface Staff {
  id: string;
  staffId: string;
  fullName: string;
  gender: 'Male' | 'Female';
  roleTitle: string; // e.g. 'Senior Physics Teacher', 'Vice Principal'
  department: 'Natural Sciences' | 'Mathematics' | 'Languages' | 'Social Sciences' | 'Administration' | 'ICT & STEM';
  email: string;
  phone: string;
  assignedGrades: string[];
  assignedSubjects: string[];
  employmentStatus: 'Full-Time' | 'Part-Time' | 'Contract';
  joinDate: string;
  qualification: string;
  avatarUrl?: string;
}

export interface Subject {
  id: string;
  code: string; // e.g. PHYS-12, MATH-12
  name: string;
  department: string;
  creditHours: number;
  gradeLevel: GradeLevel;
  stream?: AcademicStream;
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  grade: GradeLevel;
  section: string;
  status: AttendanceStatus;
  remark?: string;
  recordedBy: string;
  timestamp: string;
}

export interface AssessmentBreakdown {
  quiz: number;       // max 10
  midterm: number;    // max 20
  assignment: number; // max 10
  project: number;    // max 10
  finalExam: number;  // max 50
  total: number;      // max 100
  letterGrade: string; // A+, A, B+, etc.
}

export interface StudentGradeRecord {
  id: string;
  studentId: string;
  subjectId: string;
  subjectName: string;
  academicYear: string;
  semester: 'Semester 1' | 'Semester 2';
  breakdown: AssessmentBreakdown;
  teacherRemarks?: string;
  isPublished: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  amharicTitle?: string;
  content: string;
  category: 'Academic' | 'Administrative' | 'Events' | 'Exam Bulletin';
  targetRoles: UserRole[];
  targetGrades?: GradeLevel[];
  publishedAt: string;
  authorName: string;
  authorRole: string;
  isPinned: boolean;
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  gregorianDate: string;
  ethiopicDate: string;
  category: 'Holiday' | 'Exam' | 'Meeting' | 'Celebration';
  location: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: UserRole;
  action: string;
  targetRecord: string;
  details: string;
  ipAddress?: string;
}

export interface SchoolSettingsConfig {
  schoolName: string;
  amharicSchoolName: string;
  mottoEnglish: string;
  mottoAmharic: string;
  currentAcademicYear: string;
  ethiopicYear: string;
  activeSemester: 'Semester 1' | 'Semester 2';
  mainCampus: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  customLogoUrl?: string;
  customBannerUrl?: string;
  useOfficialSvgBranding: boolean;
}

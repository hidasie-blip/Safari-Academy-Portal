# SAFARI ACADEMY SCHOOL MANAGEMENT PLATFORM — DATABASE SCHEMA SPECIFICATION

This schema document specifies the normalized relational PostgreSQL / Supabase architecture designed for the Safari Academy platform.

```sql
-- 1. PROFILES & ROLES
CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'student', 'parent');

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    amharic_name TEXT,
    role user_role NOT NULL DEFAULT 'student',
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ACADEMIC YEARS & TERMS
CREATE TABLE academic_years (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL, -- '2026/2027'
    ethiopic_year TEXT NOT NULL, -- '2018 ዓ.ም'
    is_current BOOLEAN DEFAULT FALSE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

-- 3. COURSES & SUBJECTS
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL, -- 'PHYS-12', 'MATH-12'
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    credit_hours INT NOT NULL DEFAULT 4,
    grade_level TEXT NOT NULL, -- 'Grade 12'
    stream TEXT -- 'Natural Science', 'Social Science'
);

-- 4. STUDENTS
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    student_id TEXT UNIQUE NOT NULL, -- 'SA-2026-1201'
    full_name TEXT NOT NULL,
    amharic_name TEXT,
    gender TEXT CHECK (gender IN ('Male', 'Female')),
    date_of_birth DATE NOT NULL,
    grade_level TEXT NOT NULL,
    section TEXT NOT NULL,
    stream TEXT NOT NULL,
    enrollment_status TEXT NOT NULL DEFAULT 'Active',
    guardian_name TEXT NOT NULL,
    guardian_phone TEXT NOT NULL,
    guardian_email TEXT,
    address TEXT,
    campus TEXT DEFAULT 'Gerji Campus',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ATTENDANCE SESSIONS & RECORDS
CREATE TYPE attendance_status AS ENUM ('Present', 'Absent', 'Late', 'Excused');

CREATE TABLE attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id TEXT REFERENCES students(student_id) ON DELETE CASCADE,
    session_date DATE NOT NULL,
    grade_level TEXT NOT NULL,
    section TEXT NOT NULL,
    status attendance_status NOT NULL DEFAULT 'Present',
    remark TEXT,
    recorded_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, session_date)
);

-- 6. CONTINUOUS ASSESSMENTS & GRADES
CREATE TABLE student_grades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id TEXT REFERENCES students(student_id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    academic_year_id UUID REFERENCES academic_years(id),
    semester TEXT NOT NULL CHECK (semester IN ('Semester 1', 'Semester 2')),
    quiz_score NUMERIC(4,1) DEFAULT 0 CHECK (quiz_score <= 10),
    midterm_score NUMERIC(4,1) DEFAULT 0 CHECK (midterm_score <= 20),
    assignment_score NUMERIC(4,1) DEFAULT 0 CHECK (assignment_score <= 10),
    project_score NUMERIC(4,1) DEFAULT 0 CHECK (project_score <= 10),
    final_exam_score NUMERIC(4,1) DEFAULT 0 CHECK (final_exam_score <= 50),
    total_score NUMERIC(5,1) GENERATED ALWAYS AS (
        quiz_score + midterm_score + assignment_score + project_score + final_exam_score
    ) STORED,
    letter_grade TEXT,
    teacher_remarks TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, subject_id, semester)
);

-- 7. ANNOUNCEMENTS & BULLETINS
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    amharic_title TEXT,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    target_roles user_role[] DEFAULT '{admin,teacher,student,parent}',
    is_pinned BOOLEAN DEFAULT FALSE,
    author_id UUID REFERENCES profiles(id),
    published_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. AUDIT LOGS
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    acting_user_id UUID REFERENCES profiles(id),
    user_role user_role NOT NULL,
    action TEXT NOT NULL,
    target_record TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

// Default seed users — CHANGE PASSWORDS before production!
const users = [
  {
    name: 'Super Admin',
    email: 'superadmin@geetaportal.in',
    password: 'Geeta@Super123',
    role: 'superadmin',
    language_preference: 'hi',
    is_active: true,
  },
  {
    name: 'School Admin Demo',
    email: 'schooladmin@geetaportal.in',
    password: 'Geeta@School123',
    role: 'school_admin',
    language_preference: 'hi',
    is_active: true,
  },
  {
    name: 'Teacher Demo',
    email: 'teacher@geetaportal.in',
    password: 'Geeta@Teacher123',
    role: 'teacher',
    language_preference: 'hi',
    is_active: true,
  },
  {
    name: 'Student Demo',
    email: 'student@geetaportal.in',
    password: 'Geeta@Student123',
    role: 'student',
    language_preference: 'hi',
    is_active: true,
  },
];

module.exports = users;

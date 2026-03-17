require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');
const connectDB = require('../../src/config/db');

const Chapter      = require('../../src/models/Chapter.model');
const Glossary     = require('../../src/models/Glossary.model');
const User         = require('../../src/models/User.model');
const School       = require('../../src/models/School.model');
const Subscription = require('../../src/models/Subscription.model');

const parseChapters = require('./parse-content');
const path          = require('path');
const glossaryTerms = require('./glossary.seed');
const seedUsers     = require('./users.seed');

const CONTENT_FILE = path.join(__dirname, '../../../geetapaath.md');
const allChapters  = parseChapters(CONTENT_FILE);

const seed = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB.\n');

    // ── Chapters ──────────────────────────────────────────────────────────────
    await Chapter.deleteMany({});
    await Chapter.insertMany(allChapters);
    console.log(`✓ ${allChapters.length} chapters seeded.`);

    // ── Glossary ──────────────────────────────────────────────────────────────
    await Glossary.deleteMany({});
    await Glossary.insertMany(glossaryTerms);
    console.log(`✓ ${glossaryTerms.length} glossary terms seeded.`);

    // ── Users ─────────────────────────────────────────────────────────────────
    await User.deleteMany({});
    const hashedUsers = await Promise.all(
      seedUsers.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 12),
      }))
    );
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`✓ ${createdUsers.length} users seeded.`);

    const superadmin   = createdUsers.find((u) => u.role === 'superadmin');
    const schoolAdmin  = createdUsers.find((u) => u.role === 'school_admin');
    const teacher      = createdUsers.find((u) => u.role === 'teacher');
    const student      = createdUsers.find((u) => u.role === 'student');

    // ── Demo school + subscription ────────────────────────────────────────────
    await School.deleteMany({});
    await Subscription.deleteMany({});

    const subscription = await Subscription.create({
      plan: 'premium',
      status: 'active',
      start_date: new Date(),
      end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      features: Subscription.planFeatures('premium'),
    });

    const school = await School.create({
      name: 'Demo Vidyalaya',
      city: 'New Delhi',
      state: 'Delhi',
      contact_email: 'schooladmin@geetaportal.in',
      admin: schoolAdmin._id,
      subscription: subscription._id,
      join_code: 'GEETA1', // overrides auto-generated code for demo
    });

    subscription.school = school._id;
    await subscription.save();

    // Assign school to school_admin, teacher, student
    await User.updateMany(
      { _id: { $in: [schoolAdmin._id, teacher._id, student._id] } },
      { school: school._id }
    );

    console.log(`✓ Demo school seeded (join code: ${school.join_code}).`);

    console.log('\n──────────────────────────────────────────');
    console.log('Seed credentials:');
    console.log('  Superadmin : superadmin@geetaportal.in  / Geeta@Super123');
    console.log('  School Admin: schooladmin@geetaportal.in / Geeta@School123');
    console.log('  Teacher    : teacher@geetaportal.in     / Geeta@Teacher123');
    console.log('  Student    : student@geetaportal.in     / Geeta@Student123');
    console.log('  School join code: GEETA1');
    console.log('──────────────────────────────────────────');
    console.log('\n⚠  Change all passwords before deploying to production!\n');

    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
};

seed();

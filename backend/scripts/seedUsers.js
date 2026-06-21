const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config({ path: './.env' });

const dbKeys = require('../config/db.keys');
const dbConfig = require('../config/db.config');

const seedUsers = async () => {
  try {
    await mongoose.connect(dbKeys.uri, dbConfig.options);
    console.log('MongoDB Connected for Seeding');

    // Clear existing users just for testing purposes (Optional but good for clean state)
    // await User.deleteMany();

    const users = [
      {
        employeeId: 'SA001',
        fullName: 'Super Admin',
        username: 'sa_admin',
        email: 'sa@cardbox.com',
        mobileNumber: '9999999999',
        password: 'password123',
        role: 'SA',
        status: 'ACTIVE'
      },
      {
        employeeId: 'ML001',
        fullName: 'Middle Level Staff',
        username: 'ml_staff',
        email: 'ml@cardbox.com',
        mobileNumber: '8888888888',
        password: 'password123',
        role: 'ML',
        status: 'ACTIVE'
      },
      {
        employeeId: 'EL001',
        fullName: 'End Level Staff',
        username: 'el_staff',
        email: 'el@cardbox.com',
        mobileNumber: '7777777777',
        password: 'password123',
        role: 'EL',
        status: 'ACTIVE'
      }
    ];

    for (const u of users) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        await User.create(u);
        console.log(`Created user: ${u.role} (${u.email})`);
      } else {
        console.log(`User already exists: ${u.role} (${u.email})`);
      }
    }

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();

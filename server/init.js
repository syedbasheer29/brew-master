const { execSync } = require('child_process');
const path = require('path');

try {
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Generate Prisma client
  console.log('\nGenerating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Run migrations
  console.log('\nRunning database migrations...');
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });

  console.log('\nInitialization complete! You can now start the server with:');
  console.log('npm run dev');
} catch (error) {
  console.error('Error during initialization:', error.message);
  process.exit(1);
} 
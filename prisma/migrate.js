require('dotenv').config(); // Load environment variables from .env.local file

const { execSync } = require('child_process');

const migrateCommand = `prisma migrate dev --name "${new Date().getTime()}"`;

try {
    execSync(migrateCommand, { stdio: 'inherit' });
} catch (error) {
    console.error('Error occurred during migration:', error);
    process.exit(1); // Exit with a non-zero code to indicate failure
}

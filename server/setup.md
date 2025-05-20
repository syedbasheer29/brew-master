# Database Setup Guide

1. Install PostgreSQL:
   - Download PostgreSQL from: https://www.postgresql.org/download/windows/
   - During installation:
     - Set password as "postgres"
     - Keep the default port (5432)
     - Install all offered components

2. After installation:
   - Open pgAdmin (comes with PostgreSQL)
   - Create a new database called "brewmaster"
   - Right-click on "Databases" > "Create" > "Database"
   - Enter "brewmaster" as the database name

3. Set up the environment:
   ```bash
   # Install dependencies
   npm install

   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev --name init
   ```

4. Verify the setup:
   ```bash
   # Start the server
   npm run dev
   ```

If you see "Server is running on port 3001", the setup is successful!

## Troubleshooting

If you encounter any errors:

1. Database connection error:
   - Check if PostgreSQL is running
   - Verify the password in .env matches your PostgreSQL password
   - Make sure the "brewmaster" database exists

2. Port in use error:
   - Change the PORT in .env to another number (e.g., 3002)
   - Kill any existing node processes and try again

3. Migration errors:
   - Delete the prisma/migrations folder
   - Run `npx prisma migrate reset` (this will delete all data)
   - Run `npx prisma migrate dev --name init` again 
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

require('dotenv').config({ path: '.env' });

if (!process.env.DATABASE_URL) {
    console.log('🔴 Cannot find database url');
}

const client = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(client, { schema });

const migrations = async () => {
    try {
        console.log('Migrations started');
        await migrate(db, { migrationsFolder: 'src/libs/supabase/migration' })
        console.log('Migrations completed');
    } catch (error) {
        console.error('Migration error:', error);
    }
}
migrations()
export default db
 
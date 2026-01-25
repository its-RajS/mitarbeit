/// <reference path="./types.d.ts" />
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const checkConnection = async () => {
    const url = process.env.DATABASE_URL;
    if (!url) {
        console.error('❌ DATABASE_URL is not defined in .env');
        return;
    }

    console.log('--- Connection Info ---');
    try {
        const parsed = new URL(url);
        console.log(`Host: ${parsed.hostname}`);
        console.log(`Port: ${parsed.port}`);
        console.log(`User: ${parsed.username}`);

        if (parsed.hostname.includes('pooler')) {
            console.warn('⚠️  WARNING: You are connected to the Supabase Transaction Pooler (pooler.supabase.com). Drizzle-kit introspection requires the Direct Connection.');
        } else {
            console.log('✅ Host looks like a Direct Connection (good for drizzle-kit).');
        }
    } catch (e) {
        console.log('Could not parse URL for logging (proceeding anyway...)');
    }

    console.log('\nAttempting to connect...');
    try {
        const client = postgres(url, { max: 1, connect_timeout: 10 });
        const result = await client`SELECT 1 as result`;
        console.log('✅ Connection successful! Database is reachable.');
        console.log('Result:', result);
        await client.end();
    } catch (error: any) {
        console.error('❌ Connection failed:', error.message);
        if (error.code === '28P01') {
            console.error('👉 Cause: Password authentication failed. Double check your password in .env.');
        } else if (error.code === 'ENOTFOUND') {
            console.error('👉 Cause: Host not found. Check the hostname in DATABASE_URL.');
        } else if (error.message.includes('timeout')) {
            console.error('👉 Cause: Connection timed out. Check if port 5432 is blocked or if the host is correct.');
        }
    }
};

checkConnection();

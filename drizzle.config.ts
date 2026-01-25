import { defineConfig } from "drizzle-kit"

// Load environment variables
require("dotenv").config({ path: ".env" });

if (!process.env.DATABASE_URL){
    throw new Error("DATABASE_URL is not defined")
}

export default defineConfig({
    schema: "src/lib/supabase/schema.ts",
    out: 'src/lib/supabase/migration',
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    }
});
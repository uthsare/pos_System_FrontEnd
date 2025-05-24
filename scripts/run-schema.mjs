import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read environment variables from .env.local
const envPath = join(__dirname, '..', '.env.local');
const env = readFileSync(envPath, 'utf-8')
  .split('\n')
  .reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      acc[key.trim()] = value.trim();
    }
    return acc;
  }, {});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Read and execute schema.sql
const schemaPath = join(__dirname, '..', 'schema.sql');
const schema = readFileSync(schemaPath, 'utf-8');

console.log('Running schema.sql...');

try {
  // Split the schema into individual statements
  const statements = schema
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0);

  for (const sql of statements) {
    console.log(`Executing: ${sql.split('\n')[0]}...`);
    
    const { error } = await supabase
      .from('_raw')
      .select('*')
      .limit(1)
      .then(() => supabase.rpc('raw_query', { query: sql }));

    if (error) {
      throw new Error(`Failed to execute statement: ${error.message}\nSQL: ${sql}`);
    }
  }

  console.log('Schema executed successfully!');
} catch (error) {
  console.error('Error running schema:', error);
  process.exit(1);
}

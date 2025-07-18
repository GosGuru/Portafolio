import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qbvomykewrjzvpyahlan.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidm9teWtld3JqenZweWFobGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1Mjg3MTksImV4cCI6MjA2ODEwNDcxOX0.J7p0Z84VwLmoxeXnjVyqQ8_ks0a4VhANbjZ5OQTHeNw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        // Supabase client uses localStorage by default for session persistence.
        persistSession: true,
    }
});

import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://pxeejpfzzlulcbcjbcuh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZWVqcGZ6emx1bGNiY2piY3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5NDg5NDQsImV4cCI6MjAzMTUyNDk0NH0.HnGI3GSxipz3RrtsGeTugmLPqrbdC9pY7bSQVQ3rYeE';
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://plotbzgvzapmyenklaty.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsb3Riemd2emFwbXllbmtsYXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0MTI3MzEsImV4cCI6MjAxODk4ODczMX0.okbss_AaZFtuIPw0NptOkH9T_oCeKUIg-iwQkaA5ydU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

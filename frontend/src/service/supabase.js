import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gxgjeoeflongamaptapm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4Z2plb2VmbG9uZ2FtYXB0YXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMTcxMzcsImV4cCI6MjA2Nzg5MzEzN30.1dhVYpH7Yxcs4cegk6K3hoij1BULS-HBXlmDPLX2xjw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

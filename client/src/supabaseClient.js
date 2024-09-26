import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gsnzrgggdprisstfyksu.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPA_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
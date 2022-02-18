import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL as string,
  import.meta.env.VITE_APP_SUPABASE_KEY as string
)

export default supabase
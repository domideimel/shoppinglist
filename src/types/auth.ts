import { User } from '@supabase/supabase-js'

export interface Auth {
  user: User | null;
  setUser: (user: User | null) => void;
}
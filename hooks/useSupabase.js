// hooks/useSupabase.js
// Hook simple que expone el cliente Supabase unificado

import { supabase } from "../src/services/supabase.js";

export function useSupabase() {
  return {
    supabase
  };
}

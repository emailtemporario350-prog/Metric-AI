const metricApiUrl = import.meta.env.VITE_METRIC_API_URL?.trim()
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()

export const metricConfig = {
  apiUrl: metricApiUrl || undefined,
  supabaseUrl: supabaseUrl || undefined,
} as const

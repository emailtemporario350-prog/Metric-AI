const readEnv = (key: keyof ImportMetaEnv) => import.meta.env[key]?.trim() || undefined

const metricApiUrl = readEnv('VITE_METRIC_API_URL')

export const metricConfig = {
  apiUrl: metricApiUrl || undefined,
  ollamaUrl: readEnv('VITE_OLLAMA_BASE_URL'),
  cloudflareTunnelUrl: readEnv('VITE_CLOUDFLARE_TUNNEL_URL'),
  supabaseUrl: readEnv('VITE_SUPABASE_URL'),
  supabaseAnonKey: readEnv('VITE_SUPABASE_ANON_KEY'),
  vercelUrl: readEnv('VITE_VERCEL_PROJECT_URL'),
  githubUrl: readEnv('VITE_GITHUB_URL'),
  linearUrl: readEnv('VITE_LINEAR_URL'),
  jiraUrl: readEnv('VITE_JIRA_URL'),
  slackUrl: readEnv('VITE_SLACK_WEBHOOK_URL'),
  teamsUrl: readEnv('VITE_TEAMS_WEBHOOK_URL'),
  reviewUrl: readEnv('VITE_REVIEW_WEBHOOK_URL'),
  authUrl: readEnv('VITE_AUTH_URL'),
} as const

export const metricEnvStatus = [
  ['Metric API', metricConfig.apiUrl],
  ['Ollama', metricConfig.ollamaUrl],
  ['Cloudflare Tunnel', metricConfig.cloudflareTunnelUrl],
  ['Supabase', metricConfig.supabaseUrl],
  ['Vercel', metricConfig.vercelUrl],
  ['GitHub', metricConfig.githubUrl],
  ['Linear', metricConfig.linearUrl],
  ['Jira', metricConfig.jiraUrl],
  ['Slack', metricConfig.slackUrl],
  ['Teams', metricConfig.teamsUrl],
  ['Metric Auth', metricConfig.authUrl],
] as const

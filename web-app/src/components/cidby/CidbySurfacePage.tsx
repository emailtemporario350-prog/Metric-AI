import {
  Activity,
  BarChart3,
  Bell,
  Bot,
  Boxes,
  BrainCircuit,
  Cable,
  Cloud,
  Code2,
  FileText,
  FolderGit2,
  GitBranch,
  Github,
  History,
  KeyRound,
  Layers3,
  LockKeyhole,
  Network,
  PanelTop,
  Plug,
  ScrollText,
  Server,
  Settings2,
  Shield,
  Store,
  TerminalSquare,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { route } from '@/constants/routes'

export type CidbySurface =
  | 'github' | 'workspace' | 'models' | 'api' | 'logs' | 'analytics' | 'terminal'
  | 'tasks' | 'memory' | 'documents' | 'deployments' | 'monitoring' | 'notifications'
  | 'profile' | 'organization' | 'permissions' | 'storage' | 'variables' | 'plugins'
  | 'marketplace' | 'templates' | 'history' | 'reports' | 'connections' | 'commandCenter'

const surfaceMeta: Record<CidbySurface, [string, string, string, LucideIcon]> = {
  github: ['Integrations', 'GitHub', 'Repos, pull requests and worktrees in one command center.', Github],
  workspace: ['Control plane', 'Workspace', 'Projects, environments and guardrails for your agents.', PanelTop],
  models: ['Intelligence', 'Models', 'Choose the right reasoning profile for each outcome.', BrainCircuit],
  api: ['Developer platform', 'API', 'Endpoints, webhooks and keys for automation.', Cable],
  logs: ['Observability', 'Logs', 'Every command, tool call and deployment event in context.', ScrollText],
  analytics: ['Observability', 'Analytics', 'Understand throughput, quality and agent economics.', BarChart3],
  terminal: ['Execution', 'Terminal', 'A visual command surface for every connected environment.', TerminalSquare],
  tasks: ['Execution', 'Tasks', 'Milestones and work items across active agent runs.', Workflow],
  memory: ['Context', 'Memory', 'Long-lived decisions, preferences and project context.', BrainCircuit],
  documents: ['Context', 'Documents', 'Indexed files, specs and evidence used by Cidby.', FileText],
  deployments: ['Delivery', 'Deployments', 'Ship, inspect and roll back with confidence.', Cloud],
  monitoring: ['Observability', 'Monitoring', 'Health signals from your agents and connected systems.', Activity],
  notifications: ['Workspace', 'Notifications', 'Mentions, approvals and events that need your attention.', Bell],
  profile: ['Account', 'Profile', 'Your identity, preferences and active sessions.', Users],
  organization: ['Account', 'Organization', 'The people, policy and resources behind this workspace.', Users],
  permissions: ['Account', 'Permissions', 'Explicit controls for what agents can access and do.', LockKeyhole],
  storage: ['Infrastructure', 'Storage', 'Artifacts, cache and workspace data at a glance.', Boxes],
  variables: ['Infrastructure', 'Variables', 'Runtime configuration shared with trusted environments.', Settings2],
  plugins: ['Extensibility', 'Plugins', 'Extend Cidby with tools, skills and provider adapters.', Plug],
  marketplace: ['Extensibility', 'Marketplace', 'Discover skills and integrations for your agents.', Store],
  templates: ['Extensibility', 'Templates', 'Start from proven workflows for recurring work.', Layers3],
  history: ['Workspace', 'History', 'A complete record of outcomes, edits and decisions.', History],
  reports: ['Observability', 'Reports', 'Shareable summaries of engineering work and impact.', FileText],
  connections: ['Infrastructure', 'Connections', 'Live status for APIs, tunnels and providers.', Network],
  commandCenter: ['Control plane', 'Command Center', 'See every agent, mission and approval from one surface.', Server],
}

const surfaceItems: Record<CidbySurface, [string, string, LucideIcon][]> = {
  github: [['Metric-AI', 'main · 12 pull requests', Github], ['termux-agent', 'develop · connected', GitBranch], ['mobile-tunnel', 'main · needs attention', FolderGit2]],
  workspace: [['Production workspace', '3 projects · conservative policy', PanelTop], ['Review sandbox', 'isolated execution · healthy', Shield], ['Research space', '2 connected folders · private', FolderGit2]],
  models: [['Cidby Core', 'Balanced reasoning for daily work', BrainCircuit], ['Cidby Deep', 'Long-horizon architecture and migrations', BrainCircuit], ['Cidby Swarm', 'Parallel workers for broad changes', Workflow]],
  api: [['REST API', '12 endpoints · healthy', Cable], ['Webhooks', '4 event destinations', Network], ['CLI access', 'Last used 2 hours ago', TerminalSquare]],
  logs: [['Session stream', 'Live tool and command events', ScrollText], ['Deployment events', '7 events this week', Cloud], ['Security audit', 'No critical events', Shield]],
  analytics: [['Throughput', '42 sessions completed this month', BarChart3], ['Quality', '86% first-pass success', Activity], ['Spend', '72% of credits remaining', BarChart3]],
  terminal: [['Termux / Ubuntu', 'Connected · 14 processes', TerminalSquare], ['Review sandbox', 'Idle · ready to run', Server], ['Cloudflare tunnel', 'HTTPS · 28ms latency', Network]],
  tasks: [['Active mission', '4 milestones · 2 workers', Workflow], ['Queued reviews', '3 pull requests waiting', Code2], ['Scheduled', '8 recurring tasks', Bell]],
  memory: [['Project decisions', '24 durable notes', BrainCircuit], ['Team preferences', '8 shared conventions', Users], ['Session context', '12 recent handoffs', History]],
  documents: [['AGENTS.md', 'Indexed · updated today', FileText], ['Architecture map', 'Generated from 3 repositories', Network], ['Test evidence', '11 recordings and reports', FileText]],
  deployments: [['Production', 'Ready · deployed 12 minutes ago', Cloud], ['Preview / feature-42', 'Building · 68%', Activity], ['Rollback points', '6 available versions', History]],
  monitoring: [['Agent health', '5 online · 0 degraded', Activity], ['Tunnel latency', '28ms median', Network], ['Provider status', 'All systems operational', Server]],
  notifications: [['Review requested', 'Metric-AI · 2 minutes ago', Bell], ['Approval needed', 'New GitHub connection', Github], ['Mission completed', 'Dependency upgrade · today', Workflow]],
  profile: [['Personal identity', 'ian@example.com', Users], ['Sessions', '2 active browsers', History], ['Preferences', 'Theme, voice and keyboard', Settings2]],
  organization: [['Cidby workspace', 'Pro · 12 members', Users], ['Teams', '4 groups and service users', Users], ['Policy', 'Conservative agent defaults', Shield]],
  permissions: [['Global policy', 'Review before destructive actions', LockKeyhole], ['Project policy', 'Metric-AI · inherited', Shield], ['Service users', '3 scoped identities', KeyRound]],
  storage: [['Artifacts', '2.4 GB · 18 deliverables', Boxes], ['Workspace cache', '640 MB · healthy', Boxes], ['Retention', '90 days configured', History]],
  variables: [['Production', '12 variables · encrypted', Settings2], ['Preview', '8 variables · inherited', Settings2], ['Termux', '6 variables · local only', TerminalSquare]],
  plugins: [['GitHub tools', 'Installed · 9 capabilities', Github], ['Browser tools', 'Installed · 6 capabilities', PanelTop], ['Supabase adapter', 'Available · not configured', Plug]],
  marketplace: [['Code review pack', 'Popular · 4.8 rating', Shield], ['Linear connector', 'Team workflow integration', Cable], ['Release playbook', '12k installs', Workflow]],
  templates: [['Ship a feature', 'Plan → implement → test → PR', Workflow], ['Triage a bug', 'Reproduce → isolate → fix → verify', Shield], ['Migration', 'Map → transform → validate', Code2]],
  history: [['Metric sidebar', 'Completed · 18 minutes ago', CheckCircleIcon], ['Production deploy', 'Completed · today', Cloud], ['Tunnel setup', 'Paused · waiting for URL', Network]],
  reports: [['Weekly engineering', '12 sessions · 7 PRs · 3 deploys', BarChart3], ['Security posture', '92 score · 1 pending finding', Shield], ['Agent economics', 'Credits and time saved', Activity]],
  connections: [['GitHub', 'Connected · healthy', Github], ['Vercel', 'Connected · production', Cloud], ['Termux API', 'Connected · 28ms', Server]],
  commandCenter: [['Agent Fleet', '5 agents · 2 working now', Bot], ['Mission Control', '4 milestones · 1 validator', Workflow], ['Approvals', '2 decisions need you', Bell]],
}

function CheckCircleIcon(props: { className?: string }) {
  return <span className={props.className}>●</span>
}

export function CidbySurfacePage({ surface }: { surface: CidbySurface }) {
  const [eyebrow, title, description, Icon] = surfaceMeta[surface]
  const items = surfaceItems[surface]

  return (
    <div className="cidby-workbench h-full overflow-y-auto">
      <div className="mx-auto flex min-h-full w-full max-w-[1360px] flex-col gap-6 p-5 pb-12 sm:p-8 lg:p-10">
        <header className="flex flex-col gap-5 border-b border-border/70 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-primary"><Icon className="size-4" />{eyebrow}</p>
            <h1 className="font-studio text-4xl tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl">Export</Button>
            <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">Create new</Button>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <main className="space-y-6">
            <Card className="border-border/70 bg-card/75">
              <CardHeader className="flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><CardTitle className="text-lg">Live surface</CardTitle><CardDescription>Keep the next decision close to the work.</CardDescription></div><Input className="w-full sm:max-w-56" placeholder={`Search ${title.toLowerCase()}`} /></CardHeader>
              <CardContent className="grid gap-2">
                {items.map(([itemTitle, itemDescription, ItemIcon]) => (
                  <div key={itemTitle} className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-background/30 p-4 transition hover:border-primary/40 hover:bg-accent/50">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><ItemIcon className="size-4" /></div>
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{itemTitle}</p><p className="mt-1 truncate text-xs text-muted-foreground">{itemDescription}</p></div>
                    <span className="hidden text-xs text-emerald-400 sm:block">Ready</span>
                    <span className="text-muted-foreground transition group-hover:translate-x-0.5">↗</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/[0.04]"><CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"><div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Icon className="size-4" /></div><div className="flex-1"><p className="text-sm font-medium">Ask Cidby about {title.toLowerCase()}</p><p className="mt-1 text-xs text-muted-foreground">Use the agent workspace with this surface attached as context.</p></div><Link to={route.home}><Button variant="outline" className="rounded-xl">Start session</Button></Link></CardContent></Card>
          </main>
          <aside className="space-y-4">
            <Card className="border-border/70 bg-card/60"><CardHeader><CardTitle className="text-sm">System pulse</CardTitle><CardDescription>Updated just now</CardDescription></CardHeader><CardContent className="space-y-3">{[['Agent fleet','5 online',Bot],['Execution','2 running',Activity],['Connections','6 healthy',Network]].map(([label,value,StatusIcon]) => { const Status = StatusIcon as LucideIcon; return <div key={label as string} className="flex items-center gap-3"><Status className="size-4 text-primary" /><span className="flex-1 text-sm">{label as string}</span><span className="text-xs text-muted-foreground">{value as string}</span></div> })}</CardContent></Card>
            <Card className="border-border/70 bg-card/60"><CardHeader><CardTitle className="text-sm">Quick links</CardTitle></CardHeader><CardContent className="grid gap-1">{[['New session', route.home, TerminalSquare],['Command Center', route.commandCenter, Server],['Settings', route.settingsMetric, Settings2]].map(([label,to,LinkIcon]) => { const QuickIcon = LinkIcon as LucideIcon; return <Link key={label as string} to={to as string} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"><QuickIcon className="size-4" />{label as string}</Link> })}</CardContent></Card>
          </aside>
        </div>
      </div>
    </div>
  )
}

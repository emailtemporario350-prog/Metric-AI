import {
  Activity,
  ArrowUpRight,
  Bot,
  CalendarClock,
  CheckCircle2,
  CircleDashed,
  Cloud,
  Code2,
  CreditCard,
  FileKey2,
  GitPullRequest,
  Globe2,
  KeyRound,
  LifeBuoy,
  ListChecks,
  Network,
  Plus,
  ScrollText,
  ServerCog,
  Settings2,
  ShieldCheck,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { route } from '@/constants/routes'

type ProductPage =
  | 'automations' | 'review' | 'wiki' | 'integrations' | 'activity' | 'sessions'
  | 'environments' | 'agents' | 'playbooks' | 'teams' | 'billing' | 'usage'
  | 'members' | 'apiKeys' | 'secrets' | 'audit' | 'support'

type PageDefinition = {
  eyebrow: string
  title: string
  description: string
  icon: LucideIcon
  action: string
  stats: [string, string][]
  items: [string, string, LucideIcon][]
}

const pages: Record<ProductPage, PageDefinition> = {
  automations: {
    eyebrow: 'Operations',
    title: 'Automations',
    description: 'Turn repository events into repeatable engineering sessions.',
    icon: Workflow,
    action: 'Create automation',
    stats: [['Active workflows', '8'], ['Runs this week', '42'], ['Time saved', '18h']],
    items: [['Bug triage', 'Run a Metric session when a Bug label is added.', Workflow], ['Dependency watch', 'Open a review when a package update lands.', CalendarClock], ['Release notes', 'Summarize merged pull requests every Friday.', ListChecks]],
  },
  review: {
    eyebrow: 'Delivery quality',
    title: 'Review',
    description: 'Code-aware review queues with evidence, risk and suggested fixes.',
    icon: GitPullRequest,
    action: 'Configure review',
    stats: [['Open reviews', '4'], ['Issues found', '17'], ['Fix rate', '86%']],
    items: [['Metric web branding', '3 findings · ready for approval', GitPullRequest], ['Termux API', 'Security review in progress', ShieldCheck], ['Mobile tunnel', 'No review policy configured', Settings2]],
  },
  wiki: {
    eyebrow: 'Team context',
    title: 'Wiki',
    description: 'A living map of architecture, decisions and operating knowledge.',
    icon: Globe2,
    action: 'Create page',
    stats: [['Pages', '38'], ['Repositories', '3'], ['Last indexed', '12m']],
    items: [['Architecture map', 'How sessions, tunnels and inference connect.', Network], ['Runbooks', 'Incident, release and migration procedures.', ListChecks], ['Decisions', 'Why the Metric stack is distributed.', Code2]],
  },
  integrations: {
    eyebrow: 'Connected systems',
    title: 'Integrations',
    description: 'Connect the tools where your team plans, builds and ships.',
    icon: Network,
    action: 'Add integration',
    stats: [['Connected', '6'], ['Available', '14'], ['Healthy', '100%']],
    items: [['GitHub', 'Repositories and pull requests', Code2], ['Vercel', 'Preview and production deployments', Cloud], ['Termux API', 'Local execution through Cloudflare', ServerCog]],
  },
  activity: {
    eyebrow: 'Workspace',
    title: 'Activity',
    description: 'A timeline of sessions, reviews, deployments and decisions.',
    icon: Activity,
    action: 'Filter activity',
    stats: [['Events today', '128'], ['Sessions', '20'], ['Deployments', '7']],
    items: [['Production deployment', 'Metric web · 12 minutes ago', Cloud], ['Review completed', 'Metric-AI · 1 hour ago', CheckCircle2], ['Knowledge indexed', 'termux-agent · 3 hours ago', Globe2]],
  },
  sessions: {
    eyebrow: 'Workspace',
    title: 'Sessions',
    description: 'Search every delegated task and resume work with full context.',
    icon: ListChecks,
    action: 'New session',
    stats: [['All sessions', '128'], ['Active', '3'], ['Completed', '104']],
    items: [['Metric sidebar and palette', 'Working on web-app · active', Activity], ['Deploy Metric frontend', 'Production · completed', CheckCircle2], ['Connect Ollama tunnel', 'Needs input · paused', CircleDashed]],
  },
  environments: {
    eyebrow: 'Execution',
    title: 'Environments',
    description: 'Blueprints for the machines and services that Metric can use.',
    icon: ServerCog,
    action: 'Add environment',
    stats: [['Environments', '3'], ['Healthy', '2'], ['Needs setup', '1']],
    items: [['Termux / Ubuntu', 'Ollama and local workspace', ServerCog], ['Vercel Production', 'Web delivery environment', Cloud], ['Review sandbox', 'Isolated test runner', ShieldCheck]],
  },
  agents: {
    eyebrow: 'Execution',
    title: 'Agents',
    description: 'Model tiers, roles and reusable autonomous workers.',
    icon: Bot,
    action: 'Create agent',
    stats: [['Agents', '5'], ['Running', '2'], ['Success rate', '94%']],
    items: [['Metric Normal', 'Everyday features and fixes', Bot], ['Metric Max', 'Architecture and migration work', Code2], ['Security Swarm', 'Parallel vulnerability triage', ShieldCheck]],
  },
  playbooks: {
    eyebrow: 'Knowledge',
    title: 'Playbooks',
    description: 'Reusable recipes for the work your team does repeatedly.',
    icon: ListChecks,
    action: 'New playbook',
    stats: [['Playbooks', '12'], ['Used this month', '46'], ['Shared', '8']],
    items: [['Ship a feature', 'Plan, implement, test and open a PR.', ListChecks], ['Triage a bug', 'Reproduce, isolate, fix and verify.', ShieldCheck], ['Upgrade dependencies', 'Review, migrate and validate safely.', Workflow]],
  },
  teams: {
    eyebrow: 'Organization',
    title: 'Teams',
    description: 'Spaces, permissions and shared engineering context.',
    icon: Users,
    action: 'Create team',
    stats: [['Teams', '4'], ['Members', '12'], ['Service users', '3']],
    items: [['Platform', 'Infrastructure and environments', Users], ['Product engineering', 'Features and delivery', Code2], ['Security', 'Policies and reviews', ShieldCheck]],
  },
  billing: {
    eyebrow: 'Organization',
    title: 'Billing',
    description: 'Plans, credits and invoices for the Metric workspace.',
    icon: CreditCard,
    action: 'Manage plan',
    stats: [['Current plan', 'Pro'], ['Credits left', '72%'], ['Renewal', '18 days']],
    items: [['Pro', '$20 / month · selected', CreditCard], ['On-demand credits', 'Never expire and reload automatically', Activity], ['Invoices', '3 invoices available', ScrollText]],
  },
  usage: {
    eyebrow: 'Organization',
    title: 'Usage',
    description: 'Understand where sessions, reviews and automation credits go.',
    icon: Activity,
    action: 'Set limits',
    stats: [['This month', '42.8k'], ['Sessions', '128'], ['Peak day', 'Tuesday']],
    items: [['Sessions', '82% of workspace usage', Activity], ['Code Review', '12% of workspace usage', GitPullRequest], ['Automations', '6% of workspace usage', Workflow]],
  },
  members: {
    eyebrow: 'Organization',
    title: 'Members',
    description: 'Invite people and service users with clear access boundaries.',
    icon: Users,
    action: 'Invite member',
    stats: [['Members', '12'], ['Pending invites', '2'], ['Admins', '3']],
    items: [['Ian Playstation', 'Owner · full access', Users], ['Metric bot', 'Service user · automation', Bot], ['Review team', 'Group · code review', GitPullRequest]],
  },
  apiKeys: {
    eyebrow: 'Access',
    title: 'API Keys',
    description: 'Manage tokens for CLI, CI/CD and trusted integrations.',
    icon: KeyRound,
    action: 'Create key',
    stats: [['Active keys', '4'], ['Used this month', '18k'], ['Expiring soon', '1']],
    items: [['CLI key', 'Last used 2 hours ago', KeyRound], ['CI deploy key', 'GitHub Actions · healthy', ServerCog], ['Review service', 'Read-only access', ShieldCheck]],
  },
  secrets: {
    eyebrow: 'Access',
    title: 'Secrets',
    description: 'Keep private service credentials out of the frontend and repositories.',
    icon: FileKey2,
    action: 'Add secret',
    stats: [['Stored secrets', '8'], ['Expiring soon', '0'], ['Last rotated', '4 days']],
    items: [['Supabase service key', 'Stored in the Termux API secret store', FileKey2], ['GitHub token', 'Used by review automation', KeyRound], ['Cloudflare tunnel', 'Protected runtime secret', ShieldCheck]],
  },
  audit: {
    eyebrow: 'Trust center',
    title: 'Audit logs',
    description: 'A searchable record of access, changes and automated actions.',
    icon: ScrollText,
    action: 'Export log',
    stats: [['Events', '2,481'], ['Actors', '18'], ['Retention', '90 days']],
    items: [['API key created', 'By Ian · 12 minutes ago', KeyRound], ['Policy updated', 'By Metric bot · 1 hour ago', Settings2], ['Review approved', 'By Ian · 2 hours ago', CheckCircle2]],
  },
  support: {
    eyebrow: 'Workspace',
    title: 'Support',
    description: 'Guides, diagnostics and a direct path to the Metric team.',
    icon: LifeBuoy,
    action: 'Open support',
    stats: [['Open requests', '0'], ['Response time', '< 1h'], ['Status', 'Healthy']],
    items: [['Getting started', 'Connect Termux, Ollama and your tunnel.', LifeBuoy], ['Diagnostics', 'Check all workspace connections.', ServerCog], ['Community', 'Share feedback and playbooks.', Users]],
  },
}

export function MetricProductPage({ page }: { page: ProductPage }) {
  const definition = pages[page]
  const Icon = definition.icon

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col gap-6 p-5 pb-12 sm:p-6 lg:p-10">
        <div className="flex flex-col gap-4 border-b border-border/70 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <Icon className="size-4 text-primary" />
              {definition.eyebrow}
            </div>
            <h1 className="font-studio text-3xl font-semibold tracking-tight sm:text-4xl">{definition.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{definition.description}</p>
          </div>
          <Button className="w-full gap-2 rounded-full sm:w-auto"><Plus className="size-4" />{definition.action}</Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {definition.stats.map(([label, value]) => (
            <Card key={label}><CardContent className="p-4"><p className="text-2xl font-semibold">{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></CardContent></Card>
          ))}
        </div>

        <Card>
          <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><CardTitle className="text-lg">Workspace overview</CardTitle><CardDescription>Designed to keep the next action close.</CardDescription></div>
            <Input className="w-full sm:max-w-56" placeholder={`Search ${definition.title.toLowerCase()}`} />
          </CardHeader>
          <CardContent className="grid gap-2">
            {definition.items.map(([title, description, ItemIcon]) => (
              <div key={title} className="flex items-center gap-3 rounded-xl border border-border/70 p-3 transition-colors hover:bg-secondary/60 sm:gap-4 sm:p-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><ItemIcon className="size-4" /></div>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{title}</p><p className="truncate text-xs text-muted-foreground">{description}</p></div>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-emerald-400" /> Metric workspace operational
          <Link to={route.home} className="ml-auto text-primary hover:underline">Start a session <ArrowUpRight className="inline size-3" /></Link>
        </div>
      </div>
    </div>
  )
}

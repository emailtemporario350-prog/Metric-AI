import {
  Activity,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  FileCode2,
  FolderGit2,
  GitPullRequest,
  ListChecks,
  LockKeyhole,
  Plus,
  ShieldCheck,
  TerminalSquare,
  type LucideIcon,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { metricEnvStatus } from '@/config/metric'
import { route } from '@/constants/routes'

type MetricWorkspacePageProps = {
  section: 'projects' | 'artifacts' | 'security' | 'knowledge'
}

const sectionCopy = {
  projects: {
    eyebrow: 'Workspace',
    title: 'Projects',
    description: 'Repositories, sessions and delivery context in one place.',
  },
  artifacts: {
    eyebrow: 'Delivery history',
    title: 'Artifacts',
    description: 'Pull requests, diffs, screenshots and test evidence delivered by Metric.',
  },
  security: {
    eyebrow: 'Trust center',
    title: 'Security',
    description: 'Guardrails, secrets, audit events and Security Swarm findings.',
  },
  knowledge: {
    eyebrow: 'Team context',
    title: 'Knowledge',
    description: 'Organizational knowledge, playbooks and repository instructions.',
  },
} as const

const projects = [
  { name: 'Metric-AI', branch: 'devin/metric-ui-branding', status: 'Active', sessions: 12 },
  { name: 'termux-agent', branch: 'main', status: 'Connected', sessions: 8 },
  { name: 'mobile-tunnel', branch: 'main', status: 'Needs setup', sessions: 0 },
]

const artifacts = [
  { title: 'Metric web branding', type: 'Pull request', meta: 'PR #1 · 2 hours ago', icon: GitPullRequest },
  { title: 'Composer model selector', type: 'Diff', meta: 'Metric-AI · 2 hours ago', icon: FileCode2 },
  { title: 'Termux smoke test', type: 'Test evidence', meta: '3 screenshots · Yesterday', icon: CheckCircle2 },
]

const findings = [
  { title: 'Supabase service key is not configured', severity: 'Pending', tone: 'text-amber-400', icon: CircleDashed },
  { title: 'Cloudflare tunnel uses HTTPS', severity: 'Passed', tone: 'text-emerald-400', icon: CheckCircle2 },
  { title: 'AI guardrails are enabled', severity: 'Passed', tone: 'text-emerald-400', icon: ShieldCheck },
]

const knowledgeItems = [
  { title: 'AGENTS.md instructions', description: 'Always-on repository guidance', icon: FileCode2 },
  { title: 'Frontend conventions', description: 'Metric UI patterns and review rules', icon: BookOpen },
  { title: 'Termux deployment playbook', description: 'Expose Ollama and the local VM safely', icon: ListChecks },
]

function SectionHeader({ section }: { section: MetricWorkspacePageProps['section'] }) {
  const copy = sectionCopy[section]
  return (
    <div className="flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">{copy.eyebrow}</p>
        <h1 className="font-studio text-3xl font-semibold tracking-tight">{copy.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{copy.description}</p>
      </div>
      <Button className="gap-2 rounded-full">
        <Plus className="size-4" />
        {section === 'projects' ? 'Connect project' : section === 'knowledge' ? 'Add knowledge' : 'Create view'}
      </Button>
    </div>
  )
}

function ProjectsContent() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <MetricStat label="Connected projects" value="3" icon={FolderGit2} />
        <MetricStat label="Active sessions" value="20" icon={Activity} />
        <MetricStat label="Open pull requests" value="4" icon={GitPullRequest} />
      </div>
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Your projects</CardTitle>
            <CardDescription>Each project keeps its sessions and delivery context together.</CardDescription>
          </div>
          <Input className="max-w-52" placeholder="Search projects" />
        </CardHeader>
        <CardContent className="grid gap-2">
          {projects.map((project) => (
            <div key={project.name} className="flex items-center gap-4 rounded-xl border border-border/70 bg-background/40 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><FolderGit2 className="size-5" /></div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{project.name}</p>
                <p className="truncate text-xs text-muted-foreground">{project.branch} · {project.sessions} sessions</p>
              </div>
              <span className="hidden text-xs text-muted-foreground sm:block">{project.status}</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}

function ArtifactsContent() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <MetricStat label="Delivered this month" value="18" icon={CheckCircle2} />
        <MetricStat label="Pull requests" value="7" icon={GitPullRequest} />
        <MetricStat label="Test recordings" value="11" icon={Activity} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent artifacts</CardTitle>
          <CardDescription>Evidence from completed Metric sessions.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          {artifacts.map((artifact) => {
            const Icon = artifact.icon
            return (
              <div key={artifact.title} className="flex items-center gap-4 rounded-xl border border-border/70 p-4">
                <Icon className="size-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">{artifact.title}</p>
                  <p className="text-xs text-muted-foreground">{artifact.type} · {artifact.meta}</p>
                </div>
                <Button variant="ghost" size="icon-sm"><ArrowUpRight className="size-4" /></Button>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </>
  )
}

function SecurityContent() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <MetricStat label="Security score" value="92%" icon={ShieldCheck} />
        <MetricStat label="Secrets protected" value="8" icon={LockKeyhole} />
        <MetricStat label="Open findings" value="1" icon={CircleDashed} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Security posture</CardTitle>
          <CardDescription>Frontend states are ready for your Termux and tunnel endpoints.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          {findings.map((finding) => {
            const Icon = finding.icon
            return (
              <div key={finding.title} className="flex items-center gap-4 rounded-xl border border-border/70 p-4">
                <Icon className={`size-5 ${finding.tone}`} />
                <span className="flex-1 text-sm">{finding.title}</span>
                <span className={`text-xs font-medium ${finding.tone}`}>{finding.severity}</span>
              </div>
            )
          })}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Environment connections</CardTitle>
          <CardDescription>Set these values in <code className="text-primary">web-app/.env.local</code>.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2">
          {metricEnvStatus.map(([name, value]) => (
            <div key={name} className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2 text-sm">
              <span className={`size-2 rounded-full ${value ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className="flex-1">{name}</span>
              <span className="text-xs text-muted-foreground">{value ? 'Connected' : 'Missing'}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}

function KnowledgeContent() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <MetricStat label="Knowledge items" value="24" icon={BookOpen} />
        <MetricStat label="Playbooks" value="6" icon={ListChecks} />
        <MetricStat label="Repositories indexed" value="3" icon={FolderGit2} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Team knowledge</CardTitle>
          <CardDescription>Context automatically available to every new session.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          {knowledgeItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex items-center gap-4 rounded-xl border border-border/70 p-4">
                <Icon className="size-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            )
          })}
        </CardContent>
      </Card>
    </>
  )
}

function MetricStat({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: LucideIcon
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="size-5" /></div>
        <div>
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function MetricWorkspacePage({ section }: MetricWorkspacePageProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col gap-6 p-6 pb-12 lg:p-10">
        <SectionHeader section={section} />
        {section === 'projects' && <ProjectsContent />}
        {section === 'artifacts' && <ArtifactsContent />}
        {section === 'security' && <SecurityContent />}
        {section === 'knowledge' && <KnowledgeContent />}
        <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-muted-foreground">
          <TerminalSquare className="size-3.5 text-primary" />
          Metric is ready to execute in your connected workspace.
          <Link to={route.home} className="ml-auto text-primary hover:underline">New session <ArrowUpRight className="inline size-3" /></Link>
        </div>
      </div>
    </div>
  )
}

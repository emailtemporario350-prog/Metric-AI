import {
  BadgeDollarSign,
  BookOpen,
  CreditCard,
  KeyRound,
  LifeBuoy,
  PlugZap,
  ScanLine,
  ScrollText,
  Settings2,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { metricConfig } from '@/config/metric'

const sections = [
  { id: 'billing', label: 'Billing', icon: CreditCard, description: 'Plan, credits and invoices' },
  { id: 'usage', label: 'Usage', icon: BadgeDollarSign, description: 'Spend limits and auto-reload' },
  { id: 'members', label: 'Members', icon: Users, description: 'People and service users' },
  { id: 'api', label: 'API Keys', icon: KeyRound, description: 'Programmatic access' },
  { id: 'review', label: 'Review', icon: ScanLine, description: 'Automatic code review' },
  { id: 'knowledge', label: 'Knowledge', icon: BookOpen, description: 'Organization context' },
  { id: 'secrets', label: 'Secrets', icon: ShieldCheck, description: 'Protected credentials' },
  { id: 'integrations', label: 'Integrations', icon: PlugZap, description: 'External services' },
  { id: 'audit', label: 'Audit Logs', icon: ScrollText, description: 'Organization activity' },
  { id: 'support', label: 'Support', icon: LifeBuoy, description: 'Help and Slack Connect' },
] as const

function SettingsDetail({ section }: { section: (typeof sections)[number]['id'] }) {
  const selected = sections.find((item) => item.id === section)!

  if (section === 'billing') {
    return (
      <Card>
        <CardHeader><CardTitle>{selected.label}</CardTitle><CardDescription>Choose a plan and track your Metric credits.</CardDescription></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {['Free', 'Pro', 'Max'].map((plan, index) => (
            <div key={plan} className={`rounded-xl border p-4 ${index === 1 ? 'border-primary bg-primary/5' : 'border-border/70'}`}>
              <p className="font-medium">{plan}</p>
              <p className="mt-1 text-2xl font-semibold">{index === 0 ? '$0' : index === 1 ? '$20' : '$200'}<span className="text-xs text-muted-foreground">/month</span></p>
              <p className="mt-2 text-xs text-muted-foreground">{index === 0 ? 'For trying Metric' : index === 1 ? 'For individual developers' : 'For power users'}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (section === 'integrations') {
    const integrations = [
      ['Vercel', metricConfig.vercelUrl],
      ['Supabase', metricConfig.supabaseUrl],
      ['GitHub', metricConfig.githubUrl],
      ['Linear', metricConfig.linearUrl],
      ['Jira', metricConfig.jiraUrl],
      ['Slack', metricConfig.slackUrl],
      ['Microsoft Teams', metricConfig.teamsUrl],
    ]
    return (
      <Card>
        <CardHeader><CardTitle>{selected.label}</CardTitle><CardDescription>Connect providers by setting the corresponding VITE_* URL in your web environment.</CardDescription></CardHeader>
        <CardContent className="grid gap-2">
          {integrations.map(([name, url]) => (
            <div key={name} className="flex items-center gap-3 rounded-xl border border-border/70 p-3">
              <PlugZap className="size-4 text-primary" />
              <span className="flex-1 text-sm">{name}</span>
              <span className={`text-xs ${url ? 'text-emerald-400' : 'text-muted-foreground'}`}>{url ? 'Connected' : 'Configure URL'}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (section === 'secrets') {
    return (
      <Card>
        <CardHeader><CardTitle>{selected.label}</CardTitle><CardDescription>Only public client values belong in the frontend. Service keys stay in the Termux API secret store.</CardDescription></CardHeader>
        <CardContent className="grid gap-4">
          <label className="grid gap-2 text-sm">Supabase URL<Input value={metricConfig.supabaseUrl ?? ''} placeholder="https://your-project.supabase.co" readOnly /></label>
          <label className="grid gap-2 text-sm">Read-only key status<Input value={metricConfig.supabaseAnonKey ? 'Configured via VITE_SUPABASE_ANON_KEY' : 'Not configured'} readOnly /></label>
        </CardContent>
      </Card>
    )
  }

  if (section === 'usage' || section === 'review') {
    return (
      <Card>
        <CardHeader><CardTitle>{selected.label}</CardTitle><CardDescription>These controls are ready for the Metric API to persist.</CardDescription></CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-border/70 p-4"><Settings2 className="size-4 text-primary" /><span className="flex-1 text-sm">Enable automatic execution</span><Switch defaultChecked /></div>
          <div className="flex items-center gap-3 rounded-xl border border-border/70 p-4"><ScanLine className="size-4 text-primary" /><span className="flex-1 text-sm">Run review on every pull request</span><Switch defaultChecked={section === 'review'} /></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader><CardTitle>{selected.label}</CardTitle><CardDescription>{selected.description}. Configure this area when the Metric API endpoint is connected.</CardDescription></CardHeader>
      <CardContent className="grid gap-3">
        <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-5 text-sm text-muted-foreground">Frontend surface ready. Data will load from <code className="text-primary">{metricConfig.apiUrl ?? 'VITE_METRIC_API_URL'}</code>.</div>
        <Input placeholder={`Search ${selected.label.toLowerCase()}`} />
      </CardContent>
    </Card>
  )
}

export function MetricSettingsPage() {
  const [section, setSection] = useState<(typeof sections)[number]['id']>('billing')
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col gap-5 p-4 pb-12 sm:p-6 lg:p-10">
        <div className="flex gap-2 overflow-x-auto pb-1 md:hidden">
          {sections.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors ${
                  section === item.id
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border/70 text-muted-foreground'
                }`}
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            )
          })}
        </div>
        <div className="flex min-h-full w-full gap-6">
        <aside className="hidden w-56 shrink-0 space-y-1 md:block">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">Organization</p>
          {sections.map((item) => {
            const Icon = item.icon
            return <button key={item.id} onClick={() => setSection(item.id)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${section === item.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}><Icon className="size-4" /><span>{item.label}</span></button>
          })}
        </aside>
        <main className="min-w-0 flex-1 space-y-6">
          <div><p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">Settings</p><h1 className="font-studio text-3xl font-semibold tracking-tight">Metric organization</h1><p className="mt-2 text-sm text-muted-foreground">Billing, access, integrations and controls for your autonomous engineering workspace.</p></div>
          <SettingsDetail section={section} />
        </main>
        </div>
      </div>
    </div>
  )
}

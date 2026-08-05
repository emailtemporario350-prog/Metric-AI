/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, useSearch } from '@tanstack/react-router'
import ChatInput from '@/containers/ChatInput'
import HeaderPage from '@/containers/HeaderPage'
import { useTools } from '@/hooks/useTools'

import { route } from '@/constants/routes'
import {
  ArrowUpRight,
  Code2,
  FolderGit2,
  Github,
  GitBranch,
  Layers3,
  Mic,
  Plus,
  Sparkles,
  TerminalSquare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

type ThreadModel = {
  id: string
  provider: string
}

type SearchParams = {
  threadModel?: ThreadModel
}
import { useEffect } from 'react'
import { useThreads } from '@/hooks/useThreads'

export const Route = createFileRoute(route.home as any)({
  component: Index,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    const result: SearchParams = {
      threadModel: search.threadModel as ThreadModel | undefined,
    }

    return result
  },
})

function Index() {
  const search = useSearch({ from: route.home as any })
  const threadModel = search.threadModel
  const { setCurrentThreadId } = useThreads()
  useTools()

  useEffect(() => {
    setCurrentThreadId(undefined)
  }, [setCurrentThreadId])

  return (
    <div className="cidby-workbench relative flex h-full flex-col overflow-hidden">
      <div className="cidby-command-grid pointer-events-none absolute inset-0 opacity-60" />
      <HeaderPage>
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center gap-2 text-sm">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground">C</span>
            <span className="font-studio text-base font-medium">Cidby</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">New session</span>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" className="rounded-full"><Github className="size-4" /></Button>
            <Button variant="ghost" size="icon-sm" className="rounded-full"><Sparkles className="size-4 text-primary" /></Button>
          </div>
        </div>
      </HeaderPage>
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center overflow-y-auto px-4 pb-10 pt-4 sm:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-primary">
              <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
              Agent workspace
            </p>
            <h1 className="max-w-2xl font-studio text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
              What should Cidby <span className="text-primary">ship</span> next?
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              Delegate a real outcome. Cidby plans the work, operates your connected workspace and returns proof.
            </p>
          </div>
          <div className="hidden rounded-2xl border border-border/70 bg-card/70 p-3 text-right sm:block">
            <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-emerald-400" /> Workspace ready</div>
            <p className="mt-2 text-sm font-medium">Termux / Ubuntu</p>
          </div>
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {[
            [FolderGit2, 'Metric-AI', 'Project'],
            [GitBranch, 'devin/metric-ui-branding', 'Worktree'],
            [Code2, 'Agent mode', 'Execution'],
          ].map(([Icon, label, meta]) => (
            <button key={label as string} className="flex min-w-max items-center gap-2 rounded-xl border border-border/70 bg-card/65 px-3 py-2 text-left transition hover:border-primary/50 hover:bg-card">
              <Icon className="size-4 text-primary" />
              <span><span className="block text-xs text-muted-foreground">{meta as string}</span><span className="block text-sm">{label as string}</span></span>
            </button>
          ))}
          <Button variant="ghost" size="icon-sm" className="shrink-0 rounded-xl border border-dashed border-border/70"><Plus className="size-4" /></Button>
        </div>

        <div className="cidby-composer relative rounded-[1.65rem] border border-primary/30 bg-card/90 p-2 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 rounded-[1.65rem] bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="relative">
            <ChatInput
              className="min-h-28 px-4 pt-5 text-base"
              showSpeedToken={false}
              model={threadModel}
              initialMessage={true}
            />
            <div className="pointer-events-none absolute bottom-3 left-5 hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <TerminalSquare className="size-3.5 text-primary" />
              <span>Use /goal, /browser or /schedule</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            [Layers3, 'Plan a mission', 'Break a large outcome into coordinated workers.'],
            [Mic, 'Talk it through', 'Use voice to describe the result in your own words.'],
            [ArrowUpRight, 'Resume a session', 'Return to an active workspace with context intact.'],
          ].map(([Icon, title, description]) => (
            <button key={title as string} className="group rounded-2xl border border-border/60 bg-card/45 p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/80">
              <Icon className="mb-6 size-4 text-primary transition group-hover:translate-x-0.5" />
              <p className="text-sm font-medium">{title as string}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{description as string}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

import { Check, ChevronDown, Sparkles } from 'lucide-react'
import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const METRIC_TIERS = [
  { id: 'lite', label: 'Metric Lite', description: 'Fast, low-cost tasks' },
  { id: 'swarm', label: 'Metric Swarm', description: 'Parallel execution' },
  { id: 'normal', label: 'Metric Normal', description: 'Everyday balance' },
  { id: 'max', label: 'Metric Max', description: 'Deep architecture work' },
  { id: 'ultra', label: 'Metric Ultra', description: 'Critical end-to-end work' },
] as const

type MetricTier = (typeof METRIC_TIERS)[number]['id']

export function MetricTierSelector() {
  const [tier, setTier] = useState<MetricTier>('normal')
  const selectedTier = METRIC_TIERS.find((item) => item.id === tier)!

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="mb-1 h-7 gap-1.5 rounded-full px-2 text-xs font-medium"
          aria-label="Select Metric model"
        >
          <Sparkles className="size-3.5 text-primary" />
          <span>{selectedTier.label}</span>
          <ChevronDown className="size-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-60">
        {METRIC_TIERS.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className="gap-2 py-2"
            onSelect={() => setTier(item.id)}
          >
            <Sparkles className="size-4 text-primary" />
            <span className="flex flex-1 flex-col">
              <span className="font-medium">{item.label}</span>
              <span className="text-xs text-muted-foreground">
                {item.description}
              </span>
            </span>
            {item.id === tier && <Check className="size-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

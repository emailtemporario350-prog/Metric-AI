/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute } from '@tanstack/react-router'

import { MetricWorkspacePage } from '@/components/metric/MetricWorkspacePage'
import { route } from '@/constants/routes'

export const Route = createFileRoute(route.knowledge as any)({
  component: () => <MetricWorkspacePage section="knowledge" />,
})

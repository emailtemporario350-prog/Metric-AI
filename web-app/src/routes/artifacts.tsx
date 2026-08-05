/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute } from '@tanstack/react-router'

import { MetricWorkspacePage } from '@/components/metric/MetricWorkspacePage'
import { route } from '@/constants/routes'

export const Route = createFileRoute(route.artifacts as any)({
  component: () => <MetricWorkspacePage section="artifacts" />,
})

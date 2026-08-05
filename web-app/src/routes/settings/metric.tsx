/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute } from '@tanstack/react-router'

import { MetricSettingsPage } from '@/components/metric/MetricSettingsPage'
import { route } from '@/constants/routes'

export const Route = createFileRoute(route.settingsMetric as any)({
  component: MetricSettingsPage,
})

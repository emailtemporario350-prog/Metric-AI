/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute } from '@tanstack/react-router'
import { MetricProductPage } from '@/components/metric/MetricProductPage'
import { route } from '@/constants/routes'
export const Route = createFileRoute(route.review as any)({ component: () => <MetricProductPage page="review" /> })

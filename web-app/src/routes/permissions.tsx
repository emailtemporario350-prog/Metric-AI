import { createFileRoute } from '@tanstack/react-router'
import { CidbySurfacePage } from '@/components/cidby/CidbySurfacePage'
import { route } from '@/constants/routes'
export const Route = createFileRoute(route.permissions)({ component: () => <CidbySurfacePage surface="permissions" /> })

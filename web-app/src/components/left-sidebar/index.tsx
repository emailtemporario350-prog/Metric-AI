import { DownloadManagement } from '@/containers/DownloadManegement'
import { NavChats } from './NavChats'
import { NavMain } from './NavMain'
import { NavProjects } from './NavProjects'
import { useLeftPanel } from '@/hooks/useLeftPanel'

import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, CreditCard, Settings, UserRound } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { route } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { useTitlebarLayout } from '@/stores/titlebar-layout-store'

export function LeftSidebar() {
  const { open: isLeftPanelOpen } = useLeftPanel()
  // Right-align the header when native controls own the top-left (macOS, or a Linux
  // DE placing buttons left); "Jan" moves into the right cluster except on macOS.
  const leftButtons = useTitlebarLayout((s) => s.layout.left.length)
  const controlsOnLeft = !IS_MACOS && leftButtons > 0
  const reserveLeft = IS_MACOS || controlsOnLeft
  return (
    <div className='relative z-50'>
      <Sidebar variant="floating" collapsible="offcanvas">
        <SidebarHeader className="flex px-1">
          <div className={cn("flex items-center w-full justify-between", reserveLeft && "justify-end")}>
            {!reserveLeft && (
              <Button variant="ghost" className="ml-1 h-9 gap-2 px-2 font-studio text-base">
                <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-semibold">M</span>
                <span>Metric</span>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </Button>
            )}
            <div className="flex items-center">
              {controlsOnLeft && (
                <span className="mr-2 font-medium font-studio text-primary">Metric</span>
              )}
              {isLeftPanelOpen && <DownloadManagement />}
              <SidebarTrigger className="text-muted-foreground rounded-full hover:bg-sidebar-foreground/8! -mt-0.5 relative z-50 ml-0.5" />
            </div>
          </div>
          <NavMain />
        </SidebarHeader>
        <SidebarContent className="mask-b-from-95% mask-t-from-98%">
          <NavProjects />
          <NavChats />
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border/70 p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 justify-start gap-3 px-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary"><UserRound className="size-4" /></span>
                <span className="flex flex-col items-start text-xs">
                  <span className="font-medium">Metric workspace</span>
                  <span className="text-muted-foreground">Free plan</span>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-56">
              <DropdownMenuItem asChild><Link to={route.settings.general}><Settings /> Settings</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to={route.billing}><CreditCard /> Billing & usage</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to={route.integrations}><Settings /> Integrations</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to={route.apiKeys}><UserRound /> API Keys</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Feedback</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  )
}

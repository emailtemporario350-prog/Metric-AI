import React from 'react'
import {
  BookOpen,
  FolderKanban,
  LayoutGrid,
  Plus,
  ShieldCheck,
} from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { useAgentMode } from '@/hooks/useAgentMode'
import { TEMPORARY_CHAT_ID } from '@/constants/chat'
import { PlatformMetaKey } from '@/containers/PlatformMetaKey'
import { PlatformShortcuts, ShortcutAction } from '@/lib/shortcuts'
import { route } from '@/constants/routes'

type NavMainItem = {
  title: string
  icon: React.ComponentType<{ className?: string; size?: number }>
  url?: string
  onClick?: () => void
  shortcut?: React.ReactNode
}

export function NavMain() {
  const navigate = useNavigate()

  const items: NavMainItem[] = [
    {
      title: 'New Session',
      icon: Plus,
      onClick: () => {
        useAgentMode.getState().removeThread(TEMPORARY_CHAT_ID)
        navigate({ to: route.home })
      },
      shortcut: (
        <KbdGroup className="ml-auto scale-90 gap-0">
          <Kbd className="size-3 bg-transparent">
            <PlatformMetaKey />
          </Kbd>
          <Kbd className="size-3 bg-transparent uppercase">
            {PlatformShortcuts[ShortcutAction.NEW_CHAT].key}
          </Kbd>
        </KbdGroup>
      ),
    },
    { title: 'Projects', icon: FolderKanban, url: route.project },
    { title: 'Artifacts', icon: LayoutGrid, url: route.hub.index },
    { title: 'Security', icon: ShieldCheck, url: route.settings.privacy },
    { title: 'Knowledge', icon: BookOpen, url: route.hub.index },
  ]

  return (
    <>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon
          const content = (
            <>
              <Icon className="text-foreground/70" size={16} />
              <span>{item.title}</span>
              {item.shortcut}
            </>
          )

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild={Boolean(item.url)}
                onClick={item.onClick}
              >
                {item.url ? <Link to={item.url}>{content}</Link> : content}
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </>
  )
}

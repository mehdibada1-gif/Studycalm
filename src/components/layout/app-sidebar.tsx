'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BrainCircuit,
  ClipboardCheck,
  BookText,
  LayoutDashboard,
  Wand2,
  BookHeart,
  Database,
  BookOpen,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/study-plan', label: 'Study Plan', icon: BrainCircuit },
  { href: '/toolkit', label: 'Toolkit', icon: Wand2 },
  { href: '/journal', label: 'Journal', icon: BookText },
  { href: '/check-in', label: 'Check-in', icon: ClipboardCheck },
  { href: '/resources', label: 'Resources', icon: BookHeart },
  { href: '/knowledge-base', label: 'Knowledge Base', icon: BookOpen },
];

const devMenuItems = [
    { href: '/dev/seed', label: 'Seed Database', icon: Database },
]

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <AppLogo className="size-8 text-primary" />
          <span className="font-bold text-xl font-headline">StudyCalm</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        {process.env.NODE_ENV === 'development' && (
            <SidebarMenu className='mt-auto'>
                <Separator className="my-2" />
                 {devMenuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={item.label}
                    >
                        <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        )}
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2 hidden group-data-[state=expanded]:block">
          <div className="p-4 rounded-lg bg-primary/10 text-center">
            <h3 className="font-semibold text-primary">Need a break?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try a quick breathing exercise from the toolkit.
            </p>
            <Button size="sm" className="mt-4 w-full" asChild>
              <Link href="/toolkit">Open Toolkit</Link>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import {
  HouseSimple,
  Star,
  BookOpen,
  SquaresFour,
  FolderSimple,
  FolderSimpleUser,
  UsersThree,
  File,
  ShareNetwork,
  PencilRuler,
  DownloadSimple,
  Trash,
  MagnifyingGlass,
  CaretDown,
  CaretLeft,
  Question,
  Bell,
  Plus,
  Gear,
  CreditCard,
  Check,
  GearIcon,
  Users,
  UsersFour,
  UserCircle,
  Moon,
  SignOut,
  Translate,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ActionCardsRow } from "./action-cards"
import { RECENT_DOCS } from "./data"
import { CreditCardIcon } from "@phosphor-icons/react/dist/ssr"

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const MAIN_NAV = [
  { id: "home", label: "Home", icon: HouseSimple },
  { id: "starred", label: "Starred", icon: Star },
  { id: "brand-kit", label: "Brand kit", icon: BookOpen },
  { id: "templates", label: "Templates", icon: SquaresFour },
]

const PROJECTS_NAV = [
  { id: "default-project", label: "Default project", icon: FolderSimple },
  { id: "marketing-team", label: "Marketing team", icon: FolderSimpleUser },
  { id: "design-team", label: "Design team", icon: UsersThree },
]

const BOTTOM_NAV = [
  { id: "drafts", label: "Drafts", icon: File },
  { id: "shared-with-me", label: "Shared with me", icon: ShareNetwork },
  { id: "hire-an-expert", label: "Hire an expert", icon: PencilRuler },
  { id: "downloads", label: "Downloads", icon: DownloadSimple },
  { id: "recently-deleted", label: "Recently deleted", icon: Trash },
]

const SETTINGS_MAIN_NAV = [
  { id: "general", label: "General", icon: Gear },
  { id: "members", label: "Members", icon: Users },
  { id: "group", label: "Group", icon: UsersFour },
  { id: "billing", label: "Billing", icon: CreditCard },
]

const SETTINGS_BOTTOM_NAV = [
  { id: "profile", label: "Profile", icon: UserCircle },
]


/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function SideNavItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string; weight?: "duotone" }>
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={cn(
        "flex w-full items-center justify-center lg:justify-start gap-0 lg:gap-2 rounded-lg p-2 text-sm leading-[1.43] transition-colors",
        active
          ? "bg-bg-brand-selected font-semibold text-text-brand"
          : "font-normal text-text-secondary hover:bg-bg-elevated-hover"
      )}
    >
      <Icon weight="duotone" className={cn("size-5 shrink-0", active && "text-text-brand")} />
      <span className={cn("hidden lg:inline truncate", active && "text-text-primary")}>{label}</span>
    </button>
  )
}

function DocumentCard({
  id,
  title,
  status,
  author,
  gradient,
}: {
  id: string
  title: string
  status: string
  author: string
  gradient: string
}) {
  return (
    <Link
      href={`/dashboard/editor/${id}`}
      className="relative flex flex-col overflow-hidden rounded-[10px] bg-bg-elevated pt-0.5 px-0.5 shadow-elevation-1 transition-shadow hover:shadow-elevation-3"
    >
      {/* Inner shadow overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] shadow-[inset_0_0_0_1px_var(--shadow-inner-1)]" />
      {/* Thumbnail */}
      <div
        className={cn(
          "aspect-video w-full rounded-lg bg-gradient-to-br",
          gradient
        )}
      />
      {/* Info */}
      <div className="flex flex-col gap-1 px-3 pb-3 pt-2">
        <p className="truncate text-sm font-medium leading-[1.43] text-text-primary">
          {title}
        </p>
        <p className="text-xs leading-[1.33] text-text-secondary">
          {status} &bull; {author}
        </p>
      </div>
    </Link>
  )
}

/* -------------------------------------------------------------------------- */
/*  Home content                                                              */
/* -------------------------------------------------------------------------- */

function HomeContent() {
  return (
    <>
      {/* ── Header section ─────────────────────────────────────── */}
      <section className="flex flex-col gap-4 lg:gap-6 border-b border-border-secondary px-4 lg:px-6 pb-4 lg:pb-6 pt-4">
        <div className="text-xl lg:text-2xl leading-[1.3] tracking-[-0.24px]">
          <p className="text-text-primary">
            Starting something new, John?
          </p>
        </div>
        <ActionCardsRow />
      </section>

      {/* ── Recent section ──────────────────────────────────────── */}
      <section className="p-4 lg:p-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl lg:text-2xl leading-[1.3] tracking-[-0.24px] text-text-primary">
            Recent
          </h2>
          <div className="grid grid-cols-1 gap-3 lg:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {RECENT_DOCS.map((doc) => (
              <DocumentCard key={doc.id} {...doc} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Blank page placeholder                                                    */
/* -------------------------------------------------------------------------- */

function BlankPage({ title }: { title: string }) {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <h1 className="text-2xl font-medium text-text-tertiary">{title}</h1>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Settings: General content                                                 */
/* -------------------------------------------------------------------------- */

function GeneralSettingsContent() {
  return (
    <>
      <div className="flex h-16 items-center border-b border-border-secondary px-6">
        <h1 className="text-2xl leading-[1.3] tracking-[-0.24px] text-text-primary">
          General
        </h1>
      </div>
      <div className="flex flex-col items-center gap-8 p-6">
        <div className="flex w-full max-w-[600px] flex-col gap-8">
          {/* Workspace avatar section */}
          <div className="flex h-[200px] w-full flex-col items-center justify-center gap-4 rounded-lg bg-gradient-to-t from-pink-400/30 to-pink-50/30 px-6 py-6">
            <div className="flex size-[100px] items-center justify-center overflow-hidden rounded-full bg-[#f94777]">
              <span className="text-3xl font-bold text-white">F</span>
            </div>
            <Button variant="tertiary" size="sm" className="h-7">
              Change
            </Button>
          </div>

          {/* Workspace name field */}
          <div className="flex w-full flex-col gap-1.5">
            <Label htmlFor="workspace-name" className="text-sm text-text-secondary">
              Workspace name
            </Label>
            <Input
              id="workspace-name"
              defaultValue="Foursquare"
              className="h-11 px-3 text-sm"
            />
          </div>
        </div>
      </div>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Settings: Sidebar                                                         */
/* -------------------------------------------------------------------------- */

function SettingsSidebar({
  activeSettingsPage,
  onNavigate,
  onBack,
}: {
  activeSettingsPage: string
  onNavigate: (id: string) => void
  onBack: () => void
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Back to home header */}
      <div className="flex h-16 items-center border-b border-border-secondary px-2 lg:px-4">
        <button
          onClick={onBack}
          className="flex w-full items-center justify-center lg:justify-start gap-0 lg:gap-2 rounded-md text-sm text-text-secondary transition-colors hover:text-text-primary"
          title="Back to home"
        >
          <CaretLeft weight="bold" className="size-5 shrink-0" />
          <span className="hidden lg:inline truncate leading-[1.43]">Back to home</span>
        </button>
      </div>

      {/* Settings main nav */}
      <nav className="flex flex-col gap-0.5 px-2">
        {SETTINGS_MAIN_NAV.map((item) => (
          <SideNavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeSettingsPage === item.id}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </nav>

      <Separator />

      {/* Settings bottom nav */}
      <nav className="flex flex-col gap-0.5 px-2">
        {SETTINGS_BOTTOM_NAV.map((item) => (
          <SideNavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeSettingsPage === item.id}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </nav>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Settings: Content router                                                  */
/* -------------------------------------------------------------------------- */

function SettingsContent({ activeSettingsPage }: { activeSettingsPage: string }) {
  const allSettingsItems = [...SETTINGS_MAIN_NAV, ...SETTINGS_BOTTOM_NAV]
  const activeItem = allSettingsItems.find((item) => item.id === activeSettingsPage)
  const activeLabel = activeItem?.label ?? "General"

  if (activeSettingsPage === "general") {
    return <GeneralSettingsContent />
  }

  return <BlankPage title={activeLabel} />
}

/* -------------------------------------------------------------------------- */
/*  Shell                                                                     */
/* -------------------------------------------------------------------------- */

export function DashboardShell() {
  const [activePage, setActivePage] = useState("home")
  const [wsMenuOpen, setWsMenuOpen] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const [isSettingsMode, setIsSettingsMode] = useState(false)
  const [activeSettingsPage, setActiveSettingsPage] = useState("general")
  const { theme, setTheme } = useTheme()

  const contentKey = isSettingsMode ? `settings-${activeSettingsPage}` : activePage
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    el.style.opacity = "0"
    el.style.transform = "translateY(6px)"
    const frame = requestAnimationFrame(() => {
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    })
    return () => cancelAnimationFrame(frame)
  }, [contentKey])

  const allNavItems = [...MAIN_NAV, ...PROJECTS_NAV, ...BOTTOM_NAV]
  const activeItem = allNavItems.find((item) => item.id === activePage)
  const activeLabel = activeItem?.label ?? "Home"

  return (
    <div className="flex h-screen flex-col bg-bg-secondary">
      {/* ── Top Nav (h-14 / 56px) ──────────────────────────────────────── */}
      <header className="flex h-14 shrink-0 items-center justify-between overflow-hidden">
        {/* Left: Workspace (w-260) */}
        <div className="flex w-[52px] lg:w-[260px] flex-col items-center lg:items-start justify-center px-2 lg:px-3 py-2">
          <Popover open={wsMenuOpen} onOpenChange={setWsMenuOpen}>
            <PopoverTrigger asChild>
              <button className="flex w-full cursor-pointer items-center justify-center lg:justify-start gap-2 rounded-xl py-[3px] pl-1 pr-1.5 transition-colors hover:bg-bg-elevated-hover">
                {/* Avatar */}
                <div className="relative size-[34px] shrink-0">
                  <div className="absolute left-[3px] top-[3px] size-7 overflow-hidden rounded-[5px] border-[1.5px] border-white bg-paids-brand-500">
                    <span className="flex size-full items-center justify-center text-[10px] font-bold text-white">
                      F
                    </span>
                  </div>
                  <div className="absolute bottom-px left-1/2 flex h-3 w-[30px] -translate-x-1/2 items-center justify-center rounded-[5px] border-[1.5px] border-white/80 bg-bg-brand px-1 backdrop-blur-sm">
                    <span className="text-[8px] font-bold leading-none text-white">
                      DEV
                    </span>
                  </div>
                </div>
                {/* Text */}
                <div className="hidden lg:flex flex-1 flex-col gap-0.5 text-xs font-medium leading-[1.33] w-full">
                  <span className="text-text-primary text-left">Foursquare</span>
                  <span className="text-text-brand text-left">Enterprise plan</span>
                </div>
                {/* Dropdown caret */}
                <div className="hidden lg:flex items-center rounded-md bg-[rgba(26,26,26,0.06)] p-1">
                  <CaretDown
                    weight="bold"
                    className={cn(
                      "size-4 text-text-secondary transition-transform duration-200",
                      wsMenuOpen && "rotate-180"
                    )}
                  />
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={4}
              className="flex w-59 overflow-hidden px-0 py-2 flex-col gap-2 rounded-xl border-none bg-bg-elevated shadow-elevation-3"
            >
              {/* Inner shadow overlay */}
              <div className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]" />

              {/* Invite button */}
              <div className="px-2 w-full">
                <Button
                variant={"secondary"}
                 className="w-full">Invite new member</Button>
              </div>

              {/* Settings items */}
              <div className="flex px-2 gap-1 flex-col">
                <button
                  onClick={() => {
                    setIsSettingsMode(true)
                    setActiveSettingsPage("general")
                    setWsMenuOpen(false)
                  }}
                  className="flex items-center gap-2 rounded-md p-2 text-sm text-text-primary transition-colors hover:bg-bg-elevated-hover"
                >
                  <GearIcon weight="duotone" className="size-5 shrink-0 text-text-secondary" />
                  <span>Workspace settings</span>
                </button>
                <button className="flex items-center gap-2 rounded-md p-2 text-sm text-text-primary transition-colors hover:bg-bg-elevated-hover">
                  <CreditCardIcon weight="duotone" className="size-5 shrink-0 text-text-secondary" />
                  <span>Billing and subscriptions</span>
                </button>
              </div>

              <Separator />

              {/* Workspace section */}
              <div className="px-4 pt-1">
                <p className="text-sm text-text-tertiary">Workspace</p>
              </div>
              <div className="flex px-2 gap-1 flex-col">
                <button className="flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-bg-elevated-hover">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded bg-orange-500 text-[10px] font-medium text-white">
                    J
                  </div>
                  <span className="flex-1 text-left text-sm text-text-primary">
                    John&apos;s workspace
                  </span>
                </button>
                <button className="flex items-center gap-2 rounded-md bg-bg-brand-selected p-2">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded bg-[#f94777] text-[10px] font-medium text-white">
                    F
                  </div>
                  <span className="flex-1 text-left text-sm text-text-primary">
                    Foursquare
                  </span>
                  <Check weight="bold" className="size-5 text-text-brand" />
                </button>
                <button className="flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-bg-elevated-hover">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded bg-bg-tertiary">
                    <Plus weight="bold" className="size-3.5 text-text-secondary" />
                  </div>
                  <span className="text-sm text-text-primary">
                    Create or Join workspace
                  </span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 lg:gap-5 px-4 lg:px-6 py-3">
          <button className="rounded-lg p-1 text-text-primary transition-colors hover:text-text-brand">
            <Question weight="duotone" className="size-5" />
          </button>
          <button className="rounded-lg p-1 text-text-primary transition-colors hover:text-text-brand">
            <Bell weight="duotone" className="size-5" />
          </button>
          <Popover open={accountMenuOpen} onOpenChange={setAccountMenuOpen}>
            <PopoverTrigger asChild>
              <button className="size-7 overflow-hidden rounded-full border-[1.5px] border-white bg-paids-neutral-300 transition-opacity hover:opacity-80">
                <span className="flex size-full items-center justify-center text-[10px] font-medium text-text-secondary">
                  JD
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={4}
              className="flex w-[240px] flex-col gap-2 overflow-hidden rounded-xl border-none bg-bg-elevated px-0 py-2 shadow-elevation-3"
            >
              <div className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] shadow-[inset_0_0_0_1px_var(--shadow-inner-1)]" />

              {/* User info */}
              <div className="px-2">
                <div className="flex items-start gap-2 rounded-md p-2">
                  <Gear weight="duotone" className="mt-0.5 size-5 shrink-0 text-text-secondary" />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.43] text-text-primary">John doe</span>
                    <span className="text-xs leading-[1.33] text-text-secondary">jd@gmail.com</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Menu items */}
              <div className="flex flex-col gap-2 px-2">
                <button className="flex items-center gap-2 rounded-md p-2 text-sm text-text-primary transition-colors hover:bg-bg-elevated-hover">
                  <Translate weight="duotone" className="size-5 shrink-0 text-text-secondary" />
                  <span>Language</span>
                </button>
                <div className="flex items-center pr-2">
                  <div className="flex flex-1 items-center gap-2 rounded-md p-2">
                    <Moon weight="duotone" className="size-5 shrink-0 text-text-secondary" />
                    <span className="text-sm text-text-primary">Dark mode</span>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>
                <button className="flex items-center gap-2 rounded-md p-2 text-sm text-text-primary transition-colors hover:bg-bg-elevated-hover">
                  <SignOut weight="duotone" className="size-5 shrink-0 text-text-secondary" />
                  <span>Sign out</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {/* ── Main Content Shell (elevation-2 outer container) ───────────── */}
      <div className="relative mx-0 flex min-h-0 flex-1 overflow-hidden rounded-xl bg-bg-secondary pt-1 pr-1 pb-1 shadow-elevation-2">
        {/* Inner shadow on main shell */}
        <div className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] shadow-[inset_0_0_0_1px_var(--shadow-inner-1)]" />

        {/* ── Sidebar (w-260) ────────────────────────────────────────── */}
        <aside className="relative w-[52px] lg:w-[260px] shrink-0 overflow-hidden rounded-2xl">
          {/* Settings sidebar - slides in from right */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col overflow-y-auto overflow-y-[overlay] transition-transform duration-300 ease-in-out",
              isSettingsMode ? "translate-x-0" : "translate-x-full"
            )}
          >
            <SettingsSidebar
              activeSettingsPage={activeSettingsPage}
              onNavigate={setActiveSettingsPage}
              onBack={() => setIsSettingsMode(false)}
            />
          </div>

          {/* Dashboard sidebar - slides out to left */}
          <div
            className={cn(
              "flex h-full flex-col overflow-y-auto overflow-y-[overlay] transition-transform duration-300 ease-in-out",
              isSettingsMode ? "-translate-x-full" : "translate-x-0"
            )}
          >
            <div className="flex flex-col gap-4">
              {/* Search - icon-only on md, full on lg+ */}
              <div className="px-2 lg:px-4 pt-3">
                <div className="relative hidden lg:block">
                  <MagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" />
                  <Input placeholder="Search" className="pl-9 text-sm" />
                </div>
                <button className="flex lg:hidden w-full items-center justify-center rounded-lg p-2 text-text-secondary transition-colors hover:bg-bg-elevated-hover" title="Search">
                  <MagnifyingGlass weight="duotone" className="size-5" />
                </button>
              </div>

              <Separator className="lg:hidden" />

              {/* Main nav group */}
              <nav className="flex flex-col gap-0.5 px-2">
                {MAIN_NAV.map((item) => (
                  <SideNavItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    active={activePage === item.id}
                    onClick={() => setActivePage(item.id)}
                  />
                ))}
              </nav>

              <Separator />

              {/* Projects group */}
              <div className="flex flex-col gap-0.5 px-2">
                <div className="group/projects hidden lg:flex items-center justify-between px-2 pb-1">
                  <p className="text-sm font-normal text-text-secondary">
                    Projects
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="flex size-6 items-center justify-center rounded-md text-text-tertiary opacity-0 transition-all hover:bg-bg-elevated-hover hover:text-text-primary group-hover/projects:opacity-100">
                        <Plus weight="bold" className="size-3.5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent size="md">
                      <DialogHeader>
                        <DialogTitle>New project</DialogTitle>
                      </DialogHeader>
                      <div className="p-4">
                        <Input id="project-name" placeholder="Enter project name" autoFocus />
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="tertiary">Cancel</Button>
                        </DialogClose>
                        <Button>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                {PROJECTS_NAV.map((item) => (
                  <SideNavItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    active={activePage === item.id}
                    onClick={() => setActivePage(item.id)}
                  />
                ))}
              </div>

              <Separator />

              {/* Bottom nav group */}
              <nav className="flex flex-col gap-0.5 px-2">
                {BOTTOM_NAV.map((item) => (
                  <SideNavItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    active={activePage === item.id}
                    onClick={() => setActivePage(item.id)}
                  />
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* ── Content Area (elevation-3, bg-primary) ─────────────────── */}
        <main className="relative flex flex-1 flex-col overflow-y-auto overflow-y-[overlay] rounded-lg bg-bg-primary shadow-elevation-2">
          {/* Inner shadow on content area */}
          <div className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] shadow-[inset_0_0_0_1px_var(--shadow-inner-1)]" />

          <div
            key={contentKey}
            ref={contentRef}
            className="flex flex-1 flex-col transition-[opacity,transform] duration-200 ease-in-out"
          >
            {isSettingsMode ? (
              <SettingsContent activeSettingsPage={activeSettingsPage} />
            ) : activePage === "home" ? (
              <HomeContent />
            ) : (
              <BlankPage title={activeLabel} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

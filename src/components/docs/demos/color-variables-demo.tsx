"use client"

const COLOR_GROUPS = [
  {
    label: "Base",
    colors: [
      { variable: "--background", tailwind: "bg-background" },
      { variable: "--foreground", tailwind: "bg-foreground" },
    ],
  },
  {
    label: "Primary",
    colors: [
      { variable: "--primary", tailwind: "bg-primary" },
      { variable: "--primary-foreground", tailwind: "bg-primary-foreground" },
    ],
  },
  {
    label: "Secondary",
    colors: [
      { variable: "--secondary", tailwind: "bg-secondary" },
      { variable: "--secondary-foreground", tailwind: "bg-secondary-foreground" },
    ],
  },
  {
    label: "Muted",
    colors: [
      { variable: "--muted", tailwind: "bg-muted" },
      { variable: "--muted-foreground", tailwind: "text-muted-foreground" },
    ],
  },
  {
    label: "Accent",
    colors: [
      { variable: "--accent", tailwind: "bg-accent" },
      { variable: "--accent-foreground", tailwind: "bg-accent-foreground" },
    ],
  },
  {
    label: "Destructive",
    colors: [
      { variable: "--destructive", tailwind: "bg-destructive" },
    ],
  },
  {
    label: "Border & Input",
    colors: [
      { variable: "--border", tailwind: "border-border" },
      { variable: "--input", tailwind: "border-input" },
      { variable: "--ring", tailwind: "ring-ring" },
    ],
  },
  {
    label: "Card",
    colors: [
      { variable: "--card", tailwind: "bg-card" },
      { variable: "--card-foreground", tailwind: "bg-card-foreground" },
    ],
  },
  {
    label: "Popover",
    colors: [
      { variable: "--popover", tailwind: "bg-popover" },
      { variable: "--popover-foreground", tailwind: "bg-popover-foreground" },
    ],
  },
  {
    label: "Chart",
    colors: [
      { variable: "--chart-1", tailwind: "bg-chart-1" },
      { variable: "--chart-2", tailwind: "bg-chart-2" },
      { variable: "--chart-3", tailwind: "bg-chart-3" },
      { variable: "--chart-4", tailwind: "bg-chart-4" },
      { variable: "--chart-5", tailwind: "bg-chart-5" },
    ],
  },
  {
    label: "Sidebar",
    colors: [
      { variable: "--sidebar", tailwind: "bg-sidebar" },
      { variable: "--sidebar-foreground", tailwind: "text-sidebar-foreground" },
      { variable: "--sidebar-primary", tailwind: "bg-sidebar-primary" },
      { variable: "--sidebar-primary-foreground", tailwind: "text-sidebar-primary-foreground" },
      { variable: "--sidebar-accent", tailwind: "bg-sidebar-accent" },
      { variable: "--sidebar-accent-foreground", tailwind: "text-sidebar-accent-foreground" },
      { variable: "--sidebar-border", tailwind: "border-sidebar-border" },
      { variable: "--sidebar-ring", tailwind: "ring-sidebar-ring" },
    ],
  },
]

export function ColorVariablesDemo() {
  return (
    <div className="space-y-6">
      {COLOR_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
            {group.label}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {group.colors.map((color) => (
              <div
                key={color.variable}
                className="flex items-center gap-3 rounded-md border p-2"
              >
                <div
                  className="size-8 shrink-0 rounded-md border border-border/50"
                  style={{ backgroundColor: `var(${color.variable})` }}
                />
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">
                    {color.variable}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground font-mono">
                    {color.tailwind}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

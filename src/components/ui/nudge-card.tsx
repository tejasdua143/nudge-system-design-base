"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type NudgeVariant = "pro" | "service"

interface NudgeCardProps {
  variant?: NudgeVariant
  title: string
  description: string
  cta: string
  onCtaClick?: () => void
  onDismiss?: () => void
  className?: string
}

const variantStyles = {
  pro: {
    accentBorder: "rgba(139, 92, 246, 0.18)",
    hero: {
      bg: "#EDE9FE",
      blob1: "#8B5CF6",
      blob2: "#C084FC",
      blob3: "#DDD6FE",
      blob4: "#A78BFA",
    },
  },
  service: {
    accentBorder: "rgba(234, 88, 12, 0.18)",
    hero: {
      bg: "#FFF7ED",
      blob1: "#EA580C",
      blob2: "#FB923C",
      blob3: "#FED7AA",
      blob4: "#FDBA74",
    },
  },
}

export function NudgeCard({
  variant = "pro",
  title,
  description,
  cta,
  onCtaClick,
  onDismiss,
  className,
}: NudgeCardProps) {
  const [dismissed, setDismissed] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const styles = variantStyles[variant]

  function handleDismiss() {
    setIsExiting(true)
    setTimeout(() => {
      setDismissed(true)
      onDismiss?.()
    }, 250)
  }

  if (dismissed) return null

  return (
    <div
      data-slot="nudge-card"
      className={cn(
        "fixed bottom-6 right-6 z-[60] w-[400px]",
        "transition-all duration-300 ease-out",
        isExiting
          ? "translate-y-3 opacity-0"
          : "translate-y-0 opacity-100 animate-in slide-in-from-bottom-4 fade-in duration-500",
        className
      )}
    >
      <div
        className="overflow-hidden rounded-[var(--radius-3xl)] bg-bg-primary"
        style={{
          border: `1px solid ${styles.accentBorder}`,
          boxShadow: `0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06), 0 16px 40px -8px rgba(0,0,0,0.08)`,
        }}
      >
        {/* Hero visual — fades into card background */}
        <div className="relative">
          <div
            className="relative h-[120px] overflow-hidden"
            style={{ background: styles.hero.bg }}
          >
            {/* Organic blob shapes */}
            <div
              className="absolute -top-8 -left-6 size-28 rounded-full opacity-60 blur-xl"
              style={{ background: styles.hero.blob1 }}
            />
            <div
              className="absolute -top-4 right-8 size-36 rounded-full opacity-40 blur-2xl"
              style={{ background: styles.hero.blob2 }}
            />
            <div
              className="absolute bottom-2 left-1/3 size-24 rounded-full opacity-70 blur-lg"
              style={{ background: styles.hero.blob3 }}
            />
            <div
              className="absolute -bottom-6 -right-4 size-32 rounded-full opacity-50 blur-xl"
              style={{ background: styles.hero.blob4 }}
            />
            <div
              className="absolute top-10 left-12 size-16 rounded-full opacity-30 blur-md"
              style={{ background: styles.hero.blob1 }}
            />
          </div>
          {/* Fade-out gradient into card bg */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg-primary to-transparent" />
        </div>

        {/* Title */}
        <div className="px-6 pb-3">
          <h3 className="text-[length:var(--text-xl)] font-semibold leading-[var(--leading-heading)] text-text-primary truncate">
            {title}
          </h3>
        </div>

        {/* Description */}
        <div className="px-6 pb-5">
          <p className="text-[length:var(--text-base)] font-medium leading-[var(--leading-body)] text-text-secondary text-balance">
            {description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-1.5 px-6 pb-6">
          <button
            onClick={onCtaClick}
            className="flex h-11 w-full cursor-pointer items-center justify-center rounded-[var(--radius-xl)] bg-text-primary text-[length:var(--text-base)] font-medium text-text-primary-inverted shadow-elevation-1 transition-opacity duration-150 hover:opacity-85 active:opacity-75 outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-border-brand-secondary focus-visible:ring-offset-1"
          >
            {cta}
          </button>
          <button
            onClick={handleDismiss}
            className="flex h-9 cursor-pointer items-center justify-center rounded-[var(--radius-lg)] text-[length:var(--text-base)] font-medium text-text-tertiary transition-colors duration-150 hover:text-text-secondary outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-border-brand-secondary focus-visible:ring-offset-1"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  )
}

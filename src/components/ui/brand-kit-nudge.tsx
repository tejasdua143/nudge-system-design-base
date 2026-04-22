"use client"

import { motion, AnimatePresence } from "motion/react"
import { CaretRight } from "@phosphor-icons/react"

export interface NudgeContent {
  id: string
  image?: string
  heroBg?: string
  title: string
  description: string
  cta: string
}

export const NUDGES: NudgeContent[] = [
  {
    id: "brand-fonts",
    image: "/brand-kit-nudge.png",
    heroBg: "#EDE9FE",
    title: "Set your fonts once for the whole deck",
    description:
      "Brand Kit locks in your typeface and applies it across every slide automatically.",
    cta: "Get Brand Kit",
  },
  {
    id: "invite-collab",
    image: "/invite-collab-nudge.png",
    heroBg: "#FEE2E2",
    title: "Get feedback before this reaches investors",
    description: "Invite guests to view and comment, all in one place.",
    cta: "Invite Collaborators",
  },
  {
    id: "analytics",
    image: "/analytics-nudge.png",
    heroBg: "#DBEAFE",
    title: "Know when the board opens your deck",
    description: "Analytics shows exactly who viewed it and when.",
    cta: "Try Analytics",
  },
  {
    id: "refresh",
    image: "/refresh-nudge.png",
    heroBg: "#FEF3C7",
    title: "Don't rebuild your sales report from scratch every quarter",
    description:
      "Presentation Refresh rewrites your existing slides with fresh content in one click.",
    cta: "Try Presentation Refresh",
  },
  {
    id: "pro-ai",
    title: "Level up your Series A pitch deck",
    description:
      "Pro AI models bring the sharper writing and cleaner layouts investors expect.",
    cta: "Upgrade to Pro",
  },
  {
    id: "exports",
    image: "/exports-nudge.png",
    heroBg: "#E0E7FF",
    title: "Let investors read your pitch anytime",
    description:
      "Export your Series A pitch deck to PowerPoint — send it, save it, present it anywhere.",
    cta: "Unlock Exports",
  },
  {
    id: "case-comp-ai",
    title: "Write sharper copy that judges love",
    description:
      "Pro AI models craft polished layouts and tighten your pitch for your Nike vs Adidas case deck.",
    cta: "Upgrade to Pro",
  },
  {
    id: "invite-collab-prof",
    title: "Get feedback before this reaches Professor",
    description: "Invite guests to view and comment, all in one place.",
    cta: "Invite Collaborators",
  },
]

interface NudgeProps {
  nudge: NudgeContent
  showIllustration?: boolean
  onCtaClick?: () => void
}

export function Nudge({
  nudge,
  showIllustration = true,
  onCtaClick,
}: NudgeProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={nudge.id}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -8 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="fixed bottom-6 right-6 z-[60] w-fit max-w-[440px] overflow-hidden rounded-[12px] bg-white"
        style={{
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow:
            "0 2px 4px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.06)",
        }}
      >
        {showIllustration && nudge.image && (
          <div className="p-1 pb-0">
            <div
              className="relative overflow-hidden rounded-[8px]"
              style={{ background: nudge.heroBg ?? "#F3F4F6" }}
            >
              <img
                src={nudge.image}
                alt=""
                className="block w-full select-none"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col px-5 pb-5 pt-5">
          <h3 className="text-[length:var(--text-xl)] font-semibold leading-[var(--leading-heading)] text-text-primary text-balance">
            {nudge.title}
          </h3>
          <p className="mt-2 text-[length:var(--text-base)] leading-[var(--leading-body)] text-text-secondary text-pretty">
            {nudge.description}
          </p>
          <button
            onClick={onCtaClick}
            className="mt-4 flex h-11 w-full items-center justify-center gap-1.5 rounded-[8px] px-4 text-[length:var(--text-base)] font-medium text-white transition-opacity hover:opacity-85"
            style={{
              background: "#0A1925",
              boxShadow: "0 1px 3px rgba(10,25,37,0.3)",
            }}
          >
            {nudge.cta}
            <CaretRight className="size-3.5" weight="bold" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export function BrandKitNudge({
  showIllustration = true,
  onCtaClick,
}: {
  showIllustration?: boolean
  onCtaClick?: () => void
}) {
  return (
    <Nudge
      nudge={NUDGES[0]}
      showIllustration={showIllustration}
      onCtaClick={onCtaClick}
    />
  )
}

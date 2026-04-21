"use client"

import { motion } from "motion/react"
import { CaretRight } from "@phosphor-icons/react"

interface BrandKitNudgeProps {
  showIllustration?: boolean
  onCtaClick?: () => void
}

export function BrandKitNudge({
  showIllustration = true,
  onCtaClick,
}: BrandKitNudgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-[60] w-fit max-w-[440px] overflow-hidden rounded-[12px] bg-white"
      style={{
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow:
          "0 2px 4px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.06)",
      }}
    >
      {showIllustration && (
        <div className="p-1 pb-0">
          <div
            className="relative overflow-hidden rounded-[8px]"
            style={{ background: "#EDE9FE" }}
          >
            <img
              src="/brand-kit-nudge.png"
              alt="Brand Kit preview"
              className="block w-full select-none"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col px-5 pb-5 pt-5">
        <h3 className="text-[length:var(--text-xl)] font-semibold leading-[var(--leading-heading)] text-text-primary">
          Stop rebuilding your brand every deck
        </h3>
        <p className="mt-2 text-[length:var(--text-base)] leading-[var(--leading-body)] text-text-secondary text-pretty">
          Brand Kit locks in your fonts, colors, and logos across every slide.
        </p>
        <button
          onClick={onCtaClick}
          className="mt-4 flex h-11 w-full items-center justify-center gap-1.5 rounded-[8px] px-4 text-[length:var(--text-base)] font-medium text-white transition-opacity hover:opacity-85"
          style={{
            background: "#0A1925",
            boxShadow: "0 1px 3px rgba(10,25,37,0.3)",
          }}
        >
          Get Brand Kit
          <CaretRight className="size-3.5" weight="bold" />
        </button>
      </div>
    </motion.div>
  )
}

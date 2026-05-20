"use client"

import { useEffect } from "react"
import {
  X,
  Crown,
  ArrowCounterClockwise,
  MicrosoftPowerpointLogo,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface EndOfDeckModalProps {
  open: boolean
  onClose: () => void
  onRestart: () => void
  onExport: () => void
  onUpgrade: () => void
  className?: string
}

export function EndOfDeckModal({
  open,
  onClose,
  onRestart,
  onExport,
  onUpgrade,
  className,
}: EndOfDeckModalProps) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <style>{`
        @keyframes eod-scrim-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes eod-banner-in {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes eod-child-in {
          from { transform: translateY(6px); opacity: 0; filter: blur(2px); }
          to   { transform: translateY(0);   opacity: 1; filter: blur(0); }
        }
        @keyframes eod-x-in {
          from { transform: scale(0.92); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        @keyframes eod-export-shimmer {
          0%   { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(220%)  skewX(-12deg); }
        }
        @keyframes eod-export-pulse {
          0%   { box-shadow: 0 6px 16px rgba(0,85,237,0.30); }
          50%  { box-shadow: 0 8px 22px rgba(0,85,237,0.45), 0 0 0 4px rgba(0,85,237,0.12); }
          100% { box-shadow: 0 6px 16px rgba(0,85,237,0.30); }
        }
        /* Stage 1: overlay fades in slowly — 0–600ms — draws attention to lower 3rd */
        .eod-scrim {
          animation: eod-scrim-in 600ms cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        /* Stage 2: white banner slides up after overlay settles — 600–1180ms */
        .eod-banner {
          animation: eod-banner-in 580ms cubic-bezier(0.32, 0.72, 0, 1) both;
          animation-delay: 600ms;
          will-change: transform, opacity;
        }
        /* Children inherit banner visibility — no inner stagger */
        .eod-child { /* rides with banner */ }
        /* Stage 3: X button polite tail */
        .eod-x {
          animation: eod-x-in 220ms cubic-bezier(0.23, 1, 0.32, 1) both;
          animation-delay: 1180ms;
        }
        /* Stage 4: Export CTA attention pulse + shimmer — slow, deliberate */
        .eod-export-attn {
          position: relative;
          overflow: hidden;
          animation: eod-export-pulse 1600ms cubic-bezier(0.4, 0, 0.2, 1) 1360ms 1 both;
        }
        .eod-export-attn::after {
          content: "";
          position: absolute;
          top: 0; bottom: 0;
          left: 0; width: 60%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%);
          transform: translateX(-120%) skewX(-12deg);
          animation: eod-export-shimmer 1500ms cubic-bezier(0.4, 0, 0.2, 1) 1500ms 1 forwards;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .eod-export-attn,
          .eod-export-attn::after { animation: none; }
        }
        .eod-press {
          transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
                      opacity 150ms ease,
                      border-color 150ms ease,
                      background-color 150ms ease;
        }
        .eod-press:active {
          transform: scale(0.97);
        }
        @media (prefers-reduced-motion: reduce) {
          .eod-scrim,
          .eod-banner,
          .eod-child,
          .eod-x {
            animation: eod-scrim-in 180ms ease both;
          }
          .eod-press:active { transform: none; }
        }
      `}</style>

      <div
        data-slot="end-of-deck-modal"
        className={cn("fixed inset-0 z-[80]", className)}
      >
        {/* Overlay — full-screen vertical gradient, heavier toward bottom 3rd to spotlight banner */}
        <div
          className="eod-scrim pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.72) 70%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        {/* Top-right close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="eod-x eod-press absolute right-5 top-5 flex size-9 items-center justify-center rounded-full bg-white/10 text-white outline-none backdrop-blur-md hover:bg-white/20 focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-white/40"
        >
          <X className="size-4" weight="bold" />
        </button>

        {/* Bottom banner */}
        <div
          role="dialog"
          aria-modal="true"
          className="eod-banner absolute inset-x-6 bottom-6"
        >
          <div
            className="grid items-stretch gap-2 rounded-[var(--radius-md)] bg-bg-primary p-2 shadow-elevation-3"
            style={{ gridTemplateColumns: "1.4fr 1fr 1fr auto" }}
          >
            {/* Message */}
            <div className="eod-child eod-child-1 flex flex-col justify-center px-4 py-3">
              <h2 className="text-[length:var(--text-xl)] font-medium leading-[var(--leading-heading)] tracking-tight text-text-primary">
                Thanks for watching.
              </h2>
            </div>

            {/* Export — primary brand CTA */}
            <button
              type="button"
              onClick={onExport}
              className="eod-export-attn eod-press flex items-center gap-3 rounded-[var(--radius-md)] bg-bg-brand px-4 py-3 text-left text-text-white outline-none hover:opacity-90 focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-border-brand-secondary"
              style={{ boxShadow: "0 6px 16px rgba(0,85,237,0.30)" }}
            >
              <MicrosoftPowerpointLogo
                className="size-7 shrink-0 text-white"
                weight="fill"
              />
              <span className="text-[length:var(--text-base)] font-medium leading-[var(--leading-body)]">
                Export to PowerPoint
              </span>
            </button>

            {/* Pro — secondary outlined CTA */}
            <button
              type="button"
              onClick={onUpgrade}
              className="eod-child eod-child-3 eod-press flex items-center gap-3 rounded-[var(--radius-md)] border border-border-secondary bg-bg-primary px-4 py-3 text-left text-text-primary outline-none hover:border-border-primary focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-border-brand-secondary"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-bg-secondary text-text-primary">
                <Crown className="size-4" weight="fill" />
              </span>
              <span className="text-[length:var(--text-base)] font-medium leading-[var(--leading-body)]">
                Upgrade to Pro
              </span>
            </button>

            {/* Restart — quiet ghost */}
            <button
              type="button"
              onClick={onRestart}
              className="eod-child eod-child-4 eod-press flex flex-col items-center justify-center rounded-[var(--radius-md)] px-4 py-3 text-text-tertiary outline-none hover:bg-bg-secondary focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-border-brand-secondary"
            >
              <ArrowCounterClockwise className="size-4" weight="bold" />
              <span className="mt-1 text-[length:var(--text-2xs)] font-medium uppercase tracking-widest">
                Restart
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

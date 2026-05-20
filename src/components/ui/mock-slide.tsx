"use client"

import { cn } from "@/lib/utils"

interface MockSlideProps {
  body?: string
  highlight?: string
  className?: string
}

export function MockSlide({
  body = "FY2025 was defined by disciplined growth amidst market volatility, maintaining strong cash positions",
  highlight = "while funding core expansion and ensuring operations continuity.",
  className,
}: MockSlideProps) {
  return (
    <div
      data-slot="mock-slide"
      className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center bg-black p-0",
        className
      )}
      aria-hidden="true"
    >
      {/* Dark slide canvas */}
      <div className="relative h-full w-full overflow-hidden bg-black">
        {/* Orange ambient glow — top-right */}
        <div
          className="absolute -top-32 -right-32 size-[640px] rounded-full opacity-80 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #ff5500 0%, #c43e1c 40%, transparent 75%)",
          }}
        />
        {/* Secondary ambient — bottom-left */}
        <div
          className="absolute -bottom-40 -left-40 size-[560px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #ff5500 0%, transparent 70%)",
          }}
        />
        {/* Soft black overlay to deepen */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col justify-center px-16">
          <p className="text-[length:var(--text-2xl)] font-medium leading-[1.2] tracking-tight text-white text-balance">
            {body}{" "}
            <span className="text-white/65">{highlight}</span>
          </p>
        </div>

        {/* Top + bottom black bars (slideshow chrome) */}
        <div className="absolute inset-x-0 top-0 h-6 bg-black" />
        <div className="absolute inset-x-0 bottom-0 h-6 bg-black" />
      </div>
    </div>
  )
}

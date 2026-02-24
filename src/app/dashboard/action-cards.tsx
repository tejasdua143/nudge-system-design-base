"use client"

import {
  useRive,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceBoolean,
} from "@rive-app/react-webgl2"
import { CaretRightIcon } from "@phosphor-icons/react"

const ACTION_CARDS = [
  {
    title: "Paste an outline",
    description: "Turn your structure into slides",
    src: "/outline.riv",
  },
  {
    title: "Upload a file or share a link",
    description: "Make slides from various sources",
    src: "/upload.riv",
  },
  {
    title: "Start with a prompt",
    description: "Just describe what you need",
    src: "/prompt.riv",
  },
]

function ActionCard({
  title,
  description,
  src,
}: {
  title: string
  description: string
  src: string
}) {
  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: "hover",
    autoplay: true,
  })

  const viewModel = useViewModel(rive)
  const viewModelInstance = useViewModelInstance(viewModel, { rive })
  const { setValue: setHover } = useViewModelInstanceBoolean(
    "hover",
    viewModelInstance
  )

  return (
    <button
      className="group relative flex flex-1 items-start overflow-hidden rounded-lg bg-bg-elevated p-2 shadow-elevation-1 transition-shadow hover:shadow-elevation-3 xl:items-center 2xl:max-w-[430px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Inner shadow overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_var(--shadow-inner-1)]" />
      {/* Rive icon */}
      <RiveComponent className="size-12 shrink-0" />
      {/* Text */}
      <div className="flex flex-1 flex-col gap-1 px-3 text-left">
        <span className="text-sm font-medium leading-[1.43] text-text-primary">
          {title}
        </span>
        <span className="text-sm leading-[1.43] text-text-secondary">
          {description}
        </span>
      </div>
      <CaretRightIcon weight="bold" className="size-4 shrink-0 self-center text-text-tertiary" />
    </button>
  )
}

export function ActionCardsRow() {
  return (
    <div className="flex flex-col gap-5 xl:flex-row">
      {ACTION_CARDS.map((card) => (
        <ActionCard key={card.title} {...card} />
      ))}
    </div>
  )
}

"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  X,
  Star,
  ClipboardText,
  Handshake,
  Plus,
  GearSix,
  UploadSimple,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { EndOfDeckModal } from "@/components/ui/end-of-deck-modal";
import { MockSlide } from "@/components/ui/mock-slide";

const TOPICS = [
  { id: "ops-review", label: "Ops Review", icon: Star, color: "text-amber-500" },
  { id: "process-rollout", label: "Process Rollout", icon: ClipboardText, color: "text-neutral-500" },
  { id: "vendor-review", label: "Vendor Review", icon: Handshake, color: "text-amber-500" },
] as const;

type TopicId = (typeof TOPICS)[number]["id"] | null;

export default function BuildPage() {
  const [selectedTopic, setSelectedTopic] = useState<TopicId>(null);
  const [prompt, setPrompt] = useState("");
  const [endOpen, setEndOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTopicClick = useCallback(
    (id: TopicId) => {
      setSelectedTopic(id === selectedTopic ? null : id);
    },
    [selectedTopic]
  );

  return (
    <div className="flex min-h-screen flex-col bg-bg-primary">
      {/* Top nav */}
      <div className="flex items-center justify-between px-6 py-5">
        <button className="flex size-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary">
          <ArrowLeft className="size-4" weight="bold" />
        </button>
        <button className="flex size-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary">
          <X className="size-4" weight="bold" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center px-6 pt-16">
        <div className="flex w-full max-w-[520px] flex-col items-center gap-8">
          {/* Heading */}
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-[length:var(--text-2xl)] font-medium leading-[var(--leading-heading)] tracking-tight text-text-primary">
              Build your first operations presentation
              <br />
              in minutes
            </h1>
            <p className="text-[length:var(--text-base)] leading-[var(--leading-body)] text-text-tertiary">
              Make complex operations easy to communicate
            </p>
          </div>

          {/* Topic picker */}
          <div className="flex w-full flex-col items-center gap-4">
            <span className="text-[length:var(--text-2xs)] font-semibold uppercase tracking-widest text-text-tertiary">
              Pick a topic for your first deck
            </span>
            <div className="flex items-center gap-2">
              {TOPICS.map(({ id, label, icon: Icon, color }) => (
                <button
                  key={id}
                  onClick={() => handleTopicClick(id)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[length:var(--text-base)] font-medium transition-all ${
                    selectedTopic === id
                      ? "border-border-brand bg-bg-brand-selected text-text-primary shadow-elevation-1"
                      : "border-border-secondary bg-bg-primary text-text-primary hover:bg-bg-secondary"
                  }`}
                >
                  <Icon className={`size-4 ${color}`} weight="fill" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Divider text */}
          <span className="text-[length:var(--text-xs)] text-text-tertiary">
            Or describe it yourself
          </span>

          {/* Prompt input card */}
          <div className="w-full rounded-[var(--radius-xl)] border border-border-secondary bg-bg-primary shadow-elevation-2 transition-shadow focus-within:shadow-elevation-3 focus-within:border-border-brand">
            {/* Textarea */}
            <div className="px-4 pt-4 pb-2">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what your presentation is about..."
                rows={3}
                className="w-full resize-none bg-transparent text-[length:var(--text-md)] leading-[var(--leading-body)] text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
            </div>

            {/* Bottom toolbar */}
            <div className="flex items-center justify-between border-t border-border-secondary px-3 py-2">
              <div className="flex items-center gap-1">
                <button className="flex items-center gap-1.5 rounded-[var(--radius-md)] px-2.5 py-1.5 text-[length:var(--text-xs)] text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary">
                  <Plus className="size-3.5" weight="bold" />
                  Add file
                </button>
                <button className="flex items-center gap-1.5 rounded-[var(--radius-md)] px-2.5 py-1.5 text-[length:var(--text-xs)] text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary">
                  <GearSix className="size-3.5" />
                  Notes: Auto
                </button>
                <div className="mx-1 h-4 w-px bg-border-secondary" />
                <button className="flex items-center gap-1.5 rounded-[var(--radius-md)] px-2.5 py-1.5 text-[length:var(--text-xs)] text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary">
                  <GearSix className="size-3.5" />
                  Standard
                </button>
              </div>
              <Button variant="primary" size="sm" asChild>
                <Link href="/create/editor">Build my deck</Link>
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-[length:var(--text-xs)] text-text-tertiary">
              Crafts your team will actually act on.
            </p>
            <button className="flex items-center gap-1.5 rounded-full border border-border-secondary px-4 py-2 text-[length:var(--text-xs)] font-medium text-text-primary transition-colors hover:bg-bg-secondary">
              <UploadSimple className="size-3.5" />
              Have a document? Upload it instead
            </button>
            <button
              type="button"
              onClick={() => setEndOpen(true)}
              className="text-[length:var(--text-xs)] text-text-tertiary transition-colors hover:text-text-primary"
            >
              Preview end-of-deck state →
            </button>
          </div>
        </div>
      </div>

      {endOpen && <MockSlide />}

      <EndOfDeckModal
        open={endOpen}
        onClose={() => setEndOpen(false)}
        onRestart={() => console.log("restart")}
        onExport={() => console.log("export")}
        onBackToEdit={() => console.log("back-to-edit")}
      />
    </div>
  );
}

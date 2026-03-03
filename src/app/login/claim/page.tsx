"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Gift } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

const SCALE = 1.13;
const TILT_STRENGTH = 15.5;
const GLOW_OPACITY = 0.76;
const PERSPECTIVE = 200;

const REST_SHADOW = [
  "0px 11px 24px -10px rgba(0,0,0,0.39)",
  "0px 0px 0px 1px rgba(0,0,0,0.07)",
  "inset 0 0 0px 1px var(--shadow-inner-1)",
  "inset 0 0 0px 1px var(--shadow-inner-2)",
].join(", ");

const HOVER_SHADOW = [
  "0px 30px 32px -4px rgba(0,0,0,0.15)",
  "0px 0px 0px 1px rgba(0,0,0,0.1)",
  "inset 0 0 0px 1px var(--shadow-inner-1)",
  "inset 0 0 0px 1px var(--shadow-inner-2)",
].join(", ");

export default function ClaimCreditPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const [shimmerDone, setShimmerDone] = useState(false);

  useEffect(() => {
    const shimmer = shimmerRef.current;
    if (!shimmer) return;
    const onEnd = () => setShimmerDone(true);
    shimmer.addEventListener("animationend", onEnd);
    return () => shimmer.removeEventListener("animationend", onEnd);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card || !glow) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const offsetX = (x - centerX) / centerX;
      const offsetY = (y - centerY) / centerY;
      const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);

      card.style.transform = `scale3d(${SCALE}, ${SCALE}, ${SCALE}) rotate3d(${-offsetY}, ${offsetX}, 0, ${Math.log(distance + 1) * TILT_STRENGTH}deg)`;
      card.style.boxShadow = HOVER_SHADOW;

      glow.style.opacity = String(GLOW_OPACITY);
      glow.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.6), transparent 60%)`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    card.style.transform = "";
    card.style.boxShadow = REST_SHADOW;
    glow.style.opacity = "0";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary">
      <div className="flex w-full max-w-sm flex-col items-center gap-11">
        {/* Header */}
        <div className="flex flex-col items-center gap-2.5 text-center">
          <Gift className="size-8 text-text-brand" weight="duotone" />
          <h1 className="text-2xl leading-[var(--leading-heading)] tracking-tight text-text-primary">
            Claim free credit
          </h1>
          <p className="max-w-[280px] text-sm leading-[var(--leading-body)] text-text-secondary">
            Use this credit to explore API features. It expires 14 days after
            claiming.
          </p>
        </div>

        {/* Credit card */}
        <div
          className="flex items-center justify-center"
          style={{ perspective: `${PERSPECTIVE}px` }}
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-32 w-48 cursor-pointer overflow-hidden rounded-[var(--radius-card)]"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 110% 120%, white, #ffecd0 6%, #ffd9a0 13%, #ffc571 19%, #ffb241 26%, #f97330 49%, #ffb241 74%, transparent), linear-gradient(90deg, #f8f6f2, #f8f6f2)",
              boxShadow: REST_SHADOW,
              transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <div className="absolute bottom-2.5 right-3 text-right">
              <p className="text-[length:var(--text-2xs)] leading-none text-black/47">
                credit
              </p>
              <p className="text-[length:var(--text-2xl)] font-medium leading-none text-black/47">
                200
              </p>
            </div>
            {/* Glow overlay */}
            <div
              ref={glowRef}
              className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0"
              style={{ transition: "opacity 0.3s ease-out" }}
            />
            {/* Shimmer on appear */}
            {!shimmerDone && (
              <div
                ref={shimmerRef}
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 55%, transparent 70%)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "300% 0",
                  filter: "blur(5px)",
                  animation: "card-shimmer 1.5s ease-in-out 0.5s 1 forwards",
                }}
              />
            )}
          </div>
        </div>

        {/* CTA */}
        <Button variant="primary" size="md" className="w-full" asChild>
          <Link href="/login/api-key">Claim</Link>
        </Button>
      </div>
    </div>
  );
}

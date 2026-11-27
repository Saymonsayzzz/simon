"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import type { Case } from "@/data/cases";
import { ArrowCta } from "@/components/ui/ArrowCta";
import { PillButton } from "@/components/ui/PillButton";
import { MacMockup } from "@/components/home/MacMockup";
import { fadeUp } from "@/lib/motion";

export function CaseCard({ data }: { data: Case }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
      className={clsx(
        "group relative flex h-[580px] min-w-0 w-full flex-col overflow-hidden rounded-[32px] bg-surface backdrop-blur-sm md:block md:h-[700px]",
      )}
    >
      <Link
        href={`/cases/${data.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`Открыть кейс ${data.title}`}
        data-cursor="link"
      />
      <div className="relative z-10 flex shrink-0 flex-col items-center gap-4 px-4 pt-8 pb-6 text-center md:px-8 md:pb-0">
        <h3 className="font-display text-[36px] leading-[1.2] tracking-[0.01em] text-white">
          {data.title}
        </h3>
        <div className="flex flex-wrap items-start justify-center gap-3">
          {data.preview.tags.map((tag) => (
            <PillButton key={tag} variant="outline" className="max-w-full whitespace-normal md:whitespace-nowrap">
              {tag}
            </PillButton>
          ))}
        </div>
        <p className="text-[16px] font-semibold leading-6 text-muted">
          {data.preview.description}
        </p>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden md:contents">
        <CardMedia data={data} />
      </div>
      <ArrowCta className="absolute bottom-6 right-6 z-10 md:bottom-8 md:right-8" />
    </motion.div>
  );
}

function CardMedia({ data }: { data: Case }) {
  const { media, variant } = data.preview;

  if (media.kind === "placeholder") {
    return (
      <div className="absolute inset-x-2 bottom-2 top-0 overflow-hidden rounded-[24px] bg-surface-2 md:top-[226px]">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(84,150,249,0.18),transparent_70%)]" />
      </div>
    );
  }

  if (media.kind === "video") {
    return (
      <div className="absolute inset-x-2 bottom-2 top-0 overflow-hidden rounded-[24px] bg-surface-2 md:top-[226px]">
        <video
          src={media.src}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  if (media.kind === "mac-mockup") {
    return (
      <div className="absolute inset-x-2 bottom-2 top-0 overflow-hidden rounded-[24px] bg-surface-2 md:top-[226px]">
        <MacMockup src={media.screenshot} alt={media.alt} />
      </div>
    );
  }

  if (media.kind === "phone-single") {
    return (
      <div className="pointer-events-none absolute inset-x-0 -bottom-10 z-0 flex h-[380px] items-end justify-center md:h-[480px]">
        <div aria-hidden className="absolute inset-x-2 bottom-2 top-0 rounded-[24px] bg-surface-2" />
        <div className="absolute bottom-0 left-1/2 h-[423px] w-[318px] -translate-x-1/2 rounded-[100px] bg-[radial-gradient(circle_at_50%_60%,rgba(84,150,249,0.6),rgba(255,255,255,0.12)_60%,transparent_70%)] blur-[80px]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.src}
          alt=""
          className="relative h-[380px] w-[220px] object-contain object-bottom md:h-[480px] md:w-[280px]"
        />
      </div>
    );
  }

  // laptop
  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-8 z-0">
      <div aria-hidden className="absolute inset-x-2 bottom-2 top-0 rounded-[24px] bg-surface-2" />
      <div className="absolute bottom-[-100px] left-1/2 h-[686px] w-[516px] -translate-x-1/2 rounded-[100px] bg-[radial-gradient(circle_at_50%_60%,rgba(84,150,249,0.6),rgba(255,255,255,0.12)_60%,transparent_70%)] blur-[100px]" />
      <div className={clsx("relative w-full", variant === "wide" ? "h-[520px]" : "h-[440px]")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.src}
          alt=""
          className="absolute inset-0 h-full w-full object-contain object-bottom"
        />
      </div>
    </div>
  );
}

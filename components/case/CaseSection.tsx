"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CaseSection as Section } from "@/data/cases";
import { fadeUp } from "@/lib/motion";

type ResultSection = Extract<Section, { type: "result" }>;

function ResultBlock({ section }: { section: ResultSection }) {
  const [open, setOpen] = useState(false);
  const hasDetails = !!section.details && section.details.length > 0;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
      className="mx-auto w-full max-w-[1060px] px-6 py-16"
    >
      <div className="rounded-[24px] border border-dashed border-white/25 p-6 md:p-10">
        <h3 className="text-[24px] font-semibold leading-[1.2] text-white">
          {section.title ?? "Результат"}
        </h3>

        <dl className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {section.metrics.map((m, i) => (
            <div key={i} className="min-w-0">
              <dt className="font-display break-words text-[40px] leading-tight text-accent sm:text-[48px] md:text-[56px]">
                {m.value}
              </dt>
              <dd className="mt-3 max-w-[260px] text-[15px] leading-[1.4] text-muted">
                {m.label}
              </dd>
            </div>
          ))}
        </dl>

        {section.note && (
          <p className="mt-8 text-[14px] leading-[1.45] text-muted">
            {section.note}
          </p>
        )}

        {hasDetails && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              data-cursor="link"
              className="inline-flex items-center gap-2 text-[15px] text-white transition hover:text-accent"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
                className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Подробнее
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  {section.details!.map((d, i) => (
                    <li
                      key={i}
                      className="flex gap-3 pt-3 text-[16px] leading-[1.5] text-white/85"
                    >
                      <span className="mt-[10px] h-[6px] w-[6px] flex-none rounded-full bg-accent" />
                      <span>{d}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function CaseSection({ section }: { section: Section }) {
  if (section.type === "two-column") {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        className="mx-auto grid w-full max-w-[1060px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2"
      >
        {[section.left, section.right].map((col, i) => (
          <div key={i} className="min-w-0">
            <h3 className="text-[24px] font-semibold leading-[1.2] text-white">
              {col.title}
            </h3>
            {col.body && (
              <p className="mt-4 text-[18px] leading-[1.45] text-muted">
                {col.body}
              </p>
            )}
            {col.metrics && (
              <dl className="mt-6 divide-y divide-border border-y border-border">
                {col.metrics.map((m, j) => (
                  <div
                    key={j}
                    className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[minmax(132px,0.7fr)_1fr] sm:items-start sm:gap-5"
                  >
                    <dt className="font-display whitespace-nowrap text-[34px] leading-none tracking-[-0.02em] text-accent md:text-[40px]">
                      {m.value}
                    </dt>
                    <dd className="max-w-[280px] text-[15px] leading-[1.45] text-muted md:text-[16px]">
                      {m.label}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        ))}
      </motion.div>
    );
  }

  if (section.type === "text") {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        className="mx-auto w-full max-w-[1060px] px-6 py-12"
      >
        {section.title && (
          <h3 className="text-[24px] font-semibold leading-[1.2] text-white">
            {section.title}
          </h3>
        )}
        {section.paragraphs && section.paragraphs.length > 0 && (
          <div className="mt-4 space-y-3 text-[18px] leading-[1.5] text-white/85">
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
        {section.bullets && section.bullets.length > 0 && (
          <ul className="mt-4 space-y-2 text-[18px] leading-[1.5] text-white/85">
            {section.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-[10px] h-[6px] w-[6px] flex-none rounded-full bg-accent" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    );
  }

  if (section.type === "stats") {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        className="mx-auto grid w-full max-w-[1060px] grid-cols-1 gap-6 px-6 py-16 md:grid-cols-3"
      >
        {section.items.map((s, i) => (
          <div
            key={i}
            className="min-w-0 rounded-[24px] border border-border bg-surface px-6 py-8"
          >
            <div className="font-display break-words text-[clamp(36px,10vw,56px)] leading-tight text-white md:text-[clamp(40px,5vw,56px)]">
              {s.value}
            </div>
            <div className="mt-4 text-[16px] leading-[1.4] text-muted">
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
    );
  }

  if (section.type === "result") {
    return <ResultBlock section={section} />;
  }

  if (section.type === "steps") {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        className="mx-auto w-full max-w-[1060px] px-6 py-16"
      >
        {section.title && (
          <h3 className="mb-8 text-[24px] font-semibold leading-[1.2] text-white">
            {section.title}
          </h3>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {section.items.map((s, i) => (
            <div
              key={i}
              className="rounded-[24px] border border-border bg-surface p-6"
            >
              <div className="font-display text-[28px] leading-none text-accent">
                {s.num}
              </div>
              <div className="mt-4 text-[20px] font-semibold leading-[1.25] text-white">
                {s.title}
              </div>
              <p className="mt-3 text-[15px] leading-[1.45] text-muted">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (section.type === "quote") {
    return (
      <motion.figure
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        className="mx-auto w-full max-w-[1060px] px-6 py-16 md:py-20"
      >
        <blockquote className="text-balance text-[28px] font-semibold leading-[1.25] text-white md:text-[40px]">
          “{section.text}”
        </blockquote>
        {section.author && (
          <figcaption className="mt-4 text-[16px] text-muted">
            — {section.author}
          </figcaption>
        )}
      </motion.figure>
    );
  }

  // image
  return (
    <motion.figure
      initial={{ opacity: 0, clipPath: "inset(8% 0 8% 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-[1060px] px-6 py-8"
    >
      <div className="overflow-hidden rounded-[24px] bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={section.src}
          alt={section.alt}
          className="block h-auto w-full"
        />
      </div>
      {section.caption && (
        <figcaption className="mt-4 text-center text-[14px] text-muted">
          {section.caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

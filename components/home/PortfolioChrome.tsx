"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cases, type CaseSlug } from "@/data/cases";

export function PortfolioChrome() {
  const [active, setActive] = useState(cases[0]?.slug ?? "");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = cases
      .map((item) => document.getElementById(item.slug))
      .filter((item): item is HTMLElement => Boolean(item));
    if (!targets.length) return () => window.removeEventListener("scroll", onScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.id;
        if (id && cases.some((item) => item.slug === id)) setActive(id as CaseSlug);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0, 0.2, 0.5] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header className={`portfolio-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="portfolio-wrap portfolio-header__inner">
          <Link href="#top" className="portfolio-brand" aria-label="В начало">
            S. Shevchenko
          </Link>
          <nav className="portfolio-case-nav" aria-label="Кейсы">
            {cases.map((item, index) => (
              <a
                key={item.slug}
                href={`#${item.slug}`}
                className={active === item.slug ? "is-active" : ""}
              >
                <span>{item.title}</span>
                <small>0{index + 1}</small>
              </a>
            ))}
          </nav>
          <nav className="portfolio-contact-nav" aria-label="Контакты">
            <a href="https://t.me/saymonsayzzz" target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a href="mailto:saymonsayzzz@gmail.com">Email</a>
            <a className="portfolio-cv-button" href="/CV_Semyon_Shevchenko.pdf" target="_blank" rel="noreferrer">
              CV
            </a>
          </nav>
        </div>
      </header>

      <nav className="portfolio-rail" aria-label="Разделы портфолио">
        <a href="#top" className="portfolio-rail__line" aria-label="В начало" />
        {cases.map((item, index) => (
          <a
            key={item.slug}
            href={`#${item.slug}`}
            className={active === item.slug ? "is-active" : ""}
            aria-label={`Кейс ${index + 1}: ${item.title}`}
          >
            <span>0{index + 1}</span>
          </a>
        ))}
        <a href="#contact" aria-label="Как я работаю">
          <span>как</span>
        </a>
      </nav>
    </>
  );
}

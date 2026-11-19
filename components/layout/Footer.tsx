"use client";

import { DotField } from "./DotField";

export function Footer() {
  return (
    <footer className="relative flex min-h-svh w-full flex-col overflow-hidden bg-footer text-white md:h-screen">
      <div className="relative min-h-[320px] flex-1 border-b border-white/15 md:min-h-0">
        <DotField />
      </div>

      {/* Bottom grid */}
      <div className="grid shrink-0 grid-cols-1 gap-x-4 gap-y-8 px-6 py-10 text-[14px] uppercase tracking-[0.16em] min-[360px]:grid-cols-2 md:grid-cols-4 md:gap-x-6 md:gap-y-10 md:px-[60px] md:py-12">
        <FooterCol num="[02]" title="Телеграм">
          <a
            href="https://t.me/saymonsayzzz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
            data-cursor="link"
          >
            @saymonsayzzz
          </a>
        </FooterCol>

        <FooterCol num="[03]" title="Телефон">
          <a
            href="tel:+79625800068"
            className="hover:text-accent"
            data-cursor="link"
          >
            +7 (962) 580-00-68
          </a>
        </FooterCol>

        <FooterCol num="[04]" title="Резюме">
          <a href="#" className="hover:text-accent" data-cursor="link">
            Скачать CV ↗
          </a>
        </FooterCol>

        <FooterCol num="[05]" title="HH.ru">
          <a href="#" className="hover:text-accent" data-cursor="link">
            Открыть профиль ↗
          </a>
        </FooterCol>
      </div>

    </footer>
  );
}

function FooterCol({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <span className="text-[11px] text-muted-2">{num}</span>
      <span className="text-muted-2">{title}</span>
      <span className="text-[16px] normal-case tracking-normal break-words text-white">
        {children}
      </span>
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";


export const metadata: Metadata = {
  title: "Semyon — Product Designer",
  description:
    "Портфолио Семёна Шевченко. Финтех-продукты, партнёрские платформы и дизайн-системы.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-background text-foreground" data-cursor-active="true">
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

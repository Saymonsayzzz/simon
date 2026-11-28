import { caseContent } from "./caseContent";

export type ColumnContent = {
  title: string;
  body?: string;
  metrics?: { value: string; label: string }[];
};

export type CaseSection =
  | { type: "html"; html: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "text"; title?: string; paragraphs?: string[]; bullets?: string[] }
  | { type: "quote"; text: string; author?: string }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "result"; title?: string; metrics: { value: string; label: string }[]; note?: string; details?: string[] }
  | { type: "steps"; title?: string; items: { num: string; title: string; body: string }[] }
  | { type: "two-column"; left: ColumnContent; right: ColumnContent };

export type CaseSlug = "kassa" | "challenge" | "home";

export type PreviewMedia =
  | { kind: "placeholder" }
  | { kind: "phone-single"; src: string }
  | { kind: "laptop"; src: string }
  | { kind: "video"; src: string; poster?: string }
  | { kind: "mac-mockup"; screenshot: string; alt: string };

export type Case = {
  slug: CaseSlug;
  title: string;
  tagline: string;
  intro: string;
  preview: { variant: "wide" | "half"; tags: string[]; description: string; media: PreviewMedia };
  sections: CaseSection[];
};

const html = (key: keyof typeof caseContent): CaseSection => ({ type: "html", html: caseContent[key] });

export const cases: Case[] = [
  {
    slug: "kassa",
    title: "Сначала показать, как вывести. Потом просить внести",
    tagline: "[01] Касса · Редизайн кассы трейдинговой платформы",
    intro: "Редизайн кассы трейдинговой платформы. Новые пользователи видели, как пополнить счёт, но не видели, как вывести деньги, и уходили с мыслью «это скам». Новая касса показывает вывод и историю с первого экрана и ведёт к депозиту в удобном порядке: сначала способ оплаты, потом сумма.",
    preview: {
      variant: "wide",
      tags: ["Касса", "Депозиты · выводы · история"],
      description: "Касса, в которой видно, как забрать деньги, ещё до того, как их внести.",
      media: { kind: "mac-mockup", screenshot: "/cases/imported-kassa-01.jpg", alt: "Депозит, вывод и история: три вкладки с первого экрана" },
    },
    sections: [html("kassa")],
  },
  {
    slug: "challenge",
    title: "Награда за сегодня. Повод вернуться завтра",
    tagline: "[02] Ежедневный челлендж · Кешбек и семидневная серия",
    intro: "Ежедневный челлендж с кешбеком на трейдинговой платформе. Платформа возвращала часть денег за неудачные сделки, но трейдер не видел, сколько ему положено и когда это забрать. Я превратил кешбек в семидневную серию: награда за каждый день, забрать её нужно самому.",
    preview: {
      variant: "wide",
      tags: ["Engagement", "Retention", "Feature concept"],
      description: "Семидневная серия, в которой кешбек становится поводом зайти завтра.",
      media: { kind: "laptop", src: "/cases/imported-challenge-01.png" },
    },
    sections: [html("challenge")],
  },
  {
    slug: "home",
    title: "Новичку — первый шаг. Партнёру — его цифры",
    tagline: "[03] Главная кабинета партнёра · Редизайн Home",
    intro: "Редизайн главной страницы кабинета партнёров трейдинговой платформы. Раньше на ней был каталог офферов. Теперь страница собирается под партнёра: у кого меньше 5 FTD, тот видит шаги и калькулятор дохода, остальные — свои ключевые метрики.",
    preview: {
      variant: "wide",
      tags: ["Partnership", "Affiliate cabinet"],
      description: "Главная, которая перестраивается под новичка и под партнёра с трафиком.",
      media: { kind: "laptop", src: "/cases/imported-home-01.png" },
    },
    sections: [html("home")],
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}

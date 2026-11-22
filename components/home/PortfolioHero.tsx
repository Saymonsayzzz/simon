import { cases } from "@/data/cases";

export function PortfolioHero() {
  return (
    <section id="top" className="portfolio-hero portfolio-wrap">
      <div className="portfolio-hero__eyebrow">Product designer · 5+ лет в финтехе</div>
      <h1>
        Проектирую продукты,
        <br />
        которые помогают <em>двигаться дальше.</em>
      </h1>
      <div className="portfolio-hero__meta">
        <div>
          <span>Сейчас</span>
          <p>Работаю с финтех-продуктами, партнёрскими платформами и веб-сервисами.</p>
        </div>
        <div>
          <span>Фокус</span>
          <p>Платёжные сценарии, активация, retention и дизайн-системы.</p>
        </div>
      </div>
      <div className="portfolio-index" aria-label="Избранные кейсы">
        {cases.map((item, index) => {
          const firstMetric = item.sections
            .flatMap((section) => {
              if (section.type === "result") return section.metrics;
              if (section.type === "two-column") return section.right.metrics ?? [];
              return [];
            })
            .at(0);
          return (
            <a key={item.slug} href={`#${item.slug}`} className="portfolio-index__row">
              <span className="portfolio-index__number">0{index + 1}</span>
              <strong>{item.title}</strong>
              <span className="portfolio-index__tag">{item.tagline}</span>
              <span className="portfolio-index__fact">
                {firstMetric ? <b>{firstMetric.value}</b> : "Case study"} {firstMetric?.label ?? item.preview.description}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

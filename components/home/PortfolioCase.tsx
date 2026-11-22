"use client";

import { motion } from "framer-motion";
import type { Case, CaseSection } from "@/data/cases";
import { MacMockup } from "@/components/home/MacMockup";

function getMetrics(data: Case) {
  return data.sections.flatMap((section) => {
    if (section.type === "result") return section.metrics;
    if (section.type === "two-column") return section.right.metrics ?? [];
    return [];
  }).slice(0, 3);
}

function CaseVisual({ data }: { data: Case }) {
  const media = data.preview.media;
  if (media.kind === "mac-mockup") {
    return <MacMockup src={media.screenshot} alt={media.alt} />;
  }
  if (media.kind === "phone-single") {
    return <img className="portfolio-case-visual__phone" src={media.src} alt="" />;
  }
  if (media.kind === "phones-trio") {
    return (
      <div className="portfolio-case-visual__phones" aria-hidden>
        <img src="/cases/aff-phone-1.png" alt="" />
        <img src="/cases/aff-phone-2.png" alt="" />
        <img src="/cases/aff-phone-3.png" alt="" />
      </div>
    );
  }
  if (media.kind === "laptop") {
    return <img className="portfolio-case-visual__image" src={media.src} alt="" />;
  }
  if (media.kind === "video") {
    return <video className="portfolio-case-visual__image" src={media.src} poster={media.poster} autoPlay muted loop playsInline />;
  }
  return <div className="portfolio-case-visual__placeholder" />;
}

function Section({ section }: { section: CaseSection }) {
  if (section.type === "two-column") {
    return (
      <div className="portfolio-story-block portfolio-story-block--split">
        <div>
          <span className="portfolio-story-label">{section.left.title}</span>
          {section.left.body && <p>{section.left.body}</p>}
        </div>
        <div>
          <span className="portfolio-story-label">{section.right.title}</span>
          {section.right.body && <p>{section.right.body}</p>}
          {section.right.metrics && (
            <div className="portfolio-inline-metrics">
              {section.right.metrics.map((metric) => (
                <div key={`${metric.value}-${metric.label}`}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (section.type === "image") {
    return (
      <figure className="portfolio-story-media">
        <img src={section.src} alt={section.alt} />
        {section.caption && <figcaption>{section.caption}</figcaption>}
      </figure>
    );
  }

  if (section.type === "quote") {
    return <blockquote className="portfolio-story-quote">“{section.text}”</blockquote>;
  }

  if (section.type === "stats") {
    return (
      <div className="portfolio-story-stats">
        {section.items.map((item) => (
          <div key={`${item.value}-${item.label}`}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (section.type === "steps") {
    return (
      <div className="portfolio-story-steps">
        {section.title && <span className="portfolio-story-label">{section.title}</span>}
        <div>
          {section.items.map((item) => (
            <article key={item.num}>
              <span>{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (section.type === "result") {
    return (
      <div className="portfolio-story-result">
        <span className="portfolio-story-label">{section.title ?? "Результат"}</span>
        <div className="portfolio-story-stats">
          {section.metrics.map((metric) => (
            <div key={`${metric.value}-${metric.label}`}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
        {section.note && <p className="portfolio-story-note">{section.note}</p>}
      </div>
    );
  }

  return (
    <div className="portfolio-story-block">
      {section.title && <span className="portfolio-story-label">{section.title}</span>}
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.bullets && (
        <ul>
          {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      )}
    </div>
  );
}

export function PortfolioCase({ data, index }: { data: Case; index: number }) {
  const metrics = getMetrics(data);
  return (
    <motion.article
      id={data.slug}
      className="portfolio-case"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12%" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      <motion.div className="portfolio-case__head" variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}>
        <div className="portfolio-case__eyebrow">[0{index + 1}] {data.title}</div>
        <h2>{data.intro.split(".")[0]}.</h2>
        <p>{data.intro}</p>
        <dl className="portfolio-case__meta">
          <div><dt>Проект</dt><dd>{data.tagline}</dd></div>
          <div><dt>Роль</dt><dd>Product Designer · end to end</dd></div>
          <div><dt>Зона</dt><dd>{data.preview.tags.join(" · ")}</dd></div>
        </dl>
      </motion.div>

      <motion.div className="portfolio-case-visual" variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}>
        <CaseVisual data={data} />
      </motion.div>

      {metrics.length > 0 && (
        <motion.div className="portfolio-case-metrics" variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}>
          {metrics.map((metric) => (
            <div key={`${metric.value}-${metric.label}`}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </motion.div>
      )}

      <div className="portfolio-case-progress" aria-label="Этапы кейса">
        <span>01 Context</span><span>02 Design</span><span>03 Results</span>
      </div>

      <div className="portfolio-case__sections">
        {data.sections.map((section, sectionIndex) => (
          <motion.div key={sectionIndex} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <Section section={section} />
          </motion.div>
        ))}
      </div>
      <a className="portfolio-case__back" href="#top">↑ В начало</a>
    </motion.article>
  );
}

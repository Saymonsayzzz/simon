export function PortfolioAbout() {
  return (
    <section className="portfolio-about portfolio-wrap">
      <div className="portfolio-about__header">
        <span>Как я работаю</span>
        <h2>От наблюдения за поведением до решения, которое можно запустить.</h2>
      </div>
      <div className="portfolio-about__grid">
        <article><strong>01</strong><h3>Нахожу точку потери</h3><p>Собираю контекст из данных, интервью и обратной связи команды.</p></article>
        <article><strong>02</strong><h3>Формулирую ставку</h3><p>Перевожу наблюдение в сценарий, гипотезу и измеримый результат.</p></article>
        <article><strong>03</strong><h3>Довожу до продакшна</h3><p>Проектирую состояния, проверяю реализацию и смотрю на эффект после запуска.</p></article>
      </div>
    </section>
  );
}

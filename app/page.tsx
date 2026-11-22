import { cases } from "@/data/cases";
import { PortfolioAbout } from "@/components/home/PortfolioAbout";
import { PortfolioCase } from "@/components/home/PortfolioCase";
import { PortfolioChrome } from "@/components/home/PortfolioChrome";
import { PortfolioHero } from "@/components/home/PortfolioHero";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="portfolio-page">
      <PortfolioChrome />
      <PortfolioHero />
      <div className="portfolio-work portfolio-wrap" id="work">
        {cases.map((item, index) => <PortfolioCase key={item.slug} data={item} index={index} />)}
      </div>
      <PortfolioAbout />
      <Footer />
    </main>
  );
}

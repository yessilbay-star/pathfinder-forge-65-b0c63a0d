import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Brain, Compass, GraduationCap, LineChart, Sparkles, Users, CheckCircle2, Clock, Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ПрофНавигатор — найди свою профессию за 5 минут" },
      { name: "description", content: "Пройди научный тест профориентации, получи персональные рекомендации профессий и составь карьерный трек." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <PopularTests />
        <HowItWorks />
        <AtlasTeaser />
        <Reviews />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 animate-circus-color-shift" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-yellow-400 opacity-80 animate-circus-bounce" />
      <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-primary opacity-70 animate-circus-float" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-accent opacity-60 animate-circus-spin" style={{ animationDuration: "10s" }} />
      <div className="absolute bottom-10 right-10 w-14 h-14 rounded-full bg-secondary opacity-90 animate-circus-float" style={{ animationDelay: "1s" }} />
      
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
        <div className="animate-circus-slide-in-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/60 px-3 py-1 text-xs font-semibold text-primary animate-circus-pulse-glow">
            <Sparkles className="h-3.5 w-3.5 animate-circus-spin" /> {t.hero.badge}
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {t.hero.titleA}<br />
            {t.hero.titleB} <span className="text-primary animate-circus-bounce inline-block">{t.hero.titleAccent}</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">{t.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/test" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:brightness-110 border-2 border-yellow-400 animate-circus-pulse-glow hover:scale-105 transition-transform">
              {t.hero.ctaPrimary} <ArrowRight className="h-4 w-4 animate-circus-bounce" />
            </Link>
            <a href="#how" className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-card px-6 py-3 text-base font-semibold text-ink transition-colors hover:bg-yellow-400 hover:text-black hover:scale-105 transition-transform">
              {t.hero.ctaSecondary}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary animate-circus-float" /> {t.hero.meta.time}</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary animate-circus-float" style={{ animationDelay: "0.3s" }} /> {t.hero.meta.noReg}</span>
            <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 text-primary animate-circus-float" style={{ animationDelay: "0.6s" }} /> {t.hero.meta.rating}</span>
          </div>
        </div>
        <div className="relative animate-circus-slide-in-right">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/10 blur-2xl animate-circus-color-shift" />
          <img src={heroImg} alt={t.hero.alt} width={1280} height={960} className="w-full rounded-[1.75rem] border-4 border-yellow-400 bg-card shadow-[var(--shadow-soft)] animate-circus-float" />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const { t } = useI18n();
  const items = [
    { v: "120K+", l: t.stats.passed },
    { v: "500+", l: t.stats.professions },
    { v: "180", l: t.stats.consultants },
    { v: "92%", l: t.stats.satisfied },
  ];
  return (
    <section className="border-y border-border/60 bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.l} className="text-center">
            <div className="font-display text-3xl font-bold text-ink">{i.v}</div>
            <div className="mt-1 text-sm text-muted-foreground">{i.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PopularTests() {
  const { t } = useI18n();
  const icons = [Compass, Brain, LineChart];
  return (
    <section id="tests" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHead eyebrow={t.popular.eyebrow} title={t.popular.title} subtitle={t.popular.subtitle} />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {t.popular.items.map((item, idx) => {
          const Icon = icons[idx];
          const featured = idx === 0;
          const tagLabel = item.tag === "pro" ? t.popular.pro : t.popular.free;
          return (
            <div key={item.title} className="group relative rounded-2xl border-2 border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-2 hover:border-primary/60 hover:shadow-lg animate-circus-slide-in-up" style={{ animationDelay: `${idx * 0.2}s` }}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-yellow-400 text-white animate-circus-bounce">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
              <div className="mt-5 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-3.5 w-3.5 animate-circus-spin" style={{ animationDuration: "6s" }} /> {item.time}</span>
                <span className={`rounded-full px-2.5 py-0.5 font-semibold ${item.tag === "pro" ? "bg-gradient-to-r from-accent to-blue-500 text-accent-foreground animate-circus-pulse-glow" : "bg-gradient-to-r from-primary-soft to-yellow-200 text-primary"}`}>{tagLabel}</span>
              </div>
              {featured && (
                <Link to="/test" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all animate-circus-float">
                  {t.popular.passNow} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function HowItWorks() {
  const { t } = useI18n();
  const icons = [Brain, Sparkles, GraduationCap];
  return (
    <section id="how" className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead eyebrow={t.how.eyebrow} title={t.how.title} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.how.steps.map((s, idx) => {
            const Icon = icons[idx];
            const n = String(idx + 1).padStart(2, "0");
            return (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-2xl font-bold text-primary/30">{n}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AtlasTeaser() {
  const { t } = useI18n();
  return (
    <section id="atlas" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHead eyebrow={t.atlas.eyebrow} title={t.atlas.title} subtitle={t.atlas.subtitle} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.atlas.items.map((i) => (
          <div key={i.n} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-[var(--shadow-soft)]">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-2xl">{i.e}</span>
            <div>
              <div className="font-semibold text-ink">{i.n}</div>
              <div className="text-sm text-muted-foreground">{i.s}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const { t } = useI18n();
  return (
    <section id="reviews" className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead eyebrow={t.reviews.eyebrow} title={t.reviews.title} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.reviews.items.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink">«{r.text}»</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Users className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 px-6 py-14 text-center sm:px-12" style={{ background: "var(--gradient-primary)" }}>
        <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">{t.cta.title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">{t.cta.subtitle}</p>
        <Link to="/test" className="mt-7 inline-flex items-center gap-2 rounded-full bg-card px-7 py-3.5 text-base font-semibold text-ink shadow-lg transition-transform hover:scale-[1.02]">
          {t.cta.button} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</div>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

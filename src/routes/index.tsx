import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Brain, Compass, GraduationCap, LineChart, Sparkles, Users, CheckCircle2, Clock, Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

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
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/60 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI-рекомендации внутри
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Найди профессию,<br />
            в которой ты <span className="text-primary">расцветёшь</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Научные тесты, атлас из 500+ профессий и консультации с экспертами — всё, чтобы выбрать карьерный путь осознанно.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/test"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:brightness-110"
            >
              Пройти тест бесплатно <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-base font-semibold text-ink transition-colors hover:bg-secondary"
            >
              Как это работает
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> 5–7 минут</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Без регистрации</span>
            <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 text-primary" /> 4.9 / 5</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/10 blur-2xl" />
          <img
            src={heroImg}
            alt="Иллюстрация профориентационной платформы"
            width={1280}
            height={960}
            className="w-full rounded-[1.75rem] border border-border bg-card shadow-[var(--shadow-soft)]"
          />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { v: "120K+", l: "прошли тест" },
    { v: "500+", l: "профессий в атласе" },
    { v: "180", l: "консультантов" },
    { v: "92%", l: "довольны результатом" },
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
  const tests = [
    { icon: Compass, title: "Тест Холланда (RIASEC)", desc: "Определяет твой профессиональный тип личности.", time: "5 мин", tag: "Бесплатно", featured: true },
    { icon: Brain, title: "Методика Климова", desc: "Выявляет склонность к 5 сферам деятельности.", time: "8 мин", tag: "Бесплатно" },
    { icon: LineChart, title: "Карьерные ценности", desc: "Что для тебя по-настоящему важно в работе.", time: "6 мин", tag: "Pro" },
  ];
  return (
    <section id="tests" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHead eyebrow="Тесты" title="Популярные методики" subtitle="Научно обоснованные тесты, адаптированные под подростков и взрослых." />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {tests.map((t) => (
          <div key={t.title} className="group relative rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-primary/40">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <t.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{t.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{t.desc}</p>
            <div className="mt-5 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-3.5 w-3.5" /> {t.time}</span>
              <span className={`rounded-full px-2.5 py-0.5 font-semibold ${t.tag === "Pro" ? "bg-accent text-accent-foreground" : "bg-primary-soft text-primary"}`}>{t.tag}</span>
            </div>
            {t.featured && (
              <Link to="/test" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                Пройти сейчас <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", icon: Brain, title: "Пройди тест", desc: "Ответь на короткие вопросы — без правильных и неправильных ответов." },
    { n: "02", icon: Sparkles, title: "Получи AI-анализ", desc: "Алгоритм построит твой профиль склонностей и подберёт профессии." },
    { n: "03", icon: GraduationCap, title: "Выбери путь", desc: "Изучи карточки профессий, курсов и при желании запишись к консультанту." },
  ];
  return (
    <section id="how" className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead eyebrow="Как это работает" title="Три шага к ясности" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-7">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-2xl font-bold text-primary/30">{s.n}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AtlasTeaser() {
  const items = [
    { e: "💻", n: "Frontend-разработчик", s: "от 120 тыс ₽" },
    { e: "🎨", n: "UX/UI-дизайнер", s: "от 100 тыс ₽" },
    { e: "📊", n: "Data Scientist", s: "от 180 тыс ₽" },
    { e: "🧠", n: "Психолог", s: "от 60 тыс ₽" },
    { e: "🚀", n: "Продакт-менеджер", s: "от 180 тыс ₽" },
    { e: "🎬", n: "Видеомонтажёр", s: "от 80 тыс ₽" },
  ];
  return (
    <section id="atlas" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHead eyebrow="Атлас профессий" title="500+ профессий — с зарплатами и навыками" subtitle="Данные обновляются по hh.ru. Сохраняй понравившиеся в избранное." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
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
  const reviews = [
    { name: "Анна, 17 лет", text: "Я думала, что хочу в медицину, но тест показал склонность к дизайну. Сейчас учусь на UX — и счастлива!", role: "школьница" },
    { name: "Михаил, 34 года", text: "Сменил профессию из логистики в аналитику данных. Консультант помог составить план на 6 месяцев.", role: "свитчер" },
    { name: "Елена, мама Артёма", text: "Сын получил понятный отчёт, мы вместе обсудили варианты вузов. Очень полезно перед поступлением.", role: "родитель" },
  ];
  return (
    <section id="reviews" className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead eyebrow="Отзывы" title="Что говорят пользователи" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
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
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div
        className="relative overflow-hidden rounded-3xl border border-primary/20 px-6 py-14 text-center sm:px-12"
        style={{ background: "var(--gradient-primary)" }}
      >
        <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
          Готов узнать, что тебе подходит?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">
          Бесплатный тест за 5 минут. Без регистрации. Результат сразу.
        </p>
        <Link
          to="/test"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-card px-7 py-3.5 text-base font-semibold text-ink shadow-lg transition-transform hover:scale-[1.02]"
        >
          Начать тест <ArrowRight className="h-4 w-4" />
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

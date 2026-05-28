import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QUESTIONS, SCALES, PROFESSIONS, type RiasecCode } from "@/lib/test-data";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles, Heart } from "lucide-react";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Демо-тест профориентации — ПрофНавигатор" },
      { name: "description", content: "Короткий тест на основе методики Холланда. Узнай свой профессиональный тип за 5 минут." },
    ],
  }),
  component: TestPage,
});

const ANSWER_OPTIONS = [
  { v: 0, l: "Совсем нет" },
  { v: 1, l: "Скорее нет" },
  { v: 2, l: "Скорее да" },
  { v: 3, l: "Точно да" },
];

function TestPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [favs, setFavs] = useState<Set<string>>(new Set());

  const total = QUESTIONS.length;
  const q = QUESTIONS[step];
  const progress = done ? 100 : Math.round((step / total) * 100);

  const pick = (v: number) => {
    setAnswers((a) => ({ ...a, [q.id]: v }));
    setTimeout(() => {
      if (step < total - 1) setStep(step + 1);
      else setDone(true);
    }, 180);
  };

  const scores = useMemo(() => {
    const s: Record<RiasecCode, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    for (const qq of QUESTIONS) s[qq.code] += answers[qq.id] ?? 0;
    return s;
  }, [answers]);

  const ordered = useMemo(() => {
    return (Object.entries(scores) as [RiasecCode, number][])
      .sort((a, b) => b[1] - a[1]);
  }, [scores]);

  const topCodes = ordered.slice(0, 3).map(([c]) => c);

  const matches = useMemo(() => {
    return PROFESSIONS
      .map((p) => {
        const score = p.tags.reduce((acc, t) => acc + (scores[t] ?? 0), 0);
        const bonus = p.tags.every((t) => topCodes.includes(t)) ? 5 : 0;
        return { ...p, score: score + bonus };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [scores, topCodes]);

  const toggleFav = (name: string) => {
    setFavs((f) => {
      const n = new Set(f);
      if (n.has(name)) n.delete(name); else n.add(name);
      return n;
    });
  };

  const restart = () => { setAnswers({}); setStep(0); setDone(false); };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {!done ? (
          <>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Тест Холланда (RIASEC)</span>
              <span>Вопрос {step + 1} из {total}</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-10 rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] sm:p-10 font-mono opacity-40">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">Утверждение</div>
              <h1 className="mt-2 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                {q.text}
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">Насколько это про тебя?</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {ANSWER_OPTIONS.map((opt) => {
                  const selected = answers[q.id] === opt.v;
                  return (
                    <button
                      key={opt.v}
                      onClick={() => pick(opt.v)}
                      className={`group flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-base font-medium transition-all ${
                        selected
                          ? "border-primary bg-primary-soft text-ink shadow-[var(--shadow-soft)]"
                          : "border-border bg-card text-ink hover:border-primary/40 hover:bg-secondary"
                      }`}
                    >
                      <span>{opt.l}</span>
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                        {selected && <span className="h-2 w-2 rounded-full bg-current" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" /> Назад
                </button>
                <div className="text-xs text-muted-foreground">Ответ сохраняется автоматически</div>
              </div>
            </div>
          </>
        ) : (
          <Results scores={scores} ordered={ordered} matches={matches} favs={favs} toggleFav={toggleFav} restart={restart} />
        )}
      </main>
      <Footer />
    </div>
  );
}

function Results({
  scores, ordered, matches, favs, toggleFav, restart,
}: {
  scores: Record<RiasecCode, number>;
  ordered: [RiasecCode, number][];
  matches: { name: string; emoji: string; desc: string; salary: string; tags: RiasecCode[]; score: number }[];
  favs: Set<string>;
  toggleFav: (n: string) => void;
  restart: () => void;
}) {
  const max = Math.max(...Object.values(scores), 1);
  const topCode = ordered[0][0];
  const topLabel = SCALES[topCode].label;

  return (
    <div className="space-y-8">
      <div
        className="overflow-hidden rounded-3xl border border-primary/20 p-8 sm:p-10"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-semibold text-primary shadow-sm">
          <Sparkles className="h-3.5 w-3.5" /> Твой результат готов
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Ты — <span className="text-primary">{topLabel.toLowerCase()}</span> тип
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          {SCALES[topCode].desc}. На основе твоих ответов мы подобрали профессии, в которых ты с большой вероятностью реализуешься.
        </p>
      </div>

      <section className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] sm:p-9">
        <h2 className="font-display text-xl font-semibold text-ink">Профиль склонностей</h2>
        <p className="mt-1 text-sm text-muted-foreground">Шесть шкал методики Холланда (RIASEC)</p>
        <div className="mt-6 grid gap-5 md:grid-cols-[260px_1fr] md:items-center">
          <RadarChart scores={scores} />
          <ul className="space-y-3">
            {ordered.map(([code, val]) => (
              <li key={code}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-semibold text-ink">{SCALES[code].label}</span>
                  <span className="text-muted-foreground">{val}/{QUESTIONS.filter(q=>q.code===code).length * 3}</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${(val / max) * 100}%` }} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{SCALES[code].desc}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Подходящие профессии</h2>
            <p className="mt-1 text-sm text-muted-foreground">Сохрани понравившиеся — мы добавим их в избранное.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {matches.map((p) => {
            const fav = favs.has(p.name);
            return (
              <div key={p.name} className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-2xl">{p.emoji}</span>
                  <button
                    onClick={() => toggleFav(p.name)}
                    aria-label="В избранное"
                    className={`rounded-full p-2 transition-colors ${fav ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-secondary"}`}
                  >
                    <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
                  </button>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">{p.salary}</span>
                  <div className="flex gap-1">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        {SCALES[t].label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border bg-card p-6">
        <div>
          <div className="font-display text-lg font-semibold text-ink">Хочешь расширенный отчёт и PDF?</div>
          <div className="text-sm text-muted-foreground">Сохрани результат в личном кабинете и обсуди его с консультантом.</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={restart}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-secondary"
          >
            <RotateCcw className="h-4 w-4" /> Пройти заново
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            На главную <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function RadarChart({ scores }: { scores: Record<RiasecCode, number> }) {
  const codes: RiasecCode[] = ["R", "I", "A", "S", "E", "C"];
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const r = 90;
  const maxVal = Math.max(6, ...Object.values(scores));

  const pt = (i: number, val: number) => {
    const angle = (Math.PI * 2 * i) / codes.length - Math.PI / 2;
    const radius = (val / maxVal) * r;
    return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
  };
  const labelPt = (i: number) => {
    const angle = (Math.PI * 2 * i) / codes.length - Math.PI / 2;
    return [cx + Math.cos(angle) * (r + 18), cy + Math.sin(angle) * (r + 18)];
  };

  const polyPoints = codes.map((c, i) => pt(i, scores[c]).join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[260px]">
      {[0.33, 0.66, 1].map((f) => (
        <polygon
          key={f}
          points={codes.map((_, i) => {
            const angle = (Math.PI * 2 * i) / codes.length - Math.PI / 2;
            return [cx + Math.cos(angle) * r * f, cy + Math.sin(angle) * r * f].join(",");
          }).join(" ")}
          fill="none"
          stroke="oklch(0.92 0.015 165)"
          strokeWidth={1}
        />
      ))}
      {codes.map((_, i) => {
        const [x, y] = pt(i, maxVal);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="oklch(0.92 0.015 165)" strokeWidth={1} />;
      })}
      <polygon points={polyPoints} fill="oklch(0.66 0.16 162 / 0.25)" stroke="oklch(0.66 0.16 162)" strokeWidth={2} />
      {codes.map((c, i) => {
        const [x, y] = pt(i, scores[c]);
        return <circle key={c} cx={x} cy={y} r={3.5} fill="oklch(0.66 0.16 162)" />;
      })}
      {codes.map((c, i) => {
        const [x, y] = labelPt(i);
        return (
          <text key={c} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            fontSize={11} fontWeight={600} fill="oklch(0.18 0.03 250)">
            {c}
          </text>
        );
      })}
    </svg>
  );
}

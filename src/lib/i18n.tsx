import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { RiasecCode } from "@/lib/test-data";

export type Lang = "ru" | "kk";

type Dict = {
  nav: { tests: string; atlas: string; how: string; reviews: string; cta: string };
  footer: { tagline: string; product: string; company: string; rights: string; links: { tests: string; atlas: string; consult: string; about: string; blog: string; contacts: string } };
  hero: { badge: string; titleA: string; titleB: string; titleAccent: string; subtitle: string; ctaPrimary: string; ctaSecondary: string; meta: { time: string; noReg: string; rating: string }; alt: string };
  stats: { passed: string; professions: string; consultants: string; satisfied: string };
  popular: { eyebrow: string; title: string; subtitle: string; passNow: string; free: string; pro: string; items: { title: string; desc: string; time: string; tag: "free" | "pro" }[] };
  how: { eyebrow: string; title: string; steps: { title: string; desc: string }[] };
  atlas: { eyebrow: string; title: string; subtitle: string; items: { e: string; n: string; s: string }[] };
  reviews: { eyebrow: string; title: string; items: { name: string; text: string; role: string }[] };
  cta: { title: string; subtitle: string; button: string };
  test: {
    metaTitle: string; metaDesc: string;
    method: string; questionOf: (a: number, b: number) => string;
    statement: string; howMuchYou: string; back: string; autosave: string;
    answers: string[];
    resultReady: string; youAre: (type: string) => ReactNode; resultIntroSuffix: string;
    profile: string; profileSub: string;
    matches: string; matchesSub: string;
    favLabel: string;
    extendedTitle: string; extendedSub: string; restart: string; toHome: string;
    questions: Record<number, string>;
    scales: Record<RiasecCode, { label: string; desc: string }>;
    professions: Record<string, { name: string; desc: string; salary: string }>;
  };
  switcher: { ru: string; kk: string };
};

const ru: Dict = {
  nav: { tests: "Тесты", atlas: "Атлас профессий", how: "Как это работает", reviews: "Отзывы", cta: "Пройти тест" },
  footer: {
    tagline: "Помогаем подросткам, студентам и взрослым найти профессию по душе через тесты, AI-анализ и консультации.",
    product: "Продукт", company: "Компания", rights: "Все права защищены.",
    links: { tests: "Тесты", atlas: "Атлас профессий", consult: "Консультации", about: "О нас", blog: "Блог", contacts: "Контакты" },
  },
  hero: {
    badge: "AI-рекомендации внутри",
    titleA: "Найди профессию,", titleB: "в которой ты", titleAccent: "расцветёшь",
    subtitle: "Научные тесты, атлас из 500+ профессий и консультации с экспертами — всё, чтобы выбрать карьерный путь осознанно.",
    ctaPrimary: "Пройти тест бесплатно", ctaSecondary: "Как это работает",
    meta: { time: "5–7 минут", noReg: "Без регистрации", rating: "4.9 / 5" },
    alt: "Иллюстрация профориентационной платформы",
  },
  stats: { passed: "прошли тест", professions: "профессий в атласе", consultants: "консультантов", satisfied: "довольны результатом" },
  popular: {
    eyebrow: "Тесты", title: "Популярные методики",
    subtitle: "Научно обоснованные тесты, адаптированные под подростков и взрослых.",
    passNow: "Пройти сейчас", free: "Бесплатно", pro: "Pro",
    items: [
      { title: "Тест Холланда (RIASEC)", desc: "Определяет твой профессиональный тип личности.", time: "5 мин", tag: "free" },
      { title: "Методика Климова", desc: "Выявляет склонность к 5 сферам деятельности.", time: "8 мин", tag: "free" },
      { title: "Карьерные ценности", desc: "Что для тебя по-настоящему важно в работе.", time: "6 мин", tag: "pro" },
    ],
  },
  how: {
    eyebrow: "Как это работает", title: "Три шага к ясности",
    steps: [
      { title: "Пройди тест", desc: "Ответь на короткие вопросы — без правильных и неправильных ответов." },
      { title: "Получи AI-анализ", desc: "Алгоритм построит твой профиль склонностей и подберёт профессии." },
      { title: "Выбери путь", desc: "Изучи карточки профессий, курсов и при желании запишись к консультанту." },
    ],
  },
  atlas: {
    eyebrow: "Атлас профессий", title: "500+ профессий — с зарплатами и навыками",
    subtitle: "Данные обновляются по hh.ru. Сохраняй понравившиеся в избранное.",
    items: [
      { e: "💻", n: "Frontend-разработчик", s: "от 120 тыс ₽" },
      { e: "🎨", n: "UX/UI-дизайнер", s: "от 100 тыс ₽" },
      { e: "📊", n: "Data Scientist", s: "от 180 тыс ₽" },
      { e: "🧠", n: "Психолог", s: "от 60 тыс ₽" },
      { e: "🚀", n: "Продакт-менеджер", s: "от 180 тыс ₽" },
      { e: "🎬", n: "Видеомонтажёр", s: "от 80 тыс ₽" },
    ],
  },
  reviews: {
    eyebrow: "Отзывы", title: "Что говорят пользователи",
    items: [
      { name: "Анна, 17 лет", text: "Я думала, что хочу в медицину, но тест показал склонность к дизайну. Сейчас учусь на UX — и счастлива!", role: "школьница" },
      { name: "Михаил, 34 года", text: "Сменил профессию из логистики в аналитику данных. Консультант помог составить план на 6 месяцев.", role: "свитчер" },
      { name: "Елена, мама Артёма", text: "Сын получил понятный отчёт, мы вместе обсудили варианты вузов. Очень полезно перед поступлением.", role: "родитель" },
    ],
  },
  cta: {
    title: "Готов узнать, что тебе подходит?",
    subtitle: "Бесплатный тест за 5 минут. Без регистрации. Результат сразу.",
    button: "Начать тест",
  },
  test: {
    metaTitle: "Демо-тест профориентации — ПрофНавигатор",
    metaDesc: "Короткий тест на основе методики Холланда. Узнай свой профессиональный тип за 5 минут.",
    method: "Тест Холланда (RIASEC)",
    questionOf: (a, b) => `Вопрос ${a} из ${b}`,
    statement: "Утверждение", howMuchYou: "Насколько это про тебя?",
    back: "Назад", autosave: "Ответ сохраняется автоматически",
    answers: ["Совсем нет", "Скорее нет", "Скорее да", "Точно да"],
    resultReady: "Твой результат готов",
    youAre: (type) => <>Ты — <span className="text-primary">{type}</span> тип</>,
    resultIntroSuffix: ". На основе твоих ответов мы подобрали профессии, в которых ты с большой вероятностью реализуешься.",
    profile: "Профиль склонностей",
    profileSub: "Шесть шкал методики Холланда (RIASEC)",
    matches: "Подходящие профессии",
    matchesSub: "Сохрани понравившиеся — мы добавим их в избранное.",
    favLabel: "В избранное",
    extendedTitle: "Хочешь расширенный отчёт и PDF?",
    extendedSub: "Сохрани результат в личном кабинете и обсуди его с консультантом.",
    restart: "Пройти заново", toHome: "На главную",
    questions: {
      1: "Мне нравится работать руками: чинить, собирать, мастерить.",
      2: "Я могу подолгу разбираться в сложной задаче или головоломке.",
      3: "Я люблю рисовать, писать, придумывать что-то новое.",
      4: "Мне нравится помогать людям и объяснять им что-то.",
      5: "Я уверенно беру на себя роль лидера и могу убеждать.",
      6: "Я аккуратен и люблю работать со списками, таблицами, данными.",
      7: "Меня привлекает работа на улице или с техникой.",
      8: "Я люблю проводить эксперименты и анализировать факты.",
      9: "Я часто придумываю идеи, которые удивляют окружающих.",
      10: "Друзья обращаются ко мне за советом и поддержкой.",
      11: "Я хотел бы запустить собственный проект или бизнес.",
      12: "Я предпочитаю чёткие инструкции и понятные правила.",
    },
    scales: {
      R: { label: "Реалистичный", desc: "Техника, инструменты, практические задачи" },
      I: { label: "Исследовательский", desc: "Анализ, наука, эксперименты" },
      A: { label: "Артистичный", desc: "Творчество, дизайн, самовыражение" },
      S: { label: "Социальный", desc: "Помощь людям, обучение, забота" },
      E: { label: "Предприимчивый", desc: "Лидерство, влияние, бизнес" },
      C: { label: "Конвенциональный", desc: "Структура, данные, порядок" },
    },
    professions: {
      "Frontend-разработчик": { name: "Frontend-разработчик", desc: "Создаёт интерфейсы сайтов и приложений.", salary: "120–280 тыс ₽" },
      "Data Scientist": { name: "Data Scientist", desc: "Анализирует данные и строит ML-модели.", salary: "180–400 тыс ₽" },
      "UX/UI-дизайнер": { name: "UX/UI-дизайнер", desc: "Проектирует удобные и красивые продукты.", salary: "100–250 тыс ₽" },
      "Психолог": { name: "Психолог", desc: "Помогает людям разобраться в себе и отношениях.", salary: "60–200 тыс ₽" },
      "Продакт-менеджер": { name: "Продакт-менеджер", desc: "Управляет развитием цифрового продукта.", salary: "180–400 тыс ₽" },
      "Инженер-механик": { name: "Инженер-механик", desc: "Проектирует и обслуживает технику.", salary: "90–220 тыс ₽" },
      "Маркетолог": { name: "Маркетолог", desc: "Привлекает клиентов и развивает бренд.", salary: "90–250 тыс ₽" },
      "Бухгалтер": { name: "Бухгалтер", desc: "Ведёт финансовый учёт компании.", salary: "70–180 тыс ₽" },
      "Учитель": { name: "Учитель", desc: "Обучает и вдохновляет учеников.", salary: "50–130 тыс ₽" },
      "Видеомонтажёр": { name: "Видеомонтажёр", desc: "Создаёт видеоконтент и спецэффекты.", salary: "80–200 тыс ₽" },
    },
  },
  switcher: { ru: "RU", kk: "ҚАЗ" },
};

const kk: Dict = {
  nav: { tests: "Тесттер", atlas: "Кәсіптер атласы", how: "Қалай жұмыс істейді", reviews: "Пікірлер", cta: "Тестті өту" },
  footer: {
    tagline: "Жасөспірімдерге, студенттерге және ересектерге тесттер, AI-талдау және кеңестер арқылы өздеріне жақын кәсіпті табуға көмектесеміз.",
    product: "Өнім", company: "Компания", rights: "Барлық құқықтар қорғалған.",
    links: { tests: "Тесттер", atlas: "Кәсіптер атласы", consult: "Кеңестер", about: "Біз туралы", blog: "Блог", contacts: "Байланыс" },
  },
  hero: {
    badge: "Ішінде AI-ұсыныстар",
    titleA: "Өзіңе сай", titleB: "ашылатын", titleAccent: "кәсіпті тап",
    subtitle: "Ғылыми тесттер, 500+ кәсіптен тұратын атлас және сарапшылармен кеңес — мансапты саналы таңдау үшін бәрі.",
    ctaPrimary: "Тестті тегін өту", ctaSecondary: "Қалай жұмыс істейді",
    meta: { time: "5–7 минут", noReg: "Тіркеусіз", rating: "4.9 / 5" },
    alt: "Кәсіптік бағдарлау платформасының иллюстрациясы",
  },
  stats: { passed: "тестті өтті", professions: "атластағы кәсіптер", consultants: "кеңесшілер", satisfied: "нәтижеге риза" },
  popular: {
    eyebrow: "Тесттер", title: "Танымал әдістемелер",
    subtitle: "Жасөспірімдер мен ересектерге бейімделген ғылыми негізделген тесттер.",
    passNow: "Қазір өту", free: "Тегін", pro: "Pro",
    items: [
      { title: "Холланд тесті (RIASEC)", desc: "Сенің кәсіби тұлғалық түріңді анықтайды.", time: "5 мин", tag: "free" },
      { title: "Климов әдістемесі", desc: "5 қызмет саласына бейімділікті анықтайды.", time: "8 мин", tag: "free" },
      { title: "Мансаптық құндылықтар", desc: "Жұмыста сен үшін шынымен не маңызды.", time: "6 мин", tag: "pro" },
    ],
  },
  how: {
    eyebrow: "Қалай жұмыс істейді", title: "Айқындыққа үш қадам",
    steps: [
      { title: "Тестті өт", desc: "Қысқа сұрақтарға жауап бер — дұрыс не бұрыс жауап жоқ." },
      { title: "AI-талдау ал", desc: "Алгоритм бейімділік профиліңді құрып, кәсіптерді ұсынады." },
      { title: "Жолды таңда", desc: "Кәсіптер мен курстар карточкаларын зертте, қажет болса кеңесшіге жазыл." },
    ],
  },
  atlas: {
    eyebrow: "Кәсіптер атласы", title: "500+ кәсіп — жалақысы мен дағдыларымен",
    subtitle: "Деректер hh.ru бойынша жаңартылады. Ұнағандарын таңдаулыларға сақта.",
    items: [
      { e: "💻", n: "Frontend-әзірлеуші", s: "120 мың ₽-ден" },
      { e: "🎨", n: "UX/UI-дизайнер", s: "100 мың ₽-ден" },
      { e: "📊", n: "Data Scientist", s: "180 мың ₽-ден" },
      { e: "🧠", n: "Психолог", s: "60 мың ₽-ден" },
      { e: "🚀", n: "Өнім менеджері", s: "180 мың ₽-ден" },
      { e: "🎬", n: "Бейне монтаждаушы", s: "80 мың ₽-ден" },
    ],
  },
  reviews: {
    eyebrow: "Пікірлер", title: "Қолданушылар не дейді",
    items: [
      { name: "Анна, 17 жас", text: "Медицинаға барам деп ойлағам, бірақ тест дизайнға бейімділік көрсетті. Қазір UX оқып жүрмін — бақыттымын!", role: "оқушы" },
      { name: "Михаил, 34 жас", text: "Логистикадан деректер талдауына көштім. Кеңесші 6 айлық жоспар құруға көмектесті.", role: "ауысушы" },
      { name: "Елена, Артёмның анасы", text: "Ұлым түсінікті есеп алды, бірге университет нұсқаларын талқыладық. Түсуге дейін өте пайдалы.", role: "ата-ана" },
    ],
  },
  cta: {
    title: "Саған не сай келетінін білгің келе ме?",
    subtitle: "5 минуттық тегін тест. Тіркеусіз. Нәтиже бірден.",
    button: "Тестті бастау",
  },
  test: {
    metaTitle: "Демо кәсіптік бағдарлау тесті — ПрофНавигатор",
    metaDesc: "Холланд әдістемесіне негізделген қысқа тест. Кәсіби түріңді 5 минутта біл.",
    method: "Холланд тесті (RIASEC)",
    questionOf: (a, b) => `${b}-ден ${a}-сұрақ`,
    statement: "Тұжырым", howMuchYou: "Бұл сен туралы қаншалықты?",
    back: "Артқа", autosave: "Жауап автоматты түрде сақталады",
    answers: ["Мүлдем жоқ", "Жоқ сияқты", "Иә сияқты", "Дәл солай"],
    resultReady: "Нәтижең дайын",
    youAre: (type) => <>Сен — <span className="text-primary">{type}</span> түрсің</>,
    resultIntroSuffix: ". Жауаптарың негізінде сен жоғары ықтималдықпен жүзеге асатын кәсіптерді таңдадық.",
    profile: "Бейімділік профилі",
    profileSub: "Холланд әдістемесінің алты шкаласы (RIASEC)",
    matches: "Сай келетін кәсіптер",
    matchesSub: "Ұнағандарын сақта — оларды таңдаулыларға қосамыз.",
    favLabel: "Таңдаулыларға",
    extendedTitle: "Кеңейтілген есеп пен PDF керек пе?",
    extendedSub: "Нәтижені жеке кабинетте сақта және кеңесшімен талқыла.",
    restart: "Қайта өту", toHome: "Басты бетке",
    questions: {
      1: "Маған қолмен жұмыс істеу ұнайды: жөндеу, құрастыру, жасау.",
      2: "Күрделі есеп немесе жұмбақпен ұзақ айналыса аламын.",
      3: "Сурет салғанды, жазғанды, жаңа нәрсе ойлап тапқанды жақсы көремін.",
      4: "Адамдарға көмектескен және түсіндірген ұнайды.",
      5: "Көшбасшы рөлін сенімді алып, сендіре аламын.",
      6: "Мен ұқыптымын және тізімдермен, кестелермен, деректермен жұмыс істегенді ұнатамын.",
      7: "Далада немесе техникамен жұмыс істеу мені қызықтырады.",
      8: "Тәжірибелер жүргізіп, фактілерді талдағанды ұнатамын.",
      9: "Айналадағыларды таңқалдыратын идеялар жиі ойлап табамын.",
      10: "Достарым кеңес пен қолдау сұрап маған жүгінеді.",
      11: "Өз жобамды немесе бизнесімді ашқым келеді.",
      12: "Анық нұсқаулар мен түсінікті ережелерді жөн көремін.",
    },
    scales: {
      R: { label: "Реалистік", desc: "Техника, құралдар, тәжірибелік міндеттер" },
      I: { label: "Зерттеушілік", desc: "Талдау, ғылым, тәжірибелер" },
      A: { label: "Артистік", desc: "Шығармашылық, дизайн, өзін-өзі көрсету" },
      S: { label: "Әлеуметтік", desc: "Адамдарға көмек, оқыту, қамқорлық" },
      E: { label: "Кәсіпкерлік", desc: "Көшбасшылық, ықпал, бизнес" },
      C: { label: "Конвенциялық", desc: "Құрылым, деректер, тәртіп" },
    },
    professions: {
      "Frontend-разработчик": { name: "Frontend-әзірлеуші", desc: "Сайттар мен қосымшалардың интерфейстерін жасайды.", salary: "120–280 мың ₽" },
      "Data Scientist": { name: "Data Scientist", desc: "Деректерді талдап, ML-модельдерін құрады.", salary: "180–400 мың ₽" },
      "UX/UI-дизайнер": { name: "UX/UI-дизайнер", desc: "Ыңғайлы әрі әдемі өнімдерді жобалайды.", salary: "100–250 мың ₽" },
      "Психолог": { name: "Психолог", desc: "Адамдарға өзін және қарым-қатынасты түсінуге көмектеседі.", salary: "60–200 мың ₽" },
      "Продакт-менеджер": { name: "Өнім менеджері", desc: "Цифрлық өнімнің дамуын басқарады.", salary: "180–400 мың ₽" },
      "Инженер-механик": { name: "Инженер-механик", desc: "Техниканы жобалайды және қызмет көрсетеді.", salary: "90–220 мың ₽" },
      "Маркетолог": { name: "Маркетолог", desc: "Клиенттерді тартып, брендті дамытады.", salary: "90–250 мың ₽" },
      "Бухгалтер": { name: "Бухгалтер", desc: "Компанияның қаржылық есебін жүргізеді.", salary: "70–180 мың ₽" },
      "Учитель": { name: "Мұғалім", desc: "Оқушыларды оқытады және шабыттандырады.", salary: "50–130 мың ₽" },
      "Видеомонтажёр": { name: "Бейне монтаждаушы", desc: "Бейне-контент пен спецэффектілер жасайды.", salary: "80–200 мың ₽" },
    },
  },
  switcher: { ru: "RU", kk: "ҚАЗ" },
};

const DICTS: Record<Lang, Dict> = { ru, kk };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("lang") as Lang | null)) || null;
    if (saved === "ru" || saved === "kk") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
    if (typeof document !== "undefined") document.documentElement.lang = l === "kk" ? "kk" : "ru";
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: DICTS[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function LangSwitcher() {
  const { lang, setLang, t } = useI18n();
  const opts: Lang[] = ["ru", "kk"];
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-card p-0.5 text-xs font-semibold">
      {opts.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-ink"
          }`}
          aria-pressed={lang === l}
        >
          {t.switcher[l]}
        </button>
      ))}
    </div>
  );
}

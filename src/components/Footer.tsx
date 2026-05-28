import { Compass } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Compass className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold text-ink">ПрофНавигатор</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Помогаем подросткам, студентам и взрослым найти профессию по душе через тесты, AI-анализ и консультации.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">Продукт</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Тесты</li>
            <li>Атлас профессий</li>
            <li>Консультации</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">Компания</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>О нас</li>
            <li>Блог</li>
            <li>Контакты</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} ПрофНавигатор. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { LangSwitcher, useI18n } from "@/lib/i18n";

export function Header() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Compass className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold text-ink">ПрофНавигатор</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="/#tests" className="transition-colors hover:text-ink">{t.nav.tests}</a>
          <a href="/#atlas" className="transition-colors hover:text-ink">{t.nav.atlas}</a>
          <a href="/#how" className="transition-colors hover:text-ink">{t.nav.how}</a>
          <a href="/#reviews" className="transition-colors hover:text-ink">{t.nav.reviews}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitcher />
          <Link
            to="/test"
            className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110"
          >
            {t.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}

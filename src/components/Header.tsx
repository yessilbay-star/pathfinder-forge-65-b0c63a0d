import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { LangSwitcher, useI18n } from "@/lib/i18n";

export function Header() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-40 w-full border-b-4 border-primary bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-yellow-400 text-primary-foreground border-2 border-white animate-circus-pulse-glow">
            <Compass className="h-5 w-5 animate-circus-spin" />
          </span>
          <span className="font-display text-lg font-bold text-ink">ПрофНавигатор</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="/#tests" className="transition-all hover:text-primary hover:scale-110">{t.nav.tests}</a>
          <a href="/#atlas" className="transition-all hover:text-primary hover:scale-110">{t.nav.atlas}</a>
          <a href="/#how" className="transition-all hover:text-primary hover:scale-110">{t.nav.how}</a>
          <a href="/#reviews" className="transition-all hover:text-primary hover:scale-110">{t.nav.reviews}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitcher />
          <Link
            to="/test"
            className="inline-flex h-9 items-center rounded-full bg-gradient-to-r from-primary to-yellow-400 px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110 border-2 border-white animate-circus-pulse-glow hover:scale-105"
          >
            {t.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}

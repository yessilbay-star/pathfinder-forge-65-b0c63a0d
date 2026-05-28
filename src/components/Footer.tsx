import { Compass } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
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
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{t.footer.tagline}</p>
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">{t.footer.product}</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>{t.footer.links.tests}</li>
            <li>{t.footer.links.atlas}</li>
            <li>{t.footer.links.consult}</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">{t.footer.company}</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>{t.footer.links.about}</li>
            <li>{t.footer.links.blog}</li>
            <li>{t.footer.links.contacts}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} ПрофНавигатор. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}

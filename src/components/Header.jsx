import { Heart, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/contact";
import { useTourStore } from "@/store/useTourStore";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Ana səhifə", href: "#hero" },
  { label: "Xidmətlər", href: "#services" },
  { label: "Turlar", href: "#tours" },
  { label: "Əlaqə", href: "#contact" },
];

function Header() {
  const savedCount = useTourStore((state) => state.savedIds.length);
  const showSavedOnly = useTourStore((state) => state.showSavedOnly);
  const toggleShowSavedOnly = useTourStore((state) => state.toggleShowSavedOnly);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-24 w-[1200px] items-center justify-between px-10">
        <a href="#hero">
          <img src={logo} alt="Vintage Travel" className="h-14 w-auto" />
        </a>

        <nav className="flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b border-transparent pb-1 text-[15px] tracking-wide text-primary transition-colors hover:border-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Seçilmiş turlar varsa, onlara görə süzgəci aç/bağla */}
          {savedCount > 0 && (
            <Button
              variant={showSavedOnly ? "secondary" : "ghost"}
              onClick={toggleShowSavedOnly}
              aria-pressed={showSavedOnly}
              title={
                showSavedOnly
                  ? "Bütün turları göstər"
                  : "Yalnız seçilmişləri göstər"
              }
            >
              <Heart className={cn(showSavedOnly && "fill-primary")} />
              {savedCount}
            </Button>
          )}

          <Button asChild>
            <a href={`tel:${CONTACT.phoneHref}`}>
              <Phone />
              {CONTACT.phone}
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;

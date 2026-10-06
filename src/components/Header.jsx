import { Heart, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { AGENTS, PRIMARY_AGENT, whatsappLink } from "@/data/contact";
import { useTourStore } from "@/store/useTourStore";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Ana səhifə", href: "#hero" },
  { label: "Xidmətlər", href: "#services" },
  { label: "Turlar", href: "#tours" },
  { label: "Sifariş", href: "#booking" },
  { label: "Əlaqə", href: "#contact" },
];

// Əsas nömrə yuxarıda, qalanları ardınca
const headerAgents = [
  PRIMARY_AGENT,
  ...AGENTS.filter((agent) => agent.id !== PRIMARY_AGENT.id),
];

function Header() {
  const savedCount = useTourStore((state) => state.savedIds.length);
  const showSavedOnly = useTourStore((state) => state.showSavedOnly);
  const toggleShowSavedOnly = useTourStore((state) => state.toggleShowSavedOnly);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-28 w-[1200px] items-center justify-between px-10">
        <a href="#hero">
          <img src={logo} alt="Vintage Travel" className="h-14 w-auto" />
        </a>

        <nav className="flex items-center gap-8">
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

        <div className="flex items-center gap-4">
          {savedCount > 0 && (
            <Button
              variant={showSavedOnly ? "secondary" : "ghost"}
              size="icon"
              onClick={toggleShowSavedOnly}
              aria-pressed={showSavedOnly}
              title={
                showSavedOnly
                  ? "Bütün turları göstər"
                  : `Seçilmişlər (${savedCount})`
              }
              className="relative"
            >
              <Heart className={cn(showSavedOnly && "fill-coral text-coral")} />
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-coral text-[10px] text-white">
                {savedCount}
              </span>
            </Button>
          )}

          {/* Üç əlaqə nömrəsi alt-alta */}
          <ul className="space-y-1">
            {headerAgents.map((agent) => (
              <li key={agent.id} className="flex items-center gap-2">
                <a
                  href={`tel:${agent.phoneHref}`}
                  title={`${agent.name} — zəng et`}
                  className="flex items-center gap-1.5 text-[13px] text-primary transition-colors hover:text-brand-bright"
                >
                  <Phone className="size-3" />
                  {agent.phone}
                </a>

                <a
                  href={whatsappLink(agent)}
                  target="_blank"
                  rel="noreferrer noopener"
                  title={`${agent.name} — WhatsApp`}
                  className="text-[#128C7E] transition-opacity hover:opacity-70"
                >
                  <WhatsAppIcon className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;

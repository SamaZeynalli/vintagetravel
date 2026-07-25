import { Heart, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { useTourStore } from "@/store/useTourStore";

const navLinks = [
  { label: "Ana səhifə", href: "#hero" },
  { label: "Xidmətlər", href: "#services" },
  { label: "Turlar", href: "#tours" },
];

function Header() {
  const savedCount = useTourStore((state) => state.savedIds.length);

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

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[15px] text-muted-foreground">
            <Heart className="size-4" />
            {savedCount}
          </span>

          <Button asChild>
            <a href="tel:+994000000000">
              <Phone />
              +994 00 000 00 00
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;

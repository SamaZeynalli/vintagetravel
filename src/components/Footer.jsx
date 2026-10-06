import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import InstagramIcon from "@/components/icons/InstagramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { AGENTS, CONTACT, whatsappLink } from "@/data/contact";

const sectionLinks = [
  { label: "Xidmətlər", href: "#services" },
  { label: "Turlar", href: "#tours" },
  { label: "Sifariş", href: "#booking" },
  { label: "Əlaqə", href: "#contact" },
];

function Footer() {
  return (
    <footer className="bg-brand-deep py-16 text-white">
      <div className="mx-auto w-[1200px] px-10">
        <div className="flex justify-between">
          <div className="w-[320px]">
            <img
              src={logo}
              alt="Vintage Travel"
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="mt-5 leading-relaxed text-white/70">
              Aviabilet, otel, viza və hazır tur paketləri. Səyahətinizi
              planlamaqda sizə kömək edirik.
            </p>

            <div className="mt-6 space-y-2.5 text-sm text-white/70">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-sun"
              >
                <Mail className="size-4" />
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2.5 transition-colors hover:text-sun"
              >
                <InstagramIcon className="size-4" />
                {CONTACT.instagramHandle}
              </a>
              <span className="flex items-center gap-2.5">
                <MapPin className="size-4" />
                {CONTACT.address}
              </span>
            </div>
          </div>

          <div className="w-[420px]">
            <h3 className="text-lg text-sun">Əlaqə nömrələri</h3>
            <ul className="mt-5 space-y-4">
              {AGENTS.map((agent) => (
                <li key={agent.id}>
                  <p className="text-white/90">{agent.name}</p>
                  <div className="mt-1.5 flex items-center gap-4">
                    <a
                      href={`tel:${agent.phoneHref}`}
                      className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-sun"
                    >
                      <Phone className="size-3.5" />
                      {agent.phone}
                    </a>
                    <a
                      href={whatsappLink(agent)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-[#25D366]"
                    >
                      <WhatsAppIcon className="size-3.5" />
                      WhatsApp
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg text-sun">Bölmələr</h3>
            <ul className="mt-5 space-y-3">
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/70 transition-colors hover:text-sun"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-7 text-sm text-white/50">
          © {new Date().getFullYear()} Vintage Travel. Bütün hüquqlar qorunur.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

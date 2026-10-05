import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { CONTACT } from "@/data/contact";

const contactItems = [
  { icon: Phone, label: CONTACT.phone, href: `tel:${CONTACT.phoneHref}` },
  { icon: Mail, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
  {
    icon: InstagramIcon,
    label: CONTACT.instagramHandle,
    href: CONTACT.instagram,
  },
  { icon: MapPin, label: CONTACT.address, href: null },
];

const sectionLinks = [
  { label: "Xidmətlər", href: "#services" },
  { label: "Turlar", href: "#tours" },
  { label: "Sifariş", href: "#booking" },
];

function Footer() {
  return (
    <footer
      id="contact"
      className="scroll-mt-24 bg-brand-deep py-16 text-white"
    >
      <div className="mx-auto w-[1200px] px-10">
        <div className="flex justify-between">
          <div className="w-[380px]">
            <img
              src={logo}
              alt="Vintage Travel"
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="mt-5 leading-relaxed text-white/70">
              Aviabilet, otel, viza və hazır tur paketləri. Səyahətinizi
              planlamaqda sizə kömək edirik.
            </p>
          </div>

          <div>
            <h3 className="text-lg text-sun">Əlaqə</h3>
            <ul className="mt-5 space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const isExternal = item.href?.startsWith("http");

                const content = (
                  <>
                    <Icon className="size-4" />
                    {item.label}
                  </>
                );

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer noopener" : undefined}
                        className="flex items-center gap-2.5 text-white/70 transition-colors hover:text-sun"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2.5 text-white/70">
                        {content}
                      </span>
                    )}
                  </li>
                );
              })}
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

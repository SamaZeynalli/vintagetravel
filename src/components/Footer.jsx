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

function Footer() {
  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-border bg-background py-16"
    >
      <div className="mx-auto w-[1200px] px-10">
        <div className="flex justify-between">
          <div className="w-[380px]">
            <img src={logo} alt="Vintage Travel" className="h-16 w-auto" />
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Aviabilet, otel, viza və hazır tur paketləri. Səyahətinizi
              planlamaqda sizə kömək edirik.
            </p>
          </div>

          <div>
            <h3 className="text-lg text-primary">Əlaqə</h3>
            <ul className="mt-5 space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon;

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
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          item.href.startsWith("http")
                            ? "noreferrer noopener"
                            : undefined
                        }
                        className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-primary"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2.5 text-muted-foreground">
                        {content}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-lg text-primary">Bölmələr</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#services"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Xidmətlər
                </a>
              </li>
              <li>
                <a
                  href="#tours"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Turlar
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-7 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vintage Travel. Bütün hüquqlar qorunur.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

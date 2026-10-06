import { Mail, MapPin, Phone } from "lucide-react";
import { AGENTS, CONTACT, whatsappLink } from "@/data/contact";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Kartların rəngi növbə ilə dəyişir ki, bölmə canlı görünsün
const TONES = [
  { ring: "bg-sun/15", icon: "text-sun", bar: "bg-sun" },
  { ring: "bg-lagoon/15", icon: "text-lagoon", bar: "bg-lagoon" },
  { ring: "bg-coral/15", icon: "text-coral", bar: "bg-coral" },
];

function Contacts() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-24">
      <div className="mx-auto w-[1200px] px-10">
        <h2 className="text-center text-4xl text-primary">Bizimlə əlaqə</h2>
        <p className="mx-auto mt-3 w-[620px] text-center text-muted-foreground">
          Birbaşa zəng edin və ya WhatsApp-dan yazın — ən qısa zamanda cavab
          veririk.
        </p>

        <div className="mt-14 grid grid-cols-3 gap-6">
          {AGENTS.map((agent, index) => {
            const tone = TONES[index % TONES.length];

            return (
              <Card
                key={agent.id}
                className="relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1.5 ${tone.bar}`}
                />

                <CardContent className="pt-2">
                  <div
                    className={`flex size-12 items-center justify-center rounded-xl ${tone.ring}`}
                  >
                    <Phone className={`size-5 ${tone.icon}`} />
                  </div>

                  <h3 className="mt-5 text-xl text-primary">{agent.name}</h3>

                  <a
                    href={`tel:${agent.phoneHref}`}
                    className="mt-1.5 block text-muted-foreground transition-colors hover:text-primary"
                  >
                    {agent.phone}
                  </a>

                  <div className="mt-6 flex gap-3">
                    <Button asChild className="flex-1">
                      <a href={`tel:${agent.phoneHref}`}>
                        <Phone />
                        Zəng et
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-[#25D366]/40 text-[#128C7E] hover:bg-[#25D366]/10 hover:text-[#128C7E]"
                    >
                      <a
                        href={whatsappLink(agent)}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <WhatsAppIcon className="size-4" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Ümumi əlaqə məlumatları */}
        <div className="mt-12 flex items-center justify-center gap-10 border-t border-border pt-10 text-muted-foreground">
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-2.5 transition-colors hover:text-primary"
          >
            <Mail className="size-4" />
            {CONTACT.email}
          </a>

          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2.5 transition-colors hover:text-primary"
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
    </section>
  );
}

export default Contacts;

import { services } from "@/data/services";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Ton adını konkret klaslara çevirir.
 * Tailwind klasları şablonla yığılsa (`bg-${tone}`) build zamanı silinir,
 * ona görə tam adlar burada açıq yazılır.
 */
const TONES = {
  sun: { tile: "bg-sun/15", icon: "text-sun", line: "bg-sun" },
  lagoon: { tile: "bg-lagoon/15", icon: "text-lagoon", line: "bg-lagoon" },
  coral: { tile: "bg-coral/15", icon: "text-coral", line: "bg-coral" },
  brand: { tile: "bg-brand/12", icon: "text-brand", line: "bg-brand" },
};

function Services() {
  return (
    <section id="services" className="scroll-mt-28 border-b border-border py-24">
      <div className="mx-auto w-[1200px] px-10">
        <h2 className="text-center text-4xl text-primary">Xidmətlərimiz</h2>
        <p className="mx-auto mt-3 w-[620px] text-center text-muted-foreground">
          Səyahətinizin hər mərhələsini əvvəldən sona qədər biz təşkil edirik.
        </p>

        <div className="mt-14 grid grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            const tone = TONES[service.tone] ?? TONES.brand;

            return (
              <Card
                key={service.id}
                className="group relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Üstdəki rəngli zolaq — kursor üstünə gələndə görünür */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${tone.line}`}
                />

                <CardHeader>
                  <div
                    className={`mb-4 flex size-12 items-center justify-center rounded-xl ${tone.tile}`}
                  >
                    <Icon className={`size-6 ${tone.icon}`} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="mt-2 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;

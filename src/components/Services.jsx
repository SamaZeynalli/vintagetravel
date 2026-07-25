import { services } from "@/data/services";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-b border-border py-24">
      <div className="mx-auto w-[1200px] px-10">
        <h2 className="text-center text-4xl text-primary">Xidmətlərimiz</h2>
        <p className="mx-auto mt-3 w-[620px] text-center text-muted-foreground">
          Səyahətinizin hər mərhələsini əvvəldən sona qədər biz təşkil edirik.
        </p>

        <div className="mt-14 grid grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Card
                key={service.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-accent">
                    <Icon className="size-6 text-primary" />
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

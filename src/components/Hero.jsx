import compas from "@/assets/compas.png";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border bg-secondary"
    >
      {/* Logodakı kompas fon elementi kimi */}
      <img
        src={compas}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 w-[520px] -translate-y-1/2 opacity-50"
      />

      <div className="relative mx-auto w-[1200px] px-10 py-28">
        <p className="mb-5 text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Vintage Travel · Bakı
        </p>

        <h1 className="w-[660px] text-6xl leading-[1.1] text-primary">
          Səyahət planlamağı bizə etibar edin
        </h1>

        <p className="mt-6 w-[560px] text-lg leading-relaxed text-muted-foreground">
          Aviabilet, otel, viza və hazır tur paketləri — hamısı bir yerdə.
          Sizin üçün ən uyğun marşrutu seçib, bütün sənədləri hazırlayırıq.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Button size="lg" asChild>
            <a href="#tours">Turlara bax</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#services">Xidmətlərimiz</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;

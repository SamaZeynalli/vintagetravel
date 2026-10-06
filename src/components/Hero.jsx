import compas from "@/assets/compas.png";
import { Button } from "@/components/ui/button";

// Hero-nun altındakı xidmət zolağı.
// QEYD: burada rəqəm (müştəri sayı, təcrübə ili) yazılmayıb, çünki real
// göstəricilər bilinmir. Sahibi real rəqəm verərsə, bura əlavə edilə bilər.
const highlights = [
  { value: "Aviabilet", label: "dünyanın hər yerinə", color: "text-sun" },
  { value: "Viza", label: "sənədlərdə tam dəstək", color: "text-lagoon" },
  { value: "Hazır turlar", label: "fərdi və qrup", color: "text-coral" },
];

function Hero() {
  return (
    <section
      id="hero"
      className="relative scroll-mt-28 overflow-hidden bg-linear-to-br from-brand-deep via-brand to-brand-bright"
    >
      {/* Logodakı kompas — fonda incə su nişanı kimi */}
      <img
        src={compas}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-1/2 w-[560px] -translate-y-1/2 opacity-15 mix-blend-overlay"
      />

      {/* Künclərdə isti işıq ləkələri — səhifəni canlandırır */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 size-[420px] rounded-full bg-sun opacity-20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/3 size-[380px] rounded-full bg-coral opacity-15 blur-3xl"
      />

      <div className="relative mx-auto w-[1200px] px-10 py-28">
        <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm tracking-[0.2em] text-white/90 uppercase backdrop-blur">
          <span className="size-1.5 rounded-full bg-sun" />
          Vintage Travel · Bakı
        </p>

        <h1 className="w-[720px] text-6xl leading-[1.08] text-white">
          Səyahət planlamağı{" "}
          <span className="text-sun">bizə etibar edin</span>
        </h1>

        <p className="mt-6 w-[560px] text-lg leading-relaxed text-white/80">
          Aviabilet, otel, viza və hazır tur paketləri — hamısı bir yerdə.
          Sizin üçün ən uyğun marşrutu seçib, bütün sənədləri hazırlayırıq.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Button
            size="lg"
            asChild
            className="bg-sun text-brand-deep transition-transform hover:-translate-y-0.5 hover:bg-sun/90"
          >
            <a href="#tours">Turlara bax</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-white/35 bg-transparent text-white transition-transform hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
          >
            <a href="#booking">Sifariş et</a>
          </Button>
        </div>

        <div className="mt-16 flex gap-14 border-t border-white/15 pt-8">
          {highlights.map((item) => (
            <div key={item.label}>
              <p className={`text-2xl ${item.color}`}>{item.value}</p>
              <p className="mt-1 text-sm text-white/65">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;

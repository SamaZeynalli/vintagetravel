import { useState } from "react";
import { Check, Phone, Send } from "lucide-react";
import { tours } from "@/data/tours";
import { PRIMARY_AGENT, whatsappLink } from "@/data/contact";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useTourStore } from "@/store/useTourStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  tour: "",
  message: "",
  website: "", // spam tələsi — real istifadəçi bunu görmür
};

function BookingForm() {
  const savedIds = useTourStore((state) => state.savedIds);

  // Seçilmiş tur varsa, formda onu əvvəlcədən seçirik
  const firstSavedTour = tours.find((tour) => tour.id === savedIds[0]);

  const [values, setValues] = useState({
    ...EMPTY_FORM,
    tour: firstSavedTour ? firstSavedTour.title : "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));

    // İstifadəçi yazmağa başlayanda həmin sahənin xətasını silirik
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus("sending");
    setErrors({});
    setErrorMessage("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus("success");
        setValues(EMPTY_FORM);
        return;
      }

      // Serverdən sahə-sahə xətalar gəlibsə onları göstəririk
      if (data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }

      setStatus("error");
      setErrorMessage(data.error || "Sorğu göndərilə bilmədi.");
    } catch {
      setStatus("error");
      setErrorMessage(
        "İnternet bağlantısı ilə problem var. Yenidən cəhd edin.",
      );
    }
  }

  if (status === "success") {
    return (
      <section
        id="booking"
        className="scroll-mt-24 bg-linear-to-b from-sand/60 to-background py-24"
      >
        <div className="mx-auto w-[1200px] px-10 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-lagoon">
            <Check className="size-8 text-brand-deep" />
          </div>

          <h2 className="mt-7 text-4xl text-primary">Sorğunuz qəbul edildi</h2>
          <p className="mx-auto mt-4 w-[520px] text-muted-foreground">
            Təşəkkür edirik. Ən qısa zamanda sizinlə əlaqə saxlayacağıq.
            Təcili halda birbaşa zəng edə bilərsiniz.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button asChild>
              <a href={`tel:${PRIMARY_AGENT.phoneHref}`}>
                <Phone />
                {PRIMARY_AGENT.phone}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[#25D366]/40 text-[#128C7E] hover:bg-[#25D366]/10 hover:text-[#128C7E]"
            >
              <a
                href={whatsappLink(PRIMARY_AGENT)}
                target="_blank"
                rel="noreferrer noopener"
              >
                <WhatsAppIcon className="size-4" />
                WhatsApp
              </a>
            </Button>
            <Button variant="outline" onClick={() => setStatus("idle")}>
              Yeni sorğu göndər
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="booking"
      className="scroll-mt-24 bg-linear-to-b from-sand/60 to-background py-24"
    >
      <div className="mx-auto flex w-[1200px] justify-between px-10">
        <div className="w-[440px]">
          <h2 className="text-4xl text-primary">Sifariş et</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Formu doldurun — sizə uyğun variantları hazırlayıb geri dönək.
            Sorğu göndərmək heç bir öhdəlik yaratmır.
          </p>

          <ul className="mt-9 space-y-5 text-muted-foreground">
            {[
              { n: "01", text: "Sorğunuzu göndərirsiniz", tone: "bg-sun text-brand-deep" },
              { n: "02", text: "Uyğun turları və qiymətləri hazırlayırıq", tone: "bg-lagoon text-brand-deep" },
              { n: "03", text: "Telefonla əlaqə saxlayıb detalları dəqiqləşdiririk", tone: "bg-coral text-white" },
            ].map((step) => (
              <li key={step.n} className="flex items-center gap-4">
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm ${step.tone}`}
                >
                  {step.n}
                </span>
                {step.text}
              </li>
            ))}
          </ul>

          <p className="mt-9 text-sm text-muted-foreground">
            Zəng etmək daha rahatdırsa:{" "}
            <a
              href={`tel:${PRIMARY_AGENT.phoneHref}`}
              className="text-primary underline underline-offset-4"
            >
              {PRIMARY_AGENT.phone}
            </a>{" "}
            · bütün nömrələr{" "}
            <a href="#contact" className="text-primary underline underline-offset-4">
              Əlaqə bölməsində
            </a>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-[560px] rounded-xl border border-border bg-card p-9"
        >
          <div className="space-y-5">
            <div>
              <Label htmlFor="name">Ad, soyad</Label>
              <Input
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Adınızı yazın"
                aria-invalid={Boolean(errors.name)}
                className="mt-2"
              />
              {errors.name && (
                <p className="mt-1.5 text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange}
                placeholder="+994 50 123 45 67"
                aria-invalid={Boolean(errors.phone)}
                className="mt-2"
              />
              {errors.phone && (
                <p className="mt-1.5 text-sm text-destructive">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">E-poçt (istəyə bağlı)</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="ad@example.com"
                aria-invalid={Boolean(errors.email)}
                className="mt-2"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-destructive">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="tour">Maraqlandığınız tur</Label>
              <select
                id="tour"
                name="tour"
                value={values.tour}
                onChange={handleChange}
                className="mt-2 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <option value="">Hələ qərar verməmişəm</option>
                {tours.map((tour) => (
                  <option key={tour.id} value={tour.title}>
                    {tour.title} — {tour.country}
                  </option>
                ))}
                <option value="Digər">Digər istiqamət</option>
              </select>
            </div>

            <div>
              <Label htmlFor="message">Əlavə qeyd (istəyə bağlı)</Label>
              <Textarea
                id="message"
                name="message"
                value={values.message}
                onChange={handleChange}
                placeholder="Neçə nəfər, təxmini tarix, büdcə..."
                rows={4}
                className="mt-2"
              />
            </div>

            {/* Spam tələsi — ekranda görünmür, yalnız botlar doldurur */}
            <input
              type="text"
              name="website"
              value={values.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
          </div>

          {status === "error" && (
            <p className="mt-6 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={status === "sending"}
            className="mt-7 w-full bg-linear-to-r from-brand to-brand-bright transition-transform hover:-translate-y-0.5"
          >
            <Send />
            {status === "sending" ? "Göndərilir..." : "Sorğu göndər"}
          </Button>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Məlumatlarınız yalnız sizinlə əlaqə üçün istifadə olunur.
          </p>
        </form>
      </div>
    </section>
  );
}

export default BookingForm;
